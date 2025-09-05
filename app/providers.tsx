"use client";
import { Provider } from "react-redux";
import { store } from "@/context/store2";
import { store as ticketStore } from "@/context/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function ProviderTickets({ children }: { children: React.ReactNode }) {
  return <Provider store={ticketStore}>{children}</Provider>;
}
