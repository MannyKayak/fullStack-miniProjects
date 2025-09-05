export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl uppercase ">Lista Esercizi</h1>
      <div>
        <ul>
          <div className="mb-8">
            <h2 className="text-2xl mb-4">Esercizi light backend</h2>
            <div>
              <li className="mb-4 text-blue-500 hover:text-blue-700">
                <a href="/toDoList">Esercizio 0 - To do list</a>
              </li>
              <li className="mb-4 text-green-500 hover:text-green-700">
                <a href="/ticketTracker">Esercizio 1 - Ticket tracker</a>
              </li>
              <li className="mb-4 text-green-500 hover:text-green-700">
                <a href="/notes">Esercizio 2 - Notes</a>
              </li>
            </div>
          </div>
          <div className="mb-8 flex flex-col">
            <h2 className=" text-2xl mb-4">Esercizi CSR SSR</h2>
            <li className=" mb-4 text-purple-500 hover:text-purple-700">
              <a href="/users/csr">Esercizio 3a - CSR</a>
            </li>
            <li className="- mb-4 text-purple-500 hover:text-purple-700">
              <a href="/users/ssr">Esercizio 3b - SSR</a>
            </li>
          </div>
          <div className="mb-8 flex flex-col">
            <h2 className=" text-2xl mb-4">Esercizi CSR SSR</h2>
            <li className=" mb-4 text-purple-500 hover:text-purple-700">
              <a href="/users/csr">Esercizio 3a - CSR</a>
            </li>
            <li className="- mb-4 text-purple-500 hover:text-purple-700">
              <a href="/users/ssr">Esercizio 3b - SSR</a>
            </li>
          </div>
          <div className="mb-8 flex flex-col">
            <h2 className=" text-2xl mb-4">
              Esercizi Redux e advanced Frontend
            </h2>
            <li className=" mb-4 text-purple-500 hover:text-purple-700">
              <a href="/redux">Esercizio 4 - User Directory</a>
            </li>
            <li className=" mb-4 text-purple-500 hover:text-purple-700">
              <a href="/ticketRedux">Esercizio 5 - Tickets 0.2</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
