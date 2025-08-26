import { Ticket } from "@/app/types";
import { NextResponse } from "next/server";

// fake database
const ticketList: Ticket[] = [];

// function get all the tickets
export async function GET() {
  return NextResponse.json(ticketList);
}

export async function POST(req: Request) {
  const { title, description } = await req.json();
  if (!title || String(title).trim().length < 1)
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const newTicket: Ticket = {
    id: "000" + ticketList.length.toString(),
    title: String(title),
    description: String(description) || "",
    status: "open",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  ticketList.push(newTicket);
  return NextResponse.json(newTicket, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id"); // prendo l'id dall'url

  ticketList.filter((t) => t.id !== id);

  return NextResponse.json({ succes: true, status: 200 });
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = (await req.json()) as Partial<
    Pick<Ticket, "title" | "description" | "status">
  >;
  const t = ticketList.find((x) => x.id === id);
  if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.title !== undefined) t.title = String(body.title);
  if (body.description !== undefined) t.description = String(body.description);
  if (body.status !== undefined) t.status = body.status as Ticket["status"];
  t.updatedAt = new Date();

  return NextResponse.json(t, { status: 200 });
}
