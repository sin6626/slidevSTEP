---
theme: default
layout: center
colorSchema: dark
transition: fade-out
title: STEP 模型及其在 Plate 测试实践中的应用
info: |
  软件测试课程报告。介绍 STEP 的三个阶段，结合 Plate 测试计划和 BlockSelection 实例说明。
  团队计划采用固定资料快照；历史修复记录、现有测试源码与本轮验证分别说明。
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
<div class="cover-subtitle">从三个阶段理解一次真实项目的测试工作</div>
<p class="cover-meta">sin6626 · 软件测试课程报告</p>
</div>

<!--
大家好，我选择的课程主题是 STEP 模型。最近我参与的 Plate 正在重构，也在准备一轮比较完整的测试，所以我想借这个机会，把课程里的模型和自己接触的实际工作联系起来。
今天先介绍 STEP 是什么，再讲它的三个阶段，最后结合 Plate 的测试安排和一个框选问题，看看这些概念怎样落到具体工作上。
这里是用 STEP 理解实际工作，不声称 Plate 团队正式采用了完整 STEP 模型。团队计划依据 2026-10-16 整理的固定资料快照，计划和执行结果分开说明。
-->

---
glow: right
glowOpacity: 0.25
glowHue: 105
glowSeed: 205
clicks: 2
---

# 为什么选择 STEP？

<p class="lede">课程里的模型，刚好遇到了我正在参与的项目。</p>

<div class="pair">
<div>
<h2>以前做个人项目</h2>
<p>先一直写，关注功能能不能实现。</p>
<p>等自己使用时，才发现没考虑到的问题。</p>
</div>
<div v-click="1">
<h2>最近参与 Plate 重构</h2>
<p>开始接触页面清单、测试分工、录屏和问题记录。</p>
<p>测试需要提前安排，也需要统一的方法。</p>
</div>
</div>

<div v-click="2" class="claim">测试应该怎样融入整个开发过程？</div>

<!--
可能以前做个人项目的时候，我不会考虑很多，就是一直写，先把功能实现出来。等到自己使用，发现 Bug，再去修。
最近 Plate 正在重构，我接触到的测试工作多了很多。有人整理待测页面，有人准备环境和指南，还要安排谁来测、用哪个浏览器、怎样记录发现。我发现测试其实包含许多需要提前做的事情。
所以我选择用 STEP 来理解这些安排。这里先提出问题，后面用模型回答，而不是把分享讲成某一个 Bug 的修复过程。
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

<div class="definition">系统地规划测试、准备测试资源，<br>再执行测试并评估结果。</div>

<p class="mt-7">测试设计可以从需求阶段开始，随着开发持续进行。</p>

<div v-click="1" class="check-line mt-7">
<p><span class="accent">STEP</span> 组织整体测试与评估工作。</p>
<p><span class="accent">TDD</span> 按“先写失败测试、实现通过、重构”的循环开发。</p>
</div>

<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing · p.14</a> · <a href="https://martinfowler.com/bliki/TestDrivenDevelopment.html" target="_blank">Martin Fowler · TDD</a></div>

<!--
STEP 的全称是 Systematic Test and Evaluation Process。我的理解是，它帮助我们系统地组织测试工作，提前考虑测试，再用执行与评估的结果改进产品和测试过程。
测试融入开发，包含在代码出现以前检查需求是否清楚、设计测试，也包含开发过程中的准备和后续评估。不能只理解成开发时多运行几次测试。
这里顺便区分 TDD。TDD 要先写一条失败的测试，再实现让它通过，随后重构，反复循环。STEP 讨论更广的测试组织工作。两者可以结合，但提前准备测试或者在修复后补测试，都不足以说明已经采用 TDD。
三阶段名称依据 Craig 与 Jaskiel 的 Systematic Software Testing 第 14 页，链接定位 PDF 第 44 页。TDD 循环参照 Martin Fowler 的说明。
-->

---
glow: bottom
glowOpacity: 0.3
glowHue: 95
glowSeed: 411
clicks: 2
---

# STEP 的三个阶段

<p class="lede">从测试策略，到测试资源，再到行为度量。</p>

<div class="steps course-steps">
<div>
<div class="step-no">01</div>
<h2>Planning</h2>
<div class="english">Plan Strategy · 测试规划</div>
<p>为什么测、测什么？<br>怎样测、由谁来测？</p>
</div>
<div v-click="1">
<div class="step-no">02</div>
<h2>Acquisition</h2>
<div class="english">Acquire Testware · 资源准备</div>
<p>需要哪些用例、数据、<br>环境和工具？</p>
</div>
<div v-click="2">
<div class="step-no">03</div>
<h2>Measurement</h2>
<div class="english">Measure Behavior · 执行与评估</div>
<p>实际表现符合预期吗？<br>测试是否充分、有效？</p>
</div>
</div>

<p class="small muted mt-7">评估结果反馈到规划和资源准备，推动下一轮测试。</p>
<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">原始三阶段与八项活动 · Systematic Software Testing</a></div>

<!--
为了便于课堂理解，我沿用 Planning、Acquisition、Measurement 这三个标签，对应原始资料中的 Plan Strategy、Acquire Testware、Measure Behavior。
第一阶段确定测试策略，包括目标、范围和方法。第二阶段获取和制作测试资源，原文叫 testware，包含测试设计、用例、数据和支持执行的资源。第三阶段执行测试、检查测试是否充分，并评估软件和测试过程。
这里的三个阶段描述测试工作的组织方式，不是把软件开发切成三个依次结束的阶段。需求和实现变化，或者执行中发现遗漏，都可能要求我们回到前面的规划或资源准备。
-->

---
glow: right
glowOpacity: 0.22
glowHue: 85
glowSeed: 511
clicks: 1
---

# Planning · 先把测试想清楚

<p class="lede">先有判断依据，才知道测试做到什么程度。</p>

<div class="matrix">
<div class="matrix-row matrix-head"><span>要明确什么</span><span>需要回答的问题</span><span>留下的内容</span></div>
<div class="matrix-row"><span>目标与范围</span><span>测哪些功能和风险？</span><span>测试范围、优先级</span></div>
<div class="matrix-row"><span>策略与分工</span><span>怎样测、谁来测、何时测？</span><span>方法、人员与时间安排</span></div>
<div class="matrix-row"><span>判断标准</span><span>什么算正确，何时可以结束？</span><span>预期依据、结束条件</span></div>
</div>

<div v-click="1" class="claim">页面能打开，足以说明功能正常吗？</div>
<p class="small muted">测试计划要说明，还需要检查哪些操作和异常情况。</p>

<!--
测试开始以前，先把目标、范围、策略、分工和标准讲清楚。不同项目的风险不同，同一个页面也可以有不同深度的检查。
例如一个编辑器页面能够打开，只能说明最基本的加载成功。用户输入、删除、拖动、撤销是否正常，需要另外安排检查。规划时就要知道我们关心哪些行为，以及拿什么来判断正确。
这一阶段可以形成测试计划，给执行者共同的范围和依据。发现需求没有说清楚时，也应先澄清预期，不能把自己猜的行为直接当作正确答案。
-->

---
glow: right
glowOpacity: 0.2
glowHue: 75
glowSeed: 612
clicks: 2
---

# Plate 中怎样做测试规划？

<p class="lede">Plate 是一个富文本编辑器项目，近期重构需要检查编辑功能。</p>

<div class="pair">
<div>
<h2>确定测试范围和方法</h2>
<p>整理待测页面，区分已有功能与新功能。</p>
<p>为页面确定对照来源和检查方式。</p>
</div>
<div v-click="1">
<h2>安排人员和执行条件</h2>
<p>分配页面、浏览器、方法组和测试时长。</p>
<p>在正式执行表中固定本轮安排。</p>
</div>
</div>

<div v-click="2" class="claim">我开始前，需要拿到获批分工和实际测试地址。</div>
<div class="source">依据 PlateWorkResource · 2026-10-16 快照 · 分工提案仍待批准，浏览器、方法组和地址未定</div>

<!--
Plate 是一个富文本编辑器项目。除了文字输入，还涉及格式、媒体、表格、框选等交互。重构以后，需要确认已有功能仍然正常，也需要检查新增功能。
在我接触到的计划里，团队先整理页面和参考对象，再安排不同人员测试哪些页面，用哪个浏览器、哪一种方法、每页测试多久。它们都可以用 Planning 来理解。
不过这份资料是 2026-10-16 整理的固定快照。我的分工仍是等待 Ziad 批准的提案，浏览器、方法组和实际预览地址尚未确定。不能把有一份分工文档说成正式测试已经完成。
这些工作与 STEP 的对应是本报告的分析，一个具体步骤也可能同时涉及规划和资源准备，不需要强行一一对应。
-->

---
glow: left
glowOpacity: 0.25
glowHue: 65
glowSeed: 713
clicks: 1
---

# Acquisition · 让计划能够执行

<p class="lede">用例、数据、环境、脚本和记录模板，都需要准备。</p>

<div class="pair">
<div>
<h2>准备测试资源</h2>
<div class="check-line"><p>把预期行为写成可执行的测试用例。</p></div>
<div class="check-line"><p>准备数据、环境，以及执行和记录工具。</p></div>
</div>
<div v-click="1">
<h2>一个框选用例</h2>
<div class="compact-lines">
<div class="check-line"><span class="accent small">前置条件</span><p>编辑页面中有可见的音频控件。</p></div>
<div class="check-line"><span class="accent small">操作</span><p>从左侧空白框选，在控件内松手。</p></div>
<div class="check-line"><span class="accent small">预期结果</span><p>选框消失；无按键移动不再扩选。</p></div>
</div>
</div>
</div>

<div class="source">用例按已有 BlockSelection 浏览器测试整理 · 具体证据见第 10 页</div>

<!--
Acquisition 是把测试计划变成可以执行的资源。准备不只是安装工具，还要写出操作和预期，准备好需要的数据、环境及记录方式。
这里提前用一个简单的框选用例说明。前置条件是页面里有可见的音频控件。操作是从左侧空白开始拖动，在控件内部松开鼠标。预期是拖动选框消失，继续移动鼠标也不再扩选。
这些内容按已有浏览器测试整理，不是新执行结果。第十页再用这个例子把三个阶段串起来。
-->

---
glow: top-right
glowOpacity: 0.25
glowHue: 55
glowSeed: 814
clicks: 1
---

# Plate 中准备了哪些测试资源？

<p class="lede">先让测试人员能开始，也让发现的问题能够留下记录。</p>

<div class="pair">
<div>
<h2>人工测试的准备</h2>
<p>页面清单、测试指南、录屏和记录模板。</p>
<p>实际预览环境与执行表，按计划继续准备。</p>
<p class="small muted mt-5">清单和指南已经存在，正式环境与安排仍需确认。</p>
</div>
<div v-click="1">
<h2>现有自动化测试工具</h2>
<div class="matrix tool-matrix">
<div class="matrix-row matrix-head"><span>工具</span><span>项目中的用途</span></div>
<div class="matrix-row"><span class="accent">Bun Test</span><span>Plate 模型、插件等测试</span></div>
<div class="matrix-row"><span class="accent">Vitest</span><span>Plite 的 React 测试，使用 jsdom</span></div>
<div class="matrix-row"><span class="accent">Playwright</span><span>浏览器中的真实交互检查</span></div>
</div>
</div>
</div>

<div class="source">准备状态依据 2026-10-16 资源快照；工具用途依据现有源码与配置，各工具承担不同层面的检查</div>

<!--
Plate 的现有资料包括页面清单、测试人员指南和记录模板，帮助执行者知道去哪里测试、怎样记录。按计划，独立会话还需要准备植入已知问题的预览环境，负责人需要确认本轮执行表。这里把已经有的资料和等待准备的环境分开说。
自动化工具也不只有一个。Bun Test 用于 Plate 模型、插件等测试。Vitest 实际运行 Plite 的 React 测试，其中有 jsdom 环境。Playwright 用浏览器驱动页面，检查真实的点击、键盘和拖动交互。
工具名称说明资源准备怎样落地，不表示执行一个命令就完成了全仓回归。项目里还有其他测试配置，本页只列与课程内容直接相关的三种。
-->

---
glow: right
glowOpacity: 0.22
glowHue: 45
glowSeed: 915
clicks: 2
---

# Measurement · 执行之后，还要评估

<p class="lede">比较预期与实际，并判断测试本身是否足够。</p>

<div class="sequence"><code>执行操作</code><span>→</span><code>对照预期</code><span>→</span><code>记录异常</code><span>→</span><code>分析结果</code></div>

<div class="pair">
<div v-click="1">
<h2>产品表现如何？</h2>
<p>保留复现步骤、录屏时间点和环境。</p>
<p>复查发现，整理可确认的问题。</p>
</div>
<div v-click="2">
<h2>测试做得如何？</h2>
<p>检查范围是否充分、测试方法是否有效。</p>
<p>补充遗漏，调整下一轮计划和测试资源。</p>
</div>
</div>

<div class="source">Plate 计划在轮末回正常 Beta 复查，再确认 Issue；本报告未将计划写成已完成的正式测试结果</div>

<!--
Measurement 包含测试执行，但执行以后还要做判断。先比较实际结果和预期，发现异常时保留操作步骤、环境和录屏时间点，方便其他人复现。
Plate 的计划要求测试者按安排计时、录屏和记录发现，轮末回到正常 Beta 复查，再确认问题报告。这里仍在介绍计划，不代表我已经执行完这一轮。
另一个容易忽略的问题是，测试是否充分，采用的方法能不能发现问题。即使执行的用例都通过，也只能说明这些用例覆盖的行为符合预期。还需要检查遗漏，并把评估结果反馈到规划与资源准备。
-->

---
glow: bottom-right
glowOpacity: 0.25
glowHue: 30
glowSeed: 1016
clicks: 1
---

# 用 BlockSelection 串起三个阶段

<p class="lede">音频控件内松手后，框选是否真正结束？</p>

<div class="evidence-pair block-case">
<div class="compact-lines">
<div class="check-line"><span class="accent small">Planning</span><p>明确松手后应结束框选。</p></div>
<div class="check-line"><span class="accent small">Acquisition</span><p>准备音频页面、拖动步骤和脚本。</p></div>
<div v-click="1" class="check-line"><span class="accent small">Measurement</span><p>检查选框消失，继续移动不再扩选。</p></div>
</div>
<figure>
<a href="/evidence/blockselection-after-release.png" target="_blank"><img src="/evidence/blockselection-after-release.png" alt="本轮 Plate 源码页面中，音频控件内松开鼠标后的框选状态" /></a>
<figcaption>本轮 Chromium · 1 个用例 × 5 次，无重试。<br>第 5 次截图，非历史修复前后对照。</figcaption>
</figure>
</div>

```ts
await page.mouse.up();
await expect(marquee).toHaveCount(0);
```

<div class="source">连续原文摘录 · <a href="/evidence/blockselection-audio.spec.txt" target="_blank">selection-edge-scroll.spec.ts · L508–509</a> · <a href="/evidence/blockselection-replay.log" target="_blank">本轮执行日志</a> · 完整用例还检查移动后选择不变</div>

<!--
BlockSelection 是编辑器里的块框选。历史修复记录描述了一个直观的问题，在音频控件内部松开鼠标以后，拖动选框仍然跟着鼠标移动。
先看 Planning，我们要明确松手之后的正确表现，拖动选框结束，后续无按键移动不改变已经选中的块。Acquisition 是准备有音频的页面、真实鼠标路径和可重复执行的测试脚本。Measurement 再执行这些步骤，核对是否符合预期。
下面两行是现有 selection-edge-scroll.spec.ts 第 508 至 509 行的连续原文摘录。完整用例还在松手后移动鼠标，并比较选择是否保持原样，随后检查原生文本选择和运行时错误。源码只证明有这些检查，执行结果需要单独核对。
此处用 STEP 整理已有实践，不宣称当时正式按 STEP 实施。历史文档引用的原始截图和日志本轮未找到，因此不展示历史通过数字，也不拼接历史修复前后图。本轮在源码服务上使用 Chromium，执行这一个用例五次，无重试，五次均通过。展示第五次截图，已核对音频块保持选中、拖动选框消失。被测源码运行前后指纹一致，服务就绪信息为 devSource=true、plite=true。这是当前代码的限定用例验证，不证明全仓回归、跨浏览器或历史修复前后差异。执行日志见 /evidence/blockselection-replay.log，具体记录见证据说明。
-->

---
glow: left
glowOpacity: 0.25
glowHue: 15
glowSeed: 1117
clicks: 2
---

# 测试方法本身，也需要评估吗？

<p class="lede">Plate 计划植入已知 Bug，检查不同方法发现问题的能力。</p>

<div class="steps course-steps">
<div>
<div class="step-no">01</div>
<h2>准备已知问题</h2>
<div class="english">独立会话准备预览</div>
<p>保存密封答案，<br>测试者事先不查看。</p>
</div>
<div v-click="1">
<div class="step-no">02</div>
<h2>用同等时间探索</h2>
<div class="english">候选方法与自由探索对比</div>
<p>操作页面、录屏，<br>记录实际发现。</p>
</div>
<div v-click="2">
<div class="step-no">03</div>
<h2>独立评分</h2>
<div class="english">比对发现与已知问题</div>
<p>评估方法效果，<br>再决定是否采用。</p>
</div>
</div>

<p class="small mt-6"><span class="accent">功能表现</span>用于评估产品，<span class="accent">问题检出情况</span>用于评估测试过程。</p>
<div class="source">依据 Plate 计划 1.6、1.8、1.9 · 六种候选探索方法尚待试验，本报告没有方法优劣的实验结论</div>

<!--
我觉得计划里提前植入已知 Bug 的安排很有意思。平时测试是为了找未知问题，而这里先知道一些问题存在，再观察测试者能不能把它们找出来。
按这份计划，独立会话准备预览和密封答案，测试者不提前查看。测试时用同等时间比较六种候选探索方法和自由探索，结束后由独立评分者对照答案。这样的安排是在评估测试方法发现问题的能力。
这也对应 Measurement 中对软件和测试过程的评估。检查一个功能表现对不对，是在评估产品。比较不同方法发现已知问题的情况，是在评估测试过程。
这里讲的是待执行方案，没有本轮实验结论，不能说哪一种方法已经被证明更好。发现比例也受所选问题、页面、人员和时间影响，不能直接推成所有真实 Bug 的检出率。
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
