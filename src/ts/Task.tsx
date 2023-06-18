export type Task = {
  _id: string;
  jaName: string;
  name: string;
  speech: string;
  completed: boolean;
};

export type TaskObj = {
  task: Task;
};

export type CurrentTaskObj = {
  currentTask: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};

export type FormData = {
  name: string;
  jaName: string;
  speech: string;
  completed: boolean;
};

export type FormDataName = {
  name: string;
  jaName: string;
};


export type SelectSwitch = "uncompleted" | "completed" | "all";