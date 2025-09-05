import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TicketState {
  id: string;
  title: string;
  description: string;
}

const initialTicketState: TicketState = {
  id: "",
  title: "",
  description: "",
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialTicketState,
  reducers: {
    updateTicketDraft: (state, action: PayloadAction<TicketState>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    clearTicket: () => initialTicketState,
  },
});

export const ticketsSlice = createSlice({
  name: "ticketsArray",
  initialState: [] as TicketState[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncTickets.fulfilled,
      (state, action: PayloadAction<TicketState[]>) => {
        state.push(...action.payload);
      }
    );
    builder.addCase(
      asyncAddNewTicket.fulfilled,
      (state, action: PayloadAction<TicketState>) => {
        state.push(action.payload);
      }
    );
  },
});

export const asyncTickets = createAsyncThunk("tickets/fetchAll", async () => {
  const res = await fetch("/api/tickets/", { method: "GET" });
  const data = await res.json();
  return data as TicketState[];
});

export const asyncAddNewTicket = createAsyncThunk(
  "tickets/addNew",
  async (ticket: TicketState) => {
    const res = await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify(ticket),
    });
    const created = await res.json();
    return created;
  }
);

export const { updateTicketDraft, clearTicket } = ticketSlice.actions;
