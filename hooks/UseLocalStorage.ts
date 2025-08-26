import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initial: T) {
  const [storedValue, setStoredValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(key);
      if (raw) {
        setStoredValue(JSON.parse(raw));
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
