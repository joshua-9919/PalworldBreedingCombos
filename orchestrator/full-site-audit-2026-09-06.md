# Palworld Breeding Combos 全站 QA、SEO、复盘与外链审计

日期：2026-09-06（Asia/Jakarta）  
范围：当前 checkout `agent/site-foundation`、本地 production build、公开生产域名、已公开推广页面。  
模式：只读审计；没有部署、提交表单、发帖、发邮件、付款或修改第三方页面。

## 当前结论

- 总状态：`OPTIMIZATION_REVIEWING / CONDITIONAL_GO_PENDING_DEPLOY / ITERATE`
- QA：现网 390×844 公开页与核心任务已复测通过；新构建的懒加载、分享和事件需部署后独立 Re-QA。
- SEO：本地页面矩阵、canonical、metadata、schema、formula noindex 和内部链接检查通过；GSC/Bing sitemap 已于 2026-09-06 成功重提，等待后续抓取。
- 数据复盘：GSC/Bing 当前快照已读取；Plausible 自托管账号暂无 Palworld site 配置，不能读取事件数据，决策保持 `ITERATE`。
- 外链：已有 GitHub、DEV、itch.io、Product Hunt、Pinterest 和 Wiki 讨论页资产；下一步只做 Palworld 垂直渠道和编辑审核，不做泛 startup directory、互惠徽章、付费链接或批量提交。

## 证据与检查结果

### 本地生产构建

| 检查 | 结果 |
|---|---|
| `npm run build` | PASS；300 Pals、44,851 combinations、13 pages |
| `npm run check` | PASS；14 HTML files（含 404） |
| `npm run check:compliance` | PASS；5 legal routes、0 prohibited claims |
| `npm run check:chain` | PASS；3 dependency steps、0 irrelevant branches |
| `npm run check:pairs` | PASS；Astralym same-species regression |
| `node scripts/validate-data.mjs data/launch/dataset.json` | PASS；production dataset schema valid |
| `node scripts/verify-cross-source.mjs data/launch/dataset.json data/verification/cross-source-samples.json` | PASS；2 evidence sources、6 assertions |

### 生产站点公开页

已读取首页、`/combos/`、`/chain/`、`/how-to-use/`、`/guide/`、`/guide/breeding-basics/`、`/guide/breeding-formula/`、`/data-sources/`、`/about/`、`/contact/`、`/privacy/`、`/terms/`、`/disclaimer/` 和未知路由。

- 公开页面均有唯一 title、description、H1、self canonical、OG URL 和 JSON-LD。
- `/guide/breeding-formula/` 当前为 `noindex,nofollow`，且明确披露公式证据尚未完成；这是符合当前数据边界的安全状态。
- 未知路由显示 `noindex,nofollow`、无 canonical、无 JSON-LD。
- 当前浏览器桌面视口没有横向溢出；浏览器 console error/warning 读取为空。
- `www.palworldbreedingcombos.com` 当前仍直接返回同内容并保持 URL，不是 301 到根域；canonical 虽指向根域，仍应修正。
- GSC 当前概览：65 clicks、6 indexed、11 not indexed；sitemap 12 discovered，2026-09-06 重提成功。
- Bing 当前概览：1 click、88 impressions；sitemap 成功，10 discovered，已于本轮重提；Bing 仍提示高质量入站链接不足和部分 meta description 过短。
- Plausible 可登录但站点列表显示没有已配置站点；未创建新站点，不把旧数字当当前事件数据。

### 真实用户任务

- Parents → Child：`Snock + Dinossom → Reindrix`，结果显示 rule type、dataset、generated date、verification，PASS。
- Target → Parents：`Astralym`，同种反查结果显示，PASS。
- One Parent：`Snock`，合作伙伴与子代结果可渲染，PASS。
- Owned Pals → Chain：生产页可生成带版本与验证信息的 1-step route；清空/精确移动端重测仍需单独复验，暂不把它升级为完整移动 QA_GO。

## 优化清单

### P1 / 先做

1. **按路由懒加载数据集。** 已在本地构建落地：仅 `/`、`/combos/`、`/chain/` 注入 `app.js` 和 `data-dataset-url`，非工具页不请求约 7.2MB 数据集；待部署后用 Network 证据复验。
2. **修正 www→root 301。** 已在构建产物加入 Cloudflare Pages `_redirects`；现网仍未生效，待部署后复验。
3. **补一轮当前生产移动 QA。** 重点是 390 px：首页表单、combos 结果、chain 约束、长 source checksum、footer 小链接和清除 Palbox 的可点击区域。浏览器当前未提供视口覆盖能力，本轮只保留桌面证据。

### P2 / 下一轮

1. **数据新鲜度检查。** 当前生产数据生成于 2026-07-18；既然产品承诺 Palworld 1.0，建议增加“数据维护/下一次复核日期”而不隐瞒旧版本，确认上游变化后再更新。
2. **实体页小批量试验。** 先选有真实搜索需求和足够唯一内容的 10–20 个目标，页面必须包含 direct pairs、same-species/exception、数据版本、FAQ 和进入 calculator 的深链接；不做 300 个换名薄页。
3. **事件归因。** 已加入 `calculate`、`chain`、`outbound-click`、`share` 与 UTM session context；Plausible site 未配置，待补平台配置后再验证事件。
4. **公式页继续 noindex。** 只有完成来源证据、公式边界和示例复核后，才重新走 SEO/QA/Owner Gate。
5. **移动端触控目标复测后再调整。** 历史报告提出的小链接 44 px 问题本轮未重现或否定，不能直接声称已修复。

## 数据复盘

目前最新可用的旧报告（2026-07-29）记录：Plausible 225 visitors / 246 visits / 482 pageviews；GSC 65 clicks / 3,820 impressions / average position 9.4。Direct / None 含 QA/Owner 流量，且 GSC external-links report 当时仍在刷新，因此这些数字只能作为早期信号，不能作为规模化依据。

本轮决策：`ITERATE`，不是 `KILL`，也不是 `SCALE`。

下一次复盘必须重新取得：

- 最近 28 天去重访客、来源、落地页和工具事件；
- GSC/Bing 最近覆盖、query、click、impression、CTR、position；
- GSC 外链报告和公开链接状态；
- DEV/itch.io/Product Hunt/Pinterest/Wiki/Discord/Steam 的 UTM 或 referral 结果；
- 任何数据缺失时保留 `missing` 或 `waiting_platform_refresh`，不填 0。

## 外链与渠道建议

| 渠道 | 当前状态 | 建议 |
|---|---|---|
| GitHub README | `PUBLIC_LIVE`；链接可见，平台通常 nofollow | 保持；作为来源/透明度资产，不把它当高权重 SEO 链接 |
| DEV 技术文章 | `PUBLIC_LIVE`；正文和 data-sources 链接可见 | 保持；不重复发相同文章，可在有真实工程更新时补一篇独立内容 |
| itch.io | `PUBLIC_LIVE`；页面和 UTM 链接可见，平台 nofollow | 保持；重点看 referral，不再重复提交 |
| Product Hunt | `PUBLIC_LIVE`；两个 Visit website 链接可见 | 保持；不重复 launch，等数据复盘 |
| Pinterest | 已有公开 Pin 资产 | 只复核当前公开 Pin 和 UTM 归因，不新增批量内容 |
| Palworld Wiki Talk:Breeding | `DISCUSSION_LINK_ONLY`；当前页面显示申请有 2 条评论，仍无编辑决定，正文 External Tools 未出现本项目链接 | 不再催促；等待编辑动作。不得自行把链接加入正文 |
| Steam Community Guide | `DRAFT_READY_FOR_OWNER_REVIEW`；尚未公开 | 若 Owner 有可用 Steam 账号，先 Friends-only/Unlisted 创建并 QA；公开前重新取得精确批准 |
| Palworld Wiki Discord | `BLOCKED_SETUP_REQUIRED_DISCORD_LOGIN` | Owner 登录并加入后先读规则、确认正确频道，再申请许可；首次许可消息不放产品链接 |
| Reddit r/Palworld | `PERMISSION_GATED` | 继续普通参与；无版主明确许可不发外链、不做自推广 |
| SellWithBoost / 泛创业目录 | `REJECTED` | 不提交、不付费、不放互惠徽章；与 Palworld 玩家意图不匹配 |

### 下一批外链优先级

1. **Palworld Wiki 编辑审核**：等待，不重复联系。
2. **Steam 原创指南**：先完成私密草稿 QA；链接优先指向 `/how-to-use/` 或 `/chain/`，不要只放首页。
3. **Wiki Discord 许可路径**：只有规则和管理员许可都可读时，准备一条不夸大、按频道要求的资源说明。
4. **垂直玩家/创作者教程**：寻找真正解释 Palworld 1.0 breeding、Palbox route 或数据版本差异的文章，优先争取自然引用；每次最多研究少量候选，不做目录铺量。

## Gate 状态与下一步

- `QA`: `CONDITIONAL_GO`（P0=0；当前移动/HTTP header 证据仍需补齐）
- `SEO`: `CONDITIONAL_GO_PENDING_DEPLOY`（GSC/Bing sitemap 已重提；新构建 301/懒加载待部署）
- `Compliance`: `PASS`（当前公开文案与免费、无账号、非官方边界一致）
- `Launch`: `LIVE`（本轮不执行新的公开动作）
- `Data Review`: `ITERATE / PLAUSIBLE_UNCONFIGURED`

下一步顺序：

1. Owner 批准部署当前构建，并独立复测 `www` 301、非工具页 dataset 懒加载、分享按钮和事件。
2. 在自托管 Plausible 配置 Palworld site，验证 4 个事件与 UTM 归因。
3. 完成 390 px 生产 Re-QA；若无 P1，再决定实体页小批量实验。
4. 在 Steam/Wiki Discord 的具体权限满足前，不新增公开外链动作。

`REVIEW_READY — no external action taken.`
