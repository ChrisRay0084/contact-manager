'use server';
import { revalidatePath } from "next/cache";
import { createContact, deleteContact, updateContact } from "../api/contact"
import { getSession } from "../_lib/session";
import { ContactType } from "../_types/contacts";
import { nanoid } from "nanoid";

import fs from 'fs';
import path from 'path';

/*
export const createContactAction = async (
    prevState: any,
    formData: FormData) => {
        if(!formData){
            return { error: "Form data is required" };
        }

        const user = await getSession();

        const newContact:ContactType = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            userId: Number(user?.id)
        };
        
        try {
            await createContact(newContact);
            revalidatePath("/contact");
            return { success: true };
        } catch (error) {
            console.error("Error creating contact:", error);
            return { error: "Failed to create contact. Please try again." };
        }
}
        */

export const createContactAction = async (
  prevState: any,
  formData: FormData
) => {
  if (!formData) return { error: "Form data is required" };

  const user = await getSession();

  if (!user) return { error: "User session not found" };

  const newContact: ContactType = {
    id: `C_${nanoid(6)}`,   // ← prefix added here to make this a string ID
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id 
  };

  try {
    await createContact(newContact);
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Error creating contact:", error);
    return { error: "Failed to create contact. Please try again." };
  }
};

/*
export const updateContactAction = async (
  prevState: any,
  formData: FormData
) => {
  if (!formData) return { error: "Form data required" };

  const id = String(formData.get("id")); // string ID
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));

  try {
    await updateContact(id, { name, email });
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Error updating contact:", error);
    return { error: "Failed to update contact" };
  }
};
*/

export const updateContactAction = async (
  prevState: any,
  formData: FormData
) => {

    if (!formData) return { error: "Form data is required" };
  
    const id = formData.get("id") as string;
  const user = await getSession();

  if (!user) return { error: "User session not found" };

  const updatedContact: ContactType = {
    //id: `C_${nanoid(6)}`,   // ← prefix added here to make this a string ID
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    userId: user.id
  };

  try {
    await updateContact(id, updatedContact);
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.error("Error updating contact:", error);
    return { error: "Failed to update contact. Please try again." };
  }
};

/*
export const deleteContactAction = async (
    prevState: any,
    formData: FormData) => {
    const id = Number(formData.get("id")); // Convert to number
    try {
        await deleteContact(id);
        revalidatePath("/contact");
        return { success: true };
    } catch (error) {
        console.error("Error deleting contact:", error);
        return { error: "Failed to delete contact. Please try again." };
    }
}
    */

export const deleteContactAction = async (
    prevState: any,
    formData: FormData
) => {
    const id = formData.get("id") as string; 
    console.log("Deleting contact id:", id);

    if (!id) return { error: "No ID provided" };

    try {
        await deleteContact(id);
        revalidatePath("/contact");
        return { success: true };
    } catch (error) {
        console.error("Error deleting contact:", error);
        return { error: "Failed to delete contact." };
    }
};