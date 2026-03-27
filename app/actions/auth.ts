"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";
import { nanoid } from "nanoid";  

// const API_URL = "http://localhost:3001";
const API_URL = "/api";


export const registerAction = async (
  prevState: any,
  formData: FormData
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // 1️⃣ Check if email already exists
  const existingUser = await axios.get(`${API_URL}/users`, {
    params: { email }
  });

  if (existingUser.data.length > 0) {
    return { error: "Email already registered" };
  }

  // 2️⃣ Create new user
  const newUser = {
    id: `C_${nanoid()}`,
    name,
    email,
    password // ⚠️ Not secure yet
  };

  await axios.post(`${API_URL}/users`, newUser);

  return { success: true };
};


export const loginAction = async (formData: FormData) => {
    console.log("Form data received on the server:", formData);

    let user: UserType | null = null;

    try {
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");
        const url = `${API_URL}/users`;

        console.log("Request:", url, { email, password });
        console.log(`Attempting login with email: ${email}`);

        const response = await axios.get(url, {
            params: { email, password }
        });

        console.log("API Response:", response.status, response.data);

        user = response.data[0];

        if (!user) {
            throw new Error("Invalid credentials - user not found");
        }

        // You could set cookies here if needed
        await setSession({name: user.name, email: user.email, id: user.id});
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(
            `Login failed: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }

    // ✅ Redirect OUTSIDE the try/catch
    redirect("/contact");
};

export const logoutAction = async () => {
    await deleteSession();
    redirect("/login");
};