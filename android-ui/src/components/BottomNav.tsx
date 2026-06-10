import { Home, Server, Settings } from 'lucide-react';
import { useStore } from '@/store';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useStore();

  const tabs = [
    { key: 'home' as const, label: '主页', icon: Home },
    { key: 'nodes' as const, label: '节点', icon: Server },
    { key: 'settings' as const, label: '设置', icon: Settings },
  ];

  return (
    <nav className="shrink-0 h-16 bg-white/80 backdrop-blur-xl border-t border-white/50 flex items-center justify-around z-50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
              isActive ? 'text-dvpn-blue' : 'text-dvpn-subtext'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
