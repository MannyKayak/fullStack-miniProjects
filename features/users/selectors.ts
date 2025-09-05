import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/context/store2";

export const selectUsers = (s: RootState) => s.users.list;
export const selectFilters = (s: RootState) => s.users.filters;

export const selectVisibleUsers = createSelector(
  [selectUsers, selectFilters],
  (users, { q, city, sort }) => {
    const ql = q.trim().toLowerCase();
    let out = users.filter(
      (u) =>
        (!city || u.address?.city === city) &&
        (!ql ||
          u.name.toLowerCase().includes(ql) ||
          u.email.toLowerCase().includes(ql))
    );
    out = out
      .slice()
      .sort((a, b) =>
        sort === "name-asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    return out;
  }
);

export const selectCities = createSelector([selectUsers], (users) => {
  const set = new Set(
    users.map((u) => u.address?.city).filter(Boolean) as string[]
  );
  return Array.from(set).sort();
});
