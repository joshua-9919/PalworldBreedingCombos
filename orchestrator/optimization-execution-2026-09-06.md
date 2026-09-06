# 优先优化执行记录 — 2026-09-06

## 当前结论

- 本地优化：`DONE_FOR_REVIEW`
- 现网发布：`BLOCKED_GIT_WRITE_PERMISSION`
- 移动端现网 QA：`PASS_WITH_SCOPE`
- GSC / Bing：已刷新 sitemap
- Plausible：`BLOCKED_NO_SITE_CONFIGURED`
- 实体页开放：`BLOCKED_DATA_REFRESH_REQUIRED`

## 已落地的代码优化

### 1. 路由级数据懒加载

- `/`、`/combos/`、`/chain/` 保留 calculator bootstrap 和 dataset URL。
- 指南、法律、来源、联系页不再注入 `data-dataset-url`，也不加载 `app.js`。
- `app.js` 增加 UI guard，即使被误注入到非工具页也不会请求数据集。
- 约 7.2MB 的 `assets/dataset.json` 只在工具页请求。

### 2. `www` 301 配置

- 已确认 Cloudflare Pages 的 `_redirects` 不支持域名级匹配，未保留一个会被忽略的伪规则。
- 已生成精确的 Bulk Redirect 操作单：`orchestrator/cloudflare-bulk-redirect-2026-09-06.md`。
- 目标为 `www.palworldbreedingcombos.com` → `https://palworldbreedingcombos.com`，301、保留 query、匹配子路径、保留 path suffix。
- 当前 Cloudflare 控制台登录态可见，但账户首页/Pages 项目列表未显示 `palworldbreedingcombos.com`，Bulk Redirect 页面也持续加载未出配置表单；本轮未伪造已生效。
- 现网当前仍可访问 `https://www.palworldbreedingcombos.com/`，说明该规则尚未通过生产部署生效。

### 3. 事件与 UTM 归因

- 新增 `src/analytics.js`，保存当前会话的 `utm_source / utm_medium / utm_campaign / utm_content / utm_term`。
- 新增 Plausible 自定义事件：
  - `calculate`
  - `chain`
  - `outbound-click`
  - `share`
- 结果页新增 Copy share link，使用当前 query state 作为分享 URL。
- 事件只发送聚合事件和有限 slug/host/path，不上传 Palbox 内容。

## 本地验证

```text
npm run build             PASS
npm run check             PASS — 14 HTML files
npm run check:compliance PASS
npm run check:chain       PASS
npm run check:pairs       PASS
node --check src/app.js   PASS
node --check src/analytics.js PASS
```

构建数据仍为：`palcalc-v26-v1.17.6-owner-approved-20260718`、300 Pals、44,851 combinations；本轮没有伪造数据刷新。

## 现网移动端 QA（390×844）

- `/`：无横向溢出，H1 正常。
- `/combos/`：无横向溢出，Astralym 目标→父母成功返回 1 个验证组合。
- `/chain/`：无横向溢出，链路表单和本地 Palbox 状态可见。
- `/privacy/`：无横向溢出。
- `/guide/breeding-formula/`：`noindex,nofollow` 保持，移动端无横向溢出。
- 父母→子代：Snock + Dinossom → Reindrix，成功。

说明：以上是当前已部署版本的现网复测；新构建尚未部署，因此新分享按钮和事件代码需要部署后重新做一次独立生产 QA。当前沙箱无法启动本地 HTTP server，未用 file URL 绕过浏览器安全策略。

## 平台刷新结果

### Google Search Console

- 资源：`sc-domain:palworldbreedingcombos.com`
- sitemap 已于 2026-09-06 重新提交。
- 状态：成功。
- 已发现网页：12。
- 概览当前显示：65 次网页搜索点击，6 个已编入索引，11 个未编入索引。

### Bing Webmaster

- sitemap `https://palworldbreedingcombos.com/sitemap.xml` 已重新提交，平台确认成功处理。
- 当前 sitemap：成功，已发现 10 个 URL；上次抓取仍显示 2026-07-18，等待 Bing 后续处理。
- 当前概览：1 click、88 impressions。
- Bing 建议：高质量入站链接不足、部分 meta description 过短、可评估 IndexNow。

### Plausible

- 可登录自托管 Plausible，但站点列表显示 “Add your first personal site”，没有可读取的 Palworld 站点。
- 未创建新站点、未伪造流量数据；生产事件验证等待站点配置或正确账号。

## 实体页与数据刷新闸门

- 当前数据集生成日期仍为 2026-07-18，未获得新的可审计 source revision。
- 本轮不开放 300 个实体页，也不把旧数据包装成“已刷新”。
- 下一步仅允许在新数据通过 production validator、来源/权限/交叉验证后，选择 8–12 个高意图目标做小批量 noindex→review→index 实验。

## 发布闸门

### 当前阻塞

- 本地工作区可写，但 `.git/index` 为只读，无法创建 `index.lock`，因此无法 `git add/commit`。
- 申请一次必要的提权后仍被当前会话额度策略拒绝。
- 因此没有推送 `main`、没有触发 Cloudflare Pages 生产部署，也没有把新构建误报为已上线。

以下仍需 Owner 明确授权或补证：

1. 将当前分支构建部署到生产，使懒加载、事件和分享按钮生效。
2. 按 `cloudflare-bulk-redirect-2026-09-06.md` 在 Cloudflare Bulk Redirects 建立域名级 301，并补 proxied `www` DNS 记录。
3. 部署后重新验证根域、`www` 301、移动端工具流程、Plausible 事件和控制台无错误。
4. Plausible 配置站点或提供正确的分析项目登录态。
5. 获得新数据 source revision 后再启动实体页小批量实验。
