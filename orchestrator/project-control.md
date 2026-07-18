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
- 当前状态：RUNNING
- 唯一事实源：本文件 + `stage-dag.md` + `kanban-plan.md`

## Owner 只需要处理

- [x] 注册主域名 `palworldbreedingcombos.com`
- [x] GitHub 仓库已连接：`joshua-9919/PalworldBreedingCombos`
- [x] Cloudflare Pages 权限已验证并完成首次生产部署；主域名绑定待控制台操作
- [ ] 准备 GSC、Bing Webmaster Tools 与分析工具登录态
- [x] 在 QA_GO 后确认允许生产部署与 DNS 绑定
- [ ] 在上线后确认是否允许社区发帖、目录提交等公开推广

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
| 07 frontend | frontend-site-automation | DONE | searchable inputs、chain constraints、URL state 与 invalid shared state 已验证 |
| 10 SEO review | seo-launch-workflow | DONE_FOR_QA | 完整 candidate noindex 预览、metadata/FAQ/schema/sitemap 复核通过；线上提交待部署 |
| 04 compliance recheck | student-site-compliance-pipeline | DONE_FOR_QA | 免费/无广告/非官方 MVP 合规检查通过；生产前等 Owner 风险确认 |
| 02 PM acceptance | product-definition-prd | DONE_FOR_QA | 完整 lookup、最短链与同种反查 P1 已修复；entity pages 保留 launch gate |
| 09 QA | student-site-qa-acceptance | DONE | QA_GO_CANDIDATE：移动端 8 类任务、0 Console/Network 错误；生产 smoke 留在 Launch Gate |
| Owner Review | owner | DONE | 免费无商业化范围、事实数据风险、Indonesia Terms、Cloudflare/DNS 已批准 |
| 11 launch | site-ops-growth-launch | PARTIAL_LIVE | Pages 生产环境已上线并通过 smoke；主域名待控制台绑定，GSC/Bing/推广未授权 |
| 12 data review | site-data-review-iteration | WAITING | 上线后数据四态与 Iterate/Scale/Kill |

## Risks

- P0：1.0 繁殖数据若不准确，工具核心价值失效；在数据源、版本和交叉验证完成前不得宣称完整准确。
- P1：`Palworld` 属品牌词；必须明确非官方、避免官方视觉冒充，并保留域名/IP投诉风险。
- P1：1.0 热点窗口短，近期大量新 EMD 站已经进入 SERP。
- P1：缺 GitHub/Cloudflare/GSC/Bing 权限，当前无法形成真实上线证据。
- P2：没有付费关键词 API，精确 volume/KD/CPC 暂缺；不得编造。

## Current State

- running：11 custom-domain binding / final domain smoke
- waiting：GSC/Bing 与公开推广授权
- blocked：当前会话无法控制 Cloudflare Dashboard；Wrangler 不支持 Pages custom-domain 绑定
- done：00 setup / domain decision；01 Research Gate；02 PRD / Route Contract + PM recheck；03 Pricing；04 Compliance Contract + recheck；05 SEO Copy Freeze；06 Design Source；08 Data Contract + technical cross-check；07 Frontend local implementation；10 SEO recheck；09 QA_GO_CANDIDATE
