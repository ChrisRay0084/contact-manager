"use client";
import React from 'react'
import { logoutAction } from '../actions/auth';
// import { redirect } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
      try{
            await logoutAction();
            // The redirect happens in the server action
            // redirect("/login");
            // This is the client-side redirect as a fall back
            router.push("/login");
            router.refresh();
      } catch (error) {
          console.error("Logout error:", error);
      }

    };

  return (
    <button
      type="button"
      aria-label="Log out of your account"
      className="cursor-pointer rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default LogoutButton