'use client';

// TODO List
// TODO: Display different content based on auth status
// TODO: Implement UI Login Flow (email -> otp -> optional 2fa)
// TODO: Create simple dashboard w/ macos style menu bar
export default function Home() {
  return (
    <>
      <main
        className={
          'w-screen min-h-screen bg-black flex flex-col justify-center items-center'
        }
      >
        <h1 className="text-6xl font-sans text-white font-bold pb-4">
          Portals
        </h1>
        <h1 className="text-4xl font-sans text-dark-accent font-bold pb-4 text-center">
          The Farcaster Developer Platform
        </h1>
      </main>
    </>
  );
}
