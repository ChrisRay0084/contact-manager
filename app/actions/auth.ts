"use server";

import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

function readDB() {
  const jsonData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(jsonData);
}

function writeDB(db: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export const registerAction = async (prevState: any, formData: FormData) => {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const db = readDB();
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

export const loginAction = async (formData: FormData) => {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const db = readDB();
  const user: UserType | undefined = db.users.find(
    (u: UserType) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ✅ Set session
  await setSession({ name: user.name, email: user.email, id: user.id });

  // Redirect **without wrapping in try/catch**
  redirect("/contact");
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};