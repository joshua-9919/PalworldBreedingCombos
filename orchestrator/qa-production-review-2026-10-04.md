# 生产 QA 例行复验 — 2026-10-04

范围：本地生产构建与校验脚本、生产站点技术检查、真实用户任务复测、移动端与控制台。
模式：只读审计 + 生产真实用户任务复测；除页面内真实交互产生的分析事件外，无任何公开动作或第三方修改。
上轮基线：`orchestrator/ops-review-2026-09-13.md`（QA_GO，P0=0/P1=0）。

## 当前结论

- **QA Gate：GO（维持）**。本轮 P0=0、P1=0、P2=0（新增缺陷为零）。
- 生产内容与本地构建完全一致（analytics.js 与 dataset.json 内容哈希逐一匹配），无未同步漂移。
- 全部核心用户任务、事件上报、URL 状态、移动端 390px、控制台复测通过。

## 一、本地构建与校验脚本

| 检查 | 结果 |
|---|---|
| `npm run build` | PASS；300 Pals、44,851 combinations、13 pages |
| `npm run check` | PASS；14 HTML files（含 404） |
| `npm run check:compliance` | PASS；5 legal routes、1 approved external script、0 prohibited claims |
| `npm run check:chain` | PASS；3 dependency steps、0 irrelevant branches |
| `npm run check:pairs` | PASS；Astralym same-species regression |
| `node scripts/validate-data.mjs data/launch/dataset.json` | PASS（exit 0，status valid） |
| `node scripts/verify-cross-source.mjs ...` | PASS；2 evidence sources、6 assertions |

## 二、生产技术检查

| 检查 | 结果 | 证据 |
|---|---|---|
| 13 条公开路由 | 全部 200 | `curl` 状态码逐条 |
| 未知路由 | 404 + `noindex,nofollow` | `/nonexistent-route-404check/` |
| `www` → 根域 301 | PASS；保留 path+query | `www.../combos/?target=astalym` → 根域同路径 |
| 工具页数据注入 | PASS | `/`、`/combos/`、`/chain/` 均含 `data-dataset-url="/assets/dataset.json?v=505154c69d5d"` |
| 非工具页懒加载 | PASS | `/privacy/`、`/guide/`、`/data-sources/` 注入数为 0（不请求 7.2MB 数据集） |
| Plausible 脚本 | PASS | `plausible.shipsolo.io/js/pa-Tuwmm86GExPpwNCxPPO8b.js` 在线 |
| 版本一致性 | PASS | 生产 `analytics.js` sha256 `471e067365bbd654…` = 本地 dist；`dataset.json` sha256 `505154c69d5d888f…` = 本地 dist |
| robots.txt | PASS | `User-agent: * Allow: /` + sitemap 声明 |
| sitemap.xml | PASS；200，12 个 canonical URL | 与上轮一致的 12 条 |
| `/guide/breeding-formula/` | 维持 `noindex,nofollow` | 符合既定数据边界决策 |

## 三、真实用户任务（浏览器复测）

| 任务 | 结果 |
|---|---|
| Parents → Child：`Snock + Dinossom → Reindrix` | PASS；`versioned lookup` / `verified` / 数据集与生成日期完整显示 |
| `calculate` 事件（parents 模式） | PASS；网络拦截 `{"mode":"parents","result":"reindrix"}` 到达 Plausible 端点 |
| `share` 事件 | PASS；`{"path":"/","mode":"parents"}` 上报 |
| 剪贴板复制 | 环境预期降级：自动化会话无 user activation 时显示 "Copy failed — copy the URL from your address bar"（优雅降级文案，非缺陷） |
| 分享 URL 状态恢复 | PASS；`?mode=parents&parentA=snock&parentB=dinossom` 打开后表单恢复为 `163 · Snock` / `84 · Dinossom` 并自动渲染结果 |
| Target → Parents：`Astralym` | PASS；同种反查 1 对，`resultCount:1`，事件 `{"mode":"target","target":"astralym"}` |
| Owned Pals → Chain：Lamball+Cattiva → Anubis | PASS；58 步最短链渲染，事件 `{"target":"anubis","steps":58}` |
| 移动端 390×844 横向溢出 | PASS；`/`、`/combos/`、`/chain/`、`/data-sources/` 的 scrollWidth 均 390 |
| `/data-sources/` 长 SHA 换行 | PASS；390px 无溢出（历史修复持续有效） |
| 移动端视觉 | PASS；截图确认首页 hero/按钮/数据卡单列布局正常、无重叠错位 |
| 控制台错误 | PASS；全部任务全程 0 error、0 unhandled rejection |

### 环境备注（非站点缺陷）

- IAB 自动化后端的 Playwright role 点击、坐标点击、Enter 键事件均无法送达页面处理器（与 2026-09-13 记录一致）。本轮按同一先例改用 `requestSubmit()` 与页面内 `.click()` 触发等效真实路径：二者均走与真实用户点击相同的 submit/click 处理器，功能与事件结论不受影响。
- QA 中观察到 `Form: Submission` 事件随 calculate 一起上报：确认来自 Plausible v2 脚本（`pa-Tuwmm86GExPpwNCxPPO8b.js`）内置的自动表单追踪，非站点埋点缺陷；复盘口径中需与自定义事件区分。

## 四、Gate 结论

- **QA：GO**（P0=0 / P1=0 / 新增 P2=0；生产与源码一致）
- 复测全程无返修项，无需返修闭环。

`QA_GO — 2026-10-04 例行复验通过，无新缺陷。`
