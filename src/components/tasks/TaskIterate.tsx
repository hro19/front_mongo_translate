import React from "react";
import Link from "next/link";
import Modalpop from "./Modalpop";
import TaskDelete from "./TaskDelete";
import { Task, TaskIterateObj } from "../../ts/Task";
import { useAtom } from "jotai";
import { getSpeechLabel } from "../../jotai/atoms";

const TaskIterate = ({ tasks }: TaskIterateObj) => {

  if (!tasks) {
    return <p>英単語データがありません</p>;
  }

  return (
    <>
      <tbody>
        {tasks.map((task: Task, index: number) => (
          <tr key={task._id} id={task._id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">
              <Link
                href={`/tasks/single?_id=${task._id}`}
                className="underline"
              >
                {task.name}
              </Link>
            </td>
            <td className="border px-4 py-2">{task.jaName}</td>
            <td className="border px-4 py-2">{getSpeechLabel(task.speech)}</td>
            <td className="border px-4 py-2">{task.completed ? "✅" : "❌"}</td>
            <td className="border px-4 py-2">
              <Modalpop task={task} />
            </td>
            <td className="border px-4 py-2">
              <TaskDelete task={task} />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TaskIterate;
