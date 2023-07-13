import AppsPage from '@/components/tabs/Apps';
import { LayoutGrid, Server } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface TabStore {
  tab: number;
  setTab: (tab: number) => void;
}

export interface TabDefinition {
  id: number;
  name: string;
  icon: JSX.Element;
  page: JSX.Element;
}

export const tabDefinitions: TabDefinition[] = [
  {
    id: 0,
    name: 'Apps',
    icon: (
      <LayoutGrid
        className="group-hover:scale-125 transition-transform duration-200"
        color={'white'}
        size={24}
      />
    ),
    page: <AppsPage />,
  },
  {
    id: 1,
    name: 'Servers',
    icon: (
      <Server
        className="group-hover:scale-125 transition-transform duration-200"
        color={'white'}
        size={24}
      />
    ),
    page: <AppsPage />,
  },
];

const useTabStore = create<TabStore>()(
  persist(
    (set) => ({
      tab: 0,
      setTab: (tab) => {
        set((store) => ({ tab: tab }));
      },
    }),
    {
      name: 'tab_store',
    }
  )
);

export { useTabStore };
