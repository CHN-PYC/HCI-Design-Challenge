# Design Decision Log

**Language: [中文](design-decisions.md) | English**

## Decision status

| ID | Decision | Status | Notes |
| --- | --- | --- | --- |
| D-01 | App design language | Decided | The third meeting confirmed the existing UI/UX and NutriPal app interaction approach |
| D-02 | Interaction logic | Drafted (design baseline) | Routes, navigation, screen states, and cross-module refresh rules are defined in the module design |
| D-03 | Page framework | Decided | The third meeting confirmed the NutriPal Figma interaction approach; ambiguities will continue to be resolved |
| D-04 | First-round core features | To be researched | To be determined through the questionnaire and verified competitor analysis |
| D-05 | Figma screens and click-through flow | Drafted (pending acceptance) | The seven-screen design and static interactions are archived; user testing is still required |
| D-06 | Trigger timing for proactive suggestions | To be researched | Usefulness, acceptability, and privacy boundaries need validation |
| D-07 | User-control mechanisms | To be researched | At minimum, study accept, postpone, dismiss, and quiet-hours behaviour |
| D-08 | Visual components and design specification | Drafted (pending visual confirmation) | Components and tokens are documented; approximate colours need confirmation against Figma |
| D-09 | System architecture and API boundary | Drafted (pending review) | [System design](../04-engineering/system-design.en.md) |
| D-10 | Module responsibilities and routing contract | Drafted (pending review) | [Module design](../04-engineering/module-design.en.md) |
| D-11 | First-version mock/real capability boundary | Drafted (pending review) | Recipe, scan, notification, and location capabilities are reserved through adapter interfaces |
| D-12 | Bilingual design documentation | Completed | All 12 design-document pairs have a Chinese default and an English `.en.md` version |
| D-13 | HCI design-principle mapping | Not started | Post-meeting task: identify which HCI principles apply to research, design, implementation, and iteration |

## Decision template

When adding a decision, record:

- Decision date and participants
- Problem being solved
- Alternatives and evidence
- Final choice
- Impact
- Rejected alternatives and why
- Follow-up validation method
