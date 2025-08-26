"use client";
import { Ticket } from "@/app/types";
import React, { useEffect, useState } from "react";

export default function TicketTracker() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState<Ticket>({
    id: "",
    title: "",
    description: "",
    status: "open",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    // fetch all the tickets
    fetch("/api/tickets/", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      })
      .catch((e) => {
        console.log("catch: " + e);
      });
  }, []);

  const addTicket = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify(newTicket),
    });

    const created = await res.json();
    setTickets([...tickets, created]);
    setNewTicket({ ...newTicket, title: "", description: "" });
  };

  const deleteTicket = async (id: string) => {
    await fetch(`/api/tickets?id=${id}`, {
      method: "DELETE",
    });

    setTickets(tickets.filter((t) => t.id !== id));
  };

  const updateTicket = async (id: string) => {
    // creo un payload per non modificare direttamente lo stato
    const payload = {
      status: "closed" as Ticket["status"],
      description: "modified description",
      title: "modified title",
    };

    const res = await fetch(`/api/tickets?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return;

    const updated: Ticket = await res.json();

    setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center p-4 pb-4 gap-6 sm:p-4">
        <h1 className="text-3xl font-bold">Ticket Tracker</h1>
        <p className="text-lg">This is a simple ticket tracker application.</p>
        <p className="text-sm text-gray-500">
          You can add, delete, and manage your tickets here.
        </p>
        <div className="flex flex-col items-center gap-4 border-2 p-4 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-semibold">Add a New Ticket</h2>
          <input
            type="text"
            value={newTicket.title}
            className="border-2 border-gray-300 p-2 rounded-lg w-full max-w-md"
            placeholder="Enter ticket title..."
            onChange={(e) =>
              setNewTicket({ ...newTicket, title: e.target.value })
            }
          />

          <h2 className="text-xl font-semibold">Ticket Details</h2>
          <textarea
            className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-md"
            placeholder="Write your ticket details here..."
            value={newTicket.description}
            onChange={(e) =>
              setNewTicket({ ...newTicket, description: e.target.value })
            }
          ></textarea>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            onClick={(e) => addTicket(e)}
          >
            Add Ticket
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-4 pb-10 sm:p-20"></div>
      <h1 className="text-3xl font-bold">Ticket List</h1>
      <p className="text-lg">Here are your tickets:</p>
      <ul className="list-disc pl-6">
        {tickets ? (
          <div>
            {tickets.map((t, i) => {
              if (t) {
                return (
                  <li
                    key={i}
                    className={`flex gap-2 items-center m-2 mb-10 border-2 p-4 rounded-2xl ${
                      t.status === "open"
                        ? "bg-blue-200"
                        : t.status === "closed"
                        ? "bg-red-200"
                        : "bg-amber-200"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-around">
                      <h3 className="text-2xl">{t.title}</h3>

                      <p className="text-md text-gray-400">{t.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-red-500 rounded-2xl p-2 text-white"
                        onClick={() => deleteTicket(t.id)}
                      >
                        delete
                      </button>
                      <button
                        className="bg-blue-400 rounded-2xl p-2"
                        onClick={() => updateTicket(t.id)}
                      >
                        modify
                      </button>
                    </div>
                  </li>
                );
              }
            })}
          </div>
        ) : (
          <p className="text-gray-400">No tickets on the list</p>
        )}
      </ul>
    </div>
  );
}
