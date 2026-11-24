# 技术栈决策

**语言：[中文](tech-stack.md) | [English](tech-stack.en.md)**

> 状态：**前端已确定，后端待定。** 第三次会议已确认前后端分离、前端使用 TypeScript + 组件化、后端接口预留；ATDD 脚手架已采用 React + Vite。

## 设计基线

- 系统设计中已固定前后端分离的 API/Repository 边界；该边界与框架无关。
- 第三次会议已确定：前端使用 TypeScript + 前端组件，后端暂不实现但预留接口。
- 首版默认使用与 HTTP API 同契约的本地 Mock，不要求先完成后端。
- 当前脚手架采用 **React 19 + Vite 8 + TypeScript 5.9**，移动端优先 PWA；Vitest + Testing Library 用于 ATDD。
- 未来后端应实现 `docs/04-engineering/system-design.md` 中的 `/api/v1` 契约，优先采用模块化单体，而不是微服务。
- 参见 [系统设计](system-design.md) 与 [模块设计](module-design.md)。

## 待决策项

| 项目 | 候选 | 状态 | 理由/约束 |
| --- | --- | --- | --- |
| 原型形式 | Figma clickable prototype | 已明确作为原型基线 | 源文档要求可点击页面跳转 |
| 是否开发可运行 App | mobile Web/PWA 原型 | 已开始 | ATDD 脚手架已可运行；真实业务范围仍待研究 |
| 目标平台 | mobile Web/PWA | 已用于脚手架 | 原生 iOS/Android 暂不在本轮实现范围 |
| 前端技术 | React 19 + Vite 8 + TypeScript 5.9 | 已确定（脚手架） | 满足 TypeScript + 组件化方向；可按评审调整框架 |
| 后端/数据库 | 前后端分离；后端接口预留 | 部分确定 | 后端暂不实现；REST/数据库选型未定 |
| 通知方案 | LocalNotificationScheduler（Mock） | 预留 | 真实权限与后台行为需要单独设计 |
| 图表/数据可视化 | 待定 | 待调研 | 仅在相关研究确认后加入 |

## 选择标准

1. 团队能在课程时间内完成并维护。
2. 能验证核心交互，而不是为了技术演示牺牲设计质量。
3. 支持必要平台能力（如通知），且有明确的权限处理。
4. 能最小化健康数据收集并支持删除/退出。
5. 外部 API 失败时仍有可展示的降级体验。

## 决策记录

| 日期 | 决策 | 备选 | 证据 | 负责人 |
| --- | --- | --- | --- | --- |
| 第三次会议（日期未记录） | 采用现有 UI/UX；前后端分离；TypeScript + 前端组件；后端接口预留 | 另一套 UI；纯静态；前后端不分离 | [第三次会议记录](../06-meetings/meeting-03-planning.md) | 小组 |
| 2026-11-24 | 前后端分离契约 + 可替换 Mock Adapter | 纯静态原型、直接第三方 API | [系统设计](system-design.md)、[模块设计](module-design.md) | 工程整理 |
| 2026-11-24 | React 19 + Vite 8 + TypeScript 5.9 + Vitest 脚手架 | React、其他框架；纯 Figma | [ATDD 脚手架](atdd.md)、`src/` | 工程整理 |
| — | 后端框架与数据库 | 模块化单体、其他 | 待小组确认 | — |
