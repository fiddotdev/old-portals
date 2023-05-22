export type ThemeMode = 'dark' | 'light';

export type ThemeStore = {
  theme: ThemeMode;
};

export type ThemeActions = {
  setTheme: (theme: ThemeMode) => void;
};
