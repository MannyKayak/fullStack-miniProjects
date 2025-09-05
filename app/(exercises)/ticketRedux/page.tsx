"use client";
// import { Ticket } from "@/app/types";
import { AppDispatch, RootState } from "@/context/store";
import {
  clearTicket,
  TicketState,
  updateTicketDraft,
  asyncTickets,
  asyncAddNewTicket,
} from "@/context/TicketSlice";
import React, { FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function TicketTracker() {
  // const tickets: Ticket[] = [];
  const ticket: TicketState = useSelector((state: RootState) => state.ticket);
  const tickets: TicketState[] = useSelector(
    (state: RootState) => state.tickets
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncTickets());
  }, [dispatch]);

  const loadNewTicket = (e: FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 9);
    console.log("New ticket ID:", id);
    dispatch(updateTicketDraft({ ...ticket, id: id }));
    dispatch(asyncAddNewTicket({ ...ticket, id: id } as TicketState));
    dispatch(clearTicket());
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center p-4 gap-6 sm:p-4">
        <h1 className="text-3xl font-bold">Ticket Tracker with Redux</h1>
        <p className="text-lg">This is a simple ticket tracker application.</p>
        <p className="text-sm text-gray-500">
          You can add, delete, and manage your tickets here the states are
          managed by Redux.
        </p>
        <form
          onSubmit={loadNewTicket}
          className="flex flex-col items-center gap-4 border-2 p-4 rounded-lg shadow-lg w-full max-w-2xl"
        >
          <h2 className="text-xl font-semibold">Add a New Ticket</h2>
          <input
            type="text"
            value={ticket.title}
            className="border-2 border-gray-300 p-2 rounded-lg w-full max-w-md"
            placeholder="Enter ticket title..."
            onChange={(e) =>
              dispatch(updateTicketDraft({ ...ticket, title: e.target.value }))
            }
          />

          <h2 className="text-xl font-semibold">Ticket Details</h2>
          <textarea
            className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-md"
            value={ticket.description}
            placeholder="Write your ticket details here..."
            onChange={(e) =>
              dispatch(
                updateTicketDraft({ ...ticket, description: e.target.value })
              )
            }
          ></textarea>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg active:scale-95"
            type="submit"
          >
            Add Ticket
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center p-4 pb-10 sm:p-20"></div>
      <h1 className="text-3xl font-bold">Ticket List</h1>
      <p className="text-lg">Here are your tickets:</p>
      <ul className="list-disc pl-6">
        {tickets ? (
          <div>
            {tickets.map((t) => {
              if (t) {
                return (
                  <li
                    key={t.id}
                    className={`flex gap-2 items-center m-2 mb-10 border-2 p-4 rounded-2xl `}
                  >
                    <div className="flex flex-col items-center justify-around">
                      <h3 className="text-2xl">{t.title}</h3>

                      <p className="text-md text-gray-400">{t.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="bg-red-500 rounded-2xl p-2 text-white"
                        onClick={() => console.log("delete", t.id)}
                      >
                        delete
                      </button>
                      <button
                        className="bg-blue-400 rounded-2xl p-2"
                        onClick={() => console.log("modify", t.id)}
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
