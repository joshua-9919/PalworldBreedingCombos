# Next Automatic Action

当前为 `LIVE_QA_GO_ITERATE_WAITING_ANALYTICS_LOGIN`。9-06 优化构建已部署并完成独立 Re-QA（事件、分享、301、懒加载、390px 移动端全过，QA_GO）；`3f68988` 已推送。下一步优先级：

1. Owner 在浏览器登录 Plausible（plausible.shipsolo.io）/ GSC / Bing 并保持打开，或提供 Plausible 共享链接；解锁后立即输出首份完整周报（28 天访客/来源、calculate→share 漏斗、GSC/Bing 覆盖与 query）。
2. GSC 复查 11 个未索引 URL 与 `www` 301 后 canonical 唯一化；评估 Bing IndexNow 一次性提交 12 个 canonical URL。
3. 检查 palcalc 上游 revision：有新版本走 validator→交叉验证→Owner 批准，再启动 8–12 个实体页 noindex→review→index 实验；无更新则在 `/data-sources/` 增加"数据复核日期"声明。
4. 渠道 permission-first 不变：Steam Guide 等 Owner 账号建 Friends-only 草稿；Discord 先登录读规则再申请；Reddit 无版主许可不推广；Wiki 编辑审核继续等待不催促。

详细复盘与运营计划：`orchestrator/ops-review-2026-09-13.md`
