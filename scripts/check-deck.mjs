import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { parseSync } from '@slidev/parser';

const markdown = readFileSync('slides.md', 'utf8');
const deck = parseSync(markdown, 'slides.md');
assert.equal(deck.slides.length, 18, '报告必须保持批准的 18 页结构');
assert.ok(deck.slides.every(slide => slide.note?.trim()), '每页必须有讲稿');
const premises = [...deck.slides[3].content.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)]
  .map(match => match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
assert.equal(premises.length, 7, '基本前提必须完整保留来源中的七项');
const premiseConcepts = [
  /基于需求.*测试策略/,
  /测试.*生命周期.*开始/,
  /测试.*需求.*使用模型/,
  /测试工作产物.*设计.*引导.*软件设计/,
  /更早.*发现.*预防.*缺陷/,
  /系统.*分析缺陷/,
  /测试人员.*开发人员.*协作/,
];
premiseConcepts.forEach((concept, index) => assert.match(premises[index], concept, `第 ${index + 1} 项基本前提必须忠实于来源`));
assert.match(deck.slides[3].content, /ISTQB.*2012/, '基本前提必须注明来源版本');
assert.match(deck.slides[3].content, /CTAL_TM_2012_Syllabus_v2\.0\.pdf#page=63/, '七项基本前提必须定位到原文第 63 页');
const flowchart = deck.slides[4].content.match(/```mermaid[^\n]*\n([\s\S]*?)```/)?.[1];
assert.ok(flowchart, '总览页必须有可编辑的 Mermaid 流程图');
const activityCodes = [...new Set([...flowchart.matchAll(/\b(?:P[12]|A[123]|M[123])\b/g)].map(match => match[0]))];
assert.deepEqual(activityCodes, ['P1', 'P2', 'A1', 'A2', 'A3', 'M1', 'M2', 'M3'], '流程图必须完整列出 STEP 八项活动');
assert.match(flowchart, /-->/, '流程图必须连接测试阶段');
assert.match(flowchart, /-\./, '流程图必须保留评估反馈路径');
for (const phase of ['Plan the Strategy', 'Acquire the Testware', 'Measure the Behavior']) {
  assert.ok(flowchart.includes(phase), `阶段名称必须使用原书标题 ${phase}`);
}
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
console.log(`通过：18 页、18 份讲稿、七项基本前提及出处、原书三阶段与八项活动、${manifest.files.length} 份证据指纹及本地引用。`);
