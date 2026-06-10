import { useStore } from '@/store';
import DotMatrix from '@/components/DotMatrix';
import StatusIcon from '@/components/StatusIcon';
import { Power, MapPin, Activity, Cpu, HardDrive } from 'lucide-react';

export default function Home() {
  const { status, currentNode, stats, connect, disconnect } = useStore();

  const handleConnect = () => {
    if (status === 'connected' || status === 'connecting') {
      disconnect();
    } else {
      connect();
    }
  };

  const btnText = status === 'connected' ? '断开连接' : status === 'connecting' ? '连接中...' : '开始连接';
  const btnColor = status === 'connected' ? 'bg-dvpn-red' : 'bg-dvpn-blue';
  const btnDisabled = status === 'connecting';

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
      {/* Dot Matrix Status Area */}
      <div className="relative mx-4 mt-3 rounded-3xl overflow-hidden bg-gradient-to-b from-white/40 to-white/10" style={{ height: '42vh', minHeight: 280 }}>
        <DotMatrix status={status} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <StatusIcon status={status} />
          <p className="mt-4 text-sm font-medium text-dvpn-subtext">
            {status === 'idle' && '未连接'}
            {status === 'connecting' && '正在连接...'}
            {status === 'connected' && `已连接 · ${currentNode.name}`}
            {status === 'failed' && '连接失败'}
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
        {/* IP Card */}
        <div className="liquid-glass rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-dvpn-subtext">
            <MapPin size={14} />
            <span className="text-xs">IP 地址</span>
          </div>
          <p className="text-sm font-semibold text-dvpn-text tracking-wide">
            {stats.ip}
          </p>
        </div>

        {/* Latency Card */}
        <div className="liquid-glass rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-dvpn-subtext">
            <Activity size={14} />
            <span className="text-xs">延迟</span>
          </div>
          <p className="text-sm font-semibold text-dvpn-text">
            {stats.latency > 0 ? `${stats.latency} ms` : '--'}
          </p>
        </div>

        {/* Memory Card */}
        <div className="liquid-glass rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-dvpn-subtext">
            <HardDrive size={14} />
            <span className="text-xs">内存占用</span>
          </div>
          <p className="text-sm font-semibold text-dvpn-text">
            {stats.memory > 0 ? `${stats.memory} MB` : '--'}
          </p>
        </div>

        {/* CPU Card */}
        <div className="liquid-glass rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-dvpn-subtext">
            <Cpu size={14} />
            <span className="text-xs">CPU 占用</span>
          </div>
          <p className="text-sm font-semibold text-dvpn-text">
            {stats.cpu > 0 ? `${stats.cpu}%` : '--'}
          </p>
        </div>
      </div>

      {/* Connect Button */}
      <div className="mx-4 mt-5 mb-6">
        <button
          onClick={handleConnect}
          disabled={btnDisabled}
          className={`w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 ${btnColor}`}
        >
          <Power size={20} />
          {btnText}
        </button>
      </div>
    </div>
  );
}
