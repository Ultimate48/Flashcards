import { updateQuestions } from "./Questions.js";

const showQuestions = async (qna, index = 0) => {
    const questionText = document.querySelector('.question');
    const options = document.querySelectorAll('.option');
    const card = document.querySelector('.card');

    if (index < qna.length) {
        let isQuestionValid = qna[index].question.length <= 100;

        let isOptionValid = true;
        qna[index].options.forEach(option => {
            if (option.length > 30) {
                isOptionValid = false;
            }
        });

        if (!isQuestionValid || !isOptionValid) {
            showQuestions(qna, index + 1);
            return;
        }


        questionText.innerHTML = qna[index].question;
        options.forEach((option, optionIndex) => {
            option.innerHTML = qna[index].options[optionIndex];
            option.classList.remove('correct', 'wrong-answer', 'selected');
            if (qna[index].options[optionIndex] === qna[index].answer) {
                option.classList.add('correct');
            }
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                option.classList.add('selected');
                options.forEach((opt, optIndex) => {
                    if (!opt.classList.contains('correct')) {
                        opt.classList.add('wrong-answer');
                    } else {
                        opt.classList.add('correct-answer');
                    }
                });
                if (option.classList.contains('correct')) {
                    card.classList.add('correct-card');
                } else {
                    card.classList.add('wrong-card');
                }
                setTimeout(() => {
                    card.classList.remove('correct-card', 'wrong-card');
                    options.forEach(opt => {
                        opt.classList.remove('selected', 'correct-answer', 'wrong-answer', 'correct');
                    });
                    showQuestions(qna, index + 1); // Pass the next index
                }, 2000);
            });
        });
    } else {
        questionText.innerHTML = 'You have completed the quiz!';
        options.forEach(option => {
            option.innerHTML = '';
        });
    }
}

const playGame = async () => {
    try {
        const qna = await updateQuestions();
        showQuestions(qna);
    } catch (error) {
        console.error('Error updating questions:', error);
    }
};

playGame();

