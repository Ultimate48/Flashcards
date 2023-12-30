const getQuestions = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
};

const updateQuestions = async() => {
    let qna = [];
    const questions = await getQuestions();
    questions.forEach(question => {
        let q = {
            question: question.question.text,
            answer: question.correctAnswer,
            options: question.incorrectAnswers
        };
        q.options.push(q.answer);
        q.options.sort(() => Math.random() - 0.5);
        qna.push(q);
    });
    return qna;
};

export { updateQuestions };