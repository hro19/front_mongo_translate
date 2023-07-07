import React from "react";
import { Task, CandidatesTask, JadgeTask } from "@/ts/Task";
import { Result } from "@/ts/Exam";
import { useAtom } from "jotai";
import {
  HOWManyLesson,
  HOWManySelect,
  gamenAtom,
  quizListCountAtom,
  resultsAtom,
  quizListDataAtom,
} from "../../jotai/examsAtoms";
import { selectRandomQuiz } from "../../components/exam/quizUtils";

const SwitchDefault = ({ data }: { data: Task[] }) => {
  const [gamen,setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [quizListData, setQuizListData] = useAtom(quizListDataAtom);

  const handleButtonClick = () => {
    const filteredData = data.filter((task: Task) => task.speech === "verb");
    const quizListDa = selectRandomQuiz(filteredData, HOWManyLesson, HOWManySelect);
    setQuizListData(quizListDa);
    const updatedResults: Result[] = quizListDa.map(({ candidates, ...quiz }) => ({
      ...quiz,
      isCorrect: true,
    }));
    setResults(updatedResults);

    setGamen("question");
  };

  return (
    <div className="my-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">ルール説明</h2>
        <ul className="list-disc ml-6">
          <li>答えが分からないときは【Enter】キーで次の問題に移動します</li>
          <li>最後に間違えた一覧を表示しますので、復習ができます</li>
          <li>...</li>
        </ul>
      </div>
      <button onClick={handleButtonClick} className="btn btn-info">
        【動詞単語】テストをスタート
      </button>
    </div>
  );
};

export default SwitchDefault;
