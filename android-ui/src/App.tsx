import { useStore } from '@/store';
import Home from '@/pages/Home';
import Nodes from '@/pages/Nodes';
import Settings from '@/pages/Settings';
import BottomNav from '@/components/BottomNav';

export default function App() {
  const { activeTab } = useStore();

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-transparent">
      <main className="flex-1 overflow-hidden">
        {activeTab === 'home' && <Home />}
        {activeTab === 'nodes' && <Nodes />}
        {activeTab === 'settings' && <Settings />}
      </main>
      <BottomNav />
    </div>
  );
}
