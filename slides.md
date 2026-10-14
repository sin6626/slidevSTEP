---
theme: default
layout: center
colorSchema: dark
transition: fade-out
title: 光标消失之后 · 用 STEP 复盘 Plate Details 修复
info: |
  软件测试课程技术分享。主案例为 Plate Details 真实修复，补充案例为列表样式诊断。
  以核对后的历史证据复盘，不宣称团队当时正式采用完整 STEP。
fonts:
  provider: none
  sans: 'Nunito Variable'
  mono: 'SFMono-Regular'
canvasWidth: 980
aspectRatio: 16/9
lineNumbers: false
drawings:
  persist: false
mdc: false
duration: 12min
clicks: 0
glow: bottom
glowOpacity: 0.4
glowHue: 105
glowSeed: 233
defaults:
  layout: default
---

<div class="text-center">
<div class="cover-words">selection / caret / input</div>
<h1 class="cover-title">光标消失之后</h1>
<div class="cover-subtitle">用 STEP 复盘一次 Plate Details 修复</div>
<p class="cover-meta">sin6626 · 软件测试课程技术分享</p>
</div>

<!--
今天用我参与的 Plate Details 修复讲测试。Details 是富文本编辑器里的折叠块，用户点击标题可以隐藏正文。问题并不只是一条光标画错了：选区留在隐藏正文时，接着输入会修改看不到的内容。
这次分享沿着复现、选区机制、测试资产、根因修复和验证范围展开，再用 STEP 的三个阶段整理整个过程。它是事后对照分析，不声称团队当时正式按完整 STEP 执行。
资料已核对原图、JSON、测试日志和源码指纹。本轮制作没有重新执行 Plate 测试。
视觉模板源自 luoling8192/talks 的 packages/2026-vueconf-agent-vue-way，版本 9282cede8f16cc0dd82e21f94b2bc7736a643a3d；复用 glow 背景、字体、留白和原生点击转场。讲者身份仅为 sin6626，不借原模板演讲者身份。
-->

---
glow: right
glowOpacity: 0.25
glowHue: 105
glowSeed: 205
clicks: 1
---

# 折叠的正文，收到了 XYZ

<p class="lede">Playground · 标题末尾按 ArrowRight，随后继续输入</p>

<div class="evidence-pair">
<div>

```text
End → ArrowRight → XYZ → 展开

标题末尾
  path: [29, 0, 0]
  offset: 25

ArrowRight 后
  path: [29, 1, 0]
  offset: 0
```

<p class="small muted">正文折叠时，模型选区已经进入正文。</p>
</div>
<figure>
<a href="/evidence/details-hidden-input.png" target="_blank"><img src="/evidence/details-hidden-input.png" alt="历史 ArrowRight 场景，展开 Details 后隐藏正文出现 XYZKeep 前缀" /></a>
<figcaption>输入后展开的原图。正文出现 <code>XYZKeep…</code></figcaption>
</figure>
</div>

<div v-click="1" class="claim">看不到光标时，输入仍然修改了文档。</div>
<div class="source"><a href="/evidence/details-hidden-input.json" target="_blank">原始选区记录</a> · 本图为方向键场景</div>

<!--
这一页展示真实故障，不是首次鼠标折叠的前后对比。playground-right-r0.json 的步骤为 End、ArrowRight、typed XYZ、reopened after typing。End 后 model focus 在 [29,0,0] offset 25，ArrowRight 后进入 [29,1,0] offset 0；键入 XYZ 后，展开正文的截图出现 XYZKeep 前缀。
先给出操作和路径，再点击揭示影响：光标不可见仍然能修改隐藏正文。因此验收不能只看折叠按钮状态，也不能只检查最终标题还在。
/evidence/details-hidden-input.png 和 JSON 是原件的字节一致副本。此复现与后面 body click 的首次折叠用例不同，后者针对另一条选区交接路径。
-->

---
glow: top-right
glowOpacity: 0.25
glowHue: 100
glowSeed: 306
clicks: 2
---

# 一次折叠，涉及两套选区

<p class="lede">文档节点仍在模型里，正文的编辑 DOM 却已卸载。</p>

<div class="pair">
<div>

```text
Details                     模型示意
├─ summary                  标题
│  └─ text                  可见输入目标
└─ paragraph                正文
   └─ text                  折叠后仍保留
```

<p class="small muted">结构示意，非原始 JSON 的替代输出。</p>
</div>
<div>
<div class="check-line">
<div class="selection-label">editor model selection</div>
<p>记录文档里的 path 与 offset，决定编辑目标。</p>
</div>
<div v-click="1" class="check-line">
<div class="selection-label">browser DOM selection</div>
<p>记录浏览器中的锚点与焦点，影响可见光标。</p>
</div>
</div>
</div>

<div v-click="2" class="claim">核对 model、DOM、focus、可见 caret，再输入。</div>

<!--
先区分两个对象。模型选区按节点路径与偏移定位内容；浏览器 DOM 选区定位实际渲染的文字。正文折叠时，正文数据不会被删除，但编辑 DOM 不再提供可见输入位置。
这里的树是教学结构示意，不是伪造真实 JSON。实际案例由 JSON 中的 model、dom、focused 以及 caret rectangle 共同支持，相关记录为 /evidence/details-outer-caret.json 与 /evidence/details-inner-caret.json。
点击一介绍浏览器选区，点击二说明验收组合。模型选区看似正确，仍可能没有成功导出到浏览器；有截图也不自动证明后续键入去了正确位置，所以要继续输入 XYZ 并验证结果。
-->

---
glow: bottom
glowOpacity: 0.3
glowHue: 95
glowSeed: 411
clicks: 2
---

# STEP 组织这次修复的三个阶段

<p class="lede">Systematic Test and Evaluation Process</p>

<div class="steps">
<div>
<div class="step-no">01</div>
<h2>规划策略</h2>
<div class="english">Plan Strategy</div>
<p>先定义折叠后输入目标，<br>以及允许删除的内容。</p>
</div>
<div v-click="1">
<div class="step-no">02</div>
<h2>准备测试资产</h2>
<div class="english">Acquire Testware</div>
<p>把真实点击路径、嵌套结构<br>和预期结果写成用例。</p>
</div>
<div v-click="2">
<div class="step-no">03</div>
<h2>度量行为</h2>
<div class="english">Measure Behavior</div>
<p>比较预期与实际，定位根因，<br>留下有范围的通过证据。</p>
</div>
</div>

<div class="source mt-8"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing · p.14</a> · 以下为实际修复的事后对照</div>

<!--
STEP 全称 Systematic Test and Evaluation Process。原始资料 Systematic Software Testing 第 14 页列出 Plan Strategy、Acquire Testware、Measure Behavior 三个阶段。它用于组织测试工作，测试策略和测试资产可以提前准备，不必等代码结束才开始。
点击一把行为边界变成测试资产，点击二进入预期与实际比较。三个阶段与实际修复的对应是报告整理的教学表达，不把事后复盘包装成团队当时完整执行了 STEP。
来源为 Systematic Software Testing 预览 PDF 第 44 页，对应书中第 14 页，以及 ISTQB 2012 CTAL Test Manager 大纲第 5.7 节。后者说明 STEP 的生命周期和预防思想，链接在最后一页。
-->

---
glow: right
glowOpacity: 0.22
glowHue: 85
glowSeed: 511
clicks: 2
---

# 先写清楚三条行为边界

<p class="lede">阶段 1 · 根据真实修复记录整理验收约束</p>

<div class="matrix">
<div class="matrix-row matrix-head"><span>触发操作</span><span>必须发生</span><span>必须保护</span></div>
<div class="matrix-row"><span>点击正文，再折叠</span><span class="accent">选区回到该标题末尾</span><span>后续输入在可见标题</span></div>
<div v-click="1" class="matrix-row"><span>折叠后 Enter → Backspace</span><span class="accent">删除新建的真空段落</span><span>atoms 与非文本内容</span></div>
<div v-click="2" class="matrix-row"><span>内层标题开头 Backspace</span><span class="accent">只 unwrap 指定内层</span><span>外层容器与后代内容</span></div>
</div>

<div class="sequence mt-8"><code>操作</code><span>→</span><code>目标节点</code><span>→</span><code>预期结果</code><span>→</span><code>保护对象</code></div>
<div class="source"><a href="/evidence/details-plan.md" target="_blank">修复 plan · 行为与此前验证缺口</a></div>

<!--
这三条边界来自实际计划和测试，不是风险卡片口号。第一条要求首次 body click 后折叠，选区必须回到当前标题末尾。第二条要求新建空段落真正被删除，同时保留含 atoms 或其他内容的节点。第三条要求定位内层，不能因重新查询祖先误把外层解包。
报告将它们整理为验收约束：每一条都写明触发操作、必须发生的变化以及必须保护的对象。正式需求设计时也可以用这种方式提前消除歧义。
依据 /evidence/details-plan.md 的 Brief、Failed-fix diagnosis 和 Ownership decisions；结构测试保存为 /evidence/details-structure.log。没有把补充约束写成已经执行过的新测试。
-->

---
glow: right
glowOpacity: 0.2
glowHue: 75
glowSeed: 612
clicks: 2
---

# 从真实点击写出 first collapse 用例

<p class="lede">阶段 2 · 起点必须是正文里的一次真实鼠标点击</p>

<div class="code-pair">
<div>
<div class="check-line"><span class="accent">准备</span><p>展开 Details，取得正文与按钮坐标。</p></div>
<div class="check-line"><span class="accent">操作</span><p>点击正文，再点击 Collapse。</p></div>
<div class="check-line"><span class="accent">预期与跟进</span><p>model / DOM 到标题末尾；输入 XYZ 可见，随后撤销。</p></div>
</div>
<div>

```ts {all|1-5|6-12}
expect(await read(root)).toMatchObject({
  model: caret(outerPath, title.length),
  dom: caret(outerPath, title.length),
  focused: true,
});
await page.screenshot({
  path: info.outputPath(`collapse-${cycle}.png`),
});
await page.keyboard.type('XYZ', { delay: 50 });
await expect(
  page.getByText(`${title}XYZ`, { exact: true })
).toBeVisible();
```

<p class="source">真实脚本摘录 · <a href="/evidence/details-disclosure.spec.txt" target="_blank">details-disclosure.spec.ts</a></p>
</div>
</div>

<p class="small muted mt-5">建议补充：单独断言隐藏正文全文不变，原脚本未覆盖该断言。</p>

<!--
本用例从真实鼠标输入建立起点。原脚本先展开，取得正文与折叠按钮坐标，以 page.mouse.click 点击正文，再点折叠按钮。first collapse 分支没有 End，也没有先导入 DOM 选区来修正状态；collapse after import 是独立控制用例。
右侧是 /evidence/details-disclosure.spec.txt 第 90 行附近的连续原文摘录。点击一强调 model、dom 和 focused 的同步断言；点击二强调继续输入 XYZ 并检查可见标题。后续脚本还 poll model 与 dom 的偏移增加 3，并执行 ControlOrMeta+z；完整流程每个用例循环三次。
为了让用例完整，报告建议再独立断言隐藏正文全文不变。原脚本没有该断言，不应宣称已经覆盖。截图动作也不直接证明可见 caret，因此另有 visual 检查及 JSON 中的 caret rectangle。
-->

---
glow: left
glowOpacity: 0.25
glowHue: 65
glowSeed: 713
clicks: 1
---

# 模型测试通过，浏览器仍需单独验证

<p class="lede">阶段 2 · 两层证据回答不同问题</p>

<div class="pair">
<div>
<h2>结构与选区契约</h2>
<p><span class="accent">32</span> 项 Details 测试，检查结构编辑。</p>
<p><span class="accent">91</span> 项选区契约，检查交接与导出规则。</p>
<div class="check-line mt-5">
<div class="selection-label">2 routes × 5 actions × 5 rounds</div>
<p>10 个浏览器用例，执行 50 次。</p>
</div>
</div>
<div>
<h2>原生浏览器操作</h2>
<figure>
<a href="/evidence/details-outer-caret.png" target="_blank"><img src="/evidence/details-outer-caret.png" alt="历史修复后 Playground 外层 Details 折叠，标题末尾显示光标" /></a>
<figcaption>外层折叠原图；JSON 同时记录 model、DOM、focus 和 caret。</figcaption>
</figure>
</div>
</div>

<div v-click="1" class="claim">先 End 或先 import，不能代替首次 body click。</div>
<div class="source"><a href="/evidence/details-repeat.log" target="_blank">浏览器重复执行日志</a> · <a href="/evidence/details-outer-caret.json" target="_blank">外层光标记录</a></div>

<!--
模型测试让节点变换和选区规则可重复验证，但不能替浏览器完成真实鼠标操作、DOM 选区同步和光标渲染。32 项只属于 Details 分区；91 项属于 runtime、controller、reconciler 等选区契约，并不是 91 个 Details 用例。
浏览器用例分别在 details-demo 与 playground 两个路由执行五类动作：first collapse、collapse after import、remove empty paragraph、unwrap inner、forward delete。两路各五个，共 10 个不同用例，重复五轮产生 50 次执行。不是 50 个独立用例。
原计划指出此前证据使用 End 并建立了稳定模型选区，绕过了真正的第一次点击交接。专门保留 first collapse 与 after import 控制，才能揭露被准备步骤掩盖的问题。
原图 /evidence/details-outer-caret.png 只用于外层折叠结果；配套 JSON 的 model 与 dom 一致，focused 为 true，caret 矩形高为 18。它不能与第二页方向键图拼成同场景修复前后。
-->

---
glow: top-right
glowOpacity: 0.25
glowHue: 55
glowSeed: 814
clicks: 2
---

# 首次折叠，修在选区交接处

<p class="lede">阶段 3 · 共享 selection-controller 清除过时的事件来源</p>

<div class="code-pair" style="grid-template-columns: 1.6fr 1fr">
<div>

```ts {all|2-4|6}
if (
  preferModelSelection &&
  nextSelectionSource === 'app-owned' &&
  inputController.state.selectionChangeOrigin === 'native-user'
) {
  inputController.state.selectionChangeOrigin = null;
}
```

<p class="source">真实实现 · <a href="/evidence/details-selection-controller.txt" target="_blank">selection-controller.ts · L619–625</a></p>
<p class="log">handoff-red: expected true / received false</p>
</div>
<figure>
<a href="/evidence/details-inner-caret.png" target="_blank"><img src="/evidence/details-inner-caret.png" alt="历史修复后 Playground 内层 Details 折叠，光标位于内层标题末尾" /></a>
<figcaption>独立的内层折叠场景，光标位于当前标题末尾。</figcaption>
</figure>
</div>

<p class="small mt-7">控件接管后允许模型选区导出；普通浏览器来源的保护仍保留。</p>
<div class="source"><a href="/evidence/details-handoff-before.log" target="_blank">修复前契约失败</a> · <a href="/evidence/details-plan.md" target="_blank">修复决策</a></div>

<!--
修复根因是共享选区所有权交接。用户点击正文建立 native-user 事件来源，控件随后接管为 app-owned，但旧来源仍然阻挡模型选区导出。handoff-red.log 里控制器交接契约 expected true、received false，说明导出判定失败。
七行代码是保存的 selection-controller.ts 第 619–625 行原文，SHA-256 已与 final-source.json 核对。点击一强调三个同时满足的条件，点击二强调只清除过时的来源标记。这保留了普通浏览器来源的保护，没有全局放开模型选区导出，也没有加 Details 专用计时器。
截图为另一个真实修复后场景：Playground 的内层 Details 折叠。它并不与第二页 ArrowRight 故障图构成同路径前后对照。/evidence/details-inner-caret.json 记录内层标题位置 model、dom 一致以及实际焦点和可见 caret。
-->

---
glow: right
glowOpacity: 0.22
glowHue: 45
glowSeed: 915
clicks: 1
---

# 空字符串不等于空节点

<p class="lede">阶段 3 · 删除与 unwrap 都要操作准确的结构对象</p>

<div class="pair">
<div>
<h2>只删除真空 paragraph</h2>

```ts
if (
  ElementApi.isElementType(
    block[0],
    editor.plugin(BaseParagraphPlugin).schema.type
  ) &&
  state.nodes.isEmpty(block[0])
) {
  tx.nodes.remove({ at: block[1] });
}
```

<p class="small muted">用节点语义判断，保留 atoms 与非文本内容。</p>
</div>
<div>
<h2>对已识别的 path 做 unwrap</h2>

```ts
tx.nodes.unwrap({ at: path });
```

<pre class="tree mt-6">outer Details       结构示意
├─ outer summary
└─ inner Details    ← 移除这个容器
   ├─ inner summary → paragraph
   └─ body          → 保留内容</pre>
</div>
</div>

<p v-click="1" class="small accent mt-5">保留外层，移除指定内层；不再查询祖先来重新选择目标。</p>
<div class="source"><a href="/evidence/details-plugin.txt" target="_blank">BaseDetailsPlugin.ts · 实际源码</a> · <a href="/evidence/details-structure.log" target="_blank">32 项结构测试</a></div>

<!--
这里还有两条结构修复。文本串为空不代表节点没有内容，非文本 atoms 可能没有普通字符串，却必须保留。实际代码同时要求 paragraph 类型与 state.nodes.isEmpty(block[0])，符合条件才删除。
unwrap 先把目标容器里的 summary 转为 paragraph，再对已经识别的 path 执行 unwrap。实际实现对目标条目按反向文档顺序处理，避免变换影响后续路径。此页摘录真实的最终代码，没有捏造一个不存在的 before 版本。
右侧树是目标行为的结构示意，表达只移除 inner 容器而保留 outer 和后代。内层标题转成 paragraph，内容留在外层里。它不是从 JSON 伪造的产品输出。
源码对应 packages/platejs/src/features/details/lib/BaseDetailsPlugin.ts，SHA-256 为 bf5fb8ba49a6b42f19e7b60e3b242d1626a8bf3b73d5e713575d6a4a5126646c。实际代码与结构测试见证据副本及 /evidence/details-source.json。
-->

---
glow: bottom-right
glowOpacity: 0.25
glowHue: 30
glowSeed: 1016
clicks: 1
---

# 这些通过，分别证明了什么

<p class="lede">阶段 3 · 历史结果要连同范围一起报告</p>

<div class="matrix result-matrix">
<div class="matrix-row matrix-head"><span>结果</span><span>证据分区</span><span>能够支持的结论</span></div>
<div class="matrix-row"><span class="result-no">32</span><a href="/evidence/details-structure.log" target="_blank">Details 结构</a><span>结构编辑规则通过该分区检查</span></div>
<div class="matrix-row"><span class="result-no">91</span><a href="/evidence/details-selection.log" target="_blank">选区契约</a><span>交接、导出与协调规则通过</span></div>
<div class="matrix-row"><span class="result-no">50</span><a href="/evidence/details-repeat.log" target="_blank">浏览器执行</a><span>10 个用例，重复 5 轮，无重试</span></div>
<div class="matrix-row"><span class="result-no">20</span><a href="/evidence/details-regression.log" target="_blank">相关回归</a><span>光标、剪贴板、浮动工具栏等通过</span></div>
</div>

<p v-click="1" class="small warn mt-6">此前的 End 准备步骤绕过首次点击，旧 unwrap 验证缺少嵌套标题。</p>
<div class="source">历史 Chromium · details-demo / playground · <a href="/evidence/details-source.json" target="_blank">6 个被测文件的指纹</a> · 本轮未重跑 Plate</div>

<!--
结果不可求和成某个测试覆盖率。这四组记录的对象与计数单位不同：32 和 91 是结构与契约测试；50 是十个浏览器用例重复五轮的执行次数；20 是相关回归分区。日志并不证明全部仓库 CI，也不证明所有浏览器。
五轮执行没有重试。范围是 Chromium 和 details-demo、playground 两个路由。被测版本包含未提交修改，因此基础 HEAD a924f121440c5d87baaa4236d5747d45d59661fb 不能独自标识被测源码，必须配合六个文件的 SHA-256。
点击补充具体教训：之前以 End 建立选区跳过第一次 mouse body click，Backspace 断言只保留全文而没确认新空段落消失，unwrap 证据没有嵌套标题。测试可以通过，同时没有覆盖真正被报告的操作。
本轮制作只读取并核对历史截图与日志，没有重新运行 Plate 测试。它们证明当时指定源码与分区的结果，不能当成当前分支状态。
-->

---
glow: right
glowOpacity: 0.28
glowHue: 15
glowSeed: 1117
clicks: 1
---

# circle 写进模型，marker 仍是 disc

<p class="lede">补充案例 · 列表状态已变化，浏览器样式没有跟上</p>

<div class="evidence-pair">
<div>

```json
{"selected":"Circle",
 "value":{"listStyle":"circle"},
 "rendered":{"marker":"disc"}}

{"selected":"Square",
 "value":{"listStyle":"square"},
 "rendered":{"marker":"disc"}}
```

<p class="small muted">原始日志字段摘录，省略其他 value 字段与 HTML。</p>
</div>
<figure>
<a href="/evidence/list-circle.png" target="_blank"><img src="/evidence/list-circle.png" alt="Circle 诊断原图，Disc 1 仍显示实心列表圆点" /></a>
<figcaption>Circle 原图：列表标记仍是实心圆点。</figcaption>
</figure>
</div>

<p v-click="1" class="claim">1 passed 只证明诊断完成，没有样式正确断言。</p>
<div class="source"><a href="/evidence/list-diagnosis.log" target="_blank">原始 replay 日志</a> · <a href="/evidence/list-diagnosis.spec.txt" target="_blank">诊断脚本</a></div>

<!--
列表补充案例把同一个证据问题呈现得更直接。选择 Circle 或 Square 后，模型 value.listStyle 分别变化为 circle、square，但日志记录的 rendered.marker 仍然是 disc。脚本读的是浏览器计算样式 listStyleType。
左边保留真实日志的 selected、value.listStyle 与 rendered.marker，省略 value 中其他字段和 HTML 长串，不能误认为完整日志输出。原始日志与脚本通过链接完整保留；原图是 Circle.png 的字节一致副本，未制作假 UI。
replay.spec.ts 的断言只检查运行时错误列表为空，它记录模型与 marker 并拍图，没有断言 marker 必须为 circle 或 square。所以 1 passed 表示诊断执行完成，不能说列表问题已修复，也没有修复后材料。
这个例子提醒测试预期必须包含用户看到的结果。状态写入正确还不足以支持 UI 功能完成。
-->

---
glow: bottom
glowOpacity: 0.35
glowHue: 0
glowSeed: 1218
clicks: 2
---

# 把本次缺陷变成下一次的测试约束

<div class="matrix mt-8">
<div class="matrix-row"><span class="accent">规划策略</span><span>把折叠后的输入目标写进需求</span><code>当前 summary 的末尾</code></div>
<div v-click="1" class="matrix-row"><span class="accent">准备测试资产</span><span>保留真实起点与关键结构</span><code>body click / nested / atoms</code></div>
<div v-click="2" class="matrix-row"><span class="accent">度量行为</span><span>比较选区，再继续键入并保留证据</span><code>model + DOM + caret + XYZ</code></div>
</div>

<p class="claim mt-8">下次修改折叠块时，从第一次点击开始验证输入目标。</p>
<div class="source mt-7">本轮未重跑 Plate。理论与案例对应为事后复盘。<br><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing · p.14</a> · <a href="https://istqb.org/wp-content/uploads/2024/11/CTAL_TM_2012_Syllabus_v2.0.pdf#page=62" target="_blank">ISTQB 2012 · §5.7</a></div>

<!--
结束时给具体行动规则。需求里明确折叠后的输入落点，让实现和测试共享同一个判定。用例保留真实 body click 起点、内层嵌套以及含 atoms 的内容，避免准备步骤掩盖故障。度量时把模型选区、浏览器选区、焦点、可见光标与后续输入一起比较，再保存日志和源码指纹。
STEP 三阶段组织的是这些可执行活动，不只是给调试流程换三个标题。列表案例进一步说明，诊断脚本通过和产品行为正确要用各自的断言证明。
本轮未重新执行 Plate。所用截图和日志都来自核对过的历史记录，结果只支持记录中的源码范围与 Chromium 场景，不能外推为当前分支、全仓库 CI 或全部浏览器均已通过。
理论来源为 Systematic Software Testing 第 14 页三阶段结构，以及 ISTQB 2012 CTAL Test Manager 大纲第 5.7 节的 STEP 生命周期和预防思想。
模板署名：视觉样式复用 https://github.com/luoling8192/talks 中 2026-vueconf-agent-vue-way，版本 9282cede8f16cc0dd82e21f94b2bc7736a643a3d。背景原注释标明 glow 设计归功于 @pi0 与 @Atinux。
-->
