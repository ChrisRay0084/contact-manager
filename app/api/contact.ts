import { ContactType } from "../_types/contacts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// GET all contacts for a user
export const getContacts = async (userId: string) => {
  const res = await fetch(`${API_URL}/api/contacts?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
};

// GET a single contact by ID
export const getContactById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/contacts?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch contact");
  const data = await res.json();
  return data[0] || null;
};

// CREATE a new contact
export const createContact = async (contact: ContactType) => {
  const res = await fetch(`${API_URL}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to create contact");
  return res.json();
};

// UPDATE a contact
export const updateContact = async (id: string, contact: ContactType) => {
  const res = await fetch(`${API_URL}/api/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return res.json();
};

// DELETE a contact
export const deleteContact = async (id: string) => {
  const res = await fetch(`${API_URL}/api/contacts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete contact");
  return res.json();
};