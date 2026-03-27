// app/api/contacts/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ContactType } from "../../_types/contacts";

const DB_PATH = path.join(process.cwd(), "app/_data/db.json");

function readDB() {
  const jsonData = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(jsonData);
}

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
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newContact: ContactType = await req.json();
    const db = readDB();

    db.contacts.push(newContact);

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}