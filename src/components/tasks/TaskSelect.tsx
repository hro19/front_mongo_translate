import React from "react";
import { useAtom } from "jotai";
import { tasksStateAtom, taskTabAtom } from "../../jotai/atoms";

const TaskSelect = () => {
  const [taskTab] = useAtom(taskTabAtom);
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as keyof typeof taskTab;
      setTasksState(value);
    };
    
  return (
    <div className="my-4">
      <select
        id="status-select"
        value={tasksState}
        onChange={handleChange}
        className="bg-yellow-600 text-white py-2 pl-2 pr-4 rounded-lg cursor-pointer"
      >
        {Object.entries(taskTab).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSelect;
