import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <SignIn />
    </div>
  );
}
