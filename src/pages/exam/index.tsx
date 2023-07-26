import { Task } from "@/ts/Task";
import { useAtom } from "jotai";
import { gamenAtom } from "../../jotai/examsAtoms";
import SwitchDefault from "../../components/exam/SwitchDefault";
import SwitchQanda from "../../components/exam/SwitchQanda";
import SwitchFinish from "../../components/exam/SwitchFinish";
import Densya from "../../components/exam/Densya";
import { getAllTasks } from "../../api/task";
import IdExams from "@/components/exam/IdExams";

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
      <Densya />
      {gamen === "finish" && <IdExams />}
    </>
  );
};

export async function getServerSideProps() {
  const data = await getAllTasks();

  return {
    props: {
      data,
    },
  };
}

export default Exam;
