import React from "react";
import Link from "next/link";
import Modalpop from "./Modalpop";
import TaskDelete from "./TaskDelete";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import { initialSpeechOptionsAtom,getSpeechLabel } from "../../jotai/atoms";
import { AiOutlineSound } from "react-icons/ai";
import { speakTextAndBtn } from "../../components/translates/Onsei";

const TaskIterate = ({ tasks }: { tasks: Task[] }) => {
  const [initialSpeechOptions, setInitialSpeechOptions] = useAtom(
    initialSpeechOptionsAtom
  );

  // tasks 配列を逆順に並び替える
  const reversedTasks = tasks.slice().reverse();

  return (
    <>
      <tbody>
        {reversedTasks &&
          reversedTasks.map((task: Task, index: number) => (
            <tr
              key={task._id}
              id={task._id}
              className={index % 2 === 0 ? "bg-slate-50" : "bg-gray-200"}
            >
              <td className="border px-1 md:px-4 py-2">{index + 1}</td>
              <td className="border px-1 md:px-4 py-2">
                <Link href={`/tasks/single?_id=${task._id}`} className="underline">
                  <span className=" mr-2">{task.name}</span>
                </Link>
                <button
                  className="mt-2 bg-cyan-500 text-white py-1 px-2 rounded-md hover:bg-cyan-700 text-sm"
                  onClick={() =>
                    speakTextAndBtn({
                      content: task.name,
                    })
                  }
                >
                  {/* 音声再生ボタン */}
                  <AiOutlineSound
                    className="icon text-white my-1 mx-2 inline-block"
                    size="0.8rem"
                  />
                </button>
              </td>
              <td className="border px-1 md:px-4 py-2">{task.jaName}</td>
              <td className="border px-1 md:px-4 py-2">
                {getSpeechLabel(task.speech as keyof typeof initialSpeechOptions)}
              </td>
              <td className="border px-1 md:px-4 py-2">{task.completed ? "✅" : "❌"}</td>
              <td className="border px-1 md:px-4 py-2">
                <Modalpop task={task} />
              </td>
              <td className="border px-1 md:px-4 py-2">
                <TaskDelete task={task} />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TaskIterate;
