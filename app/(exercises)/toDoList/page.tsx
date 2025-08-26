"use client";

import React, { useState, useEffect } from "react";
import TaskList from "@/components/ToDoList/TaskList";
// import useLocalStorage from "@/hooks/UseLocalStorage";
import { Task } from "@/app/types";

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    text: "",
    completed: false,
  });

  useEffect(() => {
    // fetch data from API
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // creo le nuove funzioni che ora usano l'api quindi saranno asincrone
  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    // effettuare un POST
    e.preventDefault();
    if (newTask.text.trim() === "") return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const created = await res.json();
    setTasks([...tasks, created]);
    setNewTask({
      text: "",
      completed: false,
    });
  };

  const deleteTask = async (taskText: string) => {
    await fetch(`/api/tasks?text=${taskText}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((t) => t.text !== taskText));
  };

  const toggleDone = async (taskText: string) => {
    await fetch(`/api/tasks?text=${taskText}`, {
      method: "PUT",
    });
    setTasks(
      tasks.map((t) => {
        if (t.text === taskText) {
          t.completed = !t.completed;
        }
        return t;
      })
    );
  };

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div>
          <h2>Add new task</h2>
          <form onSubmit={(e) => addTask(e)} className="flex items-center mb-4">
            <span className="text-sm text-gray-700">Task:</span>
            <input
              value={newTask.text}
              className="border-2 border-amber-900 p-2 rounded-2xl mx-3"
              onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Task
            </button>
          </form>
          <TaskList
            onDelete={deleteTask}
            tasks={tasks}
            toggleDone={toggleDone}
          />
        </div>
      </div>
    </div>
  );
}

// export default function ToDoList() {
//   const [newTask, setNewTask] = useState<Task>({
//     text: "",
//     completed: false,
//   });
//   const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

//   const addTask = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // prevent the default form submission
//     if (newTask.text.trim() === "") return;
//     // get all the saved tasks
//     const currentTasks = JSON.parse(
//       localStorage.getItem("tasks") || "[]"
//     ) as string[];
//     // save the updated tasks back to localStorage
//     localStorage.setItem(
//       "tasks",
//       JSON.stringify(currentTasks.concat(newTask.text.trim()))
//     );
//     setTasks((prevTasks) => [...prevTasks, newTask]); // update the state
//     setNewTask({
//       text: "",
//       completed: false,
//     }); // clear the input field
//   };

//   const deleteTask = (taskText: string) => {
//     const filteredTasks = tasks.filter((t) => t.text !== taskText);
//     setTasks(filteredTasks);
//   };

//   const toggleDone = (text: string) => {
//     console.log("Toggle done for task:", text);
//     setTasks((prevTasks) =>
//       prevTasks.map((t) => {
//         if (t.text === text) {
//           return { ...t, completed: !t.completed };
//         }
//         return t;
//       })
//     );

//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     console.log("Updated tasks:", tasks);
//   };

//   return (
//     <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <div>
//         <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
//         <div>
//           <h2>Add new task</h2>
//           <form onSubmit={(e) => addTask(e)} className="flex items-center mb-4">
//             <span className="text-sm text-gray-700">Task:</span>
//             <input
//               value={newTask.text}
//               className="border-2 border-amber-900 p-2 rounded-2xl mx-3"
//               onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
//             />
//             <button
//               type="submit"
//               className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add Task
//             </button>
//           </form>
//           <TaskList
//             onDelete={deleteTask}
//             tasks={tasks}
//             toggleDone={toggleDone}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// versione async con fetch
