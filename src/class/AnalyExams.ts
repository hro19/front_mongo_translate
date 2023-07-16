import { Exam, ExamsWithRate } from "../ts/Exam";

export class AnalyExams {
  totalCount: number;
  totalCorrectCount: number;
  correctRate: number;
  examsWithRates: ExamsWithRate[];

  constructor(exams: Exam[]) {
    // テストの回数を算出
    this.totalCount = exams.length;

    // 正解回数を算出
    this.totalCorrectCount = exams.filter((exam) => exam.isCorrect).length;

    // 正答率を算出
    this.correctRate = Number(
      ((this.totalCorrectCount / this.totalCount) * 100).toFixed(2)
    );

    // examsWithRateはexamsとdailyRateを合わせたもの
    this.examsWithRates = this.addDailyRateToExams(exams);
  }

  //examsの各配列に試験ごとの正答率を加える
  private addDailyRateToExams(exams: Exam[]): ExamsWithRate[] {
    return exams.map((exam: Exam, index:number) => {
      const correctCount:number = exams.slice(0, index + 1).filter((e) => e.isCorrect).length;
      const dailyRate: number = Number(((correctCount / (index + 1)) * 100).toFixed(2));
      return { ...exam, dailyRate };
    });
  }
}
