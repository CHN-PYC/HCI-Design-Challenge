# Nourish V3 问卷结果归档（模拟数据）

> **数据性质：AI 生成的 100 份模拟回答，不是真实参与者数据，也不是正式调研证据。**
> 归档日期：2026-11-26

## 1. 来源与版本

- 原始文件：Nourish_V3_100_Simulated_Responses_EN.xlsx
- 问卷版本：Nourish Questionnaire V3（参与者部分 Q1–Q21）
- 语言：英文翻译版；题目对应关系来自 [V3 参与者问卷](../../../docs/02-research/questionnaire/questionnaire-v3-participant.md)
- 文件 SHA-256：49e7fc7c83ef94bd61e8156e601c71f317dcafea50fb9e49d9d976abe874f597
- 工作簿创建/修改时间（文件元数据）：2026-11-25 16:48:31 UTC / 2026-11-25 16:49:14 UTC
- 原始文件行数/列数：100 条回答 × 23 列（21 个问题 + Simulation ID + 非问卷的 persona 列）

## 2. 文件说明

| 文件 | 作用 |
| --- | --- |
| Nourish_V3_100_Simulated_Responses_EN.xlsx | 原始工作簿，四张表：Responses、Summary、Multiple Choice Counts、Notes and Validation |
| Nourish_V3_100_Simulated_Responses_EN.csv | Responses 表的 UTF-8 CSV 导出，保持原始单元格内容与分号分隔多选 |
| summary.md | 主要分布、功能偏好与限制的速览 |
| validation.json | 行数、ID、跳题逻辑、排他选项和计数表复算结果 |
| checksums.sha256 | 归档文件完整性校验 |

原始 xlsx 是事实源；CSV 用于检索、统计和版本差异比较。

## 3. 严格限制

- 100 条记录全部为 AI 生成的模拟回答，不能用于推断真实用户比例、总体分布或市场结论。
- 不能把本数据写成“问卷已完成”或“用户研究已获得真实样本”。它只适合流程验证、统计脚本测试和展示格式演练。
- 模拟 persona/role 列不属于 V3 问题；正式分析时应排除。
- 英文文件是同一批模拟回答的翻译版，不是新增样本。
- 正式真实问卷结果未来应新增带日期的独立目录，不覆盖本归档。

## 4. 与 V3 问卷的映射

| 内容 | 映射 |
| --- | --- |
| Q1–Q21 | 与 V3 参与者问卷题号一致 |
| Q4 | 选答文化背景；本文件 99 条填写，1 条“Prefer not to disclose” |
| Q9 → Q14 | 选“听说过但从未使用”或“从未听说过”时跳过 Q10–Q13 |
| Q5、Q6、Q7、Q8、Q10–Q12、Q16–Q18、Q20 | 不限数量多选，使用分号分隔 |
| Q21 | 选答开放题；75 条回答，25 条未回答 |

## 5. 验证结果

| 检查 | 结果 |
| --- | --- |
| 回答行数 | 100 |
| Simulation ID 唯一 | 100 |
| Q1 全部为 Yes | 通过 |
| Q9 跳题逻辑 | 39 条跳过 Q10–Q13，61 条有效，与规则一致 |
| 排他选项冲突 | 0 |
| Multiple Choice Counts 复算 | 102 个选项全部与工作簿一致 |
| 工作表数量 | 4 |

机器可读结果见 [validation.json](validation.json)。

## 6. 统计速览

详见 [summary.md](summary.md)。核心样本构成为 18–24 岁 30 人、25–34 岁 30 人、35–44 岁 22 人、45 岁及以上 18 人；过去 30 天使用过健康饮食 App 的模拟回答为 41 条。

这些数字只描述模拟文件本身，不代表真实人群。

## 7. 相关文档

- [V3 问卷工作区](../../../docs/02-research/questionnaire/README.md)
- [V3 参与者问卷](../../../docs/02-research/questionnaire/questionnaire-v3-participant.md)
- [V3 修订与设计映射报告](../../../docs/02-research/questionnaire/questionnaire-v3-design-report.md)
- [处理后数据说明](../README.md)

