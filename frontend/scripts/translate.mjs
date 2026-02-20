/**
 * DeepL Translation Script
 *
 * Translates changed JSON translation files between PL <-> EN.
 *
 * Usage:
 *   npm run translate              — translate all changed files (PL → EN)
 *   npm run translate -- --all     — force translate all files
 *   npm run translate -- --check   — show which keys differ (dry run, no changes)
 *   npm run translate -- --reverse — translate EN → PL
 *
 * Preserves manually edited values that differ from DeepL output by using
 * --force flag to override.
 */

import * as deepl from "deepl-node";
import { readFileSync, writeFileSync, existsSync } from "fs";
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
const FORCE_ALL = args.includes("--all");
const CHECK_ONLY = args.includes("--check");
const REVERSE = args.includes("--reverse");

const SRC_DIR = REVERSE ? EN_DIR : PL_DIR;
const DST_DIR = REVERSE ? PL_DIR : EN_DIR;
const SRC_LANG = REVERSE ? "EN" : "PL";
const DST_LANG = REVERSE ? "PL" : "EN-US";

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
 */
async function translateText(text, srcLang, dstLang) {
  if (typeof text !== "string" || text.trim() === "") return text;
  // Skip URLs, technical strings
  if (
    text.startsWith("http") ||
    text.startsWith("/") ||
    !text.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/)
  ) {
    return text;
  }
  try {
    const result = await translator.translateText(
      text,
      srcLang.toLowerCase(),
      dstLang.toLowerCase()
    );
    return result.text;
  } catch (err) {
    console.warn(`  ⚠ Could not translate: "${text.slice(0, 50)}..." — ${err.message}`);
    return text;
  }
}

/**
 * Recursively translate all string values in an object.
 */
async function translateObject(obj, srcLang, dstLang, path = "") {
  const result = Array.isArray(obj) ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === "string") {
      const translated = await translateText(value, srcLang, dstLang);
      if (translated !== value) {
        console.log(`  ${currentPath}:`);
        console.log(`    PL: ${value.slice(0, 80)}${value.length > 80 ? "…" : ""}`);
        console.log(`    EN: ${translated.slice(0, 80)}${translated.length > 80 ? "…" : ""}`);
      }
      result[key] = translated;
    } else if (Array.isArray(value)) {
      result[key] = await Promise.all(
        value.map((item) =>
          typeof item === "string"
            ? translateText(item, srcLang, dstLang)
            : translateObject(item, srcLang, dstLang, currentPath)
        )
      );
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
    if (missing.length)
      console.log(`  ➕ Missing in ${REVERSE ? "PL" : "EN"}: ${missing.join(", ")}`);
    if (extra.length) console.log(`  ➖ Extra in ${REVERSE ? "PL" : "EN"}: ${extra.join(", ")}`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌍  DeepL Translation Script`);
  console.log(`   Direction: ${SRC_LANG} → ${DST_LANG.split("-")[0]}`);
  console.log(
    `   Mode: ${CHECK_ONLY ? "check only" : FORCE_ALL ? "force all" : "changed files only"}\n`
  );

  const { readdirSync } = await import("fs");
  const allFiles = readdirSync(SRC_DIR).filter((f) => f.endsWith(".json"));

  let filesToProcess = allFiles;
  if (!FORCE_ALL && !CHECK_ONLY) {
    const changed = getChangedFiles();
    if (changed && changed.length > 0) {
      filesToProcess = allFiles.filter((f) => changed.includes(f));
      if (filesToProcess.length === 0) {
        console.log(
          "✅  No changed translation files detected. Use --all to translate everything."
        );
        return;
      }
      console.log(`📋  Changed files: ${filesToProcess.join(", ")}\n`);
    } else {
      console.log("📋  Could not detect changed files — processing all files.\n");
    }
  }

  if (CHECK_ONLY) {
    console.log("🔍  Checking key differences between PL and EN:\n");
    for (const filename of allFiles) {
      const srcFile = join(SRC_DIR, filename);
      const dstFile = join(DST_DIR, filename);
      diffFiles(srcFile, dstFile, filename);
    }
    console.log("\n✅  Check complete.");
    return;
  }

  let totalTranslated = 0;

  for (const filename of filesToProcess) {
    const srcFile = join(SRC_DIR, filename);
    const dstFile = join(DST_DIR, filename);

    if (!existsSync(srcFile)) {
      console.warn(`⚠  Source file not found: ${srcFile}`);
      continue;
    }

    console.log(`\n📄  Translating: ${filename}`);

    const srcData = JSON.parse(readFileSync(srcFile, "utf8"));
    const dstData = existsSync(dstFile) ? JSON.parse(readFileSync(dstFile, "utf8")) : {};

    const srcFlat = flatten(srcData);
    const dstFlat = flatten(dstData);

    // Only translate keys that are missing in destination or explicitly forced
    const keysToTranslate = Object.keys(srcFlat).filter((k) => FORCE_ALL || !(k in dstFlat));

    if (keysToTranslate.length === 0) {
      console.log("  ✓ Already up to date.");
      continue;
    }

    console.log(`  Keys to translate: ${keysToTranslate.length}`);

    // Build partial object with only keys to translate
    const partialSrc = {};
    for (const k of keysToTranslate) {
      setNested(partialSrc, k, srcFlat[k]);
    }

    const translated = await translateObject(partialSrc, SRC_LANG, DST_LANG);
    const translatedFlat = flatten(translated);

    // Merge into existing destination
    const result = JSON.parse(JSON.stringify(dstData));
    for (const [k, v] of Object.entries(translatedFlat)) {
      setNested(result, k, v);
    }

    if (!CHECK_ONLY) {
      writeFileSync(dstFile, JSON.stringify(result, null, 2) + "\n", "utf8");
      console.log(`  ✅  Saved: ${dstFile}`);
      totalTranslated += keysToTranslate.length;
    }
  }

  console.log(`\n✅  Done. Translated ${totalTranslated} keys.\n`);
}

main().catch((err) => {
  console.error("❌  Fatal error:", err.message);
  process.exit(1);
});
