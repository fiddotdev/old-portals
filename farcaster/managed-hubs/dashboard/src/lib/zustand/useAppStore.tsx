import AppsPage from '@/components/tabs/Apps';
import { LayoutGrid, Server } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface App {
  appId: string;
  appName: string;
  appPlan: string;
  apiKey: string;
  hubUrl: string;
  createdAt: Date;
  updatedAt?: string;
}

interface AppStore {
  apps: App[];
  setApps: (apps: App[]) => void;
}

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      apps: [],
      setApps: (apps) => {
        set((store) => ({ apps }));
      },
    }),
    {
      name: 'app_store',
    }
  )
);

export { useAppStore };
