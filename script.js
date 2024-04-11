const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the tallest mammal?",
        options: ["Elephant", "Giraffe", "Hippopotamus", "Kangaroo"],
        answer: "Giraffe"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What year did the Titanic sink?",
        options: ["1912", "1923", "1905", "1931"],
        answer: "1912"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart Quiz';
restartButton.style.display = 'none';
restartButton.addEventListener('click', restartQuiz);

function showQuestion(questionIndex) {
    const currentQuiz = quizData[questionIndex];
    questionElement.textContent = currentQuiz.question;
    
    optionsElement.innerHTML = '';

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.onclick = () => {
            if (option === currentQuiz.answer) {
                score++;
                showFeedback(true); // Show correct feedback
            } else {
                showFeedback(false); // Show wrong feedback
            }
            button.disabled = true; // Disable button after selection
        };
        optionsElement.appendChild(button);
    });
}

function showFeedback(isCorrect) {
    const feedbackElement = document.createElement('p');
    if (isCorrect) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.style.color = 'green';
        nextQuestion();
    } else {
        feedbackElement.textContent = 'Wrong answer. Try again!';
        feedbackElement.style.color = 'red';
        nextQuestion();
    }
    optionsElement.appendChild(feedbackElement);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion(currentQuestion);
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    questionElement.textContent = `You have completed the quiz! Your score is ${score} out of ${quizData.length}.`;
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
    restartButton.style.display = 'block';
    optionsElement.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.style.display = 'block';
    restartButton.style.display = 'none';
    showQuestion(currentQuestion);
}

// Start quiz
showQuestion(currentQuestion);

nextButton.addEventListener('click', nextQuestion);
