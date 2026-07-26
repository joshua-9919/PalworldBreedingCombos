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
- 当前状态：LIVE_REVIEWED
- 唯一事实源：本文件 + `stage-dag.md` + `kanban-plan.md`

## Owner 只需要处理

- [x] 注册主域名 `palworldbreedingcombos.com`
- [x] GitHub 仓库已连接：`joshua-9919/PalworldBreedingCombos`
- [x] Cloudflare Pages 生产部署及 root/www 主域名绑定已完成
- [x] GSC、Bing Webmaster Tools sitemap 已提交；Plausible 已安装并收到首个测试访问
- [x] Pinterest 网站所有权已通过 HTML 标签验证并连接到 `Palworld Breeding Combos` 账号
- [x] 在 QA_GO 后确认允许生产部署与 DNS 绑定
- [x] 已授权按平台规则执行公开推广；Reddit 外链仍须等版主明确许可
- [x] Palworld Wiki 编辑独立审核申请已通过 `Joshuazhou` 账号提交；2026-08-02 跟进

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
| 10 SEO review | seo-launch-workflow | DONE_FOR_QA | 完整 candidate noindex 预览、metadata/FAQ/schema/sitemap 复核通过；线上提交待部署 |
| 04 compliance recheck | student-site-compliance-pipeline | DONE_FOR_QA | 免费/无广告/非官方 MVP 合规检查通过；生产前等 Owner 风险确认 |
| 02 PM acceptance | product-definition-prd | DONE_FOR_QA | 完整 lookup、最短链与同种反查 P1 已修复；entity pages 保留 launch gate |
| 09 QA | student-site-qa-acceptance | DONE_PRODUCTION | 2026-07-19 全站复验与真实任务通过；404 索引缺陷已修复，P0=0，P1=0，剩余 P2=3 |
| Owner Review | owner | DONE | 免费无商业化范围、事实数据风险、Indonesia Terms、Cloudflare/DNS 已批准 |
| 11 launch | site-ops-growth-launch | LIVE | Pages、root/www、Plausible、GSC/Bing sitemap 已上线/提交；Pinterest、Product Hunt、GitHub 已执行，Palworld Wiki 申请已提交待编辑审核 |
| 12 data review | site-data-review-iteration | ITERATE | QA 行为通过，但 Plausible/GSC/Bing 尚无代表性 cohort；满 7 天且 100 次非 QA 访问后复盘 |

## Risks

- P0：1.0 繁殖数据若不准确，工具核心价值失效；在数据源、版本和交叉验证完成前不得宣称完整准确。
- P1：`Palworld` 属品牌词；必须明确非官方、避免官方视觉冒充，并保留域名/IP投诉风险。
- P1：1.0 热点窗口短，近期大量新 EMD 站已经进入 SERP。
- P2：数据源文件 7.54 MB 未压缩；线上 gzip 传输实测 340 KB / 0.37 秒，但 `max-age=0` 且仍为整包客户端解析，需用真实移动端数据持续观察。
- P2：`www` 当前返回 200 而非 301 到主域；canonical 已指向主域，但仍建议统一跳转。
- P2：没有付费关键词 API，精确 volume/KD/CPC 暂缺；不得编造。

## Current State

- running：无
- waiting：真实自然流量积累；Reddit 版主许可；Palworld Wiki 编辑审核结果（2026-08-02 跟进）
- blocked：无
- done：00 setup / domain decision；01 Research Gate；02 PRD / Route Contract + PM recheck；03 Pricing；04 Compliance Contract + recheck；05 SEO Copy Freeze；06 Design Source；08 Data Contract + technical cross-check；07 Frontend implementation；10 SEO recheck；09 Production QA（P0=0/P1=0）
