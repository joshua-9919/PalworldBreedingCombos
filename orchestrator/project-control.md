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
- 当前状态：OPTIMIZATION_READY_BLOCKED_DEPLOY
- 最近审计：`orchestrator/full-site-audit-2026-09-06.md`
- 最近执行：`orchestrator/optimization-execution-2026-09-06.md`
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
| 08 backend/data | backend-auto-site-cloudflare-workers | DONE | 300 Pal / 44,851 rows 生产数据已经 Owner 批准并通过 production validator |
| 07 frontend | frontend-site-automation | DONE | searchable inputs、chain constraints、URL state 已验证；新增 `/how-to-use/` 并替换顶部 Guide 导航，完整指南保留在页内与 Footer |
| 10 SEO review | seo-launch-workflow | CONDITIONAL_GO_PENDING_DEPLOY | GSC sitemap 已于 2026-09-06 成功重提；Bing sitemap 已成功重提；新 301/懒加载构建待部署复验 |
| 04 compliance recheck | student-site-compliance-pipeline | DONE_FOR_QA | 免费/无广告/非官方 MVP 合规检查通过；生产前等 Owner 风险确认 |
| 02 PM acceptance | product-definition-prd | DONE_FOR_QA | 完整 lookup、最短链与同种反查 P1 已修复；entity pages 保留 launch gate |
| 09 QA | student-site-qa-acceptance | CONDITIONAL_GO_PENDING_DEPLOY_REQA | 390×844 现网公开页与核心任务通过；新构建尚未部署，需独立复测事件、分享、301 与工具页懒加载 |
| Owner Review | owner | DONE | 免费无商业化范围、事实数据风险、Indonesia Terms、Cloudflare/DNS 已批准 |
| 11 launch | site-ops-growth-launch | LIVE_REVIEW_ONLY | 既有 GitHub、DEV、itch.io、Product Hunt、Pinterest 与 Wiki 讨论页资产仍可见；本轮没有新的公开动作 |
| 12 data review | site-data-review-iteration | ITERATE_PLAUSIBLE_UNCONFIGURED | GSC/Bing 已刷新；Plausible 自托管账号暂无 Palworld site 配置；保留早期信号，不升级为 Scale |

## Risks

- P0：1.0 繁殖数据若不准确，工具核心价值失效；在数据源、版本和交叉验证完成前不得宣称完整准确。
- P1：`Palworld` 属品牌词；必须明确非官方、避免官方视觉冒充，并保留域名/IP投诉风险。
- P1：1.0 热点窗口短，近期大量新 EMD 站已经进入 SERP。
- P2：数据源文件约 7.2 MB 未压缩；本地构建已改为只有工具页注入并读取 dataset，待部署后测量真实网络节省。
- P2：`www` 现网当前仍返回 200；构建已加入 `_redirects` 301 规则，待部署后复验。
- P2：新事件和分享按钮尚未进入生产，Plausible 站点配置仍缺失。
- P2：GSC 2026-07-24 快照有 7 个 `Discovered - currently not indexed` URL；等待 Google 刷新后复核，不能把提交成功等同于收录。
- P2：没有付费关键词 API，精确 volume/KD/CPC 暂缺；不得编造。

## Current State

- running：无
- waiting：允许 Git 写入并推送 main；部署后生产 301/懒加载/事件复验；Plausible site 配置；Palworld Wiki 编辑审核结果（2026-08-03 已跟进，不再重复催促）；Steam Guide 私密草稿；Discord 登录、规则检查与许可申请
- blocked：`.git/index` 只读导致无法 commit/push；新数据 source revision 尚未提供，实体页小批量索引实验不能启动；Plausible 自托管当前没有 Palworld site，不能读取事件数据
- done：00 setup / domain decision；01 Research Gate；02 PRD / Route Contract + PM recheck；03 Pricing；04 Compliance Contract + recheck；05 SEO Copy Freeze；06 Design Source；08 Data Contract + technical cross-check；07 Frontend implementation；10 SEO recheck；09 Production QA（P0=0/P1=0）
