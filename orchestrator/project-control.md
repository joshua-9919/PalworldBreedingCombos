# Project Control Board

## Project Launch Card

- 项目：palworld-breeding-combos
- 主域名：palworldbreedingcombos.com（用户已注册）
- 目标市场：US / English
- 种子词：`palworld breeding`、`palworld breeding calculator`、`palworld breeding combos`、`palworld breeding guide`、`palworld breeding chain`
- 项目类型：计算器 + 数据库 + 程序化 SEO 内容的混合工具站
- 技术栈：Cloudflare-first；本地静态/客户端计算优先
- 商业化：首版免费；广告/affiliate 待数据验证后决定
- 禁止事项：不得自称官方；不得复制竞品数据或受保护素材；不得在未确认权利与来源时使用游戏图片；不得未经 Owner Review 绑定生产 DNS 或公开推广
- 上线期望：快速 BUILD_NOW；不牺牲数据准确性与 QA
- 当前模式：automation_factory
- 当前状态：LIVE_V1220_DEPLOYED_INDEXNOW_SUBMITTED
- 最近审计：`orchestrator/data-review-2026-10-04.md` + `orchestrator/qa-production-review-2026-10-04.md`
- 上一轮审计：`orchestrator/ops-review-2026-09-13.md`
- 唯一事实源：本文件 + `stage-dag.md` + `kanban-plan.md`

## Owner 只需要处理

- [x] 注册主域名 `palworldbreedingcombos.com`
- [x] GitHub 仓库已连接：`joshua-9919/PalworldBreedingCombos`
- [x] Cloudflare Pages 生产部署及 root/www 主域名绑定已完成
- [x] GSC、Bing Webmaster Tools sitemap 已提交；Plausible 已安装并收到首个测试访问
- [x] Pinterest 网站所有权已通过 HTML 标签验证并连接到 `Palworld Breeding Combos` 账号
- [x] 在 QA_GO 后确认允许生产部署与 DNS 绑定
- [x] 已授权按平台规则执行公开推广；Reddit 外链仍须等版主明确许可
- [x] Palworld Wiki 编辑独立审核申请已通过 `Joshuazhou` 账号提交；2026-08-03 已完成唯一一次礼貌跟进，等待编辑结果
- [x] DEV 技术文章已由 Owner 确认并公开发布；公开 URL：`https://dev.to/joshua9919/how-i-built-an-auditable-palworld-10-breeding-calculator-without-shipping-game-files-1jde`
- [x] itch.io 账号邮箱已验证；私密草稿（project `4827906`）已上传 HTML 包、封面和 4 张截图
- [x] itch.io 私密嵌入 QA 已通过：`Snock + Dinossom → Reindrix`，版本/数据集/verified 状态均正常
- [x] itch.io 已由 Owner 确认切换 Public；公开 URL：`https://joshua-9919.itch.io/palworld-breeding-combos`
- [x] itch.io 未登录访问验证通过：HTTP 200、项目介绍与主站 UTM 外链均可见
- [x] Steam Community Guide 已完成原创英文草稿、单链接披露、素材映射和私密 QA 清单；尚未在 Steam 创建或公开
- [x] Palworld Wiki Discord 邀请已验证并准备 permission-first 管理员申请；缺 Discord 登录态，尚未加入服务器或发送消息
- [x] 2026-09-06 优化构建已由 Owner 部署到生产（懒加载、事件、分享、301 均已现网验证）
- [x] Plausible site 已配置（脚本 `pa-Tuwmm86GExPpwNCxPPO8b.js` 已上线）；2026-09-13 已验证 calculate/share 事件真实上报
- [x] 2026-10-04 例行 QA 复验 GO（P0=0/P1=0）；生产与源码哈希一致
- [x] GSC 登录态 2026-10-04 可用：已读取 3 个月/28 天表现与索引明细（Plausible/Bing 仍缺登录态）
- [x] Owner 已批准 v1.22.0 数据更新（"继续下一步"，2026-10-04）；数据集已晋升为 `palcalc-v28-v1.22.0-owner-approved-20261004` 并部署生产（main@073d3fd）
- [x] 2026-10-04 部署后生产 smoke：13 路由 200、www 301、新版本标记、Snock Terra、旧链接 snock-lux 恢复、calculate 事件、IndexNow key 200、懒加载不变、0 控制台错误
- [x] IndexNow 已提交 12 个 canonical URL（HTTP 202，key `4226991db07d14876d370fd11f5c3c28`）
- [ ] Owner 在浏览器登录 Plausible/Bing 并保持打开（或提供 Plausible 共享链接），解锁访客/来源/漏斗复盘
- [ ] Steam Guide 创建与公开、Wiki Discord 加入与许可，仍需 Owner 账号操作

## Product Decision

- 流量母词：`palworld breeding`
- 首页主任务：父母算子代、目标 Pal 反查父母
- 核心差异化：基于用户已拥有 Pals 的可行最短繁殖链，而非只有简单二元查询
- SEO 规模化：每个 Pal 独立 breeding/combos 页面
- Version promise：所有结果必须显示适用游戏版本、数据版本、更新时间和来源边界
- Primary canonical origin：`https://palworldbreedingcombos.com`

## Automatic Pipeline

| Stage | Skill | Status | Gate summary |
|---|---|---|---|
| 00 setup | site-orchestrator-playbook | DONE | 域名已注册；本地可开发；发布权限待配置 |
| 01 research | keyword-research-agent | DONE | BUILD_NOW；竞品最低能力已固化 |
| 02 PRD | product-definition-prd | DONE | PRD v1 与 Route Contract 已冻结 |
| 03 pricing | site-pricing-calibration | DONE | MVP 免费、无登录、无支付 |
| 04 compliance | student-site-compliance-pipeline | DONE | 数据/IP、隐私、品牌与官方指南边界已固化 |
| 05 copy | site-copywriting-student | DONE | SEO Copy Freeze 已冻结 |
| 06 design | site-design-student | DONE | HTML/CSS 真源、tokens、状态与移动端 handoff |
| 08 backend/data | backend-auto-site-cloudflare-workers | DONE | 2026-10-04 数据集更新至 palcalc v1.22.0（组合 0 变更，Snock Terra 改名 + legacy 别名），通过全套 validator、交叉验证与 Owner 批准，生产已部署 |
| 07 frontend | frontend-site-automation | DONE | searchable inputs、chain constraints、URL state 已验证；新增 `/how-to-use/` 并替换顶部 Guide 导航，完整指南保留在页内与 Footer |
| 10 SEO review | seo-launch-workflow | GO_INDEXNOW_SUBMITTED | 技术 SEO 全通过；索引 6/12 停滞；2026-10-04 IndexNow 已提交 12 URL（202）+ v1.22.0 新鲜度信号上线，待搜索引擎响应 |
| 04 compliance recheck | student-site-compliance-pipeline | DONE | 免费/无广告/非官方 MVP 合规检查通过；本轮无新公开文案 |
| 02 PM acceptance | product-definition-prd | DONE | 完整 lookup、最短链与同种反查 P1 已修复；entity pages 保留 launch gate |
| 09 QA | student-site-qa-acceptance | GO | 2026-10-04 例行复验：构建/校验/路由/事件/URL 恢复/390px/控制台全过（P0=0/P1=0） |
| Owner Review | owner | DONE | 免费无商业化范围、事实数据风险、Indonesia Terms、Cloudflare/DNS 已批准；9-06 构建部署已由 Owner 完成；v1.22.0 数据更新待批 |
| 11 launch | site-ops-growth-launch | LIVE_REVIEW_ONLY | 既有公开资产（GitHub/DEV/itch.io/PH/Pinterest/Wiki 讨论页）2026-10-04 复核全部存活；无新公开动作 |
| 12 data review | site-data-review-iteration | ITERATE_VISIBILITY_RECOVERY | GSC 解锁：28 天 0 点击/62 曝光/排名 29.4（7 月为 3,800+ 曝光/9.4）；上游 v1.22.0 组合 0 变更、1 处英文名待更；维持 ITERATE |

## Risks

- P0：1.0 繁殖数据若不准确，工具核心价值失效；2026-10-04 上游 v1.22.0 全量 diff 证明组合仍 0 变更，数据准确性主张成立；数据更新继续走哈希+版本声明约束。
- P1（升级）：搜索可见度近 28 天崩塌（62 曝光/0 点击/排名 29.4，7 月为 3,800+ 曝光/9.4）；下轮若数据更新+IndexNow+内链无效且无渠道流量补充，需 Owner 决策是否转长尾维护模式。
- P1：`Palworld` 属品牌词；必须明确非官方、避免官方视觉冒充，并保留域名/IP投诉风险。
- P1（解除→观察）：1.0 热点窗口风险已兑现为可见度下滑，观察项并入上一条。
- P2（更新）：站内 "Snock Lux" 与上游 v1.22.0 英文名 "Snock Terra" 不一致；`/data-sources/` 待加数据复核日期声明；待 Owner 批准的 v1.22.0 更新闭环。
- P2：Plausible/Bing 后台仍缺登录态，28 天访客/来源/漏斗未读；GSC 已解锁。
- P2：GSC 6 个 Discovered 未索引 URL（含 2 个内容页）；9-06 重提后无增长。
- P2：没有付费关键词 API，精确 volume/KD/CPC 暂缺；不得编造。

## Current State

- running：无
- waiting：搜索引擎对 IndexNow/新构建的响应（2–4 周复查窗口对比基线 62 曝光/0 点击/排名 29.4）；Owner 登录 Plausible/Bing；Steam Guide（等 Owner Steam 账号）；Discord 登录与许可申请（等 Owner Discord 登录）；Palworld Wiki 编辑审核结果（不再催促）
- blocked：无
- done：00 setup / domain decision；01 Research Gate；02 PRD / Route Contract + PM recheck；03 Pricing；04 Compliance Contract + recheck；05 SEO Copy Freeze；06 Design Source；08 Data Contract（2026-10-04 更新至 v1.22.0 并部署）；07 Frontend implementation；10 SEO recheck（技术项全过；IndexNow 已提交）；09 QA（2026-10-04 例行复验 GO + v1.22.0 部署后 smoke 全过）；12 data review 2026-10-04（ITERATE，GSC 解锁，上游 diff 完成）；v1.22.0 生产部署（main@073d3fd，IndexNow 202）
