import React, {
  FormEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SlugFormInput from "../../components/taskShingle/SlugFormInput";
import { Task } from "../../ts/Task";

//checkEdit関数　元データと現データが同じならば送信しない
//handleSubmitCheck関数　handleSubmitを基に作成、編集成功時にcheckEditをfalseに

type SlugFormProps = {
  task: Task;
  name: string;
  completed: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const SlugForm = ({
  task,
  name,
  completed,
  setName,
  setCompleted,
  handleSubmit,
}: SlugFormProps) => {

  const [checkEdit, setCheckEdit] = useState(false);
  useEffect(() => {
    if (name !== task.name || completed !== task.completed) {
      // console.log("name changed:", name);
      // console.log("completed changed:", completed);
      setCheckEdit(true);
    } else {
      setCheckEdit(false);
    }
  }, [name, completed]);

  const handleSubmitCheck = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleSubmit(e);
      setCheckEdit(false);
    } catch (err) {
      console.error(err);
      // エラーが発生した場合は、適切なエラーハンドリングを行う
    }
  };

  return (
    <form
      className="w-full sm:w-4/5 lg:w-3/4 max-w-md"
      onSubmit={handleSubmitCheck}
    >
      <SlugFormInput
        task={task}
        name={name}
        completed={completed}
        setName={setName}
        setCompleted={setCompleted}
        checkEdit={checkEdit}
      />
    </form>
  );
};

export default SlugForm;