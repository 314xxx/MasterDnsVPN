import { useStore } from '@/store';
import { Info, FileText, ChevronRight, Github, Globe } from 'lucide-react';

export default function Settings() {
  const { status } = useStore();

  const groups = [
    {
      title: '关于',
      items: [
        { icon: Info, label: '版本', value: 'v1.0.0' },
        { icon: FileText, label: '用户协议', value: '' },
        { icon: Github, label: '开源地址', value: '' },
      ],
    },
    {
      title: '连接',
      items: [
        { icon: Globe, label: '当前状态', value: status === 'connected' ? '已连接' : status === 'connecting' ? '连接中' : '未连接' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-bold text-dvpn-text">设置</h2>
      </div>

      <div className="px-4 pb-6 flex flex-col gap-5">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-dvpn-subtext uppercase tracking-wider mb-2 px-1">
              {group.title}
            </h3>
            <div className="liquid-glass rounded-2xl overflow-hidden">
              {group.items.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === group.items.length - 1;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-white/30 ${
                      !isLast ? 'border-b border-white/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-dvpn-subtext" />
                      <span className="text-sm text-dvpn-text">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.value && (
                        <span className="text-xs text-dvpn-subtext">{item.value}</span>
                      )}
                      <ChevronRight size={16} className="text-dvpn-subtext" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Footer */}
        <p className="text-center text-[10px] text-dvpn-subtext/60 mt-2">
          DeVPN UI v1.0.0 · Built with React
        </p>
      </div>
    </div>
  );
}
