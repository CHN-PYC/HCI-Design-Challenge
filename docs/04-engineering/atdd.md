# NutriPal ATDD 原型脚手架

**语言：[中文](atdd.md) | [English](atdd.en.md)**

> - 状态：脚手架已完成，自动验收通过。
> - 日期：2026-11-24
> - 实现栈：React 19 + Vite 8 + TypeScript 5.9 + Vitest + Testing Library

## 1. 本轮验收范围

| ID | 用户行为 | 验收条件 |
| --- | --- | --- |
| AC-01 | 新用户访问 `/home` | 自动进入 F01 偏好页，底部主导航不可见 |
| AC-02 | 用户选择偏好并点击 Continue | 偏好写入本地 Mock，进入 F02，显示主导航 |
| AC-03 | 已完成引导的用户使用底部导航 | Plan、Shopping List、Scan、Nudges 和 Me 均可到达 |
| AC-04 | 已完成引导的用户进入 `/nudges/preview` | 显示 F04 主动建议预览，且不显示主导航 |

自动验收文件：[`src/acceptance/app.acceptance.test.tsx`](../../src/acceptance/app.acceptance.test.tsx)。

## 2. RED → GREEN 记录

1. AC-01 首次运行因 `AppRouter` 尚不存在而失败；实现最小路由和 onboarding guard 后通过。
2. AC-02 首次运行因 F01 没有 Cuisine/Diet 控件而失败；实现偏好选择和本地持久化后通过。
3. AC-03 首次运行因 `/plan` 等路由缺失而失败；补齐页面壳与导航后通过。
4. AC-04 首次运行因 F04 路由缺失而失败；补充预览页后通过。

## 3. 已搭建内容

- React/Vite/TypeScript 工程、锁文件和 Node 版本要求。
- 路由、onboarding guard、共享 App Shell 和底部导航。
- F01 偏好选择与 `localStorage` Mock 持久化。
- F02 营养摘要与一张推荐卡示例。
- F03、F03b、F04、F05、F06 的可访问页面壳。
- Vitest + Testing Library 验收测试环境。
- ESLint、TypeScript 检查、生产构建和 CI。

## 4. 验证命令

```bash
npm test
npm run lint
npm run build
```

## 5. 后续 ATDD 循环

每个功能按同一顺序实现：

1. 在 `src/acceptance/app.acceptance.test.tsx` 或新增 acceptance 文件中写一个用户行为。
2. 运行测试并确认失败原因是功能缺失。
3. 写最小实现。
4. 运行全部测试、lint 和 build。
5. 再追加下一个行为。

建议顺序：

1. F01 编辑模式返回来源页。
2. F02 See all 展开推荐。
3. F03 餐单查看与替换。
4. F03b 从餐单生成购物清单并保存勾选。
5. F05 设置持久化与免打扰优先级。
6. F04 模拟主动建议。
7. F06 份量调整与加入日志。

## 6. 需要人工停止点

- 真实 Figma 视觉 token、字体和品牌名称最终确认：当前颜色是归档 HTML/设计说明中的近似值。
- 食谱、食物、头像等最终图片与文案：当前使用 fixture/emoji/示例文案。
- 真实后端、登录、API Key、第三方服务授权和部署账户。
- 相机、通知、定位权限及隐私文案的最终确认。
- 用户研究结论和 MVP 范围确认后才能实现真实推荐、计划和提醒规则。

在上述信息提供前，不应把 Mock 行为当作真实识别、医疗建议或生产级通知能力。
