"use server";

import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";

// Path to your local db.json
const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

// Read database
function readDB() {
  const jsonData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(jsonData);
}

// Write database
function writeDB(db: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

/**
 * Register a new user
 */
export const registerAction = async (prevState: any, formData: FormData) => {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const db = readDB();

  // Check for existing email
  const existingUser = db.users.find((u: UserType) => u.email === email);
  if (existingUser) return { error: "Email already registered" };

  const newUser: UserType = {
    id: `C_${nanoid()}`,
    name,
    email,
    password,
  };

  db.users.push(newUser);
  writeDB(db);

  return { success: true };
};

/**
 * Login user and set session
 */
export const loginAction = async (formData: FormData) => {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const db = readDB();

  // Find user in DB
  const user: UserType | undefined = db.users.find(
    (u: UserType) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ✅ Set session cookie
  await setSession({ id: user.id, name: user.name, email: user.email });

  // Redirect to contacts page
  redirect("/contact");
};

/**
 * Logout user
 */
export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};