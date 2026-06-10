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
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input id="name" name="name" placeholder="Enter your name" autoComplete="name" required className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" autoComplete="email" required className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" />
        <p className="mt-1 text-xs text-gray-600">Use a valid email format such as name@example.com.</p>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input id="password" name="password" type="password" placeholder="Password" autoComplete="new-password" required className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" />
        <p className="mt-1 text-xs text-gray-600">Password must be at least 6 characters.</p>
      </div>

      {state?.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600" role="alert" aria-live="polite">{state.error}</div>
      )}

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Register
      </button>
    </form>

  );
}

export default RegisterForm