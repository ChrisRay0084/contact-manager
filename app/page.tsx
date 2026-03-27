import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-5 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Contact Manager!</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage your contacts easily and efficiently.</p>
        <Image src="/smartphone1.png" alt="Cell Phone Image" width={300} height={300} className="mx-auto mt-6 rounded-lg" />
      </div>
      <div className="text-center">
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Start managing your contacts today!</p>
      </div>
    </div>
  );
}
