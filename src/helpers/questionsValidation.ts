import { IQuestion } from '@/redux/slices/quizSlice';

export const validateAndFilterQuestions = (questions: IQuestion[]) => {
    let filteredQuestions = [];

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        if (
            question.answers &&
            Array.isArray(question.answers) &&
            question.answers.length >= 4 &&
            question.correctAnswers &&
            Array.isArray(question.correctAnswers) &&
            question.correctAnswers.length > 0 &&
            question.money >= 1 &&
            question.money <= 10000000 &&
            question.question?.length
        ) {
            const isValidCorrectAnswers = !question.answers.some((answer) =>
                isNaN(answer.value) || !answer.label);

            isValidCorrectAnswers && filteredQuestions.push(question);
        }
    }

    if (filteredQuestions.length > 12) {
        filteredQuestions = filteredQuestions.slice(0, 12);
    }

    return filteredQuestions;
};
