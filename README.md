# STEP 模型课程报告

12 页 Slidev 幻灯片，以 Plate Details 修复为主案例，列表样式诊断为补充。按 STEP 的策划、获取测试部件、测量行为三个阶段分析实际工作。

使用 [luoling8192/talks](https://github.com/luoling8192/talks/tree/9282cede8f16cc0dd82e21f94b2bc7736a643a3d/packages/2026-vueconf-agent-vue-way) 的 Vue Conf 2026 模板，复用柔光背景、Nunito / 寒蝉半圆体字体、点击展开和代码版式。内容围绕真实复现、选区交接、结构修复及测试断言展开。

```sh
npm install
npm run dev
```

打开 <http://localhost:3030>，按右方向键依次展开内容，按下方向键进入下一页；打开 <http://localhost:3030/presenter/1> 查看演讲者讲稿。

内容位于 [slides.md](./slides.md)，样式位于 [style.css](./style.css)。运行 `npm run build` 构建静态站点；运行 `npm run export` 可使用 Slidev 的 PDF 导出功能。

运行 `npm run check` 核对页数、讲稿、证据引用和原始文件指纹。

截图、JSON 和日志副本位于 `public/evidence/`，原路径与 SHA-256 见 `manifest.json`。结论及证据边界见 [docs/EVIDENCE.md](./docs/EVIDENCE.md)：使用已核对的历史记录，本次没有重新运行 Plate 测试；列表诊断通过不代表修复成功。
