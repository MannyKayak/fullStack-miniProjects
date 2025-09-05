import { configureStore } from "@reduxjs/toolkit";
import { ticketSlice, ticketsSlice } from "./TicketSlice";

export const store = configureStore({
  reducer: {
    ticket: ticketSlice.reducer,
    tickets: ticketsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
