# Figma 原型规范

**语言：[中文](figma-spec.md) | [English](figma-spec.en.md)**

## 目标

用可点击的手机端原型验证核心任务流、主动建议方式与用户控制；原型应足够真实地展示外部数据在界面中的作用，但不要求实现底层能力。

## 当前基线

- 7 个已归档屏幕：F01–F06、F03b。
- 设计文件与静态导出：[`../../design/figma/README.md`](../../design/figma/README.md)、[`../../design/exports/2026-11-24-nutripal/README.md`](../../design/exports/2026-11-24-nutripal/README.md)。
- 系统工程契约：[系统设计](../04-engineering/system-design.md)、[模块设计](../04-engineering/module-design.md)。
- Figma 仍是视觉事实源；HTML 导出中的强调色是近似值。

## 当前交付要求

### 必须包含

- 统一视觉语言与组件规范。
- 核心任务的可点击页面流，按钮连接真实目标页面。
- 与首轮基础功能对应的页面，不加入尚未验证的附加功能。
- 对外部 API 依赖的清晰标注（例如位置、天气、食谱）。
- 主动建议状态，以及接受、推迟、拒绝/关闭等控制方式（如果研究确认该方向）。
- 通知、权限或隐私设置的必要入口（范围待用户研究确认）。

### 不要求

- 真实调用 GPS、天气或食谱 API。
- 真正导入数据或进行拍照识别。
- 完整后端、账户系统或商店发布。

## 页面规划

> 下列页面结构来自现有设计稿；具体功能优先级仍应由用户研究确认。

| Frame | 页面 | 目的 | 状态 |
| --- | --- | --- | --- |
| F01 | Dietary & Cultural Preferences | 完成菜系、饮食与忌口偏好 | 已设计；可用性待验证 |
| F02 | Personalised Meal Recommendations | 每日营养摘要与个性化推荐 | 已设计；推荐逻辑待验证 |
| F03 | Practical Meal Planning | 餐单、预算和烹饪时间规划 | 已设计；核心流程待测试 |
| F03b | Shopping List | 从餐单生成采购清单 | 已设计；预算逻辑待测试 |
| F04 | Context-Aware Proactive Assistance | 解释主动建议的触发依据 | 已设计；真实触发仅预留 |
| F05 | Notification Control & Explanation | 建议开关、延后、频率和免打扰 | 已设计；控制策略待验证 |
| F06 | AI Food Recognition & Calorie Estimation | 识别、份量调整和加入日志 | 已设计；首版仅模拟识别 |

## 交付前检查

- [x] 已从统一方案开发，视觉结构和交互方式一致。
- [ ] 每个关键按钮都连接到明确页面或已记录的演示态。
- [x] 原型中能说明哪些数据是真实需求、哪些仅为模拟。
- [x] 没有把待确认功能当作已确定 MVP。
- [ ] 已完成一次团队内部点击走查。
- [ ] 已完成至少一名目标用户的原型测试并记录问题。
