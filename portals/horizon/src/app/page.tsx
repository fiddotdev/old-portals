'use client';

import { PortalsNav, PortalsButton } from 'ui';

// TODO List
// TODO: Display different content based on auth status
// TODO: Implement UI Login Flow (email -> otp -> optional 2fa)
// TODO: Create simple dashboard w/ macos style menu bar
export default function Home() {
  return (
    <>
      <PortalsNav.NavigationMenu>
        <PortalsNav.NavigationMenuList>
          <PortalsNav.NavigationMenuItem>
            <PortalsNav.NavigationMenuTrigger>
              Item One
            </PortalsNav.NavigationMenuTrigger>
            <PortalsNav.NavigationMenuContent>
              <PortalsNav.NavigationMenuLink>
                Link
              </PortalsNav.NavigationMenuLink>
            </PortalsNav.NavigationMenuContent>
          </PortalsNav.NavigationMenuItem>
        </PortalsNav.NavigationMenuList>
      </PortalsNav.NavigationMenu>
      <main
        className={
          'w-screen min-h-screen bg-dark-primary flex flex-col justify-center items-center'
        }
      >
        <h1 className="text-6xl font-sans text-white font-bold">
          Portals via EBS via GH Workflows
        </h1>
        <PortalsButton.Button variant={'default'}>GitHub</PortalsButton.Button>
      </main>
    </>
  );
}
