import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = db.prepare("SELECT * FROM notes").all();
    console.log(notes);
    return NextResponse.json(notes);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const query = db.prepare(
    `INSERT INTO notes (text, content, createdAt, updatedAt) VALUES (?,?,?,?)`
  );
  const now = new Date().toISOString();
  const result = query.run(body.text, body.content, now, now);

  return NextResponse.json(
    { id: result.lastInsertRowid, ...body },
    { status: 201 }
  );
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const res = db.prepare("DELETE FROM notes WHERE id = ?").run(id);

  if (res.changes === 0) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
