import { JadgeTask, CandidatesTask } from "../../ts/Task";

export const selectRandomQuiz = (
  filteredData: CandidatesTask[],
  HOWManyLesson: number,
  HOWManySelect: number
) => {
  const selectedQuizzes: CandidatesTask[] = [];

  for (let i = 0; i < HOWManyLesson; i++) {
    if (filteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomQuiz = filteredData[randomIndex];
      const candidates: JadgeTask[] = [];

      // ランダムなクイズをcandidatesの最初の要素に追加（correct: true）
      const correctQuiz: JadgeTask = {
        ...randomQuiz,
        correct: true,
      };
      candidates.push(correctQuiz);

      // 他の候補をランダムに選ぶ（correct: false）
      const otherIndices = getRandomUniqueIndices(
        filteredData.length,
        randomIndex,
        HOWManySelect - 1
      );
      for (const index of otherIndices) {
        const otherQuiz: JadgeTask = {
          ...filteredData[index],
          correct: false,
        };
        candidates.push(otherQuiz);
      }
      //シャッフルして、値をrandomQuizにセットする
      randomQuiz.candidates = shuffleArray(candidates);
      selectedQuizzes.push(randomQuiz);
      filteredData.splice(randomIndex, 1);
    }
  }

  return selectedQuizzes;
};

const getRandomUniqueIndices = (
  length: number,
  excludeIndex: number,
  count: number
): number[] => {
  const indices = [];
  for (let i = 0; i < length; i++) {
    if (i !== excludeIndex) {
      indices.push(i);
    }
  }

  const randomIndices = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    randomIndices.push(indices[randomIndex]);
    indices.splice(randomIndex, 1);
  }

  return randomIndices;
};

export const shuffleArray = (array: JadgeTask[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
