const getQuestions = async() => {
    fetch('https://the-trivia-api.com/v2/questions')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
};