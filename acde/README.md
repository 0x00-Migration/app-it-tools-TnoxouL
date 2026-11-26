# IT-Tools 在 acde 上运行

上游：CorentinTh/it-tools（GPL-3.0，本衍生版本保持同一许可证）。Vue 3 单页应用，一百多个开发者小工具（编码、哈希、转换、生成器等），全部在页面内运行。

## 构建与运行

```bash
acde/build.sh                  # 安装依赖、构建、整理到 acde/public/
cd acde && acdev dev           # 或 acdev dev --headless
```

## 适配改动

| 问题 | 做法 |
| --- | --- |
| acdev 会重打包页面入口脚本；站点用根路径引用 | 成品放 `public/`，应用声明 `"entry": "/"`，`server.ts` 原样提供，无扩展名的路径回退到 `index.html`（Vue 路由用 history 模式） |
| 不需要 Service Worker | `build.sh` 构建前删掉 `src/main.ts` 里的 `registerSW` |
| `performance.measure` 引用不存在的标记等 | `acde-compat.js` 兜住异常，并让 `Node.prototype.nodeName`、`nodeType` 按节点类别回退 |

## 验证过的

首页工具列表、侧栏、路由跳转、Base64 编码（含中文）。其余工具未逐个验证。

## 限制

依赖浏览器的剪贴板、文件下载类工具在 acde 里可能受限；页面里有指向作者站点的链接，要联网使用。
