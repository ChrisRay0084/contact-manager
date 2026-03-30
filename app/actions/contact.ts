'use server';

import { revalidatePath } from "next/cache";
import { ContactType } from "../_types/contacts";
import { getSession } from "../_lib/session";
import { nanoid } from "nanoid";

/** GitHub API helpers */
const BASE_URL = "https://api.github.com";

async function getDB() {
  const res = await fetch(
    `${BASE_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch DB from GitHub");

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");

  return { db: JSON.parse(content), sha: data.sha };
}

async function updateDB(db: any, sha: string) {
  const content = Buffer.from(JSON.stringify(db, null, 2)).toString("base64");

  // Debug logging
  console.log("Updating GitHub DB...");
  console.log("Token present?", process.env.GITHUB_TOKEN ? "✅ yes" : "❌ no");
  console.log("Owner:", process.env.GITHUB_OWNER);
  console.log("Repo:", process.env.GITHUB_REPO);
  console.log("File Path:", process.env.GITHUB_FILE_PATH);

  const res = await fetch(
    `${BASE_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update contacts via app",
        content,
        sha,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("GitHub API error:", res.status, errText);
    throw new Error(`GitHub update failed: ${res.status}`);
  }

  console.log("GitHub update successful!");
  return res.json();
}

/** CREATE CONTACT */
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
    if (process.env.NODE_ENV === "development") {
      // Local FS
      const fs = await import("fs");
      const path = await import("path");
      const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

      const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      db.contacts.push(newContact);
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    } else {
      // Production / GitHub
      const { db, sha } = await getDB();
      db.contacts.push(newContact);
      await updateDB(db, sha);
    }

    revalidatePath("/contact");
    return { success: true };

  } catch (error) {
    console.error("Error creating contact:", error);
    return { error: "Failed to create contact." };
  }
};

/** UPDATE CONTACT */
export const updateContactAction = async (prevState: any, formData: FormData) => {
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
      // Local FS
      const fs = await import("fs");
      const path = await import("path");
      const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

      const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      const index = db.contacts.findIndex((c: ContactType) => c.id === id);
      if (index === -1) return { error: "Contact not found" };

      db.contacts[index] = { ...db.contacts[index], ...updatedContact };
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    } else {
      // Production / GitHub
      const { db, sha } = await getDB();
      const index = db.contacts.findIndex((c: ContactType) => c.id === id);
      if (index === -1) return { error: "Contact not found" };

      db.contacts[index] = { ...db.contacts[index], ...updatedContact };
      await updateDB(db, sha);
    }

    revalidatePath("/contact");
    return { success: true };

  } catch (error) {
    console.error("Error updating contact:", error);
    return { error: "Failed to update contact." };
  }
};

/** DELETE CONTACT */
export const deleteContactAction = async (prevState: any, formData: FormData) => {
  const id = formData.get("id") as string;
  if (!id) return { error: "No ID provided" };

  try {
    if (process.env.NODE_ENV === "development") {
      // Local FS
      const fs = await import("fs");
      const path = await import("path");
      const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

      const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
      db.contacts = db.contacts.filter((c: ContactType) => c.id !== id);
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    } else {
      // Production / GitHub
      const { db, sha } = await getDB();
      db.contacts = db.contacts.filter((c: ContactType) => c.id !== id);
      await updateDB(db, sha);
    }

    revalidatePath("/contact");
    return { success: true };

  } catch (error) {
    console.error("Error deleting contact:", error);
    return { error: "Failed to delete contact." };
  }
};