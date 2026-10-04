# Next Automatic Action

当前为 `LIVE_QA_GO_ITERATE_VISIBILITY_RECOVERY`。2026-10-04 例行 QA 复验 GO（P0=0/P1=0，生产与源码哈希一致）；GSC 解锁后确认近 28 天可见度崩塌（0 点击/62 曝光/排名 29.4，7 月为 3,820 曝光/9.4）；上游 palcalc v1.22.0 组合 0 变更、1 处英文名待更。下一步优先级：

1. Owner 批准 v1.22.0 数据更新 → 执行 import→candidate→production validator→交叉验证→promote→rebuild→部署，并在 `/data-sources/` 加"数据复核日期 2026-10-04"声明；这是当前最合法的新鲜度信号。
2. Bing IndexNow 一次性提交 12 个 canonical URL（无需登录后台，Bing 自助 API）。
3. 内链补强：已索引 6 页（首页/guide/data-sources/about/combos/chain）语境化链接 `/how-to-use/` 与 `/guide/breeding-basics/`；4 个法务页不强推。
4. Owner 登录 Plausible（plausible.shipsolo.io）与 Bing Webmaster 解锁访客/来源/漏斗与 Bing 端数据；GSC 已可用，周报固定用"近 28 天 vs 上一个 28 天"窗口对比（累计数会掩盖趋势）。
5. 2–4 周后复查：GSC 窗口对比基线（62/0/29.4）、索引 6→?、数据更新后是否触发重抓；实体页实验闸门=「v1.22.0 上线且 28 天可见度止跌」。
6. 渠道 permission-first 不变：Steam Guide 等 Owner 账号；Discord 先登录读规则再申请；Reddit 无版主许可不推广；Wiki 编辑审核继续等待不催促。

详细复盘与运营计划：`orchestrator/data-review-2026-10-04.md`
