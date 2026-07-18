# Blocked Log

## B01 — Production infrastructure

- 类型：GitHub / Cloudflare / DNS
- 影响：无法 push、部署、绑定生产域名或产出真实 smoke evidence
- 当前处理：不阻塞本地研究、产品、设计和实现
- Owner 解锁动作：在本地 QA_GO 后提供对应登录态/授权，并明确允许生产部署
- status：OPEN

## B02 — Search and analytics properties

- 类型：GSC / Bing Webmaster Tools / analytics
- 影响：无法验证站点所有权、提交 sitemap、记录真实上线分析证据
- 当前处理：代码预留 GA4/Clarity 等配置入口，不写入虚构 ID
- Owner 解锁动作：上线前提供或完成登录授权
- status：OPEN

## B03 — Exact keyword metrics

- 类型：keyword API
- 影响：无法给出经工具验证的精确 volume/KD/CPC
- 当前处理：依据实时 SERP、自动补全、竞品流量与社区任务推进；指标标待验证
- Owner 解锁动作：可选配置 KEYWORD_TOOL_API_KEY 或 GK_API_KEY
- status：OPEN_NON_BLOCKING

## B04 — GitHub PR authentication

- 类型：GitHub CLI login
- 影响：不影响 Git fetch/commit/push；仅影响自动创建 GitHub PR
- 当前处理：已连接 `git@github.com:joshua-9919/PalworldBreedingCombos.git` 并建立 `agent/site-foundation`
- Owner 解锁动作：可选；需要自动创建 PR 时执行 `gh auth login -h github.com`，否则继续使用 SSH Git
- status：OPEN_NON_BLOCKING

## B05 — Production dataset provenance

- 类型：数据/IP
- 影响：没有来源、revision/hash、转换与验证记录的数据不得上线
- 当前处理：Data Contract、source ledger schema、synthetic fixture 和验证脚本已建立；已固定 PalCalc v1.17.6 / commit `8b7e2f7` 为候选交叉验证源，记录 SHA-256，并完成 299 Pal / 44,851 combinations 的可重复 importer；候选保持 partially-verified、不可索引且不能 production build
- Owner 解锁动作：需要一份由用户合法持有的 Palworld 1.0 Windows 安装目录进行独立本地提取/比对，或提供 Pocketpair 明确授权的数据源；不要上传游戏文件到聊天
- status：OPEN_BLOCKS_LAUNCH
