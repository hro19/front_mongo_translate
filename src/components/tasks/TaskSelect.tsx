import React, { useState } from "react";
import { useAtom } from "jotai";
import { tasksStateAtom } from "../../jotai/atoms";

const TaskSelect = () => {
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTasksState(e.target.value);
  };

  return (
    <div className="my-4">
      <select
        id="status-select"
        value={tasksState}
        onChange={handleChange}
        className="bg-yellow-600 text-white py-2 pl-2 pr-4 rounded-lg cursor-pointer"
      >
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export default TaskSelect;
