import { decode } from "html-entities";

export const createQuestions = (data) => {
  const questionArr = data.map((item) => {
    const question = decode(item.question);
    const correctAnswer = {
      value: decode(item.correct_answer),
      isCorrect: true,
      isHeld: false,
    };
    const incorrectAnswers = item.incorrect_answers.map((item) => ({
      value: decode(item),
      isCorrect: false,
      isHeld: false,
    }));
    const allAnswers = [correctAnswer, ...incorrectAnswers].sort(
      () => Math.random() - 0.5
    );
    return { question, allAnswers };
  });
  return questionArr;
};
