import React from "react";
import { AiTwotoneSound } from "react-icons/ai";
import { useAtom } from "jotai";
import {
  quizListDataAtom,
  resultsAtom,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
} from "../../jotai/examsAtoms";
import { RESET } from "jotai/utils";
import { useRouter } from "next/router";
import { speakText } from "../translates/Onsei";
import Fubuki from "../../components/exam/Fubuki";

const SwitchFinish = () => {
  const [quizListData, setQuizListData] = useAtom(quizListDataAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  const router = useRouter();

  const failedResults = results.filter((result) => !result.isCorrect);
  const hasFailures = failedResults.length > 0;
  const title = hasFailures ? "今一度単語を確認しよう" : "あなたの回答は100点満点";

  const handleRetry = () => {
    setQuizListData(RESET);
    setResults(RESET);
    setGamen(RESET);
    setQuizListCount(RESET);
    setIsJadge(RESET);
    router.push("/exam");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
      {hasFailures && (
        <>
          {failedResults.map((result, index) => (
            <dl key={index} className="mb-2">
              <dt className="text-lg font-bold">
                【英語】{result.name}
                <button
                  onClick={() => speakText(result.name)}
                  className="btn btn-secondary h-8 ml-3"
                >
                  <AiTwotoneSound
                    className="icon text-white inline-block"
                    size="1.1rem"
                  />
                </button>
              </dt>
              <dd>【日本語】{result.jaName}</dd>
            </dl>
          ))}
        </>
      )}
      <button
        onClick={handleRetry}
        className="btn btn-outline btn-primary mt-4 mb-4 justify-end"
      >
        再チャレンジ
      </button>
      {!hasFailures && <Fubuki />}
    </>
  );
};

export default SwitchFinish;
