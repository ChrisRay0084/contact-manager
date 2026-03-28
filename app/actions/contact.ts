'use server';

import { revalidatePath } from "next/cache";
import { ContactType } from "../_types/contacts";
import { getSession } from "../_lib/session";
import { nanoid } from "nanoid";
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

function readDB() {
  const jsonData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(jsonData);
}

function writeDB(db: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

/** Create a new contact */
export const createContactAction = async (prevState: any, formData: FormData) => {
  if (!formData) return { error: "Form data is required" };

  const user = await getSession();
  if (!user) return { error: "User session not found" };

  const newContact: ContactType = {
    id: `C_${nanoid(6)}`,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id,
  };

  try {
    const db = readDB();
    db.contacts.push(newContact);
    writeDB(db);

    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Error creating contact:", error);
    return { error: "Failed to create contact. Please try again." };
  }
};

/** Update an existing contact */
export const updateContactAction = async (prevState: any, formData: FormData) => {
  if (!formData) return { error: "Form data is required" };

  const id = formData.get("id") as string;
  if (!id) return { error: "No ID provided" };

  const user = await getSession();
  if (!user) return { error: "User session not found" };

  const updatedContact: ContactType = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id,
  };

  try {
    const db = readDB();
    const index = db.contacts.findIndex((c: ContactType) => c.id === id);
    if (index === -1) return { error: "Contact not found" };

    db.contacts[index] = { ...db.contacts[index], ...updatedContact };
    writeDB(db);

    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Error updating contact:", error);
    return { error: "Failed to update contact. Please try again." };
  }
};

/** Delete a contact */
export const deleteContactAction = async (prevState: any, formData: FormData) => {
  const id = formData.get("id") as string;
  if (!id) return { error: "No ID provided" };

  try {
    const db = readDB();
    db.contacts = db.contacts.filter((c: ContactType) => c.id !== id);
    writeDB(db);

    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { error: "Failed to delete contact. Please try again." };
  }
};