import React,{useState} from "react";
import Link from "next/link";
import Modalpop from "./Modalpop";
import TaskDelete from "./TaskDelete";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";
import { Task, TaskIterateObj } from "../../ts/Task";

const TaskIterate = ({ tasks }: TaskIterateObj) => {
  //popoverメッセージを制御する
  const [isSnake, setIsSnake] = useState(false);
  const snakeDuration = 2000;

  if (!tasks) {
    return <p>タスクデータがありません</p>;
  }

  return (
    <>
      <tbody>
        {tasks.map((task: Task, index: number) => (
          <tr key={task._id} id={task._id}>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">
              <Link href={`/tasks/${task._id}`} className="underline">
                {task.name}
              </Link>
            </td>
            <td className="border px-4 py-2">{task.completed ? "✅" : "❌"}</td>
            <td className="border px-4 py-2">
              <Modalpop
                task={task}
                setIsSnake={setIsSnake}
                snakeDuration={snakeDuration}
              />
            </td>
            <td className="border px-4 py-2">
              <TaskDelete task={task} />
            </td>
          </tr>
        ))}
      </tbody>
      {isSnake && <SnakeMessage snakeDuration={snakeDuration} />}
    </>
  );
};

export default TaskIterate;
