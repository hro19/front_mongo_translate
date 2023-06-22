export type Task = {
  _id: string;
  completed: boolean;
  name: string;
  jaName: string;
  speech: string;
};

export type TaskObj = {
  task: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};

type FormData = Task & {
  _id: never;
};

export type SelectSwitch = "uncompleted" | "completed" | "all";
