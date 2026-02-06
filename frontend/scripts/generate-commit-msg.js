#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
function run(cmd) {
  try { return execSync(cmd, { encoding: 'utf8' }).trim(); }
  catch { return ''; }
}

const branch = run('git rev-parse --abbrev-ref HEAD') || 'unknown-branch';
// keep a basic check that something is staged so the script fails fast like before
const raw = run('git diff --cached --name-status');
if (!raw) {
  console.error('No staged changes found. Stage files before committing.');
  process.exit(1);
}

// (numstat and unified diff parsing removed — not used when script outputs a single empty Changes bullet)

// Minimal output: only branch in header, no title generation
const header = `[${branch}] - `;


// Removed: detailed heuristics function — script now intentionally outputs a single empty Changes bullet.

// Keep the same header but leave a single empty bullet under Changes
const bodyLines = ['Changes:', '- '];

const message = `${header}\n\n${bodyLines.join('\n')}\n`;

// If script was called with a file path argument, write there, else print to stdout
const outPath = process.argv[2];
if (outPath) {
  fs.writeFileSync(outPath, message, { encoding: 'utf8' });
} else {
  process.stdout.write(message);
}
