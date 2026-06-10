// app/api/contacts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/_lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const body = await req.json();
    const { name, email, subject, message } = body;

    // ✅ Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // ✅ Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("AUTH ERROR:", userError?.message);
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // ✅ Insert contact WITH user_id (CRITICAL)
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          subject: subject ?? null,
          message: message ?? null,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error("INSERT ERROR:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("ROUTE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to save contact" },
      { status: 500 }
    );
  }
}