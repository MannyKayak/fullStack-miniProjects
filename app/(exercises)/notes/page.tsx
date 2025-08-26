"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { Note } from "@/app/types";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Pick<Note, "text" | "content">>({
    text: "",
    content: "",
  });
  const addNewNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    const created: Note = await res.json();
    setNotes((prev) => [...prev, created]);

    setNewNote({
      text: "",
      content: "",
    });
  };

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    fetch("/api/notes", {
      method: "GET",
      headers: { "content-type": "json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-sans">Le tue note</h1>
        <p className="text-xl text-gray-400">
          Questa è la pagina delle note. Qui puoi visualizzare, modificare e
          gestire le tue note.
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-semibold font-sans mb-4">
          Crea una nuova nota
        </h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={(e) => addNewNote(e)}
        >
          <input
            type="text"
            value={newNote.text}
            placeholder="Titolo della nota"
            className="border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
          ></input>
          <textarea
            placeholder="Contenuto della nota"
            value={newNote.content}
            className="h-32 resize-none border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Crea Nota
          </button>
        </form>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <ul className="flex flex-col gap-2">
          {notes.map((n, i) => (
            <li
              key={n.id + i}
              className="flex justify-between items-center border p-4 rounded shadow"
            >
              <div>
                <div>{n.id}</div>
                <div>{n.text}</div>
                <div>{n.content}</div>
              </div>

              <div>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                  onClick={() => deleteNote(n.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
