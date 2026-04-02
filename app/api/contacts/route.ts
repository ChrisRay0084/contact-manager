// app/api/contacts/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ContactType } from "../../_types/contacts";

// DB path: local or production (Vercel /tmp)

const DB_PATH =
  process.env.VERCEL === "1"
    ? "/tmp/db.json"
    : path.join(process.cwd(), "app/_data/db.json");

// Simple unique ID generator
function generateContactId() {
  return `C_${Math.random().toString(36).slice(2, 8)}`;
}

// Read database safely
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify({ contacts: [] }, null, 2));
    }
    const jsonData = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("readDB error:", error);
    return { contacts: [] };
  }
}

// Write database safely
function writeDB(db: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (error) {
    console.error("writeDB error:", error);
  }
}

// --------------------- CRUD ---------------------

// GET all contacts for a user
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

    const db = readDB();
    const contacts: ContactType[] = db.contacts.filter(c => String(c.userId) === String(userId));

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

// UPDATE a contact
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email } = body;

    if (!id || !name || !email) {
      return NextResponse.json({ error: "id, name, and email are required" }, { status: 400 });
    }

    const db = readDB();
    const index = db.contacts.findIndex(c => String(c.id) === String(id));
    if (index === -1) return NextResponse.json({ error: "Contact not found" }, { status: 404 });

    db.contacts[index] = { ...db.contacts[index], name, email };
    writeDB(db);

    return NextResponse.json(db.contacts[index]);
  } catch (error) {
    console.error("PATCH contact error:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}

// DELETE a contact
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Contact id is required" }, { status: 400 });

    const db = readDB();
    db.contacts = db.contacts.filter(c => String(c.id) !== String(id));
    writeDB(db);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE contact error:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}