import { useAtom } from "jotai";
import {
  failuresAtom,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
} from "../../jotai/atoms";
import { useRouter } from "next/router";
import { speakText } from "../translates/Onsei";

const SwitchFinish = () => {
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  const router = useRouter();

  const hasFailures = failures.length > 0;
  const title = hasFailures ? "今一度単語を確認しよう" : "あなたの回答は100点満点";

  const handleRetry = () => {
    setFailures([]);
    setGamen("default");
    setQuizListCount(0);
    setIsJadge(null);
    router.push("/tasks/exam");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
      {hasFailures
        ? failures.map((failure, index) => (
            <dl key={index} className="mb-2">
              <dt className="text-lg font-bold">
                【英語】{failure.name}
                <button
                  onClick={() => speakText(failure.name)}
                  className="btn btn-secondary h-8 ml-3"
                >
                  音声
                </button>
              </dt>
              <dd>【日本語】{failure.jaName}</dd>
            </dl>
          ))
        : null}
      <button
        onClick={handleRetry}
        className="btn btn-outline btn-primary mt-4 mb-4 justify-end"
      >
        再チャレンジ
      </button>
    </>
  );
};

export default SwitchFinish;
