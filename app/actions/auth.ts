"use server";

import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";
import { nanoid } from "nanoid";  

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const registerAction = async (prevState: any, formData: FormData) => {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  // 1️⃣ Check if email already exists
  const existingRes = await fetch(`${API_URL}/api/users?email=${encodeURIComponent(email)}`);
  const existingData = await existingRes.json();

  if (existingData.length > 0) {
    return { error: "Email already registered" };
  }

  // 2️⃣ Create new user
  const newUser: UserType = {
    id: `C_${nanoid()}`,
    name,
    email,
    password
  };

  await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  return { success: true };
};

export const loginAction = async (formData: FormData) => {
  console.log("Form data received on the server:", formData);

  try {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const url = `${API_URL}/api/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    console.log("Request:", url);

    const res = await fetch(url);
    const data: UserType[] = await res.json();

    const user = data[0];

    if (!user) {
      throw new Error("Invalid credentials - user not found");
    }

    // ✅ Set session
    await setSession({ name: user.name, email: user.email, id: user.id });
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(
      `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  redirect("/contact");
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};