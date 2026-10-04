# 全流程主持台交接摘要

## 当前结论

- 状态：`LIVE_QA_GO_ITERATE_VISIBILITY_RECOVERY`
- 一句话：2026-10-04 例行全站复验 QA_GO（P0=0/P1=0）；GSC 登录态解锁后发现近 28 天搜索可见度崩塌（62 曝光/0 点击/排名 29.4），上游 v1.22.0 数据 diff 完成（组合 0 变更、1 处英文名待更），维持 ITERATE 并把主线收紧为可见度恢复 + 数据小更新。
- 详细证据：`orchestrator/data-review-2026-10-04.md`（复盘+运营计划）、`orchestrator/qa-production-review-2026-10-04.md`（QA）

## 已确认（2026-10-04 本轮）

- QA 例行复验：本地构建与 6 项校验脚本全过；13 路由 200、404 与 www 301 正常；懒加载与 Plausible 脚本在线；生产 analytics.js / dataset.json 内容哈希与本地构建完全一致；真实用户任务（parents/target/chain/share/URL 恢复）与事件上报全过；390×844 四页无溢出；控制台 0 error。
- GSC 首次解锁读取：3 个月 65 点击/4,200 曝光/排名 11.5；**近 28 天 0 点击/62 曝光/排名 29.4**（7 月为 3,820 曝光/排名 9.4）；索引 6/12，6 个 Discovered 未索引（含 `/how-to-use/`、`/guide/breeding-basics/` 两个内容页）。
- 上游 palcalc v1.22.0（2026-09-18）全量 diff：44,851 组合语义 0 变更；`ElecSnail_Ground` 英文名 Snock Lux→Snock Terra；多语言别名修正。站点数据准确性主张仍成立。
- 公开渠道资产（GitHub/DEV/itch.io/Product Hunt）全部存活（200）。

## 需要 Owner 处理

1. 批准数据集更新到 palcalc v1.22.0（变更面极小：1 个英文名+别名；组合 0 变更；批准后走 import→validator→交叉验证→promote→部署）。
2. 在浏览器登录 Plausible（plausible.shipsolo.io）与 Bing Webmaster 并保持打开，或提供 Plausible 共享链接（GSC 已可用）。
3. Steam Guide：有 Steam 账号时创建 Friends-only 草稿（公开前需精确批准）。
4. Wiki Discord：登录并加入服务器后先读规则再申请许可。

## 下一步自动动作（无需 Owner）

1. Bing IndexNow 一次性提交 12 个 canonical URL（上轮计划未执行项）。
2. 从已索引 6 页向 `/how-to-use/`、`/guide/breeding-basics/` 增加语境化内链。
3. 渠道维持 permission-first：Steam/Discord/Reddit 未获许可不做公开外链动作。

## 待处理 P2

- 站内 "Snock Lux" 显示名与上游 v1.22.0 "Snock Terra" 不一致（并入 v1.22.0 更新）。
- `/data-sources/` 增加"数据复核日期：2026-10-04"声明（并入 v1.22.0 更新）。
- meta description 长度复查（Bing 提示部分过短；等 Bing 登录态复核）。
