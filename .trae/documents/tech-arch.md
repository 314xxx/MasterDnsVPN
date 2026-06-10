## 1. 架构设计

采用 WebView 混合应用架构：
- Android Native 层：提供 WebView 容器、系统状态栏适配、返回键处理
- Frontend 层：React + TypeScript + Tailwind CSS 构建 UI，打包后作为本地资源加载

## 2. 技术选型

- **Frontend**: React@18 + TypeScript + Tailwind CSS + Vite
- **State**: Zustand（管理连接状态、当前节点、分流模式）
- **Routing**: 自定义 Tab 路由（首页/会员/我的）
- **Android**: WebView 加载 `file:///android_asset/index.html`

## 3. 路由定义

| 路由/Tab | 用途 |
|---------|------|
| /home | 首页，连接控制、节点选择、分流模式 |
| /vip | 会员页，套餐展示与购买 |
| /profile | 我的页，用户信息与设置 |

## 4. 状态管理

```typescript
interface AppState {
  isConnected: boolean;
  currentNode: { name: string; code: string; flag: string };
  splitMode: { name: string; desc: string };
  vipExpired: boolean;
  freeMinutes: number;
  setConnected: (v: boolean) => void;
  setNode: (node: AppState['currentNode']) => void;
  setSplitMode: (mode: AppState['splitMode']) => void;
}
```

## 5. 构建流程

1. Vite 构建前端资源到 `dist/` 目录
2. 将 `dist/` 内容复制到 Android 项目 `app/src/main/assets/`
3. Android Gradle 构建生成 APK
