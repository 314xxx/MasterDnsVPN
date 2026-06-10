## 1. 架构设计

前端单页应用（SPA），使用 React + TypeScript + Tailwind CSS 构建。
- 状态管理：Zustand
- 路由：自定义 Tab 切换（主页 / 节点 / 设置）
- 构建：Vite 打包为静态资源，可嵌入 WebView 或部署为 PWA
- CI/CD：GitHub Actions 自动构建并发布 Release

## 2. 技术选型

- **Frontend**: React@18 + TypeScript + Tailwind CSS + Vite
- **State**: Zustand（连接状态、节点数据、用户信息）
- **Icons**: lucide-react
- **Build**: Vite（输出到 `dist/`）

## 3. 路由定义

| Tab | 用途 |
|-----|------|
| home | 主页，点阵状态、信息卡片、连接按钮 |
| nodes | 节点列表，搜索、测速、选择 |
| settings | 设置页，关于、配置项 |

## 4. 状态管理

```typescript
type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'failed';

interface AppState {
  status: ConnectionStatus;
  currentNode: Node;
  nodes: Node[];
  stats: { ip: string; latency: number; memory: number; cpu: number };
  activeTab: 'home' | 'nodes' | 'settings';
  connect: () => void;
  disconnect: () => void;
  selectNode: (node: Node) => void;
  setActiveTab: (tab: 'home' | 'nodes' | 'settings') => void;
}
```

## 5. 构建与发布流程

1. Vite 构建前端资源到 `dist/` 目录
2. GitHub Actions workflow:
   - 触发条件：push tag `v*` 或手动触发
   - 执行 `npm ci && npm run build`
   - 将 `dist/` 目录打包为 `devpn-ui.zip`
   - 创建 GitHub Release 并上传附件
