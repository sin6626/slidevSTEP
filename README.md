# STEP 模型课程报告

12 页 Slidev 幻灯片，以 Plate Details 修复为主案例，列表样式诊断为补充。按 STEP 的策划、获取测试部件、测量行为三个阶段分析实际工作。

```sh
npm install
npm run dev
```

打开 <http://localhost:3030>，按左右方向键翻页；打开 <http://localhost:3030/presenter/1> 查看演讲者讲稿。

内容位于 [slides.md](./slides.md)，样式位于 [style.css](./style.css)。运行 `npm run build` 构建静态站点；运行 `npm run export` 可使用 Slidev 的 PDF 导出功能。

截图、JSON 和日志副本位于 `public/evidence/`，原路径与 SHA-256 见 `manifest.json`。结论及证据边界见 [docs/EVIDENCE.md](./docs/EVIDENCE.md)：使用已核对的历史记录，本次没有重新运行 Plate 测试；列表诊断通过不代表修复成功。
