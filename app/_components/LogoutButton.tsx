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
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer" onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton