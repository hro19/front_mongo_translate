// ローディングアニメーションとタスクのフィルター管理

import React, { useState } from "react";
import TaskIterate from "./TaskIterate";
import BounceLoader from "react-spinners/BounceLoader";
import { Task, TaskIterateObj } from "../../ts/Task";

type TaskTableProps = TaskIterateObj & {
  isLoading: boolean;
};

const TaskTable = ({ tasks = [], isLoading }: TaskTableProps) => {
  const [status, setStatus] = useState("uncompleted");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-4">
        <BounceLoader color="#43B916" />
      </div>
    );
  }

  const filteredTasks = tasks.filter((task: Task) => {
    if (status === "uncompleted") {
      return !task.completed;
    } else if (status === "completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <>
      <div className="my-4">
        <select
          id="status-select"
          value={status}
          onChange={handleChange}
          className="bg-yellow-600 text-white py-2 pl-2 pr-4 rounded-lg cursor-pointer"
        >
          <option value="uncompleted">Uncompleted</option>
          <option value="completed">Completed</option>
          <option value="all">All</option>
        </select>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Completed</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <TaskIterate tasks={filteredTasks} />
      </table>
    </>
  );
};

export default TaskTable;
