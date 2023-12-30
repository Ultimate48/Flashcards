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

const updateQuestions = async() => {
    const questions = await getQuestions();
    questions.forEach(question => {
        q = {
            question: question.question.text,
            answer: question.correctAnswer,
            options: question.incorrectAnswers
        };
        q.options.push(q.answer);
        q.options.sort(() => Math.random() - 0.5);
        qna.push(q);
    });
};

const showQuestions = async () => {
    const questionText = document.querySelector('.question');
    const options = document.querySelectorAll('.option');
    const card = document.querySelector('.card');

    questionText.innerHTML = qna[0].question;
    options.forEach((option, index) => {
        option.innerHTML = qna[0].options[index];
        if (qna[0].options[index] === qna[0].answer) {
            option.classList.add('correct');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.add('selected');
            options.forEach(option => {
                if (!option.classList.contains('correct')) {
                    option.classList.add('wrong-answer');
                }else{
                    option.classList.add('correct-answer');
                }
            });
            if (option.classList.contains('correct')) {
                //Change the card color to green
                card.classList.add('correct-card');
            }else{
                //Change the card color to red
                card.classList.add('wrong-card');
            }
            setTimeout(async () => {
                card.classList.remove('correct-card');
                card.classList.remove('wrong-card');
                options.forEach(option => {
                    option.classList.remove('selected');
                    option.classList.remove('correct-answer');
                    option.classList.remove('wrong-answer');
                    option.classList.remove('correct');
                });
                playGame();
            }, 2000);
        });
    });
}

const playGame = async () => {
    if(qna.length > 0){
        qna = qna.slice(1);
    }
    if(qna.length === 0){
        await updateQuestions();
    }
    showQuestions();
};

playGame();
