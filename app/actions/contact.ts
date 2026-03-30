'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; // ✅ NEW
import { ContactType } from "../_types/contacts";
import { getSession } from "../_lib/session";
import { nanoid } from "nanoid";
import { getFileFromGitHub, updateFileOnGitHub } from "../_lib/github";

/** CREATE CONTACT */
export const createContactAction = async (formData: FormData) => {
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
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs");
      const path = await import("path");
      const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

      const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      db.contacts.push(newContact);

      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
      console.log("✅ Contact created locally:", newContact);

    } else {
      const { json: db, sha } = await getFileFromGitHub();
      db.contacts.push(newContact);
      await updateFileOnGitHub(db, sha);
      console.log("✅ Contact created on GitHub:", newContact);
    }

    revalidatePath("/contact");

    // ✅ REDIRECT
    redirect("/contact?created=true");

  } catch (error: any) {
    console.error("Error creating contact:", error);
    return { error: error.message || "Failed to create contact" };
  }
};


/** UPDATE CONTACT */
export const updateContactAction = async (formData: FormData) => {
  if (!formData) return { error: "Form data is required" };

  const id = formData.get("id") as string;
  if (!id) return { error: "No ID provided" };

  const user = await getSession();
  if (!user) return { error: "User session not found" };

  const updatedContact: ContactType = {
    id,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id,
  };

  try {
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs");
      const path = await import("path");
      const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

      const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

      const index = db.contacts.findIndex((c: ContactType) => c.id === id);
      if (index === -1) return { error: "Contact not found" };

      db.contacts[index] = { ...db.contacts[index], ...updatedContact };

      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
      console.log("✅ Contact updated locally:", updatedContact);

    } else {
      const { json: db, sha } = await getFileFromGitHub();

      const index = db.contacts.findIndex((c: ContactType) => c.id === id);
      if (index === -1) return { error: "Contact not found" };

      db.contacts[index] = { ...db.contacts[index], ...updatedContact };

      await updateFileOnGitHub(db, sha);
      console.log("✅ Contact updated on GitHub:", updatedContact);
    }

    revalidatePath("/contact");

    // ✅ REDIRECT
    redirect("/contact?updated=true");

  } catch (error: any) {
    console.error("Error updating contact:", error);
    return { error: error.message || "Failed to update contact" };
  }
};


/** DELETE CONTACT */
export const deleteContactAction = async (formData: FormData) => {
  const id = formData.get("id") as string;
  if (!id) return { error: "No ID provided" };

  try {
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs");
      const path = await import("path");
      const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

      const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

      db.contacts = db.contacts.filter((c: ContactType) => c.id !== id);

      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
      console.log("✅ Contact deleted locally:", id);

    } else {
      const { json: db, sha } = await getFileFromGitHub();

      db.contacts = db.contacts.filter((c: ContactType) => c.id !== id);

      await updateFileOnGitHub(db, sha);
      console.log("✅ Contact deleted on GitHub:", id);
    }

    revalidatePath("/contact");

    // ✅ REDIRECT
    redirect("/contact?deleted=true");

  } catch (error: any) {
    console.error("Error deleting contact:", error);
    return { error: error.message || "Failed to delete contact" };
  }
};