# 📜 Przydatne skrypty npm

Dodaj do `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    
    // Skrypty i18n
    "i18n:migrate": "node scripts/migrate-json-structure.js",
    "i18n:check": "node scripts/check-translations.js",
    "i18n:stats": "node scripts/translation-stats.js",
    "i18n:validate": "node scripts/validate-json-structure.js"
  }
}
```

---

## Skrypty

### 1. `i18n:migrate` – Migracja struktury JSON

**Co robi:**
- Dzieli `pl.json` i `en.json` na małe pliki per strona
- Tworzy backup
- Generuje nową strukturę folderów

**Użycie:**
```bash
npm run i18n:migrate
```

**Plik:** `scripts/migrate-json-structure.js` (już stworzony)

---

### 2. `i18n:check` – Sprawdzenie kompletności tłumaczeń

**Co robi:**
- Porównuje klucze w `pl/` i `en/`
- Zgłasza brakujące tłumaczenia
- Wykrywa typo w nazwach kluczy

**Plik:** `scripts/check-translations.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PL_DIR = path.join(__dirname, '../src/messages/pl');
const EN_DIR = path.join(__dirname, '../src/messages/en');

console.log('🔍 Checking translation completeness...\n');

const plFiles = fs.readdirSync(PL_DIR).filter(f => f.endsWith('.json'));
const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json'));

let totalIssues = 0;

// Sprawdź czy wszystkie pliki PL mają odpowiedniki EN
plFiles.forEach(file => {
  if (!enFiles.includes(file)) {
    console.error(`❌ Missing EN translation file: ${file}`);
    totalIssues++;
  }
});

// Sprawdź klucze w każdym pliku
plFiles.forEach(file => {
  const plPath = path.join(PL_DIR, file);
  const enPath = path.join(EN_DIR, file);
  
  if (!fs.existsSync(enPath)) return;
  
  const plData = JSON.parse(fs.readFileSync(plPath, 'utf8'));
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  
  const plKeys = getAllKeys(plData);
  const enKeys = getAllKeys(enData);
  
  const missingInEN = plKeys.filter(key => !enKeys.includes(key));
  const missingInPL = enKeys.filter(key => !plKeys.includes(key));
  
  if (missingInEN.length > 0) {
    console.error(`\n❌ ${file} - Missing in EN:`);
    missingInEN.forEach(key => console.error(`   - ${key}`));
    totalIssues += missingInEN.length;
  }
  
  if (missingInPL.length > 0) {
    console.error(`\n❌ ${file} - Missing in PL:`);
    missingInPL.forEach(key => console.error(`   - ${key}`));
    totalIssues += missingInPL.length;
  }
  
  if (missingInEN.length === 0 && missingInPL.length === 0) {
    console.log(`✅ ${file}`);
  }
});

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

console.log(`\n${totalIssues === 0 ? '✅' : '❌'} Total issues: ${totalIssues}`);
process.exit(totalIssues > 0 ? 1 : 0);
```

**Użycie:**
```bash
npm run i18n:check
```

---

### 3. `i18n:stats` – Statystyki tłumaczeń

**Co robi:**
- Liczy klucze w każdym pliku
- Pokazuje coverage
- Wyświetla rozmiar plików

**Plik:** `scripts/translation-stats.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PL_DIR = path.join(__dirname, '../src/messages/pl');
const EN_DIR = path.join(__dirname, '../src/messages/en');

console.log('📊 Translation Statistics\n');

const plFiles = fs.readdirSync(PL_DIR).filter(f => f.endsWith('.json'));

let totalPL = 0;
let totalEN = 0;

console.log('File                  PL Keys  EN Keys  Size (KB)');
console.log('─────────────────────────────────────────────────');

plFiles.forEach(file => {
  const plPath = path.join(PL_DIR, file);
  const enPath = path.join(EN_DIR, file);
  
  const plData = JSON.parse(fs.readFileSync(plPath, 'utf8'));
  const enData = fs.existsSync(enPath) 
    ? JSON.parse(fs.readFileSync(enPath, 'utf8'))
    : {};
  
  const plKeys = getAllKeys(plData).length;
  const enKeys = getAllKeys(enData).length;
  const size = (fs.statSync(plPath).size / 1024).toFixed(1);
  
  totalPL += plKeys;
  totalEN += enKeys;
  
  const coverage = plKeys > 0 ? ((enKeys / plKeys) * 100).toFixed(0) : 0;
  const status = coverage === '100' ? '✅' : '⚠️';
  
  console.log(
    `${status} ${file.padEnd(20)} ${plKeys.toString().padStart(7)} ${enKeys.toString().padStart(8)} ${size.padStart(10)}`
  );
});

console.log('─────────────────────────────────────────────────');
console.log(`   TOTAL              ${totalPL.toString().padStart(7)} ${totalEN.toString().padStart(8)}`);

const overallCoverage = ((totalEN / totalPL) * 100).toFixed(1);
console.log(`\n📈 Overall coverage: ${overallCoverage}%`);

if (overallCoverage < 100) {
  console.log(`⚠️  Missing ${totalPL - totalEN} translations in EN`);
}

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}
```

**Użycie:**
```bash
npm run i18n:stats
```

**Output:**
```
📊 Translation Statistics

File                  PL Keys  EN Keys  Size (KB)
─────────────────────────────────────────────────
✅ common.json             15       15        1.2
✅ navigation.json         12       12        0.8
⚠️  home.json              25       23        2.1
✅ team.json               18       18        1.5
─────────────────────────────────────────────────
   TOTAL                  70       68

📈 Overall coverage: 97.1%
⚠️  Missing 2 translations in EN
```

---

### 4. `i18n:validate` – Walidacja struktury JSON

**Co robi:**
- Sprawdza poprawność składni JSON
- Weryfikuje spójność struktury
- Wykrywa duplikaty kluczy

**Plik:** `scripts/validate-json-structure.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../src/messages');

console.log('🔍 Validating JSON structure...\n');

let hasErrors = false;

['pl', 'en'].forEach(locale => {
  const localeDir = path.join(MESSAGES_DIR, locale);
  
  if (!fs.existsSync(localeDir)) {
    console.error(`❌ Missing directory: ${locale}/`);
    hasErrors = true;
    return;
  }
  
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    const filePath = path.join(localeDir, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // Sprawdź czy plik nie jest pusty
      if (Object.keys(data).length === 0) {
        console.warn(`⚠️  ${locale}/${file} is empty`);
      }
      
      // Sprawdź czy nie ma duplikatów kluczy (case-insensitive)
      const keys = getAllKeys(data);
      const lowerKeys = keys.map(k => k.toLowerCase());
      const duplicates = lowerKeys.filter((k, i) => lowerKeys.indexOf(k) !== i);
      
      if (duplicates.length > 0) {
        console.error(`❌ ${locale}/${file} has duplicate keys:`);
        [...new Set(duplicates)].forEach(key => console.error(`   - ${key}`));
        hasErrors = true;
      } else {
        console.log(`✅ ${locale}/${file}`);
      }
      
    } catch (error) {
      console.error(`❌ ${locale}/${file} - Invalid JSON:`);
      console.error(`   ${error.message}`);
      hasErrors = true;
    }
  });
});

console.log(hasErrors ? '\n❌ Validation failed' : '\n✅ All files valid');
process.exit(hasErrors ? 1 : 0);

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}
```

**Użycie:**
```bash
npm run i18n:validate
```

---

## Integracja z CI/CD

### GitHub Actions

`.github/workflows/i18n-check.yml`

```yaml
name: Check i18n

on: [push, pull_request]

jobs:
  check-translations:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate JSON structure
        run: npm run i18n:validate
      
      - name: Check translation completeness
        run: npm run i18n:check
      
      - name: Build
        run: npm run build
```

---

## Pre-commit hook

`.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Waliduj JSON przed commitem
npm run i18n:validate

# Sprawdź kompletność tłumaczeń
npm run i18n:check
```

**Instalacja:**
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run i18n:validate && npm run i18n:check"
```

---

## Podsumowanie

| Skrypt | Cel | Kiedy używać |
|--------|-----|--------------|
| `i18n:migrate` | Migracja struktury | Jednorazowo przy przejściu |
| `i18n:check` | Sprawdź braki | Przed commitem |
| `i18n:stats` | Zobacz pokrycie | Regularnie |
| `i18n:validate` | Waliduj składnię | Przed buildem |

**Tip:** Dodaj wszystkie do `pre-commit` hook dla automatycznej walidacji! 🚀
