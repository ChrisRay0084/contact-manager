import Link from "next/link";
import { createClient } from "../_lib/supabaseServer";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let profileName = user?.email ?? "";

  if (user && !userError) {
    const { data: profile } = await supabase
      .from("users")
      .select("name, email")
      .eq("id", user.id)
      .single();

    profileName = profile?.name || profile?.email || user.email || "User";
  }

  return (
    <nav className="bg-white shadow-md" aria-label="Primary navigation">
      <div className="container mx-auto grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4">
        <Link
          href="/"
          className="justify-self-start text-xl font-bold text-blue-600 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Contact Manager
        </Link>

        <div className="justify-self-center text-sm font-medium text-gray-700 md:text-base">
          {user ? `Welcome, ${profileName}` : ""}
        </div>

        <div className="flex items-center justify-self-end gap-3 text-sm md:gap-4 md:text-base">
          {user ? (
            <>
              <Link href="/contact" className="rounded text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Contacts
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="rounded text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Login
              </Link>
              <Link href="/register" className="rounded text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;