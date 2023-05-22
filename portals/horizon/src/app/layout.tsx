'use client';

import '../styles/globals.css';
// include styles from the ui package
import 'ui/styles.css';
import { useSSRStore } from '../utils/zustand/useSSRStore';
import { useThemeStore } from '../utils/zustand/stores/ThemeStore';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSSRStore(useThemeStore, (store) => store.theme);
  return (
    <html lang="en" className={`bg-zinc-900 ${theme}`}>
      <body>{children}</body>
    </html>
  );
}
