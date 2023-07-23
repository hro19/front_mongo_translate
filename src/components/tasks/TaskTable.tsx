// ローディングアニメーションとタスクのフィルター管理

import React from "react";
import TaskIterate from "./TaskIterate";
import TaskSelect from "../../components/tasks/TaskSelect";
import Loading from "../../components/tasks/Loading";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import { tasksStateAtom, initialSpeechStateAtom } from "../../jotai/atoms";
import TaskAllSounds from "./TaskAllSounds";

type TaskTableProps = {
  tasks: Task[] | undefined;
  isLoading: boolean;
};

const TaskTable = ({ tasks = [], isLoading }: TaskTableProps) => {
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);
  const [initialSpeechState, setInitialSpeechState] = useAtom(initialSpeechStateAtom);

  if (isLoading) {
    return <Loading />;
  }

const filteredTasks = tasks
  .filter((task: Task) => {
    if (tasksState === "uncompleted") {
      return !task.completed;
    } else {
      return true;
    }
  })
  .filter((task: Task) => {
    if (initialSpeechState === "all") {
      return true; // "all" の場合はフィルタリングしない
    } else {
      return task.speech === initialSpeechState;
    }
  });
  
  return (
    <>
      <div className="flex flex-nowrap items-center align my-4">
        <TaskSelect />
        <TaskAllSounds tasks={tasks} />
      </div>
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
