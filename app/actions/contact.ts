"use server";

import { createClient } from "../_lib/supabaseServer";
import { redirect } from "next/navigation";

/* =========================
   CREATE
========================= */
export async function createContactAction(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email) throw new Error("Missing name or email");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("contacts").insert({
    name,
    email,
    subject: subject || null,
    message: message || null,
    user_id: user.id,
  });

  if (error) throw new Error(error.message);

  redirect("/contact");
}

/* =========================
   UPDATE (THIS WAS MISSING)
========================= */
export async function updateContactAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!id) throw new Error("Missing contact ID");
  if (!name || !email) throw new Error("Missing name or email");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("contacts")
    .update({
      name,
      email,
      subject: subject || null,
      message: message || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  redirect("/contact");
}