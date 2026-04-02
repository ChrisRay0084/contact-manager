"use server";

import { redirect } from "next/navigation";
import { getSession } from "../_lib/session";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
import { ContactType } from "../_types/contacts";

const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(db: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}
/*** Get all contacts for the logged-in user */
export const getContacts = async (): Promise<ContactType[]> => {
  const user = await getSession();
  if (!user) return [];

  const db = readDB();
  return db.contacts.filter((c: ContactType) => c.userId === user.id);
};

/** CREATE */
export const createContactAction = async (formData: FormData) => {
  const user = await getSession();
  if (!user) throw new Error("Not authenticated");

  const db = readDB();
  db.contacts.push({
    id: `C_${nanoid()}`,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id,
  });
  writeDB(db);

  redirect("/contact?created=true");
};

/** UPDATE */
export const updateContactAction = async (formData: FormData) => {
  const user = await getSession();
  if (!user) throw new Error("Not authenticated");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const db = readDB();
  const index = db.contacts.findIndex((c: ContactType) => c.id === id && c.userId === user.id);
  if (index === -1) throw new Error("Contact not found");

  db.contacts[index] = { ...db.contacts[index], name, email };
  writeDB(db);

  redirect("/contact?updated=true");
};

/** DELETE */
export const deleteContactAction = async (formData: FormData) => {
  const user = await getSession();
  if (!user) throw new Error("Not authenticated");

  const id = formData.get("id") as string; // FormData now works correctly
  const db = readDB();
  db.contacts = db.contacts.filter((c: ContactType) => !(c.id === id && c.userId === user.id));
  writeDB(db);

  redirect("/contact?deleted=true");
};