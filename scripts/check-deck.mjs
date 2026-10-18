import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { parseSync } from '@slidev/parser';

const markdown = readFileSync('slides.md', 'utf8');
const deck = parseSync(markdown, 'slides.md');
assert.equal(deck.slides.length, 18, '报告必须保持批准的 18 页结构');
assert.ok(deck.slides.every(slide => slide.note?.trim()), '每页必须有讲稿');
const flowchart = deck.slides[4].content.match(/```mermaid[^\n]*\n([\s\S]*?)```/)?.[1];
assert.ok(flowchart, '总览页必须有可编辑的 Mermaid 流程图');
const activityCodes = [...new Set([...flowchart.matchAll(/\b(?:P[12]|A[123]|M[123])\b/g)].map(match => match[0]))];
assert.deepEqual(activityCodes, ['P1', 'P2', 'A1', 'A2', 'A3', 'M1', 'M2', 'M3'], '流程图必须完整列出 STEP 八项活动');
assert.match(flowchart, /-->/, '流程图必须连接测试阶段');
assert.match(flowchart, /-\./, '流程图必须保留评估反馈路径');
assert.ok(!/Details|列表样式/.test(markdown), '新版报告不能使用已排除的案例');
assert.ok(!/blockselection-after-release\.png/.test(markdown), '项目级案例不能沿用旧版的单个缺陷截图');
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
console.log(`通过：18 页、18 份讲稿、STEP 流程图与八项活动、${manifest.files.length} 份证据指纹及本地引用。`);
