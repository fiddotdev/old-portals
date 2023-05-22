import { ThemeStore, ThemeActions, ThemeMode } from '../types/ThemeTypes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useThemeStore = create<ThemeStore & ThemeActions>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: ThemeMode) => set(() => ({ theme }))
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
