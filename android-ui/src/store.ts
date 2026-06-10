import { create } from 'zustand';

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'failed';

export interface Node {
  id: string;
  name: string;
  code: string;
  flag: string;
  latency: number;
}

export interface Stats {
  ip: string;
  latency: number;
  memory: number;
  cpu: number;
}

interface AppState {
  status: ConnectionStatus;
  currentNode: Node;
  nodes: Node[];
  stats: Stats;
  activeTab: 'home' | 'nodes' | 'settings';
  connect: () => void;
  disconnect: () => void;
  fail: () => void;
  selectNode: (node: Node) => void;
  setActiveTab: (tab: 'home' | 'nodes' | 'settings') => void;
}

const defaultNodes: Node[] = [
  { id: '1', name: '香港', code: 'HK', flag: 'HK', latency: 32 },
  { id: '2', name: '日本', code: 'JP', flag: 'JP', latency: 68 },
  { id: '3', name: '新加坡', code: 'SG', flag: 'SG', latency: 45 },
  { id: '4', name: '美国', code: 'US', flag: 'US', latency: 186 },
  { id: '5', name: '台湾', code: 'TW', flag: 'TW', latency: 28 },
  { id: '6', name: '韩国', code: 'KR', flag: 'KR', latency: 55 },
];

const defaultStats: Stats = {
  ip: '103.253.XX.XX',
  latency: 0,
  memory: 0,
  cpu: 0,
};

export const useStore = create<AppState>((set) => ({
  status: 'idle',
  currentNode: defaultNodes[0],
  nodes: defaultNodes,
  stats: defaultStats,
  activeTab: 'home',

  connect: () => {
    set({ status: 'connecting' });
    setTimeout(() => {
      set((state) => ({
        status: 'connected',
        stats: {
          ip: '103.253.43.21',
          latency: state.currentNode.latency,
          memory: 12.5,
          cpu: 3.2,
        },
      }));
    }, 2000);
  },

  disconnect: () =>
    set({
      status: 'idle',
      stats: defaultStats,
    }),

  fail: () =>
    set({
      status: 'failed',
      stats: defaultStats,
    }),

  selectNode: (node) =>
    set((state) => ({
      currentNode: node,
      nodes: state.nodes.map((n) =>
        n.id === node.id ? { ...n, latency: n.latency } : n
      ),
      stats:
        state.status === 'connected'
          ? { ...state.stats, latency: node.latency }
          : state.stats,
    })),

  setActiveTab: (tab) => set({ activeTab: tab }),
}));
