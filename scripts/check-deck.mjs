import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { parseSync } from '@slidev/parser';

const markdown = readFileSync('slides.md', 'utf8');
const deck = parseSync(markdown, 'slides.md');
assert.equal(deck.slides.length, 12, '报告必须保持 12 页');
assert.ok(deck.slides.every(slide => slide.note?.trim()), '每页必须有讲稿');
for (const [, path] of markdown.matchAll(/(?:href|src)="(\/evidence\/[^"#]+)"/g)) {
  assert.ok(existsSync(`public${path}`), `缺少证据文件 ${path}`);
}
const manifest = JSON.parse(readFileSync('public/evidence/manifest.json', 'utf8'));
for (const file of manifest.files) {
  const digest = createHash('sha256').update(readFileSync(`public/evidence/${file.file}`)).digest('hex');
  assert.equal(digest, file.sha256, `原始证据被修改 ${file.file}`);
}
console.log(`通过：12 页、12 份讲稿、${manifest.files.length} 份证据指纹及本地引用。`);
