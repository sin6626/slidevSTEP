# STEP 模型课程报告

18 页 Slidev 课程报告，面向老师和同学介绍 STEP 的定位、基本前提、流程图、三阶段八项活动、开发时序、特点与实施边界，以及与其他模型的配合。基本前提完整译述 ISTQB 2012 §5.7 的七项，活动和图表依据 Craig 与 Jaskiel 原书，不自行增删归并为四点或五点。Plate 组件重构的测试规划、资源准备、执行和评价作为项目级辅助案例。最后一页为“谢谢大家”。

继续使用 [luoling8192/talks 的 Vue Conf 2026 模板](https://github.com/luoling8192/talks/tree/9282cede8f16cc0dd82e21f94b2bc7736a643a3d/packages/2026-vueconf-agent-vue-way)，保留柔光背景、Nunito 与寒蝉半圆体字体、留白和点击展开效果。

```sh
pnpm install
pnpm dev
```

打开 <http://localhost:3030>，按右方向键依次展开内容，按下方向键进入下一页。打开 <http://localhost:3030/presenter/1> 查看演讲者备注。

内容位于 [slides.md](./slides.md)，样式位于 [style.css](./style.css)。STEP 总流程图使用可编辑的 Mermaid 代码，包含阶段连接与评估反馈。`pnpm build` 构建静态站点，`pnpm export` 使用 Slidev 的 PDF 导出功能，`pnpm check` 核对页数、备注、七项基本前提及出处、流程图与八项活动、证据引用及文件指纹。

封面署名默认为 `sin6626`。部署时可通过构建环境变量设置显示名称：

```sh
VITE_PRESENTER_NAME='演讲者姓名' pnpm build
```

本地预览也可在项目根目录的 `.env.local` 中设置 `VITE_PRESENTER_NAME=演讲者姓名`，然后重新运行 `pnpm dev`。`.env.local` 已由 Git 忽略，不要将真实姓名写入受版本控制的文件。变量未设置或为空时仍显示 `sin6626`。署名会写入构建产物，修改后需重新构建并部署。

Plate 案例依据 2026-10-16 整理的固定资料快照。分工提案、待准备环境和未执行试验均保留状态说明，不作为已完成的正式测试结果，也不声称团队正式采用了完整 STEP。资料主要说明重构期间的测试组织与改进，不能据此证明原始需求和设计阶段已经完整开展预防性测试。来源与核验范围见 [docs/EVIDENCE.md](./docs/EVIDENCE.md)。

当前幻灯片引用的资料副本位于 `public/evidence/`，原路径与 SHA-256 见 `manifest.json`。此前单缺陷案例的证据继续留作归档，不用于当前课程页的整体通过结论。原 12 页版录屏不包含这次扩展的内容。
