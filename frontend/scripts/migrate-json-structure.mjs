#!/usr/bin/env node

/**
 * Skrypt automatycznej migracji struktury JSON
 *
 * PRZED:
 * src/messages/pl.json (wszystkie klucze)
 * src/messages/en.json (wszystkie klucze)
 *
 * PO:
 * src/messages/pl/common.json
 * src/messages/pl/navigation.json
 * src/messages/pl/home.json
 * ...
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MESSAGES_DIR = path.join(__dirname, "../src/messages");
const OLD_PL = path.join(MESSAGES_DIR, "pl.json");
const OLD_EN = path.join(MESSAGES_DIR, "en.json");
const NEW_PL_DIR = path.join(MESSAGES_DIR, "pl");
const NEW_EN_DIR = path.join(MESSAGES_DIR, "en");

console.log("🚀 Starting JSON structure migration...\n");

// Sprawdź czy stare pliki istnieją
if (!fs.existsSync(OLD_PL) || !fs.existsSync(OLD_EN)) {
  console.error("❌ Error: pl.json or en.json not found in src/messages/");
  console.error("   Make sure you are running this script from the project root.");
  process.exit(1);
}

// Backup starych plików
console.log("📦 Creating backups...");
fs.copyFileSync(OLD_PL, `${OLD_PL}.backup`);
fs.copyFileSync(OLD_EN, `${OLD_EN}.backup`);
console.log("   ✅ pl.json.backup");
console.log("   ✅ en.json.backup\n");

// Wczytaj stare pliki
console.log("📖 Reading old JSON files...");
const oldPL = JSON.parse(fs.readFileSync(OLD_PL, "utf8"));
const oldEN = JSON.parse(fs.readFileSync(OLD_EN, "utf8"));
console.log(`   ✅ Found ${Object.keys(oldPL).length} top-level keys\n`);

// Stwórz nowe foldery
console.log("📁 Creating new directory structure...");
fs.mkdirSync(NEW_PL_DIR, { recursive: true });
fs.mkdirSync(NEW_EN_DIR, { recursive: true });
console.log("   ✅ src/messages/pl/");
console.log("   ✅ src/messages/en/\n");

// Dla każdej sekcji stwórz osobny plik
console.log("✂️  Splitting JSON files...\n");

const sections = Object.keys(oldPL);
let createdFiles = 0;

sections.forEach((section) => {
  // Polski
  const plPath = path.join(NEW_PL_DIR, `${section}.json`);
  fs.writeFileSync(plPath, JSON.stringify(oldPL[section], null, 2) + "\n");
  console.log(`   ✅ pl/${section}.json`);
  createdFiles++;

  // Angielski
  const enPath = path.join(NEW_EN_DIR, `${section}.json`);
  fs.writeFileSync(enPath, JSON.stringify(oldEN[section], null, 2) + "\n");
  console.log(`   ✅ en/${section}.json`);
  createdFiles++;
});

console.log(`\n✨ Migration complete! Created ${createdFiles} files.\n`);

// Instrukcje dalsze
console.log("📝 Next steps:\n");
console.log("1. Update src/i18n/request.ts to import from the new structure:");
console.log("");
console.log("   const messages = {");
sections.forEach((section) => {
  console.log(
    `     ${section}: (await import(\`@/messages/\${locale}/${section}.json\`)).default,`
  );
});
console.log("   };");
console.log("");
console.log("2. Test the build:");
console.log("   npm run build");
console.log("");
console.log("3. If everything works, delete old files:");
console.log("   rm src/messages/pl.json");
console.log("   rm src/messages/en.json");
console.log("");
console.log("4. If something goes wrong, restore backups:");
console.log("   cp src/messages/pl.json.backup src/messages/pl.json");
console.log("   cp src/messages/en.json.backup src/messages/en.json");
console.log("");
console.log("✅ Done! Happy coding! 🚀");
