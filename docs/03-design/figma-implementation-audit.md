# Figma 原型实现一致性审计

**语言：[中文](figma-implementation-audit.md) | [English](figma-implementation-audit.en.md)**

> - 审计日期：2026-11-24
> - 参考文件：[`design/exports/2026-11-24-nutripal/index.html`](../../design/exports/2026-11-24-nutripal/index.html)
> - 参考 SHA-256：`ee7ee7dc3d7ca5975c978ed53343afecf86a62badd190067468efba18831446e`
> 结论：**当前实现不是完整的 Figma 还原版，只是 ATDD 工程脚手架和最小 F01→F02 垂直线。**

## 1. 审计方法

- 对照归档 HTML 的 7 个 `screen-wrap` 区块、可见标题、按钮、链接和交互控件。
- 对照当前 React 路由与页面源码。
- 检查共享图标、状态栏、底部导航、图片/emoji、视觉 token 和可交互状态。

## 2. 总体结果

| 项目 | 结果 |
| --- | --- |
| 路由骨架 | 基本齐全 |
| 页面视觉还原 | 未通过；仅 F01/F02 为部分实现 |
| 元素完整性 | 未通过 |
| 图标和素材 | 未通过 |
| 交互完整性 | 部分通过；F03 已实现，F03b/F05/F06 仍主要是占位页 |
| 可测试性 | 通过；已有 5 条 ATDD 验收测试 |

## 3. 逐屏差异

| Frame | 当前状态 | 主要缺失 |
| --- | --- | --- |
| F01 Dietary & Cultural Preferences | 部分实现 | 当前只有 4/8 菜系、4/6 饮食风格；缺 5 个过敏/忌口选项、`2/4` 进度、emoji/图形、完整文案和状态栏 |
| F02 Personalised Meal Recommendations | 部分实现 | 只有 1/3 推荐卡；缺头像、推荐图片/标签、营养进度条、完整推荐列表、图标式底部导航和 `See all` 行为 |
| F03 Practical Meal Planning | Figma 选中设计已实现 | 已从节点 `4:62` / `4:74` 还原周日期、约束摘要、食材、三餐和购物清单入口；Regenerate、替换和编辑仍为静态外观 |
| F03b Shopping List | 占位页 | 缺预算摘要、4 个采购项、已有食材、勾选交互和配送演示按钮 |
| F04 Context-Aware Proactive Assistance | 简化预览 | 缺锁屏式时间、通知卡、完整情境说明、`Start cooking`、`Other ideas`、`Not now` 和解释链接 |
| F05 Notification Control & Explanation | 占位页 | 缺主动建议总开关、Snooze、频率分段、免打扰、类别开关、最近建议解释和反馈入口 |
| F06 AI Food Recognition & Calorie Estimation | 占位页 | 缺相机预览构图、扫描控件、菜品识别、份量步进器、营养条、食材标签和加入日志按钮 |

## 4. 全局缺口

- 没有复用归档中的 SVG 图标集；底部导航目前只有文字。
- 没有实现每个手机屏的 9:41 状态栏。
- 食谱图片、食物照片、头像和大量 emoji/图形未进入 React 页面。
- 颜色只覆盖主要 token；强调色、surface 和阴影仍是近似值。
- F01 已有偏好选择与本地持久化；F03 已有日期选择，但其生成/替换/编辑仍需实现。
- F02 的 See all、F03b 的勾选、F04/F05 的控制和 F06 的扫描纠错均未实现。
- 当前页面结构比归档 HTML 简化很多，不能按“已还原 Figma”验收。

## 5. 修复标准

达到完整还原前，需要：

1. 以归档 HTML 为逐屏 DOM 基线，恢复完整标题、按钮、卡片、标签和值。
2. 建立共享 StatusBar、Icon、BottomNav、Chip、Toggle 和 Sheet 组件。
3. 为 7 个页面补齐与归档一致的示例图、emoji 和图标。
4. 为每个页面增加 ATDD 验收断言，至少覆盖标题、关键操作和状态变化。
5. 通过 390×844 与桌面预览截图逐屏比对。
6. 只有全部页面通过后，才能把状态改为“Figma 原型已还原”。

## 6. 结论

当前脚手架的工程基础有效，F03 已按选中的 Figma 节点实现。其余页面仍与 Figma 有明显差距；下一步应继续逐屏还原，并在每一步使用 acceptance test 先定义缺失元素与行为。
