import ContactList from "../_components/ContactList";
import { createClient } from "../_lib/supabaseServer";

const ContactPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>Please log in</p>;
  }

  return <ContactList />;
};

export default ContactPage;