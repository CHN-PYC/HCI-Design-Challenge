# NutriPal ATDD 原型脚手架

**语言：[中文](atdd.md) | [English](atdd.en.md)**

> - 状态：脚手架已完成，自动验收通过；**Figma 视觉/交互还原未完成**。
> - 日期：2026-11-24
> - 实现栈：React 19 + Vite 8 + TypeScript 5.9 + Vitest + Testing Library

> 当前差距与逐屏清单见 [Figma 原型实现一致性审计](../03-design/figma-implementation-audit.md)。4 条测试验证的是脚手架路由与最小流程，不代表完整 Figma 还原。

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
- Web App Manifest、192/512 图标、Apple touch icon 和离线 shell Service Worker。
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

## 6. 已确认的执行基线

- **视觉与文案**：以 [Figma 7 屏归档](../../design/exports/2026-11-24-nutripal/README.md) 为唯一原型基线；直接使用其中的页面结构、文案和近似视觉 token，不再等待另一轮资产确认。
- **图片与品牌**：沿用归档中的 emoji、占位图和 `NutriPal` 名称；缺少的图标使用同色系临时资源，并在实现中保持可替换。
- **后端**：原型阶段只使用本地 Mock 和预留 Repository/API 契约；不等待登录、数据库、API Key 或第三方授权。
- **权限与隐私**：按常见移动/Web 产品实践执行——只在用户触发功能时请求权限、先解释用途、处理后拒绝和服务失败；原型不请求真实相机、定位或通知权限，不使用敏感真实数据。
- **研究与 MVP**：原型按 Figma 假设实现并标注已知假设；不把 Mock 结果描述为验证结论或医疗建议。
- **PWA**：提供 manifest、应用图标、主题色和离线外壳；本地可安装/预览。生产域名与部署账户属于发布动作，仍需要项目所有者完成。

## 7. 仍需人工的发布步骤

- 绑定正式生产域名和部署账户（本地 PWA 与 CI 不依赖此步骤）。
- 若未来从 Mock 切换到真实第三方服务，提供相应 API 凭据和授权。
