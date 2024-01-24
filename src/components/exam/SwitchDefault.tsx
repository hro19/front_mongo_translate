import React from "react";
import { Task } from "@/ts/Task";
import { Result } from "@/ts/Exam";
import { useAtom } from "jotai";
import {
  HOWManyLesson,
  HOWManySelect,
  gamenAtom,
  resultsAtom,
  quizListDataAtom,
} from "../../jotai/examsAtoms";
import { selectRandomQuiz } from "../../components/exam/quizUtils";
import QuizSetting from "./QuizSetting";

const SwitchDefault = ({ data }: { data: Task[] }) => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [quizListData, setQuizListData] = useAtom(quizListDataAtom);

  const startBtn = (speech: string) => {
    const filteredData = data.filter((task: Task) => task.speech === speech);

    //「問題数」「選択肢数」を考慮して計算してくれます。
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
    <div className="">
      <div className="mb-4">
        <h1 className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
          単語クイズの
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            ルール説明
          </span>
        </h1>
        <h2 className="text-2xl font-bold"></h2>
        <ul className="list-disc ml-6 space-y-3 text-slate-600">
          <li>
            各品詞に合わせて単語クイズを実践できます。（動詞以外は順次オープンする予定です）
          </li>
          <li>
            各問題の制限時間は5秒しかありませんので、集中力があるときにするのがおすすめです
          </li>
          <li>答えが分からないときは【Enter】キーで次の問題に移動します</li>
          <li>最後に間違えた一覧を表示しますので、復習ができます</li>
          <li>
            該当単語の今までの正解率をグラフに表示するので自身の苦手なワードを確認してください
          </li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 pt-8">
        <button onClick={() => startBtn("verb")} className="btn btn-accent">
          【動詞単語】テスト
        </button>
        <a href="#" className="btn btn-active btn-neutral pointer-events-none">
          【名詞単語】テスト(準備中)
        </a>
        <a href="#" className="btn btn-active btn-neutral pointer-events-none">
          【形容詞単語】テスト(準備中)
        </a>
        <a href="#" className="btn btn-active btn-neutral pointer-events-none">
          【副詞単語】テスト(準備中)
        </a>
      </div>
      <QuizSetting />
    </div>
  );
};

export default SwitchDefault;
