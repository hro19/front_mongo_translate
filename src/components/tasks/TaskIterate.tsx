// trイテレートのみ構造

import React from 'react'
import Link from "next/link";
import Modalpop from "./Modalpop";
import TaskDelete from "./TaskDelete";

const TaskIterate = ({ tasks, refetch }: any) => {
  return (
    <>
      <tbody>
        {tasks.map((task: any, index: number) => (
          <tr key={task._id} id={task._id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">
              <Link href={`/tasks/${task._id}`} className="underline">
                {task.name}
              </Link>
            </td>
            <td className="border px-4 py-2">{task.completed ? "✅" : "❌"}</td>
            <td className="border px-4 py-2">
              <Modalpop task={task} refetch={refetch} />
            </td>
            <td className="border px-4 py-2">
              <TaskDelete task={task} refetch={refetch} />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TaskIterate
