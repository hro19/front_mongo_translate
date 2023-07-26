// ローディングアニメーションとタスクのフィルター管理

import React, { useEffect } from "react";
import TaskIterate from "./TaskIterate";
import TaskSelect from "../../components/tasks/TaskSelect";
import Loading from "../../components/tasks/Loading";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import {
  tasksStateAtom,
  initialSpeechStateAtom,
  filteredTasksAtom,
  taskTabAtom,
  initialSpeechOptionsAtom,
} from "../../jotai/atoms";
import TaskAllSounds from "./TaskAllSounds";

type TaskTableProps = {
  tasks: Task[] | undefined;
  isLoading: boolean;
};

const filterTasks = (tasks: Task[], tasksState: string, initialSpeechState: string) => {
  return tasks
    .filter((task: Task) => {
      if (tasksState === "uncompleted") {
        return !task.completed;
      } else {
        return true;
      }
    })
    .filter((task: Task) => {
      if (initialSpeechState === "all") {
        return true;
      } else {
        return task.speech === initialSpeechState;
      }
    });
};

const TaskTable = ({ tasks = [], isLoading }: TaskTableProps) => {
  const [tasksState, setTasksState] = useAtom(tasksStateAtom);
  const [initialSpeechState, setInitialSpeechState] = useAtom(initialSpeechStateAtom);
  const [filteredTasks, setFilteredTasks] = useAtom(filteredTasksAtom);

  useEffect(() => {
    const newFilteredTasks = filterTasks(tasks, tasksState, initialSpeechState);
    setFilteredTasks(newFilteredTasks);
  }, [tasks, tasksState, initialSpeechState]);

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <>
      <div className="flex flex-nowrap items-center align my-4">
        <TaskSelect />
        <TaskAllSounds />
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
