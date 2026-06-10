import { useStore } from '@/store';
import { Search, ChevronRight, Signal, Check } from 'lucide-react';
import { useState } from 'react';

const flagMap: Record<string, string> = {
  HK: '\uD83C\uDDED\uD83C\uDDF0',
  JP: '\uD83C\uDDEF\uD83C\uDDF5',
  SG: '\uD83C\uDDF8\uD83C\uDDEC',
  US: '\uD83C\uDDFA\uD83C\uDDF8',
  TW: '\uD83C\uDDF9\uD83C\uDDFC',
  KR: '\uD83C\uDDF0\uD83C\uDDF7',
};

function getLatencyColor(ms: number) {
  if (ms < 50) return 'text-dvpn-green';
  if (ms < 120) return 'text-yellow-500';
  return 'text-dvpn-red';
}

export default function Nodes() {
  const { nodes, currentNode, selectNode } = useStore();
  const [query, setQuery] = useState('');

  const filtered = nodes.filter((n) =>
    n.name.toLowerCase().includes(query.toLowerCase()) ||
    n.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-lg font-bold text-dvpn-text mb-3">节点列表</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dvpn-subtext" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索节点..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/60 border border-white/60 text-sm text-dvpn-text placeholder:text-dvpn-subtext focus:outline-none focus:ring-2 focus:ring-dvpn-blue/30"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        <div className="flex flex-col gap-2">
          {filtered.map((node) => {
            const isActive = currentNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => selectNode(node)}
                className={`liquid-glass rounded-2xl p-4 flex items-center justify-between transition-all active:scale-[0.98] text-left ${
                  isActive ? 'ring-2 ring-dvpn-blue/30' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{flagMap[node.code] || '\uD83C\uDF10'}</span>
                  <div>
                    <p className="text-sm font-semibold text-dvpn-text">{node.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Signal size={12} className={getLatencyColor(node.latency)} />
                      <span className={`text-xs font-medium ${getLatencyColor(node.latency)}`}>
                        {node.latency} ms
                      </span>
                    </div>
                  </div>
                </div>
                {isActive ? (
                  <div className="w-6 h-6 rounded-full bg-dvpn-blue/10 flex items-center justify-center">
                    <Check size={14} className="text-dvpn-blue" />
                  </div>
                ) : (
                  <ChevronRight size={18} className="text-dvpn-subtext" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
