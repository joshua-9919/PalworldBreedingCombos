# Kanban Plan

## T00 — Setup and control plane

- task_id：T00
- stage：00 setup
- skill：site-orchestrator-playbook
- owner：orchestrator
- input_paths：user launch instruction
- output_paths：`orchestrator/*.md`
- gate：域名、市场、项目类型、权限缺口明确
- blocked_if：域名与目标市场均未知
- downstream：T01
- status：DONE

## T01 — Research Gate

- task_id：T01
- stage：01 research
- skill：keyword-research-agent
- owner：research
- input_paths：`orchestrator/project-control.md`
- output_paths：`research/keyword-opportunity-report.md`
- gate：关键词簇、SERP、竞品能力、机会评级、数据来源边界
- blocked_if：无任何种子词或市场；当前不阻塞
- downstream：T02
- status：DONE

## T02 — Product definition

- task_id：T02
- stage：02 PRD
- skill：product-definition-prd
- owner：product
- input_paths：T01 output
- output_paths：`product/prd.md`、`product/route-contract.md`
- gate：ICP、真实任务、MVP、NOT-DO、canonical routes
- blocked_if：Research Gate 未过
- downstream：T03、T04
- status：DONE

## T03/T04 — Pricing and compliance

- task_id：T03-T04
- stage：03 pricing + 04 compliance
- skill：site-pricing-calibration + student-site-compliance-pipeline
- owner：business/compliance
- input_paths：T02 outputs
- output_paths：`business/pricing.md`、`compliance/policy-plan.md`
- gate：成本边界、免费策略、IP/隐私/Cookie/来源政策
- blocked_if：PRD 未冻结
- downstream：T05
- status：DONE

## T05 — SEO Copy Freeze

- task_id：T05
- stage：05 copy
- skill：site-copywriting-student
- owner：copy
- input_paths：T01–T04 outputs
- output_paths：`content/seo-copy-freeze.md`
- gate：每个首发 route 的 title/meta/H1/H2/FAQ/schema 冻结
- blocked_if：route contract 未冻结
- downstream：T06
- status：DONE

## T06/T08/T07 — Design, data and implementation

- task_id：T06-T08-T07
- stage：06 design + 08 data + 07 frontend
- skill：site-design-student + backend-auto-site-cloudflare-workers + frontend-site-automation
- owner：design/data/frontend
- input_paths：T02–T05 outputs
- output_paths：`design/`、`data/`、web application
- gate：Design Source、Data Contract、本地可运行实现
- blocked_if：SEO Copy Freeze 未完成
- downstream：T10
- status：DONE

## T10/T04R/T02R — Review

- task_id：T10-T04R-T02R
- stage：SEO/compliance/PM review
- skill：seo-launch-workflow + student-site-compliance-pipeline + product-definition-prd
- owner：review
- input_paths：built application and frozen contracts
- output_paths：`orchestrator/reviews/`
- gate：SEO_GO、COMPLIANCE_GO、PM_GO
- blocked_if：实现不可运行
- downstream：T09
- status：DONE_FOR_QA

## T09 — QA

- task_id：T09
- stage：09 QA
- skill：student-site-qa-acceptance
- owner：QA
- input_paths：reviewed build
- output_paths：`orchestrator/qa-review.md`、`orchestrator/evidence/`
- gate：QA_GO，无 P0/P1
- blocked_if：任一 review 未 GO
- downstream：Owner Review
- status：READY

## T11/T12 — Launch and data review

- task_id：T11-T12
- stage：11 launch + 12 data review
- skill：site-ops-growth-launch + site-data-review-iteration
- owner：launch/growth
- input_paths：QA_GO + Owner approval
- output_paths：production evidence、`orchestrator/review-plan.md`
- gate：真实部署与索引证据；上线后数据判定
- blocked_if：缺生产权限或 Owner 未批准公开动作
- downstream：continuous iteration
- status：BLOCKED_SETUP
