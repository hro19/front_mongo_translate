// ローディングアニメーションとタスクのフィルター管理

import React, { useState } from "react";
import TaskIterate from "./TaskIterate";
import BounceLoader from "react-spinners/BounceLoader";
import TaskSelect from "../../components/tasks/TaskSelect";
import { Task, TaskIterateObj } from "../../ts/Task";
import { useAtom } from "jotai";
import { tasksStateAtom } from "../../jotai/atoms";

type TaskTableProps = TaskIterateObj & {
  isLoading: boolean;
};

const TaskTable = ({ tasks = [], isLoading }: TaskTableProps) => {
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);

  if (isLoading) {
    return (
      <div className="flex justify-center my-4">
        <BounceLoader color="#43B916" />
      </div>
    );
  }

  const filteredTasks = tasks.filter((task: Task) => {
    if (tasksState === "uncompleted") {
      return !task.completed;
    } else if (tasksState === "completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <>
     <TaskSelect />

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
