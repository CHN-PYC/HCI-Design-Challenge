# 项目文档目录

本目录把原始会议记录转换为可持续维护的项目知识库。源文档内容与后续整理稿分开保存，避免在讨论过程中丢失原始依据。

设计相关文档均提供中文与英文版本：中文使用默认 `.md` 文件名，英文使用 `.en.md` 后缀；每页顶部都有语言切换链接。

## 目录说明

| 目录 | 用途 |
| --- | --- |
| `00-source/` | Google Doc 快照、来源信息和原始会议截图 |
| `01-project-definition/` | 问题背景、选题比较、目标用户与初步技术可行性 |
| `02-research/` | 问卷、伦理声明、竞品分析及其结论 |
| `03-design/` | 设计语言、交互逻辑、Figma 规范与界面设计决策 |
| `04-engineering/` | 系统设计、模块设计、API 契约、技术栈与实现边界 |
| `05-team/` | 成员、分工、协作约定和任务看板 |
| `06-meetings/` | 每次会议的议题、结论、行动项和待确认信息 |
| `07-evaluation/` | 形成性评估、可用性测试、迭代记录 |
| `08-delivery/` | 报告、展示、演示与最终提交材料索引 |

仓库根目录中的 `data/`、`design/`、`src/` 和 `assets/` 分别存放研究原始/处理后数据、设计文件、应用代码与通用素材。

## 建议阅读顺序

1. [`../README.md`](../README.md)：项目快照与当前状态。
2. [`05-team/task-board.md`](05-team/task-board.md)：已完成、待确认和待开始的任务。
3. [`01-project-definition/README.md`](01-project-definition/README.md)：已经形成的项目方向。
4. [`06-meetings/README.md`](06-meetings/README.md)：三次会议的原始脉络。
5. [`02-research/README.md`](02-research/README.md) 与 [`03-design/README.md`](03-design/README.md)：待验证的研究与设计工作。
6. [`04-engineering/system-design.md`](04-engineering/system-design.md) → [`04-engineering/module-design.md`](04-engineering/module-design.md) → [`04-engineering/atdd.md`](04-engineering/atdd.md)：工程设计、模块契约与 ATDD 原型。

## 状态标签

- `已决策`：源文档明确记录了小组选择或结论。
- `已成稿`：源文档中已有相应内容，但可能仍需评审。
- `要求已记录`：源文档只提出要求、范围或任务，尚不能确认产物已经完成。
- `待确认`：任务被提及，但完成情况或最终版本无法从源文档判断。
- `待开始`：源文档将其安排为后续工作，尚无产物。
- `待调研`：需要用户研究或证据后才能决定。

## 整理原则

- 不补写源文档中不存在的日期、成员角色、完成情况或研究结论。
- 涉及问卷、访谈和用户数据时，先完成伦理声明并获得必要同意。
- `docs/00-source/` 只保存来源快照；若源文档更新，应新增带日期的快照并更新变更记录。
- 任何新功能、设计或技术选择都应链接回研究发现或会议记录。
