"use server";

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "../_lib/supabaseServer";

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin =
  serviceRoleKey && serviceRoleKey !== process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey
      )
    : null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string) {
  return emailRegex.test(email);
}

export const registerAction = async (_: any, formData: FormData) => {
  const supabase = await createServerClient();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!name) {
    return { error: "Please enter your full name.", success: false };
  }

  if (!email) {
    return { error: "Please enter your email address.", success: false };
  }

  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address.", success: false };
  }

  if (!password) {
    return { error: "Please enter a password.", success: false };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long.", success: false };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message, success: false };
  }

  if (!data.user) {
    return { error: "Registration failed. Please try again.", success: false };
  }

  if (!supabaseAdmin) {
    return {
      error:
        "Supabase service-role key is not configured correctly. Please update the real service_role secret in .env.local (Supabase Dashboard → Settings → API). The current key is not valid for profile inserts.",
      success: false,
    };
  }

  const { error: profileError } = await supabaseAdmin
    .from("users")
    .insert([
      {
        id: data.user.id,
        name,
        email: data.user.email ?? email,
      },
    ]);

  if (profileError) {
    await supabaseAdmin.auth.admin.deleteUser(data.user.id);
    return { error: profileError.message, success: false };
  }

  return { success: true, error: "" };
};

export const loginAction = async (_: any, formData: FormData) => {
  const supabase = await createServerClient();

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email) {
    return { error: "Please enter your email address.", success: false };
  }

  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address.", success: false };
  }

  if (!password) {
    return { error: "Please enter your password.", success: false };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message || "Invalid credentials", success: false };
  }

  return { success: true, error: "" };
};

export const logoutAction = async () => {
  const supabase = await createServerClient();

  await supabase.auth.signOut();
  redirect("/login");
};