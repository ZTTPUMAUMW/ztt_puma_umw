#!/usr/bin/env node

/**
 * Translation Script using DeepL API
 * 
 * Usage:
 *   npm run translate              - Translate all JSON messages from pl.json to en.json
 *   npm run translate:text "text"  - Translate a single text string
 * 
 * Security:
 *   - API key stored in .env.local (gitignored)
 *   - Rate limiting to avoid exceeding API limits
 *   - Caching to avoid duplicate translations
 */

import * as deepl from 'deepl-node';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

if (!DEEPL_API_KEY) {
  console.error('❌ Error: DEEPL_API_KEY not found in .env.local');
  process.exit(1);
}

// Initialize DeepL translator
const translator = new deepl.Translator(DEEPL_API_KEY);

// Paths
const MESSAGES_DIR = path.resolve(__dirname, '../src/messages');
const CACHE_FILE = path.resolve(__dirname, '../.translation-cache.json');

// Translation cache to avoid duplicate API calls
let translationCache: Record<string, string> = {};

// Load cache
function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      translationCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      console.log(`📦 Loaded ${Object.keys(translationCache).length} cached translations`);
    } catch {
      console.warn('⚠️  Could not load translation cache');
    }
  }
}

// Save cache
function saveCache() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(translationCache, null, 2));
    console.log(`💾 Saved ${Object.keys(translationCache).length} translations to cache`);
  } catch {
    console.warn('⚠️  Could not save translation cache');
  }
}

// Translate a single text
async function translateText(text: string, sourceLang: string = 'pl', targetLang: string = 'en'): Promise<string> {
  const cacheKey = `${sourceLang}:${targetLang}:${text}`;
  
  // Check cache first
  if (translationCache[cacheKey]) {
    console.log(`  ♻️  Using cached translation for: ${text.substring(0, 40)}...`);
    return translationCache[cacheKey];
  }

  try {
    console.log(`  🌐 Translating: ${text.substring(0, 40)}...`);
    const result = await translator.translateText(
      text,
      sourceLang as deepl.SourceLanguageCode,
      targetLang as deepl.TargetLanguageCode
    );
    
    const translatedText = result.text;
    translationCache[cacheKey] = translatedText;
    
    // Add small delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return translatedText;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Translation error: ${errorMessage}`);
    throw error;
  }
}

// Recursively translate JSON object
type TranslatableValue = Record<string, unknown> | unknown[] | string | number | boolean | null;

async function translateObject(
  obj: TranslatableValue,
  sourceLang: string = 'pl',
  targetLang: string = 'en',
  path: string = ''
): Promise<unknown> {
  if (typeof obj === 'string') {
    return await translateText(obj, sourceLang, targetLang);
  }

  if (Array.isArray(obj)) {
    const translated = [];
    for (let i = 0; i < obj.length; i++) {
      translated.push(await translateObject(obj[i] as TranslatableValue, sourceLang, targetLang, `${path}[${i}]`));
    }
    return translated;
  }

  if (typeof obj === 'object' && obj !== null) {
    const translated: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      console.log(`📝 Processing: ${path}.${key}`);
      translated[key] = await translateObject(value as TranslatableValue, sourceLang, targetLang, `${path}.${key}`);
    }
    return translated;
  }

  return obj;
}

// Main function: translate messages JSON files
async function translateMessages() {
  console.log('🚀 Starting translation process...\n');
  
  loadCache();

  const sourcePath = path.join(MESSAGES_DIR, 'pl.json');
  const targetPath = path.join(MESSAGES_DIR, 'en.json');

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  try {
    // Load source JSON
    const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));
    console.log(`📖 Loaded source file: ${sourcePath}\n`);

    // Translate
    const translatedContent = await translateObject(sourceContent, 'pl', 'en-US');

    // Save translated JSON
    fs.writeFileSync(targetPath, JSON.stringify(translatedContent, null, 2));
    console.log(`\n✅ Translation complete!`);
    console.log(`📁 Saved to: ${targetPath}\n`);

    // Save cache
    saveCache();

    // Show usage statistics
    const usage = await translator.getUsage();
    if (usage.character) {
      console.log(`📊 DeepL Usage:`);
      console.log(`   Characters used: ${usage.character.count.toLocaleString()} / ${usage.character.limit.toLocaleString()}`);
      const percentage = (usage.character.count / usage.character.limit * 100).toFixed(2);
      console.log(`   Remaining: ${percentage}%`);
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n❌ Error: ${errorMessage}`);
    saveCache(); // Save cache even on error
    process.exit(1);
  }
}

// CLI handling
const args = process.argv.slice(2);

if (args.length === 0) {
  // No arguments: translate messages
  translateMessages();
} else if (args[0] === 'text' && args[1]) {
  // Translate single text
  loadCache();
  translateText(args[1], 'pl', 'en-US')
    .then(result => {
      console.log(`\n✅ Translation:`);
      console.log(`   PL: ${args[1]}`);
      console.log(`   EN: ${result}\n`);
      saveCache();
    })
    .catch(error => {
      console.error(`\n❌ Error: ${error.message}\n`);
      saveCache();
      process.exit(1);
    });
} else {
  console.error('Usage:');
  console.error('  npm run translate              - Translate pl.json to en.json');
  console.error('  npm run translate:text "text"  - Translate a single text string');
  process.exit(1);
}
