"use client";

import { useMemo, useState } from "react";
import { ContactType } from "../_types/contacts";

type ContactFormProps = {
  action: (formData: FormData) => Promise<any>;
  contact?: ContactType;
};

const ContactForm = ({ action, contact }: ContactFormProps) => {
  const initialForm = useMemo(
    () => ({
      name: contact?.name || "",
      email: contact?.email || "",
      subject: contact?.subject || "",
      message: contact?.message || "",
    }),
    [contact]
  );

  const [formValues, setFormValues] = useState(initialForm);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nextValues = {
      ...formValues,
      [event.target.name]: event.target.value,
    };

    setFormValues(nextValues);
    setIsDirty(JSON.stringify(nextValues) !== JSON.stringify(initialForm));
  };

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="id" value={contact?.id || ""} />

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="contact-name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700">Relationship</label>
        <input
          id="contact-subject"
          name="subject"
          value={formValues.subject}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="contact-message"
          name="message"
          value={formValues.message}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
      </div>

      <button
        type="submit"
        disabled={contact ? !isDirty : false}
        className={`rounded px-4 py-2 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          contact
            ? isDirty
              ? "bg-green-600 hover:bg-green-700"
              : "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {contact ? "Update Contact" : "Create Contact"}
      </button>
    </form>
  );
};

export default ContactForm;