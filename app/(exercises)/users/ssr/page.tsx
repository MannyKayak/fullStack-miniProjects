import { User } from "@/app/types";
import React from "react";

async function getData(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  const data: User[] = await res.json();
  return data;
}

export default async function ServerSideRender() {
  const data = await getData();

  return (
    <div>
      {data && (
        <div className="flex justify-center items-center flex-col mt-10">
          <h1 className="flex text-4xl">Render Server side degli utenti</h1>
          <p className="text-gray-500">
            Qui andrà la lista degli utenti renderizzati lato server
          </p>
          <div className="flex flex-col gap-4 mt-10">
            {data
              ? data.map((user) => (
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
    </div>
  );
}
