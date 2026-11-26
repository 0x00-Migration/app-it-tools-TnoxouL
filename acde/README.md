# IT-Tools 在 acde 上运行

上游：CorentinTh/it-tools（GPL-3.0，本衍生版本保持同一许可证）。Vue 3 单页应用，一百多个开发者小工具（编码、哈希、转换、生成器等），全部在页面内运行。

## 构建与运行

```bash
git submodule update --init   # 取兜底脚本 acde/runtime-shims
acde/build.sh                  # 安装依赖、构建、整理到 acde/public/
cd acde && acdev dev           # 或 acdev dev --headless
```

## 适配改动

| 问题 | 做法 |
| --- | --- |
| 站点用根路径引用资源 | 构建产物的 `index.html` 作为入口放在 `acde/`，其余文件放 `public/`；acdev 原样保留指向 `public/` 的根路径引用，不需要后台 |
| 不需要 Service Worker | `build.sh` 构建前删掉 `src/main.ts` 里的 `registerSW` |
| `performance.measure` 引用不存在的标记；`Node.prototype.nodeName`、`nodeType` 取值不对，DOMPurify 渲染 Markdown 时误删节点 | 子模块 `acde/runtime-shims`（[acde-runtime-shims](https://github.com/TnoxouL/acde-runtime-shims)）构建时注入兜底脚本 |

## 验证过的

首页工具列表、侧栏、路由跳转、Base64 编码（含中文）。其余工具未逐个验证。

## 限制

依赖浏览器的剪贴板、文件下载类工具在 acde 里可能受限；页面里有指向作者站点的链接，要联网使用。
