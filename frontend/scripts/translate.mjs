/**
 * DeepL Translation Script
 *
 * Translates changed JSON translation files between PL <-> EN.
 *
 * Usage:
 *   npm run translate              — translate only MISSING keys in changed files (PL → EN)
 *   npm run translate -- --all     — translate MISSING keys in ALL files (does NOT overwrite existing)
 *   npm run translate -- --check   — show which keys differ (dry run, no changes)
 *   npm run translate -- --reverse — translate EN → PL (missing keys only)
 *   npm run translate -- --force   — overwrite ALL keys including existing ones (⚠ destructive)
 *
 * By default, existing translations are NEVER overwritten — only missing keys
 * are translated and added. Use --force to override this behavior.
 */

import * as deepl from "deepl-node";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import * as dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

dotenv.config({ path: join(ROOT, ".env.local") });

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
if (!DEEPL_API_KEY) {
  console.error("❌  DEEPL_API_KEY not found in .env.local");
  process.exit(1);
}

const translator = new deepl.Translator(DEEPL_API_KEY);

const PL_DIR = join(ROOT, "src/messages/pl");
const EN_DIR = join(ROOT, "src/messages/en");

const args = process.argv.slice(2);
const PROCESS_ALL_FILES = args.includes("--all");
const CHECK_ONLY = args.includes("--check");
const REVERSE = args.includes("--reverse");
const FORCE_OVERWRITE = args.includes("--force");

const SRC_DIR = REVERSE ? EN_DIR : PL_DIR;
const DST_DIR = REVERSE ? PL_DIR : EN_DIR;
const SRC_LANG = REVERSE ? "en" : "pl";
const DST_LANG = REVERSE ? "pl" : "en-US";
const SRC_LABEL = SRC_LANG.toUpperCase();
const DST_LABEL = DST_LANG.split("-")[0].toUpperCase();

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Flatten nested JSON to dot-notation keys.
 * Arrays are kept as-is (translated as a whole).
 */
function flatten(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

/**
 * Set a value in a nested object by dot-notation key.
 */
function setNested(obj, dotKey, value) {
  const keys = dotKey.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

/**
 * Get changed JSON files relative to main branch via git diff.
 * Falls back to all files if git diff fails.
 */
function getChangedFiles() {
  try {
    const diff = execSync("git diff --name-only HEAD -- 'src/messages/**/*.json'", {
      cwd: ROOT,
      encoding: "utf8",
    });
    const files = diff
      .split("\n")
      .filter(Boolean)
      .map((f) => f.replace(/^.*src\/messages\/(pl|en)\//, ""))
      .filter((f) => f.endsWith(".json"));
    return [...new Set(files)];
  } catch {
    return null;
  }
}

/**
 * Translate a single string value using DeepL.
 * Returns null if translation fails (so caller can skip instead of using source text).
 */
async function translateText(text, srcLang, dstLang) {
  if (typeof text !== "string" || text.trim() === "") return text;
  // Skip URLs, paths, technical strings
  if (
    text.startsWith("http") ||
    text.startsWith("/") ||
    !text.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/)
  ) {
    return text;
  }
  try {
    const result = await translator.translateText(text, srcLang, dstLang);
    return result.text;
  } catch (err) {
    console.warn(`  ⚠ Could not translate: "${text.slice(0, 50)}..." — ${err.message}`);
    return null; // Return null so caller knows translation failed
  }
}

/**
 * Recursively translate all string values in an object.
 * If translation fails for a value, it is skipped (not included in result).
 */
async function translateObject(obj, srcLang, dstLang, path = "") {
  const result = Array.isArray(obj) ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === "string") {
      const translated = await translateText(value, srcLang, dstLang);
      if (translated === null) {
        console.log(`  ⏭ Skipping ${currentPath} (translation failed)`);
        continue; // Don't include failed translations
      }
      if (translated !== value) {
        console.log(`  ${currentPath}:`);
        console.log(`    ${SRC_LABEL}: ${value.slice(0, 80)}${value.length > 80 ? "…" : ""}`);
        console.log(
          `    ${DST_LABEL}: ${translated.slice(0, 80)}${translated.length > 80 ? "…" : ""}`
        );
      }
      result[key] = translated;
    } else if (Array.isArray(value)) {
      const translatedArr = [];
      for (const item of value) {
        if (typeof item === "string") {
          const translated = await translateText(item, srcLang, dstLang);
          if (translated === null) {
            console.log(`  ⏭ Skipping array item in ${currentPath} (translation failed)`);
            translatedArr.push(item); // Keep original for arrays to preserve length
          } else {
            translatedArr.push(translated);
          }
        } else if (item !== null && typeof item === "object") {
          translatedArr.push(await translateObject(item, srcLang, dstLang, currentPath));
        } else {
          translatedArr.push(item);
        }
      }
      result[key] = translatedArr;
    } else if (value !== null && typeof value === "object") {
      result[key] = await translateObject(value, srcLang, dstLang, currentPath);
    } else {
      result[key] = value;
    }
  }
  return result;
}

// ─── Diff / Check ────────────────────────────────────────────────────────────

function diffFiles(srcFile, dstFile, filename) {
  const src = JSON.parse(readFileSync(srcFile, "utf8"));
  const dst = existsSync(dstFile) ? JSON.parse(readFileSync(dstFile, "utf8")) : {};
  const srcFlat = flatten(src);
  const dstFlat = flatten(dst);

  const missing = Object.keys(srcFlat).filter((k) => !(k in dstFlat));
  const extra = Object.keys(dstFlat).filter((k) => !(k in srcFlat));

  if (missing.length || extra.length) {
    console.log(`\n📄  ${filename}`);
    if (missing.length) console.log(`  ➕ Missing in ${DST_LABEL}: ${missing.join(", ")}`);
    if (extra.length) console.log(`  ➖ Extra in ${DST_LABEL}: ${extra.join(", ")}`);
    return { missing: missing.length, extra: extra.length };
  }
  return { missing: 0, extra: 0 };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌍  DeepL Translation Script`);
  console.log(`   Direction: ${SRC_LABEL} → ${DST_LABEL}`);
  console.log(
    `   Mode: ${CHECK_ONLY ? "check only" : FORCE_OVERWRITE ? "⚠ FORCE overwrite all" : PROCESS_ALL_FILES ? "all files (missing keys only)" : "changed files (missing keys only)"}\n`
  );

  if (FORCE_OVERWRITE) {
    console.log("  ⚠  WARNING: --force will overwrite ALL existing translations!");
    console.log("  ⚠  Existing manual translations will be replaced by DeepL output.");
    console.log("  ⚠  Press Ctrl+C within 3 seconds to cancel...\n");
    await new Promise((r) => setTimeout(r, 3000));
  }

  // Show usage info
  try {
    const usage = await translator.getUsage();
    if (usage.character) {
      console.log(
        `📊  DeepL usage: ${usage.character.count.toLocaleString()} / ${usage.character.limit.toLocaleString()} characters\n`
      );
    }
  } catch {
    // Ignore usage fetch errors
  }

  const allFiles = readdirSync(SRC_DIR).filter((f) => f.endsWith(".json"));

  let filesToProcess = allFiles;
  if (!PROCESS_ALL_FILES && !FORCE_OVERWRITE && !CHECK_ONLY) {
    const changed = getChangedFiles();
    if (changed && changed.length > 0) {
      filesToProcess = allFiles.filter((f) => changed.includes(f));
      if (filesToProcess.length === 0) {
        console.log("✅  No changed translation files detected. Use --all to process all files.");
        return;
      }
      console.log(`📋  Changed files: ${filesToProcess.join(", ")}\n`);
    } else {
      console.log("📋  Could not detect changed files — processing all files.\n");
    }
  }

  if (CHECK_ONLY) {
    console.log("🔍  Checking key differences between PL and EN:\n");
    let totalMissing = 0;
    for (const filename of allFiles) {
      const srcFile = join(SRC_DIR, filename);
      const dstFile = join(DST_DIR, filename);
      const { missing } = diffFiles(srcFile, dstFile, filename);
      totalMissing += missing;
    }
    if (totalMissing === 0) {
      console.log("\n✅  All keys are synchronized. No missing translations.");
    } else {
      console.log(
        `\n⚠  ${totalMissing} missing key(s) found. Run 'npm run translate' to translate them.`
      );
    }
    return;
  }

  let totalTranslated = 0;
  let totalSkipped = 0;

  for (const filename of filesToProcess) {
    const srcFile = join(SRC_DIR, filename);
    const dstFile = join(DST_DIR, filename);

    if (!existsSync(srcFile)) {
      console.warn(`⚠  Source file not found: ${srcFile}`);
      continue;
    }

    console.log(`\n📄  Processing: ${filename}`);

    const srcData = JSON.parse(readFileSync(srcFile, "utf8"));
    const dstData = existsSync(dstFile) ? JSON.parse(readFileSync(dstFile, "utf8")) : {};

    const srcFlat = flatten(srcData);
    const dstFlat = flatten(dstData);

    // CRITICAL: Only translate MISSING keys by default.
    // --force is required to overwrite existing translations.
    const keysToTranslate = Object.keys(srcFlat).filter((k) => FORCE_OVERWRITE || !(k in dstFlat));

    if (keysToTranslate.length === 0) {
      const skippedCount = Object.keys(srcFlat).length;
      console.log(`  ✓ Already up to date (${skippedCount} keys preserved).`);
      totalSkipped += skippedCount;
      continue;
    }

    if (!FORCE_OVERWRITE) {
      console.log(`  🆕 Missing keys to translate: ${keysToTranslate.length}`);
      console.log(
        `  🔒 Existing keys preserved: ${Object.keys(srcFlat).length - keysToTranslate.length}`
      );
    } else {
      console.log(`  ⚠ Keys to overwrite: ${keysToTranslate.length}`);
    }

    // Build partial object with only keys to translate
    const partialSrc = {};
    for (const k of keysToTranslate) {
      setNested(partialSrc, k, srcFlat[k]);
    }

    const translated = await translateObject(partialSrc, SRC_LANG, DST_LANG);
    const translatedFlat = flatten(translated);

    // Merge into existing destination (preserving existing keys)
    const result = JSON.parse(JSON.stringify(dstData));
    for (const [k, v] of Object.entries(translatedFlat)) {
      setNested(result, k, v);
    }

    writeFileSync(dstFile, JSON.stringify(result, null, 2) + "\n", "utf8");
    console.log(`  ✅  Saved: ${filename}`);
    totalTranslated += keysToTranslate.length;
  }

  console.log(
    `\n✅  Done. Translated ${totalTranslated} keys, preserved ${totalSkipped} existing.\n`
  );
}

main().catch((err) => {
  console.error("❌  Fatal error:", err.message);
  process.exit(1);
});
