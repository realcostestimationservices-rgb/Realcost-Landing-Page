
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Compact, always-increasing build stamp: YYYY.MM.DD.HHmm
const d = new Date();
const p = (n) => String(n).padStart(2, '0');
const stamp = `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}.${p(d.getHours())}${p(d.getMinutes())}`;

// Short git commit for traceability (build envs may lack git — that's fine).
let sha = '';
try {
  sha = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
} catch {
  /* no git available — the timestamp alone is already unique */
}

const version = sha ? `${stamp}-${sha}` : stamp;
const root = path.resolve(__dirname, '..');

// 1) src/config/version.js — imported by App.js for the cache-bust check
fs.writeFileSync(
  path.join(root, 'src', 'config', 'version.js'),
  `/* AUTO-GENERATED on each build by scripts/set-version.js — do not edit by hand. */\nexport const APP_VERSION = "${version}";\n`
);

// 2) public/version.json — static file, fetchable at runtime
fs.writeFileSync(
  path.join(root, 'public', 'version.json'),
  JSON.stringify({ version }, null, 2) + '\n'
);

console.log(`[set-version] APP_VERSION = ${version}`);
