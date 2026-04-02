// app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ContactType } from "../../_types/contacts";

const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

// Simple unique ID generator for contacts
function generateContactId() {
  return `C_${Math.random().toString(36).slice(2, 8)}`;
}

function readDB() {
  const jsonData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(jsonData);
}

function writeDB(db: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

// GET all contacts for a user
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const db = readDB();
    const contacts: ContactType[] = db.contacts.filter(
      (c: ContactType) => String(c.userId) === String(userId)
    );

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET contacts error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// CREATE a new contact
export async function POST(req: NextRequest) {
  try {
    const newContact: ContactType = await req.json();

    if (!newContact.name || !newContact.email || !newContact.userId) {
      return NextResponse.json(
        { error: "name, email, and userId are required" },
        { status: 400 }
      );
    }

    const db = readDB();

    newContact.id = newContact.id ? String(newContact.id) : generateContactId();
    newContact.userId = String(newContact.userId);

    db.contacts.push(newContact);
    writeDB(db);

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error("POST contact error:", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}

// DELETE a contact
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("DELETE BODY:", body);

    const { id } = body;

    if (!id) {
      console.log("NO ID PROVIDED");
      return NextResponse.json({ error: "Contact id is required" }, { status: 400 });
    }

    const db = readDB();
    console.log("BEFORE DELETE:", db.contacts.length);

    db.contacts = db.contacts.filter(
      (c: ContactType) => String(c.id) !== String(id)
    );

    console.log("AFTER DELETE:", db.contacts.length);

    writeDB(db);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE contact error:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}