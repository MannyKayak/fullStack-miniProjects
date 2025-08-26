import { Task } from "@/app/types";
import { NextResponse } from "next/server";

// creo una simulazione di database
let tasks: Task[] = [];

// creo una funzione GET
export async function GET() {
  return NextResponse.json(tasks);
}

// creo una funzione POST
export async function POST(req: Request) {
  // prendo il body della richiesta
  const body = await req.json();

  // creo un nuovo task
  const newTask: Task = {
    text: body.text,
    completed: false,
  };
  tasks.push(newTask);
  // ritorno il task appena creato
  return NextResponse.json(newTask, { status: 201 });
}

export async function DELETE(req: Request) {
  // prendo il body della richiesta
  const { searchParams } = new URL(req.url);

  const text = searchParams.get("text");

  // cancello il task dalla lista
  tasks = tasks.filter((task) => task.text !== text);
  return NextResponse.json({ succes: true });
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);

  const text = searchParams.get("text");

  tasks = tasks.map((t) => {
    if (t.text === text) t.completed = !t.completed;
    return t;
  });

  return NextResponse.json({ success: true });
}
