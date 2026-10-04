# 数据复盘与迭代决策 — 2026-10-04

范围：数据四态、GSC 表现与索引、上游数据新鲜度、公开渠道资产、Kill/Iterate/Scale 决策、下一轮运营计划。
模式：只读取数；无公开动作、无生产变更。
上轮基线：`orchestrator/ops-review-2026-09-13.md`（ITERATE，Plausible/GSC/Bing 缺登录态）。

## 当前结论

- **决策：ITERATE（维持，焦点收紧为"可见度恢复"）**。
- **本轮最重要的新证据：GSC 登录态已解锁**，首次读到真实趋势——近 28 天搜索可见度大幅下滑（0 点击 / 62 曝光 / 平均排名 29.4），7 月高点为约 3,800+ 曝光/月、排名 9.4。
- **上游数据新鲜度检查完成**：palcalc 已发布 v1.22.0（2026-09-18）；繁殖组合 0 变更（44,851 组语义完全一致），仅 1 处英文名变更（Snock Lux → Snock Terra）与多语言别名修正。站点数据准确性主张仍然成立。
- Plausible 面板与 Bing Webmaster 仍缺登录态；事件链路本轮 QA 已再次验证健康。

## 一、数据四态

| 数据源 | 状态 | 说明 |
|---|---|---|
| 事件上报链路（calculate/chain/share/outbound-click） | `verified` | 本轮 QA 网络拦截证明事件真实到达 Plausible 端点 |
| GSC（效果/索引/查询明细） | `verified` | 本轮解锁；数据更新至约 10-03 |
| 上游数据新鲜度（palcalc） | `verified` | v1.22.0 与 v1.17.6 全量 diff 完成（见下） |
| 公开渠道资产存活 | `verified` | GitHub / DEV / itch.io / Product Hunt 全部 200 |
| Plausible 面板（访客/来源/漏斗） | `blocked_waiting_login` | `plausible.shipsolo.io` 显示 Login 页 |
| Bing Webmaster | `blocked_waiting_login` | about 页显示 Sign In |
| Plausible 28 天漏斗明细 | `missing` | 依赖面板登录态或共享链接 |

## 二、GSC 数据（本轮新读）

### 表现对比

| 口径 | 点击 | 曝光 | CTR | 平均排名 |
|---|---|---|---|---|
| 近 3 个月（2026/7/17–9/29） | 65 | 4,200 | 1.5% | 11.5 |
| **近 28 天（2026/9/2–9/29）** | **0** | **62** | **0%** | **29.4** |
| 历史快照（2026-07-29） | 65 | 3,820 | 1.7% | 9.4 |

解读：65 次点击全部产生于 7 月中至 9 月初；近 4 周曝光萎缩到约 62/月（约为 7 月水平的 1/60），且展示时排名在第 3 页（29.4）。这印证了上轮 P1 风险预判：1.0 热点窗口消退 + 新 EMD 竞争进入 SERP。**"65 次点击"在三轮快照中数值相同，若只看累计数会完全掩盖这次下滑——必须用窗口对比读数。**

### 近 28 天热门查询（22 个词，全部 0 点击）

`palcalc`(6) / `palworld breeding calculator 1.0`(5) / `pal breeding calculator 1.0`(4) / `breeding palworld wiki`(3) / `palworld 1.0 breeding calculator`(3) / `pal calc`(2) / 其余各 1。

查询意图仍然真实存在且与站点定位一致；问题是排名与展示量，不是需求消失或定位偏移。

### 索引覆盖（更新至 2026/9/21）

- 已编入索引：**6**；未编入索引：**12**（其中 5 个 www 重定向 + 1 个备用规范页为预期变体）。
- **"已发现 - 尚未编入索引"：6 个** — `/contact/`、`/disclaimer/`、`/privacy/`、`/terms/`、`/how-to-use/`、`/guide/breeding-basics/`。
- 已索引的 6 个覆盖核心路径（首页、combos、chain、guide、data-sources、about）。9-06 重提 sitemap 后索引数未增长。

## 三、上游数据新鲜度（palcalc）

| 项 | 结果 |
|---|---|
| 上游最新版 | v1.22.0（2026-09-18 发布）；站点锁定 v1.17.6（2026-07-18 生成） |
| breeding.json 语义 diff | **0 字段差异**；44,851 组合逐组一致（仅行序变化）。站点 sha256 溯源与 v1.17.6 原文件精确匹配 |
| db.json Pal 增删 | 0 增 0 删（299 = 299） |
| db.json 字段变更 | `ElecSnail_Ground` 英文名 **Snock Lux → Snock Terra**（全语言）；`RockBeast`/`RockBeast_Ice` 6 个非英语言修正（Kuprok→Pierdon）；zh-Hans/zh-Hant 2 处用字规范化；`GhostBlackCat` 饱食度字段修正（站点未使用该字段） |

影响评估：
- **P0 数据准确性风险：未触发**。核心繁殖组合与上游最新版完全一致，站点的版本承诺（v1.17.6 边界声明）依然诚实准确。
- **P2 内容新鲜度**：站内 "Snock Lux" 显示名已与上游最新英文名不一致；`/data-sources/` 尚无"数据复核日期"声明。修复路径：走 import(v1.22.0) → candidate → production validator → cross-source → Owner 批准 → 重建发布；属低风险内容更新，同时可作为页面的新鲜度信号。

## 四、公开渠道资产

GitHub repo / DEV 文章 / itch.io 页面 / Product Hunt 页面全部 200 存活。Reddit r/Palworld 维持 permission-gated（无版主许可不发外链）。Steam Guide、Wiki Discord 仍等 Owner 账号操作。

## 五、决策：ITERATE（维持）

- **不 KILL**：核心功能零缺陷（本轮 QA GO）；数据准确性经上游全量 diff 证明仍成立；零维护成本；7 月数据证明存在真实搜索需求与点击能力（排名 9.4 时能拿 65 点击）。
- **不 SCALE**：近 28 天曝光 62、排名 29.4、0 点击；索引 6/12 无增长；事件漏斗明细未解锁。此刻放量（实体页 300 张、付费推广）没有数据支撑。
- **ITERATE 焦点从上轮的"数据解锁"转移为"可见度恢复 + 数据小更新"**。上轮三大修复（部署/301/Plausible）已闭环；本轮的新瓶颈是搜索可见度下滑。

## 六、下一轮运营计划

### 立即（本周，无需 Owner 的新增授权）

1. **数据集更新到 v1.22.0**：import → candidate → 全套 validator → 交叉验证 → **Owner 批准后** promote + rebuild + 部署。变更面极小（1 个英文名 + 别名修正），同时把 `/data-sources/` 加上"数据复核日期：2026-10-04，已核对上游 v1.22.0，组合无变化"声明。这是最合法的新鲜度信号。
2. **IndexNow 一次性提交 12 个 canonical URL**（Bing 自助 API，无需登录后台；上轮计划第 3 项尚未执行）。
3. **内链补强**：从已索引的 6 页（首页/guide/data-sources/about/combos/chain）向 `/how-to-use/` 与 `/guide/breeding-basics/` 增加语境化内链，针对 2 个卡在 Discovered 的内容页；4 个法务页不强推。

### 需要 Owner 的卡点（回复即可解锁）

4. **Plausible 登录**：浏览器登录 `plausible.shipsolo.io` 保持打开，或提供共享链接——解锁 28 天访客/来源/漏斗，判断搜索外的渠道是否有留存流量。
5. **Steam Guide / Wiki Discord**：等 Owner 的 Steam/Discord 登录态；流程不变（先私密 QA、permission-first）。

### 观察（2–4 周后复查口径）

6. GSC 窗口对比（不是累计数）：28 天曝光/点击/排名 vs 本轮基线（62 / 0 / 29.4）。
7. 索引 delta：6→? 已索引；重点看 `/how-to-use/`、`/guide/breeding-basics/`。
8. 数据更新部署后 GSC 是否出现重新抓取。

### 触发式（维持上轮闸门）

9. 实体页小批量实验：闸门从"新 source revision"修订为"v1.22.0 数据更新上线且 28 天可见度止跌"；仍选 8–12 个高意图 Pal，不做 300 薄页。
10. 公式页维持 noindex。

## 七、风险（更新）

- P0（未变）：繁殖数据准确性是核心价值；本轮上游 diff 证明当前仍准确，v1.22.0 更新后继续以哈希与版本声明约束。
- P1（升级）：搜索可见度近 28 天崩塌（62 曝光/排名 29.4）；若 2 个周期内控措施（数据更新+IndexNow+内链）无效且无渠道流量补充，需要 Owner 决策是否接受长尾维护模式。
- P1（未变）：`Palworld` 品牌词与非官方边界。
- P2（更新）：数据集显示名 Snock Lux 与上游 v1.22.0 不一致；待 v1.22.0 更新闭环。
- P2（维持）：Plausible/Bing 登录态缺失；Steam/Discord 渠道等 Owner。

## 八、经验回流（回写复盘纪律）

1. **GSC 读数必须用窗口对比**：累计点击数在多轮快照中可能完全相同（65/65/65）而掩盖趋势崩塌；周报固定加"近 28 天 vs 上一个 28 天"。
2. **上游新鲜度检查的廉价权威方法**：GitHub API 拉两个 tag 的数据文件 blob SHA → 不同则下载做语义 diff；本轮 10 分钟内完成"组合 0 变更 + 1 处改名"的结论，避免了盲目重跑全套导入。
3. **Plausible v2 自带 Form: Submission 自动事件**：复盘口径要与自定义 calculate/chain 事件区分，避免把表单事件当工具使用量。

`REVIEW_DONE — ITERATE 维持；可见度恢复与 v1.22.0 数据更新为下一轮主线；无未经授权的外部动作。`
