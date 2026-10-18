# STEP 模型课程报告

12 页 Slidev 课程报告，面向老师和同学介绍 STEP 的三个阶段、八项活动，以及测试如何贯穿需求、设计和编码。退课需求作为教学示例，Plate 的测试计划及 BlockSelection 音频松手案例作为辅助实践。最后一页为“谢谢大家”。

继续使用 [luoling8192/talks 的 Vue Conf 2026 模板](https://github.com/luoling8192/talks/tree/9282cede8f16cc0dd82e21f94b2bc7736a643a3d/packages/2026-vueconf-agent-vue-way)，保留柔光背景、Nunito 与寒蝉半圆体字体、留白和点击展开效果。

```sh
pnpm install
pnpm dev
```

打开 <http://localhost:3030>，按右方向键依次展开内容，按下方向键进入下一页。打开 <http://localhost:3030/presenter/1> 查看演讲者备注。

内容位于 [slides.md](./slides.md)，样式位于 [style.css](./style.css)。`pnpm build` 构建静态站点，`pnpm export` 使用 Slidev 的 PDF 导出功能，`pnpm check` 核对页数、备注、八项活动编号、证据引用及文件指纹。

Plate 规划依据 2026-10-16 整理的固定资料快照。分工提案、待准备环境和未执行试验均保留状态说明，不作为已完成的正式测试结果。BlockSelection 的历史文档、现有测试源码和本轮实拍分开标注，运行范围见 [docs/EVIDENCE.md](./docs/EVIDENCE.md)。

当前幻灯片引用的证据副本位于 `public/evidence/`，原路径与 SHA-256 见 `manifest.json`。此前版本的证据继续保留在该目录，作为归档，不用于当前课程页的案例或通过结论。
