import { Task } from "@/app/types";
import React from "react";

interface TaskListProps {
  onDelete: (task: string) => void;
  tasks: Task[];
  toggleDone: (text: string) => void;
}

const TaskList = (props: TaskListProps) => {
  const { onDelete, tasks, toggleDone } = props;

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6">Task List</h2>
      <ul className="list-disc pl-5">
        {tasks.map((task, i) => (
          <li key={i}>
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="text-gray-800">{task.text}</span>
              <button
                className="bg-red-600 rounded-2xl p-2 text-white"
                onClick={() => onDelete(task.text)}
              >
                Delete
              </button>
              <input
                type="checkbox"
                checked={task.completed}
                name="done"
                id={i + task.text}
                onChange={() => toggleDone(task.text)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
