# 全流程主持台交接摘要

## 当前结论

- 状态：`LIVE_V1220_DEPLOYED_INDEXNOW_SUBMITTED`
- 一句话：v1.22.0 数据更新已批准、验证、部署生产（main@073d3fd，部署后 smoke 全过），IndexNow 已提交 12 个 canonical URL（202）；可见度恢复手段全部落地，进入 2–4 周观察窗口。
- 详细证据：`orchestrator/launch-gates.md`（2026-10-04 update 节）、`orchestrator/data-review-2026-10-04.md`、`orchestrator/qa-production-review-2026-10-04.md`

## 已确认（2026-10-04 本轮第二批）

- 数据管线：import(v1.22.0) → validate valid → cross-source 6 断言 → 新鲜 palworld.tools 快照 288/288 Pals、251/251 组合 → 新旧 diff（组合逐行一致，仅 8 处元数据变更）→ promote → 生产校验通过。
- 向后兼容：旧分享 URL `?parentA=snock-lux` 与输入 "Snock Lux" 均解析到新名 `163B · Snock Terra`（本地与生产双验证）。
- 部署：`073d3fd` 先以 Preview（`4090ee89`）验证，再快进推送 `main` 生产上线；生产 dataset `palcalc-v28-v1.22.0-owner-approved-20261004`、`updated 2026-10-04`、13 路由 200、301/懒加载/事件/控制台全部复验通过。
- IndexNow：key 文件生产可访问（200），12 URL 提交返回 202。

## 需要 Owner 处理

1. 在浏览器登录 Plausible（plausible.shipsolo.io）与 Bing Webmaster 并保持打开，或提供 Plausible 共享链接（GSC 已可用）——解锁 28 天访客/来源/漏斗。
2. Steam Guide：有 Steam 账号时创建 Friends-only 草稿（公开前需精确批准）。
3. Wiki Discord：登录并加入服务器后先读规则再申请许可。

## 下一步自动动作（观察窗口，无需 Owner）

1. 2–4 周后复查（固定口径）：GSC 近 28 天 vs 本轮基线（62 曝光/0 点击/排名 29.4）；索引 6→?（重点 `/how-to-use/`、`/guide/breeding-basics/`）；IndexNow/新构建是否触发重抓。
2. 实体页小批量实验闸门：v1.22.0 已上线，剩余条件为"28 天可见度止跌"。
3. 渠道 permission-first 不变。

## 待处理 P2

- meta description 长度复查（等 Bing 登录态复核）。
- Plausible v2 自带 `Form: Submission` 自动事件，复盘口径需与自定义 calculate/chain 事件区分。
