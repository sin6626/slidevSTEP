# STEP 学习资料

## Knowledge

- [ISTQB Advanced Level Test Manager syllabus, 2012](https://istqb.org/wp-content/uploads/2024/11/CTAL_TM_2012_Syllabus_v2.0.pdf#page=62)
  官方历史版本。第 5.7 节、正文第 62 至 63 页解释 STEP 的定位、生命周期活动。第 63 页原文列出七项基本前提，报告按其顺序译述，不改称自拟的若干核心理念。用于理解模型；不是对当前考试大纲的说明。
- [Craig 与 Jaskiel：Systematic Software Testing，出版社授权试读](https://api.pageplace.de/preview/DT0400.9781580537926_A25416955/preview-9781580537926_A25416955.pdf#page=41)
  第一章正文第 10 至 21 页介绍 STEP；第 14 页表 1-3 列出三阶段与八项活动，第 15 至 16 页说明各层级测试活动的开展时间与重叠，第 17 页说明 testware，第 20 页概括需求期规划和编码前测试设计。此 PDF 的物理页码比书内印刷页码大 31，例如表 1-3 在印刷第 14 页、PDF 第 45 页。
- [Artech House 出版社书籍介绍](https://uk.artechhouse.com/The-Systematic-Software-Testing-Handbook-P778.aspx)
  核对作者、出版信息及本书的风险分析、测试管理和预防性测试主题。

- [Martin Fowler：Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
  用于讲稿里 TDD 循环的独立出处，不用 STEP 文献替代 TDD 定义来源。

## 页码与引用范围

- 原书印刷第 4 至 5 页：预防性测试与 ATM 示例，PDF 第 35 至 36 页。退课情境是另设的教学示例。
- 原书第 10 至 13 页：范围、组成、输入条件与裁剪，PDF 第 41 至 44 页。
- 原书第 14 页表 1-3：三阶段与八项活动，PDF 第 45 页。
- 原书第 15 至 17 页图 1-5、1-6、1-7：层级时序、活动重叠与测试工作产物，PDF 第 46 至 48 页。报告图是据来源重绘，并非原书图片。
- 原书第 20 至 21 页及表 1-5：预防与风险管理、活动时机、相对清单的覆盖、过程可见性，PDF 第 51 至 52 页。比较对象是书中当时的行业实践，不外推今日行业现状。
- ISTQB 2012 第 62 至 63 页 §5.7：内容参考模型、生命周期和七项基本前提，以及与 TPI Next 结合的说明。不是当前考试要求，也不与原书的活动表混作同一清单。

## Plate 案例的原始资料

- [Plate PR #5175：页面健康检查与人工测试指南](https://github.com/udecode/plate/pull/5175)
  2026-10-18 使用本机 GitHub CLI 核对 PR 描述、实际 diff 与合并状态。2026-10-16 合入 `next`，固定 head 为 `93bc5098cb2116a5ebade694f3706b1e9139499d`。第 13 至 17 页按此版本讲述，合并不等于首轮人工测试或方法试验已完成。
- [该版本的测试总计划](https://github.com/udecode/plate/blob/93bc5098cb2116a5ebade694f3706b1e9139499d/docs/plans/2026-10-15-regression-sweep.md)
  Decisions 和 Skill trials 说明评估预写检查清单后转向计时现场探索；Round 1's planted-bug trial 是候选六动作与自由探索的待执行比较。步骤 1.1–1.5 交付工具与规则；1.6–1.11 以及 2.1 的浏览器回归 CI 门禁仍是后续工作。计划内历史构建记录有各自限制，不等于所有检查全绿。
- [该版本的 Tester pass 指南](https://github.com/udecode/plate/blob/93bc5098cb2116a5ebade694f3706b1e9139499d/.agents/rules/verify/references/tester-pass.md)
  页面范围与对照、计时录屏探索、浏览器轮换、问题记录、已知缺陷复查及下一轮规则。发现未知问题、复查已知问题和自动化回归保护各有作用；满足测试层级和浏览器 CI 条件后才减少对应人工复查。

## Wisdom

- 本课程老师及课堂讨论。用于确认老师对 STEP 的中文术语、报告深度和案例要求。

## Gaps

- 尚未提供课程课件、报告要求和评分标准。现有讲解以公开原始资料为准。
