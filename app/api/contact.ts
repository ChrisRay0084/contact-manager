import { ContactType } from "../_types/contacts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// GET all contacts for a user
export const getContacts = async (userId: string | number) => {
  const url = `${API_URL}/contacts?userId=${encodeURIComponent(String(userId))}`;

  console.log("GET contacts - URL:", url);
  console.log("userId type:", typeof userId);

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error response:", text);
    console.error("Status:", res.status);
    throw new Error(`Failed to fetch contacts: ${res.status}`);
  }

  return res.json();
};

// GET a single contact by ID
export const getContactById = async (id: string) => {
  const url = `${API_URL}/contacts?id=${encodeURIComponent(id)}`;
  console.log("GET contact by ID - URL:", url);

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error response:", text);
    console.error("Status:", res.status);
    throw new Error(`Failed to fetch contact: ${res.status}`);
  }

  const data = await res.json();
  return data[0] || null;
};

// CREATE a new contact
export const createContact = async (contact: ContactType) => {
  const url = `${API_URL}/contacts`;
  console.log("CREATE contact - URL:", url);
  console.log("Contact data:", contact);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error response:", text);
    console.error("Status:", res.status);
    throw new Error(`Failed to create contact: ${res.status}`);
  }

  return res.json();
};

// UPDATE a contact
export const updateContact = async (id: string, contact: ContactType) => {
  const url = `${API_URL}/contacts/${id}`;
  console.log("UPDATE contact - URL:", url);
  console.log("Contact data:", contact);

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error response:", text);
    console.error("Status:", res.status);
    throw new Error(`Failed to update contact: ${res.status}`);
  }

  return res.json();
};

// DELETE a contact
export const deleteContact = async (id: string) => {
  const url = `${API_URL}/contacts/${id}`;
  console.log("DELETE contact - URL:", url);

  const res = await fetch(url, { method: "DELETE" });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error response:", text);
    console.error("Status:", res.status);
    throw new Error(`Failed to delete contact: ${res.status}`);
  }

  return res.json();
};