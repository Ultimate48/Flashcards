const getQuestions = async () => {
    try {
      const response = await fetch('https://the-trivia-api.com/v2/questions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
};

let qna = [];

const showQuestions = async() => {
    const questions = await getQuestions();
    questions.forEach(question => {
        q = {
            question: question.question,
            answer: question.correctAnswer,
            options: question.incorrectAnswers
        };
        q.options.push(q.answer);
        q.options.sort(() => Math.random() - 0.5);
        qna.push(q);
    });

    console.log(qna)
    const questionText = document.querySelector('.question');
    const options = document.querySelectorAll('.option');

    questionText.innerHTML = qna[0].question.text;
    options.forEach((option, index) => {
        option.innerHTML = qna[0].options[index];
        if (qna[0].options[index] === qna[0].answer) {
            option.classList.add('correct');
        }
    });
};

showQuestions();


