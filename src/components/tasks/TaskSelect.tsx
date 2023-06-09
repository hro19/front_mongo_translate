import React from "react";
import { useAtom } from "jotai";
import { tasksStateAtom } from "../../jotai/atoms";
import { SelectSwitch } from "../../ts/Task";

const TaskSelect = () => {
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SelectSwitch;
    setTasksState(value);
    };

    const selectSwitch: Record<SelectSwitch, string> = {
      uncompleted: "暗記中",
      completed: "暗記済み",
      all: "全て",
    };
    
  return (
    <div className="my-4">
      <select
        id="status-select"
        value={tasksState}
        onChange={handleChange}
        className="bg-yellow-600 text-white py-2 pl-2 pr-4 rounded-lg cursor-pointer"
      >
        {Object.entries(selectSwitch).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSelect;
