import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { parseSync } from '@slidev/parser';

const markdown = readFileSync('slides.md', 'utf8');
const deck = parseSync(markdown, 'slides.md');
assert.equal(deck.slides.length, 12, '报告必须保持 12 页');
assert.ok(deck.slides.every(slide => slide.note?.trim()), '每页必须有讲稿');
const activityCodes = [...deck.slides[3].content.matchAll(/\b(?:P[12]|A[123]|M[123])\b/g)].map(match => match[0]);
assert.deepEqual(activityCodes, ['P1', 'P2', 'A1', 'A2', 'A3', 'M1', 'M2', 'M3'], '总览页必须完整列出 STEP 八项活动');
assert.ok(!/Details|列表样式/.test(markdown), '新版报告不能使用已排除的案例');
const closingText = deck.slides.at(-1).content.replace(/<[^>]*>/g, '').replace(/[#\s]/g, '');
assert.equal(closingText, '谢谢大家', '结束页只展示谢谢大家');
for (const [, path] of markdown.matchAll(/(?:href|src)="(\/evidence\/[^"#]+)"/g)) {
  assert.ok(existsSync(`public${path}`), `缺少证据文件 ${path}`);
}
const manifest = JSON.parse(readFileSync('public/evidence/manifest.json', 'utf8'));
for (const file of manifest.files) {
  const digest = createHash('sha256').update(readFileSync(`public/evidence/${file.file}`)).digest('hex');
  assert.equal(digest, file.sha256, `原始证据被修改 ${file.file}`);
}
console.log(`通过：12 页、12 份讲稿、STEP 八项活动、${manifest.files.length} 份证据指纹及本地引用。`);
