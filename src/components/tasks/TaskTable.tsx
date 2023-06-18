// ローディングアニメーションとタスクのフィルター管理

import React from "react";
import TaskIterate from "./TaskIterate";
import TaskSelect from "../../components/tasks/TaskSelect";
import Loading from "../../components/tasks/Loading";
import { Task, TaskIterateObj } from "../../ts/Task";
import { useAtom } from "jotai";
import { tasksStateAtom } from "../../jotai/atoms";

type TaskTableProps = TaskIterateObj & {
  isLoading: boolean;
};

const TaskTable = ({ tasks = [], isLoading }: TaskTableProps) => {
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);

  if (isLoading) {
    return <Loading />;
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
          <tr className="bg-blue-900 text-white leading-8">
            <th>No</th>
            <th>英単語</th>
            <th>日本語訳</th>
            <th>品詞</th>
            <th>暗記</th>
            <th>編集</th>
            <th>削除</th>
          </tr>
        </thead>
        <TaskIterate tasks={filteredTasks} />
      </table>
    </>
  );
};

export default TaskTable;
