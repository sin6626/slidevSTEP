# 幻灯片证据说明

核对日期为 2026-10-14。这次读取原始截图、JSON、测试日志和修复记录，未重新执行 Plate 测试。幻灯片使用历史测试结果，不能证明目前分支或所有浏览器均通过。

## Details 主案例

原记录目录位于 `/Users/sin/.codex/worktrees/8c90/plate/docs/plans/artifacts/` 的 `details-caret-2026-10-11` 与 `details-followup-2026-10-11`。保留目录名作为记录批次标识，不根据目录名推断精确执行时间。

`final-source.json` 记录基础 HEAD `a924f121440c5d87baaa4236d5747d45d59661fb`，还记录了六个测试及实现文件的 SHA-256。当时包含未提交修改，因此该 HEAD 本身不足以标识被测代码。

| 幻灯片中的结论 | 已核对的原始证据 | 边界 |
| --- | --- | --- |
| Playground 中闭合标题末尾按 ArrowRight 后，内部选区进入隐藏正文；输入 XYZ 后展开可看到正文前缀被改 | `playground-right-r0.json` 的 End、ArrowRight、typed XYZ、reopened after typing；配套 `playground-right-r0-reopened.png` | 这是方向键场景，不能当作首次鼠标折叠场景的截图 |
| 修复后外层与内层折叠的可见光标位于标题末尾 | `playground-outer-visible-caret.json/png`、`playground-inner-visible-caret.json/png` | JSON 中 model 与 dom 一致、focused 为 true、光标矩形高为 18；内层与外层是不同场景 |
| 控件接管选区前的导出契约失败 | `handoff-red.log` | 应为 true，实际为 false；日志为 1 failed、22 passed |
| Details 分区通过 32 项 | `structure-final.log` | 32 pass、0 fail，两个测试文件 |
| 选区相关契约通过 91 项 | `selection-final.log` | 三个文件的历史结果，不等于 91 个 Details 用例 |
| 浏览器重复执行通过 50 次 | `five-repeats.log` | 两个页面、五类动作、重复五轮，共 10 个用例执行 50 次；不要说有 50 个不同用例 |
| 回归检查通过 20 项 | `regression.log` | 包含 Details 光标、选区、浮动链接工具栏和文本滚动；不是全部仓库测试 |

已核对 `apps/www/tests/browser/details-disclosure.spec.ts`，其中 first collapse 使用原生鼠标点击正文和折叠按钮，检查 model、dom、focus，随后输入 XYZ 并撤销。它与使用 End 定位后测试 ArrowRight 的场景不同。

该脚本断言标题追加 XYZ、选区及焦点，撤销后标题恢复；没有单独断言隐藏正文全文不变。幻灯片把正文保护列为补充的验收条件，并不声称历史脚本已经完整覆盖。实际脚本的原样副本为 `public/evidence/details-disclosure.spec.txt`。

修复策略来自原 `plan.md` 与保存的源码：在共享 selection-controller 的 app-owned 控件选区交接处清除过时的 native-user 来源；结构编辑由 Details 插件负责。正文已折叠时，内容仍存在于模型中。幻灯片只解释这些观察到的行为，不宣称全仓库 CI、其他浏览器、合并或发布已经完成。

技术分享版再次核对了 `details-source.json` 中六个源码文件的 SHA-256，均与原 worktree 一致。新增保存 `details-selection-controller.txt` 与 `details-plugin.txt` 两份原样源码，供复核展示的代码摘录；前者第 619–625 行为选区交接修复，后者第 574–580 行为真空段落判定、第 330–336 行为按目标路径解包。

## 列表样式补充案例

原目录 `/Users/sin/Documents/Project/PlateCompany/plate/docs/plans/artifacts/list-style-diagnosis/`。已查看 Circle.png，并核对 replay.log 与 replay.spec.ts。

| 操作 | 模型 listStyle | 计算样式 listStyleType |
| --- | --- | --- |
| Circle | circle | disc |
| Square | square | disc |

日志的 `1 passed` 表示诊断脚本执行完成、没有记录到运行时错误；脚本没有断言列表样式已正确显示。这份记录没有列表修复后的证据，报告必须写“完成诊断，修复状态不由此证明”。

诊断脚本的原样副本为 `public/evidence/list-diagnosis.spec.txt`；Details 的修复记录副本为 `public/evidence/details-plan.md`。

## 可复核材料与来源

选用的原图、JSON、日志保持字节不变，副本位于 `public/evidence/`。`manifest.json` 记录原路径和 SHA-256，便于核对。JSON 含完整编辑器示例文档，课堂展示仅抽取与选区有关的字段。

- [经典 STEP 三阶段及八项活动：Systematic Software Testing 第 14 页](https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=44)
- [STEP 的生命周期与预防思想：ISTQB 2012 大纲第 5.7 节](https://istqb.org/wp-content/uploads/2024/11/CTAL_TM_2012_Syllabus_v2.0.pdf#page=62)

本报告用 STEP 对实际缺陷修复进行事后分析。风险优先级、验收表和阶段对应是报告整理的表达，不冒称团队当时采用了完整 STEP，也不把补充的计划当作执行事实。

## 第一版幻灯片验证记录

- Slidev 解析结果为 12 页，每页均有演讲者备注；本地证据引用均存在。
- 17 个证据副本的 SHA-256 与清单一致，且与原文件逐字节一致。
- `npm run build` 通过。逐页打开 1920×1080 浏览器画面，检查图片加载、内容边界及页脚，未发现越界或重叠。
- 左右方向键翻页及 `/presenter/1` 的讲稿显示通过；第 7 页补充说明在 1280×720 画面中再次检查通过。
- 浏览器自动检查关闭了 Slidev 的屏幕常亮请求，以避免无头浏览器的权限限制；未修改课程内容或 Plate 程序。

## 技术分享模板来源

模板为 [luoling8192/talks 的 Vue Conf 2026 分享](https://github.com/luoling8192/talks/tree/9282cede8f16cc0dd82e21f94b2bc7736a643a3d/packages/2026-vueconf-agent-vue-way)，核对版本为 `9282cede8f16cc0dd82e21f94b2bc7736a643a3d`。参考了封面、代码双栏、三步流程、映射行和验收矩阵，实际渲染了其中的代码、矩阵、流程与映射页。

复用文件为 `global-bottom.vue`、`setup/main.ts` 及 `style.css` 中的基础字体、留白、代码与转场样式。背景保留原作者对 pi0、Atinux 的署名。每页显式设置色相，不沿用原演讲第 8–22 页的进度。课程正文、真实代码摘录、选区示意和备注重新编写；没有借用原作者头像、讲者身份或 Agent 项目素材。

## 技术分享版验证记录

- `npm run check` 与 `npm run build` 通过：12 页、12 份讲稿、本地证据引用及 19 个证据指纹。
- 19 份证据副本与清单中的原文件逐字节一致；4 段 TypeScript 展示代码与实际源码一致，仅调整排版空白。列表日志摘录保留真实字段层级，Circle / Square 对应的 marker 均为 disc。
- 在 1280×720 Chromium 中逐页渲染、截图并人工查看全部 12 页；图片加载成功，正文、代码与来源说明没有越界，代码没有横向溢出。调整了大截图高度及非高亮行的可读性后再次检查。
- 检查第 2、6、8、12 页的右键展开与左键退回，第 2 页下键进入下一页，以及 `/presenter/1` 的讲稿显示；均通过。浏览器未记录页面异常或 HTTP 错误。
- 检查时关闭无头浏览器的屏幕常亮请求；未修改 Slidev 交互设置，也未重新执行 Plate 测试。
