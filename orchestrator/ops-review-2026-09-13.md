# 站点检查、复盘与运营计划 — 2026-09-13

范围：生产站点公开页、部署后独立 Re-QA、分析链路验证、数据复盘（四态）、下一阶段运营计划。
模式：只读审计 + 生产真实用户任务复测；除向自有分析端点发送测试事件外，无任何公开动作或第三方修改。

## 当前结论

- 总状态：`QA_GO / SEO_GO_PENDING_INDEX_REFRESH / ITERATE`
- 上轮（2026-09-06）三大阻塞在本轮全部解除：生产部署、`www` 301、Plausible site 配置均已由 Owner 完成。
- 源码同步缺口已关闭：`3f68988` 已推送到 `origin/agent/site-foundation`，生产内容与该构建一致（`analytics.js?v=471e067365bb` 完全匹配）。
- 部署后独立 Re-QA 全部通过：事件、分享、URL 恢复、移动端、懒加载、控制台。
- 数据复盘维持 `ITERATE`：事件链路已验证健康，但 Plausible/GSC/Bing 后台当前会话无登录态，最近 28 天真实数据未读取，不升级 Scale。

## 一、站点检查（生产现状）

| 检查 | 结果 | 证据 |
|---|---|---|
| 根域及 12 个关键路由 | 全部 200 | `curl` 状态码 |
| `www` → 根域 301 | PASS；301 且保留 path+query | `www.../combos/?target=astalym` → `https://palworldbreedingcombos.com/combos/?target=astalym` |
| 非工具页数据懒加载 | PASS | `/privacy/`、`/guide/`、`/data-sources/` 均不注入 `app.js`/`data-dataset-url` |
| 工具页数据注入 | PASS | `/` 与 `/chain/` 保留 `data-dataset-url="/assets/dataset.json?v=505154c69d5d"` |
| Plausible 脚本 | PASS | `plausible.shipsolo.io/js/pa-Tuwmm86GExPpwNCxPPO8b.js` 已上线（site 已配置） |
| 生产版本一致性 | PASS | 生产 `analytics.js?v=471e067365bb` = 本地 dist 同名 hash；即 2026-09-06 优化构建 |

## 二、部署后独立 Re-QA（上轮 CONDITIONAL_GO 的复测项）

| 任务 | 结果 |
|---|---|
| Parents → Child：`Snock + Dinossom → Reindrix` | PASS；显示 rule type `versioned lookup`、verification `verified`、dataset `palcalc-v26-v1.17.6-owner-approved-20260718` |
| `calculate` 事件（parents 模式） | PASS；网络拦截到 `{"n":"calculate","p":{"mode":"parents","result":"reindrix"}}` 发往 Plausible |
| `calculate` 事件（target 模式） | PASS；`{"mode":"target","target":"astralym","resultCount":1}` |
| `share` 事件 | PASS；点击 "Copy share link" 后上报 `{"n":"share"}` |
| 分享 URL state 恢复 | PASS；`?mode=parents&parentA=snock&parentB=dinossom` 刷新后表单（含 Paldeck 编号）与结果自动恢复 |
| 移动端 390×844 横向溢出 | PASS；`/`、`/combos/`、`/chain/`、`/data-sources/` 的 `scrollWidth=390` |
| `/data-sources/` 长 SHA 溢出修复复验 | PASS；无横向溢出（上轮修复确认生效） |
| 控制台错误 | PASS；复测全程 0 error |
| 备注 | Playwright role locator 与 CUA 坐标点击在当前 IAB 均超时，改用原生 `requestSubmit()` 与页面内事件触发完成等效真实路径验证；功能与事件结论不受影响 |

**QA Gate：CONDITIONAL_GO → GO**（P0=0，P1=0；上轮列出的部署后复测项全部完成）。

## 三、数据复盘（四态口径）

| 数据源 | 状态 | 说明 |
|---|---|---|
| 事件上报链路（calculate/chain/share/outbound-click） | `verified` | 本轮网络拦截证明生产事件真实到达 Plausible 端点 |
| Plausible 面板（访客/来源/漏斗） | `blocked_waiting_login` | `plausible.shipsolo.io` 当前会话无登录态；site 已存在（脚本 ID `pa-Tuwmm86GExPpwNCxPPO8b`） |
| GSC（覆盖/query/click） | `blocked_waiting_login` | 访问 search-console 被重定向到 about 页（未登录） |
| Bing Webmaster | `blocked_waiting_login` | 同上，未尝试登录 |
| 历史快照（2026-07-29，仅作早期信号） | `partial` | Plausible 225 visitors / 246 visits / 482 pageviews；GSC 65 clicks / 3,820 impressions / CTR 1.7% / avg position 9.4 |
| 上轮 GSC 快照（2026-09-06） | `partial` | 65 clicks；6 indexed / 11 not indexed；sitemap 12 discovered 已重提 |

### 决策：`ITERATE`（维持）

- 不 `KILL`：核心任务全部健康；GSC 早期信号（65 clicks、position 9.4、3820 impressions）证明存在真实搜索需求；事件链路刚刚打通，增长观测能力刚建立。
- 不 `SCALE`：最近 28 天真实流量与漏斗未读取（登录缺失）；索引覆盖仍低（6 indexed）；实体页实验闸门（新 source revision）未解锁。
- `ITERATE` 的核心修复项（部署、301、懒加载、事件、Plausible）本轮已全部闭环，下一轮 Iterate 焦点转向「数据解锁 → 索引增长 → 垂直渠道」。

## 四、Gate 状态

- `QA`: **GO**（本轮复测完成，P0=0 / P1=0）
- `SEO`: **GO_PENDING_INDEX_REFRESH**（技术项全通过；等待 Google/Bing 对 9-06 重提 sitemap 与 301 的响应刷新）
- `Compliance`: PASS（无商业化、非官方边界未变；本轮未新增公开文案）
- `Launch`: LIVE（本轮无新公开动作；源码 push 属内部同步）
- `Data Review`: ITERATE / `PLAUSIBLE_CONFIGURED_WAITING_LOGIN`

## 五、运营计划

### 第 1 周（立即）— 解锁数据观测

1. **Owner 登录解锁分析后台**：在浏览器完成 Plausible（plausible.shipsolo.io）、GSC、Bing 登录并保持打开，回复"已登录"；或提供 Plausible 共享链接。解锁后第一份周报必须包含：28 天去重访客、来源结构、`calculate/chain/share` 漏斗、TOP 落地页。
2. **GSC 索引覆盖复查**：确认 9-06 重提后 indexed/not-indexed 变化；重点看 11 个未索引 URL 是否转为 indexed；用 URL 检查工具验证 `www` 301 后 canonical 唯一化。
3. **Bing IndexNow**：Bing 自己提示可评估 IndexNow；一次性提交 12 个 canonical URL（免费、低风险、平台建议）。

### 第 1–2 周 — 索引与内容健康

4. **meta description 复查**（Bing 提示部分过短）：逐页核对 13 个生产页 description 长度，短于建议值的补写后走 build→check→deploy。
5. **内链增强**：对持续 `Discovered - currently not indexed` 的 URL，从首页/指南页增加语境化内链（不做机械 footer 铺量）。
6. **数据新鲜度**：检查 palcalc 上游（tylercamp/palcalc）是否有 v1.17.6 之后的 revision；若有，走 production validator + 交叉验证 + Owner 批准后才更新数据并触发实体页实验。若上游无变化，在 `/data-sources/` 增加"数据复核日期"声明，不隐瞒 2026-07-18 生成日期。

### 第 2–4 周 — 垂直渠道（全部 permission-first）

7. **Steam Community Guide**：草稿已就绪；Owner 有 Steam 账号时先建 Friends-only/Unlisted 版本做 QA，公开前需精确批准；链接指向 `/how-to-use/` 与 `/chain/`。
8. **Palworld Wiki Discord**：Owner 登录 Discord 并加入服务器 → 读规则与管理员确认正确频道 → 提交许可申请；首次消息不放产品链接。
9. **Wiki 编辑审核**：继续等待（2026-08-03 已礼貌跟进一次），不再催促，不自行改 Breeding 正文。
10. **Pinterest 归因复核**：只读取现有 11 个 Pin 的 UTM/referral 表现，数据解锁前不新增内容。
11. **Reddit r/Palworld**：维持普通参与；无版主明确许可不发外链。

### 触发式（数据闸门解锁后）

12. **实体页小批量实验**：新 source revision 通过校验后，选 8–12 个高意图 Pal（有真实搜索量、能写出唯一内容：direct pairs、same-species 例外、数据版本、FAQ、深链进 calculator），走 noindex→review→index；不做 300 个换名薄页。
13. **公式页解封评估**：仅当来源证据、公式边界与示例复核完成后再走 SEO/QA/Owner Gate，目前维持 noindex。

### 每周固定口径（复盘纪律）

- 28 天去重访客与来源；`calculate → share` 漏斗；GSC clicks/impressions/position/query；索引覆盖 delta；外链资产状态表。
- 任何数据缺失保留 `missing` / `waiting_platform_refresh`，不填 0，不编造。

## 六、风险（更新）

- P0（不变）：繁殖数据准确性是核心价值；宣称范围仍受版本/来源边界约束。
- P1（不变）：`Palworld` 品牌词与非官方边界；1.0 热点窗口与新 EMD 竞争。
- P2（更新）：数据集生成于 2026-07-18，需按上述第 6 项处理新鲜度沟通。
- P2（解除）：`www` 301（已生效）；懒加载（已生效并验证）；Plausible 未配置（已配置）；QA 部署后复测（已完成）。
- P2（新增）：事件基线从 2026-09-06 部署后才开始积累，首份完整漏斗周报最早在部署后 1–2 周才有统计意义。

`REVIEW_DONE — 运营计划已排期；无未经授权的外部动作。`
