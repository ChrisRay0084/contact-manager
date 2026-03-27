'use client';

import { useActionState } from "react";
import { registerAction } from "../actions/auth";
import { useEffect  } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {

    const [state, formAction] = useActionState(registerAction, null);
    const router = useRouter();

    useEffect(() => {
    if (state?.success) {
        router.push("/login");
    }
    }, [state, router]);

  return (
    <form className="space-y-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
      <input name="name" placeholder="Enter your name" required className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
      
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input name="email" type="email" placeholder="Email" required className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
      
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input name="password" type="password" placeholder="Password" required className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <button
        type="submit"
        formAction={formAction}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>

  );
}

export default RegisterForm