# 首页全面精修设计（2026-09-15）

## 背景与目标

对 zlion-homepage（Vue 3 + Vite 个人主页）做全面视觉打磨：解决用户反馈的「布局拥挤」「动效生硬」两个痛点，保持现有深色玻璃拟态 + 壁纸风格不变。范围覆盖一级主页与「探索更多」二级面板，所有配置项保持 `src/config.js` 可配置，不改配置语义。

## 硬性约束（性能红线，摘自 README 实测结论）

1. 所有玻璃卡动画只允许 `transform`，禁止新增 opacity 动画（Chromium 会暂停 backdrop-filter 渲染，导致"先透底、模糊后到"）。
2. 不新增整屏 `mix-blend-mode` 层（已有颗粒层已改为普通叠加，不得加回混合模式）。
3. 不给玻璃卡常驻 `will-change: backdrop-filter`（二级面板动态挂载卡片的已有写法保留不动）。
4. 面板本体不做位移动画（面板自带壁纸层，一动背景整块平移）；只动面板内部卡片。
5. 歌单渐进上屏、`content-visibility`、长文本 `min-width: 0` 等既有优化逻辑一律不动。

## 分节设计

### 1. 布局重排 · 呼吸感（解决「拥挤」）

- 容器 `max-width`: 1212px → 1280px。
- 左右列比例：`minmax(0, 5fr) minmax(0, 7fr)` → `minmax(0, 440px) minmax(0, 1fr)`，右列获得更多空间。
- 容器 gap：48px → 56px；上下 padding：32px/24px → 36px/28px。
- 卡片内 padding 统一加大（约 20/24 → 24/28，依据各卡现状微调，含 GreetCard 的引号安全区）。
- 右侧 bento 行高：固定 150px → `minmax(156px, auto)`；bento 内部 gap 维持 32px（与列 gap 节奏一致）。
- 站点列表卡：最小高度 72px → 80px，卡间距 16px → 20px；图标底加轻微渐变。

### 2. 质感升级（玻璃卡）

- 边框：单色 `rgba(255,255,255,0.12)` → 渐变描边（左上亮约 0.22 → 右下淡约 0.06），实现用双层 background（`linear-gradient(...) padding-box, linear-gradient(...) border-box` + 透明 border），不引额外 DOM、不影响 backdrop-filter。
- 内高光：`inset 0 1px 0 rgba(255,255,255,0.07)`。
- 阴影分层：`0 2px 8px rgba(0,0,0,0.2)` + `0 16px 44px rgba(0,0,0,0.32)`。
- 圆角：`--radius` 18px → 20px。
- hover 反馈：保留现有光泽层与边框提亮，色彩与渐变配合微调。

### 3. 动效打磨（解决「生硬」）

- 进场 rise：`0.8s / 26px / cubic-bezier(0.22,1,0.36,1)` → `0.9s / 22px / cubic-bezier(0.16,1,0.3,1)`，错峰延迟阶梯微调（0.05/0.12/0.18/0.3/0.55 保持疏密节奏）。
- tilt：`maxRotate` 12° → 10°，scale 保持 1.02（tilt.js 手感不变，仅减旋转幅度）。
- 载入页揭开：fade → 上滑 + 轻微缩放（仅 transform）。
- 打字机光标、点击涟漪、烟花、页面返回浮起动效保持现状。

### 4. 二级面板精修

- header：标题居中、返回键尺寸加大（padding 8/16 → 10/20），与面板新质感一致。
- 卡片 grid gap：20px → 24px。
- `cell-in`/`cell-out` 缓动曲线同步换为 `cubic-bezier(0.16,1,0.3,1)` / 保持退场 `cubic-bezier(0.4,0,1,1)`；时长与错峰间隔不变。
- 卡内排版：新闻/热榜标题字号与行距微调，视觉降噪（不做信息架构改动）。

### 5. 兼容与降级

- `prefers-reduced-motion: reduce` 下所有新增动画关闭（沿用现有媒体查询模式）。
- 移动端（≤980px）布局保持现有堆叠策略，仅同步继承新的间距/质感变量。

## 不做的事

- 不改 `config.js` 结构、不加新配置项。
- 不新增第三方依赖（纯 CSS + 少量 Vue 模板/JS 调整）。
- 不做配色体系重设计（保持 indigo/cyan 强调色）。

## 验证

1. `npm run build` 通过。
2. dev 服务器桌面宽度（1280px+）与移动端宽度（375px）各截图检查一次：布局呼吸感、渐变描边渲染、进场/面板动效。
3. 复查性能红线：diff 中无新增 opacity 动画、无整屏 mix-blend-mode、无常驻 will-change。