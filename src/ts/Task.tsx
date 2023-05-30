export type Task = {
  _id: string;
  name: string;
  completed: boolean;
};

export type TaskObj = {
  task: Task;
};

export type TaskRefetch = {
  task: Task;
  refetch: () => void;
}

export type TaskIterateProps = {
  tasks?: Task[];
  refetch: () => void;
};
