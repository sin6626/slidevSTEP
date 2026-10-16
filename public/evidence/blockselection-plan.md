# 媒体块选中样式与松手后框选状态

Status: executed，松手修复已按用户要求提交为236bb63e9b；未推送，工作树合并由用户安排。
Playbook: figure-it-out

## Brief

### What will change?

已在Block Selection内修复音频控件中松手后继续框选的问题。白色边框和媒体组件保持原样，修复留在本会话工作树。

### What could go wrong?

验证覆盖本地Chromium，远端PR最新合并代码未合入本工作树。PDF原始独立触发未在修复前重现，但用户复测和修复后追加检查均正常。

## Teach

Block Selection负责哪些块被选中，以及拖动中的选框。媒体组件可以自己绘制选中外观，因此白色边框和浅蓝色高亮可能来自不同组件。

原先在音频播放器里松手时，Chrome没有把松手事件送到页面，框选仍接收后续鼠标移动。现在编辑器从框选开始就捕获这一轮指针，松手正常结束；意外丢失捕获也会清理拖动。

## Scope

- 本轮检查3类媒体、2个问题。严谨程度为原生交互诊断，保留事件、模型状态、截图和录屏；不做媒体视觉设计。
- 工作树 `/Users/sin/.codex/worktrees/block-selection-table/plate`，基线 `03f2dffc210e5304e219f3f21fdb024c84fec7c8`，服务 `http://localhost:3301`。用户主树3000不变。
- 完成条件：每种样式有代码或明确设计依据；复现松手后选框是否消失、无按键移动是否继续改变选区，并定位责任层。不能复现的情况明确记为未复现。
- 用户授权“那去修改吧”，并明确不改zbeyens维护的白色边框。只执行Block Selection修复；动Plite前先请示，不提交、推送或合回主树。

## Steps

- [x] 查样式规则及提交历史。Proof: `0689161e6a3cc2830407924b9b7998493c04ce8f`、`apps/www/tests/browser/media-caption.spec.ts:841`、`docs/plans/artifacts/block-selection-media-release-20261014/style-review/reply.txt`，主任务已核对决定性源码和提交。
- [x] 分别记录3类媒体的复现结果。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/native-release-a1.log`，音频失败、文件行空白和图片落点通过；`docs/plans/artifacts/block-selection-media-release-20261014/file-hit-a1.log`，文件名和图标未复现；PDF报告继续列在Open work。
- [x] 缩小音频松手事件丢失位置。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/native-audio-repeat-a1.log`，5次松手后均保留选框、window和document均未收到pointerup；后续buttons为0仍改变选区。
- [x] 验证最小修复方向并写计划。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/capture-repeat-a1.log`，测试页临时启用指针捕获后5次结束正常；只证明修复方向，未应用产品补丁。
- [x] 加入真实音频松手与丢失捕获的失败回归。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/lifecycle-red-a1.log`多选两个块；`docs/plans/artifacts/block-selection-media-release-20261014/browser-regression-red-a1.log`松手后有1个选框，期望0个。
- [x] 在既有手势生命周期内加入捕获和释放。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/final-components-a1.log`，37/37通过，包含取消、失焦、只读和卸载后无捕获，以及既有候选计数。
- [x] 完成写作检查、代码审查和限定范围lint。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/review-media-release/final.txt`无待修复项；`docs/plans/artifacts/block-selection-media-release-20261014/final-lint-a1.log`无错误或警告。
- [x] 在最终代码上连续验证媒体松手、取消及原有框选行为。Proof: `docs/plans/artifacts/block-selection-media-release-20261014/final-browser-a1.log`，15/15通过；`docs/plans/artifacts/block-selection-media-release-20261014/final-controls-a1.log`，7/7媒体操作对照通过；`docs/plans/artifacts/block-selection-media-release-20261014/final-components-a1.log`，37/37通过。

## Completion Gates

| Gate | Result |
| --- | --- |
| Verify | 本次执行已读取verify及命令、测试和原生输入规范；沿用3301源码服务与原生Chrome |
| Benchmark | 已加载benchmark与methodology；捕获和释放每手势一次，保留1/5/20/100/1000候选工作计数，无帧率或速度结论 |
| Public API review | skip: 只改变NodeSelectionDrag内部手势，没有公共API或跨包接口变化 |
| Registry/doc changes | skip: 媒体设计明确保留，无注册表组件或公开文档语义变更 |
| Commit and PR | skip: 本轮未授权提交、推送或创建PR |

## Hypotheses

- 白色边框由媒体组件的self高亮声明产生。用源码与提交记录核对是否只覆盖单选或也明确覆盖多选。
- 松手事件可能未到达框选监听器。记录真实pointerup、mouseup和后续buttons为0的pointermove，避免先假定媒体组件吞掉了事件。
- 如果松手后选框已消失而节点仍选中，则与“继续框选”不同，需要按实际录屏进一步区分。

## Verification plan

复用现有www Playwright配置，在源码服务和真实Chrome上录制。先测当前实现，不替换产品事件处理器。若证实需要修复，最终复现需连续5次通过，并验证释放后移动不改变选择、点击可重新进入文本或媒体交互。

## Baseline findings

| 问题 | 结论 | 依据 |
| --- | --- | --- |
| 媒体用白色边框而非浅蓝覆盖层 | VERIFIED：当前明确实现及既有测试；多块框选的产品确认仍不明确 | zbeyens在2026-09-23的`0689161e6a`为File/Audio添加ring和self标记，为Image添加self标记；通用高亮主动跳过self。现有测试实际点击Image验证边框，没有验证跨媒体多选。 |
| 音频内部松手仍继续框选 | VERIFIED：5/5连续复现 | 原生鼠标松手后选框保留，内部移动扩大选框，移到外部让模型选区从[20]变为null。事件记录没有pointerup，后续pointermove的buttons为0。 |
| 包含文件和音频的联合框选 | VERIFIED：1次复现 | `native-joint-a1.log`，选中[18]图片、[19]文件、[20]音频，在音频内部松手没有pointerup，选框继续移动。这个手势包含图片，不作为仅两块的精确覆盖。 |
| PDF文件名、图标、行内空白独立松手 | NOT VERIFIED：本轮未复现用户报告 | Playground三种落点均正常结束；当前用户Chrome的media-demo文件名落点也收到pointerup且选框消失。用户明确反馈独立文件行也会触发，保留未解决。 |
| 图片内部松手 | NOT VERIFIED：这轮对照未复现 | `native-release-a1.log`的Image用例收到pointerup且停止框选。 |
| 指针捕获实验 | VERIFIED，限诊断实验 | 未改源码，只在测试页pointerdown时调用原生setPointerCapture；5/5收到pointerup、移除选框、无按键移动不改变选区。 |

## Repair plan

1. 只在`packages/platejs/src/react/components/NodeSelection.tsx`的`NodeSelectionDrag`内管理框选手势。开始真正的框选时，由editable捕获该pointerId，让在音频原生控件内的松手仍送达当前手势。
2. 正常松手、取消、失焦、只读切换和卸载共用现有结束/清理流程，并释放本手势的捕获。丢失捕获时也应结束当前拖动，避免遗留选框或滚动。已有ResizeObserver修复保留。
3. 检查左键状态。鼠标事件报告左键已松开时，不再用后续移动坐标扩选；不要等到下一次点击才结束。先测指针捕获是否足以覆盖真实丢失路径，再决定是否需要这一兜底。
4. 在现有浏览器测试文件保留一个真实音频控件回归，同时验证文件名和图片正常落点、联合选择、反向拖动与松手后再次点击。最终候选连续5次验证；增加便宜生命周期断言覆盖捕获清理。原生播放、文件打开和图片拖动仍能正常使用。
5. 媒体配色、Caption规则和Plite均不改。若实施时发现必须改Plite，先展示具体补丁范围并请示用户。新增产品改动仍留工作树，未经本次授权不提交或推送。

## Implementation

按获准方案直接扩展已有手势生命周期。`startGesture`调用editable的原生`setPointerCapture`。原来的`stopObserving`改为`clearGesture`，同时断开观察器、清空手势、释放本次捕获；先清空手势避免释放事件重入。`lostpointercapture`复用已有取消处理。

没有新增逐块或逐帧工作、计时器、按钮状态轮询或媒体类型判断。计划第3项要求先验证是否需要额外按钮状态兜底；原生捕获实验及已执行的产品回归均能直接收到松手事件，因此没有增加该备用路径。

已通过的正常操作对照包括右向左框选、Escape、音频播放暂停、文件链接请求和图片原生dragstart。文件响应在诊断用例中用最小PDF响应替换，证明链接可触发请求，不证明远端文件内容可用。

## Performance scope

捕获与释放每手势各一次，新增一个editor级lostpointercapture监听器，不依赖块数。既有1/5/20/100/1000候选、滚动100/1000候选的工作计数继续通过。这些是模拟布局下的确定性工作次数，不是帧率或速度测量；本轮只做正确性修复。

## Demo

1. 打开[修复后联合选择录屏](artifacts/block-selection-media-release-20261014/blockSelectionMediaReleaseFixed.webm)。右上角出现“左键已经松开”后，拖动选框已经消失；继续移动鼠标不会再扩选，已选中媒体保留原有白色边框。[旧版复现录屏](artifacts/block-selection-media-release-20261014/blockSelectionMediaReleaseBug.webm)用于对照。
   ![before](artifacts/block-selection-media-release-20261014/native-joint-results/media-joint.probe.ts-relea-b28b5-stops-marquee-on-Playground-chromium/released.png)
   ![after](artifacts/block-selection-media-release-20261014/final-controls-results/media-joint.probe.ts-relea-b28b5-stops-marquee-on-Playground-chromium/released.png)
2. 在`http://localhost:3301/blocks/playground`滚动到Images and Media，从音频行左侧空白开始框选，终点移到音频进度条中间并松手，再不按键移动鼠标。修复版应在松手时结束选框并保持原有选择。

## Follow-up check

用户反馈PDF异常似乎已随松手修复一起恢复。随后在3301源码服务追加文件名松手与包含文件和音频的联合选择，各连续5次，共10/10通过。已检查文件名松手后的截图，框选矩形消失，选中状态保持。证据为`docs/plans/artifacts/block-selection-media-release-20261014/pdf-confirmation-a1.log`。PDF不再单列已知待修问题；这不把此前未复现的历史轨迹改写为已复现。

本机GitHub CLI以sin6626只读检查了PR5165，远端头为`8fb64e747faba237e798803f75fb2035f9493072`。只fetch读取，没有合入任何工作树。PR正文、2条机器人讨论、0条代码评论，以及最新CI、Plite CI、Registry的附件列表均未提供新版高亮性能报告；这三次运行当时均无附件，CI当时仍在进行。原始G3脚本和日志路径不在最新Git树中，本机也无该同事的artifact目录。

同事提交了G3测量总结，属于合并前的jsdom修订视图压力测量，主判据是选择解析次数，不是普通Playground的浏览器耗时。最新计划Close明确说next的suggestion重写删除了该旧读取路径和缓存；Open work第432行明确说新版一万个选中块的高亮耗时尚未测量。[最新同事记录](https://github.com/udecode/plate/blob/8fb64e747faba237e798803f75fb2035f9493072/docs/plans/2026-10-13-pr-5165-redo.md#L432)。因此把这条分类为历史性能线索待复核，不作为当前已确认待修bug，不据此做性能优化。本轮没有运行新性能benchmark，也不宣称新版性能已无问题。

## Close

已按用户追加授权修复Block Selection内部的指针捕获生命周期。白色边框、Caption、媒体组件和Plite均未修改。产品代码与两个测试文件及既有未发布changeset共4个文件已提交为`236bb63e9b`，位于`codex/fix-block-selection-table`。未推送或合回主树，工作树合并不由本会话处理。本地诊断记录和录屏未纳入提交。

修复前的组件断言多选了两个块，原生音频松手后仍有1个选框而期望0个。最终组件37/37通过；音频松手和原有普通/75%缩放尺寸回归各连续5次，共15/15通过。另有7/7文件名、图标、文件行空白、音频、图片、联合选择及后续媒体操作对照通过。图片和联合选择的最终截图已打开检查，白色边框保留、拖动选框消失。

限定3个代码文件的lint无错误或警告。冻结快照`1ad5e1efaf286ef34726ca8d3dedc8fbfcc5eb6e`的独立代码质量和no-comments审查未发现待修复项，最终代码与被审阅快照相同。没有新注释、计时器或逐块扫描；模拟布局计数不作为帧率证据。

修复阶段任务清单24项完成；此前部分完成的PDF反馈结合用户复测和追加10次验证收尾，不再单列待修。新增的PDF复核和同事性能报告查证两项也完成。本轮没有新增产品代码。

验证范围为本地源码服务的Chromium。未运行全仓检查或跨浏览器矩阵。文件链接请求对照使用替换的PDF网络响应，不证明远端文件内容。用户Chrome诊断监听已清除，3301修复版服务与用户3000服务均保留。
