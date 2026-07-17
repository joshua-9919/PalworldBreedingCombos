# Stage DAG

```text
00 setup / domain / permissions [DONE locally]
  -> 01 research [RUNNING]
    -> 02 PRD / Route Contract
      -> 03 pricing ---------+
      -> 04 compliance -----+-> 05 SEO Copy Freeze
                                  -> 06 Design Source
                                     -> 08 Data Contract
                                     -> 07 Frontend
                                        -> 10 SEO Review --------+
                                        -> 04 Compliance Recheck +-> 02 PM Acceptance
                                                                      -> 09 QA
                                                                         -> repair loop
                                                                            -> Owner Review
                                                                               -> 11 Launch
                                                                                  -> 12 Data Review
```

## Hard Gates

1. Research Gate：确认关键词母主题、SERP 最低能力、可进入缺口和数据可得性。
2. PRD Gate：冻结 canonical routes、真实用户任务、MVP、NOT-DO。
3. SEO Copy Freeze：设计与实现前冻结 title/meta/H1/H2/FAQ/schema 文案。
4. Design/Data Gate：覆盖桌面、移动端、空/加载/错误/无结果状态；交付可消费 schema。
5. Review Gate：SEO、合规、PM 三方复核，不由实现结果自证。
6. QA Gate：真实任务、移动端、控制台/网络、结构化数据和数据准确性均无 P0/P1。
7. Owner Review：生产 DNS、部署及公开推广必须人工确认。
8. Launch Gate：同一 commit 的 push/deploy/smoke/analytics/sitemap/robots/canonical 证据齐全。
