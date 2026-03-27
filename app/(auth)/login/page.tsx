// this isa server component by default
import React from 'react'
import LoginForm from '../../_components/LoginForm';
import Link from 'next/link';


const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginForm />
      <p className='mt-4 text-center'>Don't have an account? <Link href="/register" className='text-blue600 hover:underline'>Register</Link></p>
    </div>
  )
}

export default LoginPage

// Server components are rendered on the server by default
// If you want to render a component on the client, you can add the "use client" directive at the top of the file
// Server actions are functions that run on the server and can be called from the client components. They are useful for handling form submissions, database operations, and other server-side logic without needing to set up an API route. To create a server action, you can export an async function from your component file and use the "use server" directive to indicate that it should run on the server. You can then call this function from your client components using the "fetch" API or by using a library like "react-query" to manage the data fetching and caching.