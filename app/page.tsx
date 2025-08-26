export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="">Esercizi vari</h1>
      <div>
        <ul>
          <li className="mb-4 text-blue-500 hover:text-blue-700">
            <a href="/toDoList">Esercizio 0 - To do list</a>
          </li>
          <li className="mb-4 text-green-500 hover:text-green-700">
            <a href="/ticketTracker">Esercizio 1 - Ticket tracker</a>
          </li>
          <li className="mb-4 text-green-500 hover:text-green-700">
            <a href="/notes">Esercizio 2 - Notes</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
