"use client";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/context/store2";
import { fetchAllUsers, setFilters } from "@/features/users/usersSlice";
import { selectVisibleUsers, selectCities } from "@/features/users/selectors";

export default function UsersReduxPage() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((s: RootState) => s.users.status);
  const filters = useSelector((s: RootState) => s.users.filters);
  const users = useSelector(selectVisibleUsers);
  const cities = useSelector(selectCities);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAllUsers());
  }, [status, dispatch]);

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilters({ q: e.target.value }));
    },
    [dispatch]
  );

  const onCity = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value || null;
      dispatch(setFilters({ city: val }));
    },
    [dispatch]
  );

  const toggleSort = useCallback(() => {
    dispatch(
      setFilters({
        sort: filters.sort === "name-asc" ? "name-desc" : "name-asc",
      })
    );
  }, [dispatch, filters.sort]);

  if (status === "loading") return <p className="p-6">Caricamento…</p>;
  if (status === "failed")
    return <p className="p-6 text-red-600">Errore nel caricamento</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Users (Redux Toolkit)</h1>

      <div className="flex gap-3 mb-4">
        <input
          className="border px-2 py-1 flex-1"
          placeholder="Search name/email"
          value={filters.q}
          onChange={onSearch}
        />
        <select
          className="border px-2 py-1"
          value={filters.city ?? ""}
          onChange={onCity}
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button className="border px-2 py-1" onClick={toggleSort}>
          {filters.sort === "name-asc" ? "Name A→Z" : "Name Z→A"}
        </button>
      </div>

      {!users.length ? (
        <p className="text-gray-500">Nessun utente</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.id} className="border rounded p-3">
              <div className="font-semibold">{u.name}</div>
              <div className="text-sm text-gray-600">
                @{u.username} · {u.email}
              </div>
              <div className="text-sm">
                {u.company?.name} — {u.address?.city}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
