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
- [ ] 准备 Cloudflare Pages/DNS 权限
- [ ] 准备 GSC、Bing Webmaster Tools 与分析工具登录态
- [ ] 在 QA_GO 后确认是否允许生产部署与 DNS 绑定
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
| 04 compliance | student-site-compliance-pipeline | NEEDS_REVIEW | 本地合同完成；生产数据/IP证据待验 |
| 05 copy | site-copywriting-student | DONE | SEO Copy Freeze 已冻结 |
| 06 design | site-design-student | READY | 视觉真源、状态、移动端、handoff |
| 08 backend/data | backend-auto-site-cloudflare-workers | WAITING | 前端可消费数据契约与版本化数据 |
| 07 frontend | frontend-site-automation | WAITING | 页面、交互、SEO、分析钩子 |
| 10 SEO review | seo-launch-workflow | WAITING | indexability、schema、sitemap、canonical |
| 04 compliance recheck | student-site-compliance-pipeline | WAITING | 实现与政策一致 |
| 02 PM acceptance | product-definition-prd | WAITING | 满足 PRD 与竞品最低能力 |
| 09 QA | student-site-qa-acceptance | WAITING | 真实任务、移动端、控制台与网络证据 |
| Owner Review | owner | WAITING | 生产部署与公开动作授权 |
| 11 launch | site-ops-growth-launch | BLOCKED_SETUP | GitHub/Cloudflare/DNS/GSC/Bing 权限 |
| 12 data review | site-data-review-iteration | WAITING | 上线后数据四态与 Iterate/Scale/Kill |

## Risks

- P0：1.0 繁殖数据若不准确，工具核心价值失效；在数据源、版本和交叉验证完成前不得宣称完整准确。
- P1：`Palworld` 属品牌词；必须明确非官方、避免官方视觉冒充，并保留域名/IP投诉风险。
- P1：1.0 热点窗口短，近期大量新 EMD 站已经进入 SERP。
- P1：缺 GitHub/Cloudflare/GSC/Bing 权限，当前无法形成真实上线证据。
- P2：没有付费关键词 API，精确 volume/KD/CPC 暂缺；不得编造。

## Current State

- running：06 Design Source
- waiting：08 Data Contract、07 Frontend、10 Reviews、09 QA
- blocked：11 生产上线与公开推广
- done：00 setup / domain decision；01 Research Gate；02 PRD / Route Contract；03 Pricing；04 Compliance Contract；05 SEO Copy Freeze
