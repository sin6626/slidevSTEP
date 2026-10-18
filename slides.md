---
theme: default
layout: center
colorSchema: dark
transition: fade-out
title: STEP 模型及其在 Plate 测试实践中的应用
info: |
  软件测试课程报告。介绍 STEP 的三个阶段、八项活动及贯穿开发的过程，Plate 为辅助案例。
  团队计划采用固定资料快照；历史修复记录、现有测试源码与 2026-10-16 验证分别说明。
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
<div class="cover-words">software testing / STEP</div>
<h1 class="cover-title course-cover">STEP 模型<br>及其在 Plate 测试实践中的应用</h1>
<div class="cover-subtitle">三个阶段、八项活动，测试怎样贯穿开发</div>
<p class="cover-meta">sin6626 · 软件测试课程报告</p>
</div>

<!--
大家好，我选择的课程主题是 STEP 模型。今天主要回答两个问题，STEP 具体组织哪些测试活动，以及这些活动怎样贯穿软件开发。
我们先用一个退课需求的教学示例，看代码还没写时测试能做什么。接着介绍三个阶段和八项活动，再用我接触到的 Plate 计划和一个框选用例帮助理解。
Plate 是辅助案例，团队计划依据 2026-10-16 的固定资料快照，不代表团队正式采用了完整 STEP 模型。已有验证也只说明记录中的日期和范围。
-->

---
glow: right
glowOpacity: 0.25
glowHue: 105
glowSeed: 205
clicks: 2
---

# STEP 要解决什么问题？

<p class="lede">如果等功能写完才开始测试，需求里的遗漏可能已经进入代码。</p>

<p class="small muted">教学示例 · 假设退课截止时间为 18:00，以下规则尚待澄清。</p>

<div class="pair">
<div>
<h2>试着设计边界用例</h2>
<p>在 17:59、18:00、18:01 申请退课。</p>
<p class="accent">恰好 18:00，应该允许还是拒绝？</p>
</div>
<div v-click="1">
<h2>试着设计后续检查</h2>
<p>退课成功后，检查课程剩余名额。</p>
<p class="accent">名额会释放吗？何时释放？</p>
</div>
</div>

<div v-click="2" class="claim">预期结果写不出来，就先把需求问清楚。</div>
<div class="source">预防性测试思想 · <a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=34" target="_blank">Systematic Software Testing · pp.4–5</a> · 退课情境为教学示例</div>

<!--
假设我们拿到一条需求，学生可以在十八点以前退课。先不写功能，试着列出十七点五十九分、十八点整、十八点零一分申请退课的用例。十八点整算不算截止以前？如果需求没有说明，就不能擅自把允许或者拒绝写成正确答案。
再想退课成功以后怎么检查。课程名额会不会释放？如果释放，是立即释放还是稍后释放？这些也需要找需求负责人澄清。这里是教学示例，没有已经确认的业务规则。
测试用例需要操作和预期。设计时发现预期说不清楚，就暴露了需求中的歧义或遗漏。我们在编码以前就能把问题反馈给需求，这正是预防性测试的一个具体作用。
原始资料第四至五页用取款需求说明同样的思想，本页改用课堂容易理解的退课情境。
-->

---
glow: top-right
glowOpacity: 0.25
glowHue: 100
glowSeed: 306
clicks: 1
---

# 什么是 STEP 模型？

<p class="lede">Systematic Test and Evaluation Process</p>

<div class="definition">用系统的测试活动，<br>提前发现问题，并度量和改进软件质量。</div>

<p class="mt-7">它以预防性测试为导向，测试规划和设计可以提前介入开发。</p>

<div v-click="1" class="check-line mt-7">
<p><span class="accent">STEP</span> 组织测试的规划、资源准备、执行与评估。</p>
<p><span class="accent">TDD</span> 按“先写失败测试、实现通过、重构”的循环开发。</p>
</div>

<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=50" target="_blank">Systematic Software Testing · p.20</a> · <a href="https://martinfowler.com/bliki/TestDrivenDevelopment.html" target="_blank">Martin Fowler · TDD</a></div>

<!--
STEP 的全称是 Systematic Test and Evaluation Process。它是一套系统组织测试活动的方法，以预防性测试为导向。我们既要测量软件的实际表现，也要通过较早的规划和测试设计帮助改进质量。
所以测试融入开发，不只是编码时多运行几遍测试。需求刚出现时可以设计基于需求的测试，发现需求问题。软件设计和实现逐渐明确后，可以继续补充相应的测试资源。
这里顺便区分 TDD。TDD 先写一条测试，运行看到它因为功能尚未实现而失败，再实现让它通过，随后重构。STEP 讨论整体测试如何组织。两者可以结合，但提前设计用例并不自动等于采用 TDD。
原始资料第二十页强调，测试规划从需求阶段开始，测试设计与软件设计并行，编码前的测试设计能够发现需求问题。
-->

---
glow: bottom
glowOpacity: 0.3
glowHue: 95
glowSeed: 411
clicks: 2
---

# STEP 的三个阶段、八项活动

<p class="lede">这三个阶段组织测试工作，可在开发过程中反复开展。</p>

<div class="steps course-steps activity-steps">
<div>
<div class="step-no">01</div>
<h2>Planning</h2>
<div class="english">Plan Strategy · 测试规划</div>
<p><span class="accent">P1</span> 制定总体测试计划</p>
<p><span class="accent">P2</span> 制定详细测试计划</p>
</div>
<div v-click="1">
<div class="step-no">02</div>
<h2>Acquisition</h2>
<div class="english">Acquire Testware · 资源准备</div>
<p><span class="accent">A1</span> 列出测试目标</p>
<p><span class="accent">A2</span> 设计测试</p>
<p><span class="accent">A3</span> 实现计划与设计</p>
</div>
<div v-click="2">
<div class="step-no">03</div>
<h2>Measurement</h2>
<div class="english">Measure Behavior · 执行与评估</div>
<p><span class="accent">M1</span> 执行测试</p>
<p><span class="accent">M2</span> 检查测试集充分性</p>
<p><span class="accent">M3</span> 评价软件与测试过程</p>
</div>
</div>

<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing · p.14 · Table 1-3</a> · 中文为概括译述</div>

<!--
STEP 不只有三个阶段的名字。原始资料的表一杠三还给出了八项主要活动，我们后面就沿着这些活动讲。
为了课堂理解，阶段名沿用 Planning、Acquisition、Measurement，同时标出原始名称 Plan Strategy、Acquire Testware、Measure Behavior。
Planning 包括 P1 总体测试计划和 P2 详细测试计划。Acquisition 包括 A1 列出测试目标，A2 设计测试，以及 A3 实现这些计划和设计。Measurement 包括 M1 执行测试，M2 检查测试集充分性，M3 评价软件和测试过程。
这里的三个阶段是测试工作的组织方式，不是软件开发的三个生命周期阶段，也不是等开发结束以后才依次开始。不同测试层级可以分别开展这些活动，需求或实现变化时还需要更新。
-->

---
glow: right
glowOpacity: 0.22
glowHue: 85
glowSeed: 511
clicks: 1
---

# Planning · 先定总体，再定详细安排

<p class="lede">P1 统筹项目的测试，P2 细化各测试层级的执行安排。</p>

<div class="pair">
<div>
<h2><span class="accent">P1</span> 制定总体测试计划</h2>
<p>明确范围、风险优先级与总体策略。</p>
<p>统筹测试层级、资源、进度和职责。</p>
<p class="small muted mt-5">产物 · 总体测试计划</p>
</div>
<div v-click="1">
<h2><span class="accent">P2</span> 制定详细测试计划</h2>
<p>细化单元、集成、系统、验收等测试安排。</p>
<p>明确环境、人员、时间与进入和结束条件。</p>
<p class="small muted mt-5">产物 · 相应层级的详细测试计划</p>
</div>
</div>

<div class="claim">具体操作步骤和预期结果，留到 A2 设计测试。</div>
<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">P1 / P2 · Systematic Software Testing · p.14</a></div>

<!--
总体计划和详细计划解决的问题不同。P1 从整个项目考虑，哪些风险优先，安排哪些测试层级，总体采用什么策略，需要多少人员和时间。它给后续测试一个共同的方向。
P2 把总体安排细化到各测试层级。例如系统测试需要什么环境，由谁执行，在什么时间开展，满足什么条件可以进入或结束。单元、集成、验收也可以有各自的详细计划。
这里要区分详细测试计划和测试用例。计划回答怎样组织这一轮测试，某个用例的具体输入、操作和预期则属于后面的 A2 测试设计。计划可以引用用例，但两者不是同一个层次。
实际项目不一定把这些内容写成很多份大文档，但总体决策和具体安排都需要有人负责。
-->

---
glow: right
glowOpacity: 0.2
glowHue: 75
glowSeed: 612
clicks: 2
---

# 用 Plate 的安排理解 P1 与 P2

<p class="lede">富文本编辑器重构后，需要有组织地检查编辑功能。</p>

<div class="pair">
<div>
<h2><span class="accent">P1</span> 看整体范围与策略</h2>
<p>整理待测页面，区分已有功能与新功能。</p>
<p>确定对照来源与候选测试方法。</p>
</div>
<div v-click="1">
<h2><span class="accent">P2</span> 看具体执行安排</h2>
<p>细化页面、人员、浏览器和测试时长。</p>
<p>确认方法组、执行表和实际测试地址。</p>
</div>
</div>

<div v-click="2" class="claim">正式执行前，还需要批准分工并确认执行条件。</div>
<div class="source">课程分析 · 依据 PlateWorkResource 2026-10-16 快照 · 分工提案待批，浏览器、方法组和地址未定</div>

<!--
现在用 Plate 辅助理解。Plate 是富文本编辑器，重构涉及文字、媒体、表格和框选等交互。页面范围和对照来源帮助我们理解 P1 的总体范围与策略。
把工作进一步落实到每个人测哪些页面，用什么浏览器，采用哪个方法组，每页测多久，以及怎样记录，就体现了 P2 对具体安排的细化。这里按总体决策和具体安排进行课程分析，不声称团队文档就是正式的 STEP 总体计划或详细计划。
资料依据是 2026-10-16 的固定快照。在这个快照中，我的分工提案还等待 Ziad 批准，浏览器、方法组和实际预览地址也没有确定。我不根据这份快照猜测现在团队已经推进到哪一步。
有了文档只能说明计划留下了记录，不能等同于分工已经批准，更不能当作测试已经执行。
-->

---
glow: left
glowOpacity: 0.25
glowHue: 65
glowSeed: 713
clicks: 2
---

# Acquisition · 把目标变成可执行资源

<p class="lede">沿用音频控件内松手的框选用例，看 A1、A2、A3 的区别。</p>

<div class="steps course-steps activity-steps">
<div>
<div class="step-no">A1</div>
<h2>列出测试目标</h2>
<div class="english">要验证什么行为？</div>
<p>检查松手后框选结束，<br>不再随鼠标继续扩选。</p>
<p class="small muted">产物 · 测试目标清单</p>
</div>
<div v-click="1">
<div class="step-no">A2</div>
<h2>设计测试</h2>
<div class="english">怎样检查，预期是什么？</div>
<p>从空白拖到音频控件内松手，<br>再无按键移动鼠标。</p>
<p class="small muted">预期 · 选框消失，选择不变</p>
</div>
<div v-click="2">
<div class="step-no">A3</div>
<h2>实现计划与设计</h2>
<div class="english">把执行条件准备好</div>
<p>准备页面、数据和环境，<br>实现脚本与记录模板。</p>
<p class="small muted">产物 · 可用的测试资源</p>
</div>
</div>

<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=47" target="_blank">Testware · Systematic Software Testing · p.17</a> · 测试计划、用例、数据、脚本等测试工作产物</div>

<!--
A1、A2、A3 不是把准备工作换三个名字。A1 先列出要检查的行为，也就是测试目标。目标可以来自需求、设计和实现，本例的目标是鼠标松手后结束框选。
A2 再设计怎样验证。页面里有可见音频控件，从左侧空白拖进去松手，确认选框消失，然后不按任何键继续移动鼠标，检查已选中的块不变。这里包含前置条件、操作和预期。
A3 把计划和设计落实为能够使用的资源。准备页面、测试数据和环境，实现可重复运行的脚本，以及记录结果的模板。没有自动化的部分也需要可执行的人工操作说明。
原文 testware 指测试活动产生的文档或产品，比如计划、用例和脚本。资源准备不能只理解成安装工具。本例按已有浏览器测试整理，执行证据放在第十页。
-->

---
glow: top-right
glowOpacity: 0.25
glowHue: 55
glowSeed: 814
clicks: 2
---

# 测试怎样贯穿软件开发？

<p class="lede">开发产物逐渐明确，测试活动也随之展开。</p>

<table class="lifecycle-table">
<thead><tr><th>开发进程</th><th>开发在做什么</th><th>测试可以做什么</th></tr></thead>
<tbody>
<tr><td>需求形成</td><td>明确功能与业务规则</td><td><span class="accent">P1 / P2</span> 规划测试；<span class="accent">A1 / A2</span> 列目标、设计需求用例</td></tr>
<tr v-click="1"><td>软件设计</td><td>确定结构、接口与交互</td><td><span class="accent">A1 / A2</span> 补充设计相关测试，反馈遗漏与歧义</td></tr>
<tr v-click="1"><td>编码实现</td><td>实现和集成模块</td><td><span class="accent">A1 / A2 / A3</span> 补充代码相关测试、准备资源<br><span class="accent">M1</span> 检查可运行模块</td></tr>
<tr v-click="2"><td>版本可运行</td><td>交付版本，处理发现</td><td><span class="accent">M1 / M2 / M3</span> 执行、查充分性、评价并反馈</td></tr>
</tbody>
</table>

<p class="claim">活动可以重叠；需求变化时，计划和用例也要更新。</p>
<div class="source">课堂概括示意，非单向时间表 · <a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing · pp.14–16、20</a></div>

<!--
这张表要说明的是，测试可以随开发一起展开。需求一旦有了外部行为说明，就可以规划测试，列出目标并提前设计系统或验收层级的需求用例。设计用例时遇到说不清楚的预期，就反馈给需求人员。
设计阶段可以进一步设计与结构、接口和交互有关的测试。编码阶段继续补充与实现有关的目标和测试设计，并准备脚本、数据和环境。已有可运行模块时就能执行相应测试，这属于 M1。等版本能够运行，再开展对应的交互或系统测试，并检查充分性、评价软件和测试过程。
表格是为了课堂展示作出的概括，不意味着某类测试只能在某一行发生。不同模块、迭代和测试层级可以重叠开展，M1 也可以在完整版本交付前针对可运行模块进行。编码前设计真实 UI 的用例，与编码前已经能运行真实 UI 测试，是两回事。
原始资料第十四至十六页介绍活动的时间安排，第二十页强调从需求阶段规划，测试设计与软件设计并行。需求变化、设计调整或测试发现遗漏时，需要反馈更新计划和测试资源。
原第八页的工具说明保留在讲稿。Bun Test 用于 Plate 模型、插件等测试。Vitest 运行 Plite 的 React 测试，使用 jsdom。Playwright 驱动浏览器检查真实交互。工具承担不同层面的检查，工具名称本身不是 STEP 的阶段，也不能说明完整回归已经通过。Plate 的清单、指南和记录模板在 2026-10-16 快照中已经存在，正式环境和执行安排仍需确认。
-->

---
glow: right
glowOpacity: 0.22
glowHue: 45
glowSeed: 915
clicks: 2
---

# Measurement · 执行、查充分性、作评价

<p class="lede">用例通过以后，还要判断覆盖了什么、遗漏了什么。</p>

<div class="steps course-steps activity-steps">
<div>
<div class="step-no">M1</div>
<h2>执行测试</h2>
<div class="english">实际表现符合预期吗？</div>
<p>执行操作、对照预期，<br>记录结果与异常。</p>
</div>
<div v-click="1">
<div class="step-no">M2</div>
<h2>检查测试集充分性</h2>
<div class="english">测试目标覆盖得够吗？</div>
<p>对照目标清单，检查遗漏场景，<br>结合风险补充测试。</p>
</div>
<div v-click="2">
<div class="step-no">M3</div>
<h2>评价软件与测试过程</h2>
<div class="english">分别评价产品和测试工作</div>
<p>软件还有哪些质量风险？<br>测试方法与执行需怎样改进？</p>
</div>
</div>

<p class="claim">已通过的用例，只能支持它们所检查的行为。</p>
<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">M1 / M2 / M3 · Systematic Software Testing · p.14</a></div>

<!--
M1 是执行设计好的测试，对照预期，留下结果。失败时记录复现步骤、环境和录屏时间点，让别人能够继续调查。
M2 要看现有测试集是否充分。即使用例全部通过，也可能有需求目标没有对应测试，或者某些高风险边界没有覆盖。要逐项对照测试目标清单，检查每个目标是否有相应测试，再结合风险和覆盖准则检查遗漏场景，而不是只看通过率。发现遗漏就继续补充测试。
M3 有两个评价对象。对软件，要根据结果判断功能表现和剩余质量风险。对测试过程，要判断方法、资源与执行安排是否有效，哪里需要改进。产品表现正常和测试过程充分有效，不是同一个结论。
这三项活动还会相互影响。补充测试后需要再执行，评价发现资源或策略有问题，就反馈给 A 阶段或者 P 阶段。
-->

---
glow: bottom-right
glowOpacity: 0.25
glowHue: 30
glowSeed: 1016
clicks: 1
---

# 用 BlockSelection 理解模型中的活动

<p class="lede">音频控件内松手后，框选是否真正结束？</p>

<div class="evidence-pair block-case">
<div class="compact-lines">
<div class="check-line"><span class="accent small">P · 测试范围与安排</span><p>把松手结束框选列为检查内容。</p></div>
<div class="check-line"><span class="accent small">A1 / A2 / A3</span><p>明确目标，设计步骤，准备页面与脚本。</p></div>
<div v-click="1" class="check-line"><span class="accent small">M1 · 执行与结果</span><p>选框消失，继续移动后选择不变。</p></div>
</div>
<figure>
<a href="/evidence/blockselection-after-release.png" target="_blank"><img src="/evidence/blockselection-after-release.png" alt="2026-10-16 Plate 源码页面验证，音频控件内松开鼠标后的框选状态" /></a>
<figcaption>2026-10-16 验证 · Chromium · 1 个用例 × 5 次，无重试。<br>第 5 次截图，非历史修复前后对照。</figcaption>
</figure>
</div>

```ts
await page.mouse.up();
await expect(marquee).toHaveCount(0);
```

<div class="source">连续原文摘录 · <a href="/evidence/blockselection-audio.spec.txt" target="_blank">selection-edge-scroll.spec.ts · L508–509</a> · <a href="/evidence/blockselection-replay.log" target="_blank">2026-10-16 执行日志</a> · 单个用例不能证明 M2 的充分性</div>

<!--
BlockSelection 是编辑器里的块框选。历史修复记录描述，鼠标在音频控件内松开后，拖动选框仍然跟着鼠标移动。这里不展开修复实现，而是用模型理解已有实践。
P 阶段需要把这类交互放进范围并安排检查。A1 明确松手应结束框选的目标，A2 设计从空白拖入控件松手，再继续移动的步骤与预期，A3 准备页面和脚本。M1 执行脚本并核对结果。
下面两行来自现有 selection-edge-scroll.spec.ts 第 508 至 509 行。完整用例还在松手后移动鼠标，比较选择是否保持原样，并检查原生文本选择和运行时错误。代码存在和实际执行通过需要分别核对。
展示的是 2026-10-16 的限定验证，不是今天重新运行的结果。该次验证在源码服务上用 Chromium 将一个用例执行五次，无重试，五次均通过。右图是第五次截图，音频块仍保持选中，拖动选框消失。被测源码在该次运行前后指纹一致，服务就绪信息为 devSource=true、plite=true。证据日志仍保留原文，不修改执行日期。
2026-10-16 核验时没有找到历史修复记录引用的原始截图和日志，因此不拼接历史前后对照。这个用例的结果只支持所检查的行为，不能证明全部框选交互、全仓回归或跨浏览器充分性。也不声称历史修复时正式采用了完整 STEP 模型。
-->

---
glow: left
glowOpacity: 0.25
glowHue: 15
glowSeed: 1117
clicks: 2
---

# 测试结果怎样反馈到下一轮？

<p class="lede">Plate 的已知 Bug 植入方案，辅助理解 M2 与 M3。</p>

<div class="steps course-steps activity-steps">
<div>
<div class="step-no">M2</div>
<h2>检查充分性</h2>
<div class="english">还漏了哪些目标？</div>
<p>对照目标清单与风险，<br>检查遗漏并补充用例。</p>
</div>
<div v-click="1">
<div class="step-no">M3</div>
<h2>评价产品</h2>
<div class="english">软件实际表现如何？</div>
<p>在正常版本复查发现，<br>确认问题和剩余风险。</p>
</div>
<div v-click="2">
<div class="step-no">M3</div>
<h2>评价测试过程</h2>
<div class="english">测试方法是否有效？</div>
<p>同等时间对照密封答案，<br>比较已知问题检出情况。</p>
</div>
</div>

<p class="claim">把评估发现反馈给 P 的计划与 A 的测试资源。</p>
<div class="source">2026-10-16 方案快照 · 植入问题、六种候选方法与自由探索的比较尚待执行，没有优劣结论</div>

<!--
最后看评估怎样反馈到前面。对 M2，我们要对照目标和风险检查遗漏。植入的已知问题如果没有被发现，可以提示检查方法或检查内容可能有缺口，但这些问题并不能代表所有风险。
对 M3，要把产品和过程分开。正常版本里复查发现，可以帮助确认产品问题。独立会话准备带已知问题的预览并保存密封答案，测试者在相同时间内使用候选方法或自由探索，随后由独立评分者对照答案，这主要帮助评价测试方法的效果。
这一实验来自 2026-10-16 的计划快照，六种候选方法与自由探索的比较尚待执行，没有哪一种方法更好的结论。植入问题的检出比例也受问题样本、页面、人员和时间影响，不能直接推成全部真实 Bug 的检出率，更不能代替产品质量评价。
如果评估发现目标没有覆盖，就补充 A1 和 A2。如果环境或脚本不合适，就改进 A3。如果范围、时间或方法安排有问题，就更新 P1 或 P2。这说明 STEP 的活动会相互反馈，而不是执行一次就结束。
-->

---
layout: center
glow: bottom
glowOpacity: 0.35
glowHue: 0
glowSeed: 1218
clicks: 0
---

<div class="text-center">
<h1 class="cover-title">谢谢大家</h1>
</div>

<!--
谢谢大家。
-->
