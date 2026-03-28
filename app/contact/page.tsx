// app/contact/page.tsx
import React from "react";
import { getSession } from "../_lib/session";
import { getContacts } from "../api/contact";
import ContactList from "../_components/ContactList";

const ContactPage = async () => {
  // Get the current user from the session
  const user = await getSession();

  // If no user, prompt to log in
  if (!user) {
    return (
      <div>
        Please{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          log in
        </a>{" "}
        to view your contacts.
      </div>
    );
  }

  // Ensure user.id is a string
  const userId = String(user.id);

  // Fetch contacts for this user
  const contacts = await getContacts(userId);
  console.log("Contacts for userId", userId, ":", contacts);

  // If no contacts, prompt to add a new one
  if (!contacts || contacts.length === 0) {
    return (
      <div>
        Please{" "}
        <a href="/contact/new" className="text-blue-600 hover:underline">
          add a contact
        </a>{" "}
        to view your contacts list.
      </div>
    );
  }

  // Render contacts list
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Contacts</h1>
        <a
          href="/contact/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Contact
        </a>
      </div>

      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactPage;