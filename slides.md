---
theme: default
title: STEP 测试模型与我的项目实践
info: |
  以 Plate Details 修复实践为主案例，列表样式诊断为补充。
  基于 2026-10-14 核对的历史记录，不代表本轮重新执行 Plate 测试。
layout: default
class: cover-slide
canvasWidth: 1920
aspectRatio: 16/9
fonts:
  provider: none
  sans: 'PingFang SC'
  mono: 'SFMono-Regular'
  local: 'PingFang SC,SFMono-Regular'
drawings:
  persist: false
transition: fade
mdc: false
duration: 12min
---

<div class="cover-grid">
<div>
<p class="cover-subject">软件测试课程报告</p>
<h1>STEP 测试模型<br>与我的项目实践</h1>
<p class="cover-subtitle">以 Plate Details 修复为例</p>
<p class="cover-question">怎样有计划地测试，<br>并证明一次修复有效？</p>
<p class="cover-context">主案例 · 折叠块光标与选区<br>补充案例 · 列表样式渲染</p>
</div>
<figure class="cover-figure">
<img src="/evidence/details-outer-caret.png" alt="历史修复后 Playground 外层 Details 折叠，光标位于标题末尾" />
<figcaption>历史记录 · 外层 Details 折叠后的可见光标</figcaption>
</figure>
</div>

<div class="source">本报告用 STEP 分析实际工作。<a href="/evidence/manifest.json" target="_blank">原始材料清单</a> · <a href="/evidence/details-source.json" target="_blank">被测源码记录</a></div>

<!--
开场用“修复一个 Bug，怎样证明修好”引出课程主题。Plate 是富文本编辑器项目，Details 是可展开与折叠的内容块。本报告把实际测试实践对应到 STEP，不宣称团队当时正式采用完整 STEP。
封面原图为 playground-outer-visible-caret.png 的字节一致副本，配套 /evidence/details-outer-caret.json 记录 model 与 dom 一致、focused 为 true、光标矩形高度 18。这张图是修复后的外层折叠场景。
核对日为 2026-10-14。本轮读取截图、JSON 和日志，没有重新执行 Plate 测试。
/evidence/details-source.json 的基础 HEAD 为 a924f121440c5d87baaa4236d5747d45d59661fb，当时还有未提交的实现和测试修改。源码记录保存六个文件的 SHA-256，不能只把 HEAD 当成被测版本。
-->

---

# 从一个真实问题开始

<div class="evidence-grid">
<div>
<p class="lead">正文折叠了，<br>输入却进入隐藏正文。</p>
<ol class="sequence">
<li>折叠 Details，定位到标题末尾。</li>
<li>按 <code>ArrowRight</code>。</li>
<li>输入 <code>XYZ</code>，再展开正文。</li>
</ol>
<p class="finding">历史 JSON 显示选区进入正文。<br>展开后，正文前缀变成 <code>XYZKeep…</code>。</p>
<p class="quiet">隐藏内容仍存在于编辑器模型中。</p>
</div>
<figure class="evidence-figure">
<img src="/evidence/details-hidden-input.png" alt="历史异常场景中重新展开 Details，正文开头出现 XYZKeep extra context" />
<figcaption>Playground · ArrowRight 场景 · 输入后重新展开</figcaption>
</figure>
</div>

<div class="source"><a href="/evidence/details-hidden-input.json" target="_blank">操作与选区记录</a> · 图为该场景的原始截图，首次鼠标折叠另有用例。</div>

<!--
先让同学观察截图中“XYZKeep extra context”这一行。这里展示用户输入进入隐藏正文的可观察后果。
证据 /evidence/details-hidden-input.json 来自 playground-right-r0.json。记录包含 End、ArrowRight、typed XYZ、reopened after typing。截图来自 playground-right-r0-reopened.png。
这条历史复现使用 End 定位标题末尾，再测试 ArrowRight。不能称其为首次鼠标点击正文后折叠的截图。第 7 页会单独讲首次折叠用例。
对应 STEP 的度量行为。将实际结果与预期结果比较，确认缺陷，而不是仅凭页面折叠成功判定正确。
-->

---

# STEP 怎样组织测试工作

<p class="definition"><strong>Systematic Test and Evaluation Process</strong><br>系统化测试与评价过程</p>

<div class="phase-flow">
<div><span class="phase-number">01</span><h2>规划策略</h2><p>决定测试目标、范围<br>和重点。</p></div>
<span class="flow-arrow" aria-hidden="true">→</span>
<div><span class="phase-number">02</span><h2>准备测试资产</h2><p>准备测试用例、数据<br>和执行环境。</p></div>
<span class="flow-arrow" aria-hidden="true">→</span>
<div><span class="phase-number">03</span><h2>度量行为</h2><p>执行测试，评价软件<br>和测试工作。</p></div>
</div>

<p class="takeaway">尽早明确怎样验证。执行后，根据结果改进后续测试。</p>

<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing，第 14 页</a> · <a href="https://istqb.org/wp-content/uploads/2024/11/CTAL_TM_2012_Syllabus_v2.0.pdf#page=62" target="_blank">ISTQB，第 5.7 节</a></div>

<!--
经典 STEP 将顶层活动组织为规划策略、准备测试资产、度量行为三个阶段。这页是对顶层结构的教学简化，阶段内还有更细的活动，不能把这张图当成全部方法。
Systematic Software Testing 印刷页 14 支持三阶段结构，PDF 查看器页 44。ISTQB 2012 测试经理大纲第 5.7 节支持 STEP 的生命周期与预防思想。
需求尚未编码时，测试人员已经可以检查规则是否明确、设计测试。三阶段可以随着开发迭代反复开展，图中箭头用于说明工作关系，不意味着所有测试只能一次性顺序完成。
本案例从已有缺陷出发，我们分析其组织方式，并在最后讨论怎样将行为约束提前用于后续开发。
-->

---

# 把这次工作放进 STEP

<table class="mapping-table">
<thead><tr><th>阶段</th><th>实际做过的工作</th><th>报告展示的产物</th></tr></thead>
<tbody>
<tr><td><strong>规划策略</strong></td><td>调查折叠状态、光标与键盘行为，<br>明确相关交互的检查范围。</td><td>整理测试目标、风险<br>与验收条件。</td></tr>
<tr><td><strong>准备测试资产</strong></td><td>构造普通与嵌套 Details，<br>准备脚本、浏览器场景与观察记录。</td><td>完整用例、测试环境<br>与选区检查方式。</td></tr>
<tr><td><strong>度量行为</strong></td><td>复现异常，定位选区交接问题，<br>修复后执行相关测试与回归。</td><td>预期和实际对比、<br>测试结果及遗漏分析。</td></tr>
</tbody>
</table>

<p class="takeaway">阶段对应是事后分析。风险表和验收表是本报告的整理。</p>

<div class="source"><a href="/evidence/manifest.json" target="_blank">原始材料清单</a> · <a href="/evidence/details-repeat.log" target="_blank">浏览器执行日志</a> · <a href="/evidence/details-regression.log" target="_blank">回归日志</a></div>

<!--
这一页连接理论与个人实践。实际记录支持复现、构造测试场景、定位、修复及回归。风险优先级与验收条件表是报告作者根据记录整理的表达。
不能说当时团队已经建立完整 STEP 总体测试计划，也不能把报告后来补充的计划称为已执行事实。
测试资产包括测试代码，也包括编辑器初始文档、真实浏览器页面、操作序列、JSON 观察记录与截图。度量行为同时评价软件结果与测试过程的充分性。
证据见 /evidence/manifest.json，以及 /evidence/details-repeat.log 和 /evidence/details-regression.log。
-->

---

# 规划策略 · 先明确正确行为

<p class="lead">折叠后，用户看到的光标与实际输入位置需要一致。</p>

<div class="two-columns">
<div>
<h2>整理预期行为</h2>
<ul>
<li>点击正文再折叠，光标转移到标题末尾。</li>
<li>后续输入修改可见标题。</li>
<li>隐藏正文保留原内容。</li>
<li>内部选区与浏览器选区一致。</li>
</ul>
</div>
<div>
<h2>据此识别风险</h2>
<ul>
<li>光标看似正常，实际输入改错位置。</li>
<li>旧的浏览器选区影响新操作。</li>
<li>内层折叠与外层折叠行为不同。</li>
</ul>
</div>
</div>

<p class="takeaway">优先检查会修改隐藏内容的操作。</p>

<div class="source">本页为报告整理的目标与风险。<a href="/evidence/details-hidden-input.json" target="_blank">异常记录</a> · <a href="/evidence/details-inner-caret.json" target="_blank">内层光标记录</a></div>

<!--
STEP 的规划策略需要先确定测试目标。Details 的正文在折叠时仍存在于模型，错误选区会把输入写入用户看不到的位置，因此内容误改是本案例的重要风险。
标题末尾是首次折叠用例的预期目标位置，并非宣称所有方向键操作都必须永远停留在那里。方向键和结构编辑各有单独契约，应按具体动作判断。
model 指编辑器保存的选区，dom 指浏览器实际选区。可见光标、焦点和后续输入共同说明用户交互结果。
风险排序与此页的表述是本报告依据历史记录整理，不冒称当时存在独立风险分析文档。
-->

---

# 规划策略 · 确定范围与验收条件

<table class="scope-table">
<thead><tr><th>检查维度</th><th>覆盖范围</th><th>验收时观察什么</th></tr></thead>
<tbody>
<tr><td>页面</td><td><code>details-demo</code>、<code>playground</code></td><td>各自真实编辑器中的行为。</td></tr>
<tr><td>内容结构</td><td>普通 Details、嵌套 Details</td><td>目标块、标题和正文是否正确。</td></tr>
<tr><td>交互动作</td><td>点击、折叠与展开、方向键、<br>Enter、删除、后续输入</td><td>光标、焦点、选区及文档变化。</td></tr>
<tr><td>内容保护</td><td>输入后展开，检查隐藏正文</td><td>没有意外修改隐藏内容。</td></tr>
</tbody>
</table>

<p class="takeaway">内部状态、浏览器选区、可见光标与后续输入一起检查。</p>

<div class="source">此表汇总调查与回归范围，不能当作全部组合均已测试的矩阵。<a href="/evidence/details-repeat.log" target="_blank">重复执行记录</a> · <a href="/evidence/details-regression.log" target="_blank">回归范围</a></div>

<!--
将目标转为可执行的检查范围，是规划策略的具体表现。两页面、普通与嵌套内容、鼠标与键盘行为在历史工作中出现过。
这张表是维度汇总，不意味着每一页、每一种结构、每个动作的笛卡尔积都已运行。第 10 页会分别解释日志中的数字，避免把范围表与执行数量混为一谈。
“检查后续输入”很关键。内部选区通过，仍需要观察浏览器焦点和实际输入位置。对内容保护的检查可以在折叠操作后展开正文，确认原文保持不变。
证据 /evidence/details-repeat.log 和 /evidence/details-regression.log。
-->

---

# 准备测试资产 · 写透一个真实用例

<p class="case-title">首次点击正文后折叠，光标与输入落到标题末尾</p>

<table class="case-table">
<tbody>
<tr><th>前提条件</th><td>Details 已展开。标题与正文有可区分的文字。</td></tr>
<tr><th>操作步骤</th><td>原生鼠标点击正文 → 点击折叠按钮 → 输入 <code>XYZ</code> → 撤销。</td></tr>
<tr><th>期望结果</th><td>折叠后选区位于 <code>titleEnd</code>。内部与浏览器选区一致，编辑器有焦点。<br>输入进入标题，隐藏正文保持原内容，撤销恢复内容。</td></tr>
<tr><th>观察方式</th><td>检查 <code>model</code>、<code>dom</code>、<code>focus</code>，再检查输入后的文档。</td></tr>
</tbody>
</table>

<p class="takeaway">保留用户的真实点击顺序，才能覆盖首次折叠。</p>

<div class="source"><a href="/evidence/details-disclosure.spec.txt" target="_blank">真实首次折叠用例源码</a> · <a href="/evidence/details-source.json" target="_blank">源码指纹</a> · 隐藏正文保护为报告补充的验收项。</div>

<!--
本页依据已核对的历史 details-disclosure.spec.ts。first collapse 使用原生鼠标点击正文与折叠按钮，检查 model、dom、focus，随后输入 XYZ 并撤销。titleEnd 指目标 Details 标题末尾的位置。
历史脚本断言标题追加 XYZ、选区与焦点，撤销后标题恢复。它没有单独断言隐藏正文全文不变；这一条是本报告补充的验收条件，不声称原脚本已经覆盖。
测试用例由前提、步骤与可判断的期望组成。只检查“正文消失”不能证明光标或输入正确，因此用例必须继续输入。
这里与第 2 页 ArrowRight 复现不同。第 2 页先 End 定位，首次折叠用例直接使用真实鼠标操作。
对应 STEP 的准备测试资产阶段。测试代码、初始文档与检查指标是执行时需要的材料。
/evidence/details-source.json 保存历史源码指纹，被测版本包含基础 HEAD 与未提交修改。测试脚本的原始路径在 /evidence/manifest.json 所在批次的原记录目录中。
-->

---

# 准备测试资产 · 两种测试各证明什么

<div class="two-columns testing-levels">
<div>
<h2>模型与契约测试</h2>
<p class="level-purpose">检查命令、结构和选区规则。</p>
<ul>
<li>Details 的结构编辑是否符合契约。</li>
<li>控件接管选区时，来源标记是否正确。</li>
<li>通过后仍需验证真实浏览器交互。</li>
</ul>
<p class="level-evidence">对应历史日志中的<br><strong>32 项 Details 测试</strong>与<strong>91 项选区契约</strong>。</p>
</div>
<div>
<h2>真实浏览器测试</h2>
<p class="level-purpose">检查点击后用户实际得到的结果。</p>
<ul>
<li>真实鼠标与键盘输入。</li>
<li>DOM 选区、焦点与可见光标。</li>
<li>输入后的标题与隐藏正文。</li>
</ul>
<p class="level-evidence">对应两页面的重复执行<br>与相关交互回归。</p>
</div>
</div>

<div class="source"><a href="/evidence/details-structure.log" target="_blank">Details 测试日志</a> · <a href="/evidence/details-selection.log" target="_blank">选区契约日志</a> · <a href="/evidence/details-repeat.log" target="_blank">浏览器日志</a></div>

<!--
测试层级的划分用于说明每种资产能证明什么。模型测试能快速验证结构与选区规则，却不能单独证明浏览器中的可见光标和后续输入。
Details 分区历史日志记录两个测试文件，32 pass、0 fail。选区相关契约日志记录三个文件通过 91 项，不等于 91 个 Details 用例。
浏览器测试则经过真实事件和浏览器选区。检查 model、dom、focus、光标几何及输入结果，能够补上内部测试观察不到的行为。
对应 STEP 的准备测试资产阶段，选合适的环境和检查方式，避免用一个层级的通过代替全部验收。
-->

---

# 度量行为 · 用证据定位共享根因

<div class="evidence-grid repair-grid">
<div>
<p class="contract-result">选区交接契约<br><span>期望 true</span><span class="failed">实际 false</span></p>
<p>控件接管选区时，<br>过时的 <code>native-user</code> 来源仍被保留。</p>
<p class="repair-action">在共享 <code>selection-controller</code><br>的 <code>app-owned</code> 交接处清除旧来源。</p>
<p class="quiet">Details 插件负责结构编辑。<br>共享控制器负责选区来源交接。</p>
</div>
<figure class="evidence-figure">
<img src="/evidence/details-inner-caret.png" alt="修复后的独立嵌套 Details 场景，内层标题末尾有可见光标" />
<figcaption>修复后的独立场景 · 内层 Details 折叠</figcaption>
</figure>
</div>

<div class="source"><a href="/evidence/details-handoff-before.log" target="_blank">修复前契约失败日志</a> · <a href="/evidence/details-plan.md" target="_blank">修复记录</a> · <a href="/evidence/details-inner-caret.json" target="_blank">内层光标 JSON</a> · 该图与第 2 页是不同场景。</div>

<!--
度量行为先比较预期与实际，再解释原因。handoff-red.log 记录应为 true、实际 false，汇总为 1 failed、22 passed，证明控件接管选区前的导出契约失败。
历史 plan.md 和保存源码支持根因修复。共享 selection-controller 在 app-owned 控件选区交接处清除过时 native-user 来源，Details 插件负责结构编辑。这不是仅为某一页面加临时保护。
右图为 playground-inner-visible-caret.png 的原图副本。配套 JSON 记录 model 与 dom 一致、focused 为 true、光标矩形高度为 18。这是修复后独立的嵌套内层折叠场景。
第 2 页是 End 与 ArrowRight 的异常场景，此页是内层折叠场景。不能把两张图当成同一操作的修复前后对比。
-->

---

# 度量行为 · 核对结果，也评价测试

<div class="metrics">
<div><strong>32</strong><span>Details 测试通过</span><small>两个模型测试文件</small></div>
<div><strong>91</strong><span>选区契约通过</span><small>三个相关文件</small></div>
<div><strong>50</strong><span>浏览器执行通过</span><small>10 个用例 × 5 轮</small></div>
<div><strong>20</strong><span>相关回归通过</span><small>Details 与周边交互</small></div>
</div>

<div class="review-row">
<div><h2>评价软件</h2><p>查看光标、选区与输入结果。<br>确认相关交互没有被此次修改破坏。</p></div>
<div><h2>评价测试过程</h2><p>用 <code>End</code> 准备状态曾绕过真实首次点击。<br>补充原生鼠标点击正文后折叠的用例。</p></div>
</div>

<p class="result-limit">这些是已核对的历史日志。本轮未重跑 Plate，未证明全仓库或所有浏览器通过。</p>

<div class="source"><a href="/evidence/details-structure.log" target="_blank">32 项</a> · <a href="/evidence/details-selection.log" target="_blank">91 项</a> · <a href="/evidence/details-repeat.log" target="_blank">50 次执行</a> · <a href="/evidence/details-regression.log" target="_blank">20 项回归</a></div>

<!--
逐项解释数字，不能直接求和。
32 是 Details 分区的模型测试，日志为 32 pass、0 fail。91 是三个文件的选区相关契约，不能称为 91 个 Details 用例。
50 是两个页面、五类动作、重复五轮，共 10 个用例执行 50 次。不是 50 个不同用例。
20 是相关回归，包含 Details 光标与选区、浮动链接工具栏、文本滚动。不是仓库全部测试。
测试过程的评价包括检查复现是否忠于真实用户操作。历史调查发现先按 End 定位再折叠不能覆盖真实首次鼠标折叠，因此需要 first collapse 原生点击用例。
本轮只核对保存日志与图，没有重新执行 Plate。被测源码为基础 HEAD a924f12144 加当时未提交修改，细节见 /evidence/details-source.json。
这些证据不证明目前分支、全仓库 CI、其他浏览器、合并或发布状态。
-->

---

# 补充案例 · 数据变了，页面却没变

<div class="evidence-grid list-grid">
<div>
<p class="lead">选择 Circle 或 Square 后，<br>页面仍显示默认圆点。</p>
<table class="list-table">
<thead><tr><th>操作</th><th>模型值</th><th>计算样式</th></tr></thead>
<tbody>
<tr><td>Circle</td><td><code>circle</code></td><td><code>disc</code></td></tr>
<tr><td>Square</td><td><code>square</code></td><td><code>disc</code></td></tr>
</tbody>
</table>
<p class="finding">诊断脚本 <code>1 passed</code><br>只说明脚本执行完成。</p>
<p class="quiet">它没有断言样式正确。<br>这份记录不能证明列表问题已修复。</p>
</div>
<figure class="evidence-figure">
<img src="/evidence/list-circle.png" alt="Circle 诊断原图中列表依然显示默认实心圆点" />
<figcaption>Circle 操作后的真实截图</figcaption>
</figure>
</div>

<div class="source"><a href="/evidence/list-diagnosis.log" target="_blank">诊断日志</a> · <a href="/evidence/list-diagnosis.spec.txt" target="_blank">诊断脚本</a> · STEP 的度量行为需要检查预期结果是否真正被验证。</div>

<!--
本页用独立案例补充“内部状态变化不足以证明用户看到正确结果”。已核对 Circle.png、replay.log 与 replay.spec.ts。Circle 的模型 listStyle 为 circle，Square 为 square，计算 listStyleType 都是 disc。
1 passed 是诊断脚本完成，并且没有记录到运行时错误。该脚本没有断言最终样式符合预期，因此不能解释成修复测试通过。
记录没有列表修复后的证据。课堂应说完成诊断，修复状态不由这些材料证明。
对应 STEP 度量行为。要评价测试是否验证了业务或交互目标，不能只引用脚本退出状态。
图像为原图完整展示，没有裁切或仿绘。
-->

---

# 从缺陷修复走向缺陷预防

<div class="closing-statement">把这次发现的规则，<br>提前用于下一次开发。</div>

<div class="closing-columns">
<div><h2>规划策略</h2><p>需求阶段明确折叠后<br>光标与输入的目标位置。</p></div>
<div><h2>准备测试资产</h2><p>提前写真实点击用例，<br>准备嵌套内容与浏览器检查。</p></div>
<div><h2>度量行为</h2><p>比较预期与实际结果，<br>保留证据并补上遗漏。</p></div>
</div>

<p class="closing-question">修复有效的结论，需要操作、结果与证据共同支持。</p>

<div class="source"><a href="https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44" target="_blank">Systematic Software Testing，第 14 页</a> · <a href="https://istqb.org/wp-content/uploads/2024/11/CTAL_TM_2012_Syllabus_v2.0.pdf#page=62" target="_blank">ISTQB，第 5.7 节</a> · <a href="/evidence/manifest.json" target="_blank">案例材料</a></div>

<!--
回到 STEP 的预防思想。本次实践从已有缺陷开始，下一次可以在需求与设计阶段明确折叠、选区与输入的行为约束，提前准备测试资产。
报告没有声称当时完整采用 STEP。我们借助三阶段组织和评价这次实践，再提出提前测试的改进方向。
经典三阶段来源为 Systematic Software Testing 印刷页 14。生命周期、预防思想来源为 ISTQB 2012 测试经理大纲第 5.7 节。
所有案例截图和执行结果来自保存的历史记录，2026-10-14 重新核对原始材料。材料目录与 SHA-256 在 /evidence/manifest.json。本轮未重新执行 Plate 测试。
答辩时可用列表案例回答“脚本 passed 是否等于问题修好”，用 Details first collapse 用例回答“怎样判断测试是否充分”。
-->
