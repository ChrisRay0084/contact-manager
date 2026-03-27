
import Link from "next/link";
import React from 'react'
import LogoutButton from "./LogoutButton";
import { getSession } from "../_lib/session";

const Navbar = async() => {
    const session = await getSession(); 

  return (
    <nav className="bg-white shadow-md">
    <div className="container mx-auto px-4 flex justify-between items-center h-16">
    
        <div className="text-xl font-bold text-blue-600">
        Contact Manager
        </div>

        <div className="flex items-center space-x-4">
            {session ? (
                            <>
                                <Link href="/contact" className="hover:text-blue-600">
                                    Contacts
                                </Link>
                                <LogoutButton />
                                
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-blue-600">
                                    Login
                                </Link>
                                <Link href="/register" className="hover:text-blue-600">
                                    Register
                                </Link>
                            </>
                        )
            }
        </div>

  </div>
</nav>
  )
}

export default Navbar