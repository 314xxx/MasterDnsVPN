import { create } from 'zustand';

interface Node {
  name: string;
  code: string;
  flag: string;
}

interface SplitMode {
  name: string;
  desc: string;
}

interface AppState {
  isConnected: boolean;
  currentNode: Node;
  splitMode: SplitMode;
  vipExpired: boolean;
  freeMinutes: number;
  activeTab: 'home' | 'vip' | 'profile';
  setConnected: (v: boolean) => void;
  setNode: (node: Node) => void;
  setSplitMode: (mode: SplitMode) => void;
  setActiveTab: (tab: 'home' | 'vip' | 'profile') => void;
}

export const useStore = create<AppState>((set) => ({
  isConnected: false,
  currentNode: { name: '香港', code: 'HK', flag: '🇭🇰' },
  splitMode: { name: '智能分流', desc: '更省數據用量' },
  vipExpired: true,
  freeMinutes: 60,
  activeTab: 'home',
  setConnected: (v) => set({ isConnected: v }),
  setNode: (node) => set({ currentNode: node }),
  setSplitMode: (mode) => set({ splitMode: mode }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
