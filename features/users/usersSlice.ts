import { User } from "@/app/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Filters = {
  q: string;
  city: string | null;
  sort: "name-asc" | "name-desc";
};

export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Fetch users failed");
  const users: User[] = await res.json();

  return users;
});

// creo un tipo per gestire i cambiamenti e le risposte dell'api
type UsersState = {
  list: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  filters: Filters;
};

// dopo aver creato l'oggetto per gestire lo stato degli utenti, creo lo stato iniziale
const initialState: UsersState = {
  list: [],
  status: "idle",
  filters: { q: "", city: null, sort: "name-asc" },
};

// corpo principale del file, crea sostanzialmente tutta la base per la gestione degli stati
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchAllUsers.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchAllUsers.fulfilled, (s, a) => {
      s.status = "succeeded";
      s.list = a.payload;
      s.error = undefined;
    });
    b.addCase(fetchAllUsers.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.error.message;
    });
  },
});

export const { setFilters } = usersSlice.actions;
export default usersSlice.reducer;
