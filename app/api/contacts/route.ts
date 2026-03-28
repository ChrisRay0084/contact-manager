// app/api/contacts/route.ts
import { NextResponse } from "next/server";
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
export async function GET(req: Request) {
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
export async function POST(req: Request) {
  try {
    const newContact: ContactType = await req.json();

    if (!newContact.name || !newContact.email || !newContact.userId) {
      return NextResponse.json({ error: "name, email, and userId are required" }, { status: 400 });
    }

    const db = readDB();

    // Ensure IDs are strings and generate one if missing
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