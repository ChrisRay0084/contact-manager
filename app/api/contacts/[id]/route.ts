import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/_lib/supabaseServer";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing contact id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
