import React, { useState } from "react";
import TaskIterate from "../components/TaskIterate";

const TaskTable = ({ tasks, setTasks }: any) => {
  const [status, setStatus] = useState("uncompleted");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const filteredTasks = tasks.filter((task: any) => {
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
      <div>
        <label htmlFor="status-select">Status:</label>
        <select id="status-select" value={status} onChange={handleChange}>
          <option value="uncompleted">Uncompleted</option>
          <option value="completed">Completed</option>
          <option value="all">All</option>
        </select>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Completed</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <TaskIterate tasks={filteredTasks} setTasks={setTasks} />
      </table>
    </>
  );
};

export default TaskTable;
