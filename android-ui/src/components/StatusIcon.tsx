import { Check, X, Loader2 } from 'lucide-react';

interface StatusIconProps {
  status: 'idle' | 'connecting' | 'connected' | 'failed';
}

export default function StatusIcon({ status }: StatusIconProps) {
  if (status === 'connecting') {
    return (
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="connecting-ripple absolute inset-0 rounded-full" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-dvpn-blue/10 flex items-center justify-center">
          <Loader2 size={40} className="text-dvpn-blue animate-spin-slow" />
        </div>
      </div>
    );
  }

  if (status === 'connected') {
    return (
      <div className="status-pop flex items-center justify-center w-20 h-20 rounded-full bg-dvpn-green/10">
        <Check size={44} className="text-dvpn-green stroke-[3]" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="status-pop flex items-center justify-center w-20 h-20 rounded-full bg-dvpn-red/10">
        <X size={44} className="text-dvpn-red stroke-[3]" />
      </div>
    );
  }

  // idle
  return (
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200/50">
      <div className="w-3 h-3 rounded-full bg-gray-300" />
    </div>
  );
}
