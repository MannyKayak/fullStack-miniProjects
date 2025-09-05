"use client";
import { User } from "@/app/types";
import React, { useEffect, useState } from "react";

export default function ClientSideRender() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center flex-col mt-10">
          Loading data...
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col mt-10">
          <h1 className="flex text-4xl">Render Client side degli utenti</h1>
          <p className="text-gray-500">
            Qui andrà la lista degli utenti renderizzati lato client
          </p>
          <div className="flex flex-col gap-4 mt-10">
            {users
              ? users.map((user) => (
                  <div key={user.id} className="border-2 rounded-2xl p-4">
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-gray-600 text-sm">@{user.username}</p>
                    <div>
                      <h2 className="font-semibold">{user.company.name}</h2>
                      <h2>{user.company.catchPhrase}</h2>
                    </div>
                  </div>
                ))
              : "No user to fetch"}
          </div>
        </div>
      )}
    </>
  );
}
