import { Task } from "@/ts/Task";

export const selectRandomQuiz = (filteredData: any, count: number) => {
  const selectedQuizzes: any = [];

  for (let i = 0; i < count; i++) {
    if (filteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomQuiz = filteredData[randomIndex];
      randomQuiz.candidates = [randomQuiz]; // ランダムなクイズをcandidatesの最初の要素に追加

      // 他の候補をランダムに選ぶ
      const otherIndices = getRandomUniqueIndices(filteredData.length, randomIndex, 2);
      for (const index of otherIndices) {
        randomQuiz.candidates.push(filteredData[index]);
      }

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

export const shuffleArray = (array: Task[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
