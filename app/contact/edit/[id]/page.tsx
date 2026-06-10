// app/contact/edit/[id]/page.tsx

import ContactForm from "@/app/_components/ContactForm";
import { updateContactAction } from "@/app/actions/contact";
import { createClient } from "@/app/_lib/supabaseServer";
import { ContactType } from "@/app/_types/contacts";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditContactPage = async ({ params }: PageProps) => {
  const { id } = await params;

  if (!id) return <div>Invalid contact ID</div>;

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <div>Please log in</div>;
  }

  const { data: contact, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !contact) {
    return <div>Contact not found</div>;
  }

  // 🔥 IMPORTANT FIX: bind the ID into the server action
  const updateActionWithId = updateContactAction.bind(null, id);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Contact</h1>

      <ContactForm
        action={updateActionWithId}
        contact={contact as ContactType}
      />
    </div>
  );
};

export default EditContactPage;