import { useStore } from '@/store';
import { Gift, AlignJustify, Zap, ChevronRight, SlidersHorizontal } from 'lucide-react';

export default function Home() {
  const { isConnected, currentNode, splitMode, vipExpired, freeMinutes, setConnected } = useStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-white">
        <div className="flex items-center gap-3">
          <button className="p-1">
            <Gift size={22} className="text-dvpn-text" />
          </button>
          <button className="p-1">
            <AlignJustify size={22} className="text-dvpn-text" />
          </button>
        </div>
        <h1 className="text-lg font-bold text-dvpn-text tracking-wide">DeVPN</h1>
        <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
          <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-dvpn-green' : 'bg-dvpn-red'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-dvpn-green' : 'bg-dvpn-red'}`}></span>
          </span>
          <span className="text-sm text-dvpn-subtext">{isConnected ? '運行中' : '已停止'}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Banner */}
        <div className="mx-4 mt-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 p-5 text-white text-center shadow-sm">
          <p className="text-base font-medium">一次推廣，雙重收益</p>
          <div className="flex justify-center mt-2 gap-1">
            <span className="h-1.5 w-4 rounded-full bg-white/80"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
          </div>
        </div>

        {/* Connection Status & Button */}
        <div className="mx-4 mt-6 flex flex-col items-center">
          <p className="text-sm text-dvpn-subtext mb-4">
            {isConnected ? `免費流量生效中: ${freeMinutes} 分鐘` : (vipExpired ? '會員已過期' : '')}
          </p>

          <button
            onClick={() => setConnected(!isConnected)}
            className={`w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              isConnected ? 'bg-dvpn-red' : 'bg-dvpn-blue'
            }`}
          >
            <Zap size={20} fill="currentColor" />
            {isConnected ? '斷開連接' : '快速連接'}
          </button>
        </div>

        {/* Cards */}
        <div className="mx-4 mt-5 grid grid-cols-2 gap-3 pb-6">
          {/* Node Card */}
          <button className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentNode.flag}</span>
              <div>
                <p className="text-sm font-semibold text-dvpn-text">{currentNode.name}</p>
                <p className="text-xs text-dvpn-subtext">{currentNode.code}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-dvpn-subtext" />
          </button>

          {/* Split Mode Card */}
          <button className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <SlidersHorizontal size={16} className="text-dvpn-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold text-dvpn-text">{splitMode.name}</p>
                <p className="text-xs text-dvpn-subtext">{splitMode.desc}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-dvpn-subtext" />
          </button>
        </div>
      </div>
    </div>
  );
}
