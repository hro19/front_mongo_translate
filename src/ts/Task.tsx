export type Task = {
  _id: string;
  name: string;
  completed: boolean;
};

export type TaskIterateProps = {
  tasks: Task[];
  refetch: () => void;
};
