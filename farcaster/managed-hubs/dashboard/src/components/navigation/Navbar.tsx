import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenuLink } from '../ui/navigation-menu';
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LayoutGridIcon, LogOutIcon, ServerIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth, useClerk } from '@clerk/nextjs';
import { create } from 'zustand';
import useStore from '@/lib/useStore';
import { tabDefinitions, useTabStore } from '@/lib/zustand/useTabStore';

const Navbar = () => {
  const { signOut } = useAuth();

  const tabStore = useStore(useTabStore, (state) => state);

  return (
    <nav className="w-28 min-h-screen bg-black relative flex justify-center py-8">
      <div className="flex flex-col items-center space-y-2">
        <Image
          src="/WhiteLogo.webp"
          width={50.25}
          height={67}
          alt="Portals"
          className="pb-4"
        />
        {tabDefinitions.map((def) => (
          <TooltipProvider key={def.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-20 rounded-lg flex items-center justify-center p-4 ${
                    tabStore?.tab === def.id
                      ? 'bg-purple-400/50'
                      : 'bg-transparent'
                  } hover:bg-purple-400/25 transition-all ease-in-out duration-200 group`}
                  onClick={() => tabStore?.setTab(def.id)}
                >
                  {def.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{def.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="absolute bottom-4">
            <AvatarImage src="https://picsum.photos/200" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div
              onClick={() => signOut()}
              className="flex flex-row space-x-2 space-y-0 items-center"
            >
              <LogOutIcon color={'rgb(239 68 68 / 1)'} size={16} />
              <h1 className="text-md font-medium text-red-500">Log Out</h1>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
