import { Task } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  gamenAtom,
} from "../../jotai/examsAtoms";
import SwitchDefault from "../../components/exam/SwitchDefault";
import SwitchQanda from "../../components/exam/SwitchQanda";
import SwitchFinish from "../../components/exam/SwitchFinish";

const Exam = ({ data }: { data: Task[] }) => {
  const [gamen] = useAtom(gamenAtom);

  return (
    <>
      <div className="mx-auto max-w-[640px]">
        {(() => {
          switch (gamen) {
            case "default":
              return <SwitchDefault data={data} />;
            case "answer":
            case "question":
              return <SwitchQanda />;
            case "finish":
              return <SwitchFinish />;
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch("https://back-mongo-task2.vercel.app/api/v1/tasks");
    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default Exam;
