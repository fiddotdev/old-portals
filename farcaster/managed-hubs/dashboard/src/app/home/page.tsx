'use client';

import Navbar from '@/components/navigation/Navbar';
import useStore from '@/lib/useStore';
import { tabDefinitions, useTabStore } from '@/lib/zustand/useTabStore';
import { useEffect } from 'react';

const AppHomepage = () => {
  const tabStore = useStore(useTabStore, (state) => state);

  const tabDefinition = tabDefinitions.filter(
    (def) => def.id === tabStore?.tab
  );

  useEffect(() => {
    if (tabDefinition.length === 0) {
      tabStore?.setTab(0);
    }
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-row">
      <Navbar />
      {tabDefinition && tabDefinition[0]
        ? tabDefinition[0].page
        : tabDefinitions[0].page}
    </div>
  );
};

export default AppHomepage;
