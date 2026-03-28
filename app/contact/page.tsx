import React from 'react';
import ContactList from '../_components/ContactList';
import { getContactsAction } from '../api/contact';
import { getSession } from '../_lib/session';

const ContactPage = async () => {
  const user = await getSession();

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

  const contacts = await getContactsAction();
  console.log("Contacts:", contacts);

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