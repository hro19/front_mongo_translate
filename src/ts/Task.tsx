import { useAtom } from "jotai";
import { initialSpeechOptionsAtom } from "../jotai/atoms";

const [initialSpeechOptions, setInitialSpeechOptions] = useAtom(initialSpeechOptionsAtom);

export type Task = {
  _id: string;
  completed: boolean;
  name: string;
  jaName: string;
  speech: keyof typeof initialSpeechOptions;
};

export type TaskObj = {
  task: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};

export type FormData = {
  name: string;
  jaName: string;
  speech: keyof typeof initialSpeechOptions;
  completed: boolean;
};

export type SelectSwitch = "uncompleted" | "completed" | "all";
