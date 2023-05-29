'use client';

import Link from 'next/link';

// TODO List
// TODO: Display different content based on auth status
// TODO: Implement UI Login Flow (email -> otp -> optional 2fa)
// TODO: Create simple dashboard w/ macos style menu bar
export default function Home() {
  return (
    <main
      className={
        'w-screen min-h-screen bg-dark-primary flex flex-col justify-center items-center'
      }
    >
      <h1 className="text-6xl font-sans text-white font-bold">
        Portals via EBS via GH Workflows
      </h1>
      <Link href={'https://github.com/withportals/portals'}>
        <span className="text-3xl font-sans text-gray-200 font-normal">
          GitHub
        </span>
      </Link>
    </main>
  );
}
