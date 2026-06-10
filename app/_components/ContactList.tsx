import Link from "next/link";
import { createClient } from "../_lib/supabaseServer";
import DeleteButton from "./DeleteButton";

const ContactList = async () => {
  const supabase = await createClient();

  // ✅ Get user safely
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <p>No user</p>;
  }

  // ✅ Fetch contacts
  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("CONTACT FETCH ERROR:", error.message);
    return <p>Error loading contacts</p>;
  }

  // ✅ Empty state (important UX + prevents undefined issues)
  if (!contacts || contacts.length === 0) {
    return (
      <p className="text-black bg-white p-4 rounded-md shadow-sm">
        No contacts, create a <Link href="/contact/new" className="font-semibold text-blue-600 hover:text-blue-700"><em>new contact</em></Link>.
      </p>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-600">Overview</p>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Contacts</h1>
        </div>

        <Link
          href="/contact/new"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Add New Contact
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contacts.map((c) => (
          <article
            key={c.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">{c.name}</h2>
                <p className="text-gray-600">{c.email}</p>
                {c.subject ? (
                  <p className="text-sm text-gray-500">Relationship: {c.subject}</p>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Link
                  href={`/contact/edit/${c.id}`}
                  className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  Edit
                </Link>
                <DeleteButton contact={c} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ContactList;