/*
 * Converts raster images under public/images to resized WebP.
 *
 *   node scripts/optimize-images.js            # convert + delete originals
 *   node scripts/optimize-images.js --keep     # keep the original png/jpg too
 *   node scripts/optimize-images.js --max-width 1920 --quality 82
 *
 * Scope: only assets nested at least one section deep (e.g.
 * images/home/hero/intro.png). Top-level folders like images/brand are left
 * alone because index.html / manifest.json reference the PNG logo directly.
 *
 * After running, update any code references from the old extension to `.webp`.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const args = process.argv.slice(2);
const getFlag = (name, def) => {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const KEEP = args.includes('--keep');
const MAX_WIDTH = parseInt(getFlag('--max-width', '1600'), 10);
const QUALITY = parseInt(getFlag('--quality', '78'), 10);

const IMG_ROOT = path.join(__dirname, '..', 'public', 'images');
const EXTS = ['.png', '.jpg', '.jpeg'];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    fs.statSync(p).isDirectory() ? walk(p, acc) : acc.push(p);
  }
  return acc;
}

(async () => {
  if (!fs.existsSync(IMG_ROOT)) {
    console.error('No public/images folder found.');
    process.exit(1);
  }
  const files = walk(IMG_ROOT);
  let before = 0, after = 0, count = 0;

  for (const file of files) {
    const rel = path.relative(IMG_ROOT, file).split(path.sep).join('/');
    const ext = path.extname(rel).toLowerCase();
    if (rel.split('/').length < 3) continue;      // skip top-level (brand/, etc.)
    if (!EXTS.includes(ext)) continue;            // skip webp/svg/ico

    const out = file.slice(0, -ext.length) + '.webp';
    const srcSize = fs.statSync(file).size;
    const buf = await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();
    fs.writeFileSync(out, buf);
    if (!KEEP) fs.unlinkSync(file);

    before += srcSize; after += buf.length; count += 1;
    console.log(`${(srcSize / 1024).toFixed(0).padStart(6)}KB -> ${(buf.length / 1024).toFixed(0).padStart(5)}KB  ${rel}`);
  }

  if (!count) { console.log('Nothing to convert — all images are already WebP.'); return; }
  console.log(`\n${count} image(s) converted  (${KEEP ? 'originals kept' : 'originals removed'})`);
  console.log(`payload: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB  (${(100 * (1 - after / before)).toFixed(0)}% smaller)`);
  console.log('\nRemember to update code references to the .webp extension.');
})().catch((e) => { console.error(e); process.exit(1); });
