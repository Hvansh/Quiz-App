// script.js

// Variables to store quiz state
let currentCategory = '';
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let questions = [];

// Navigation Functions
function goToCategorySelection() {
    // Reset Quiz State
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;

    // Show Category Screen
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('summary-screen').classList.add('hidden');
    document.getElementById('category-screen').classList.remove('hidden');
}

function startQuiz(category) {
    currentCategory = category;
    generateQuestions();
    document.getElementById('category-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function goToSummary() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('summary-screen').classList.remove('hidden');
    displayResults();
}

// Generate Questions
function generateQuestions() {
    questions = [];
    for (let i = 0; i < 10; i++) {
        let a = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 10);
        let question;
        switch (currentCategory) {
            case 'Addition':
                question = {
                    question: `${a} + ${b}`,
                    answer: a + b
                };
                break;
            case 'Subtraction':
                question = {
                    question: `${a} - ${b}`,
                    answer: a - b
                };
                break;
            case 'Multiplication':
                question = {
                    question: `${a} * ${b}`,
                    answer: a * b
                };
                break;
            case 'Division':
                b = b === 0 ? 1 : b; // Avoid division by zero
                question = {
                    question: `${a * b} / ${b}`,
                    answer: a
                };
                break;
            case 'Counting':
                question = {
                    question: `How many fingers in ${a} hands?`,
                    answer: a * 5
                };
                break;
        }
        questions.push(question);
    }
}

// Display Question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById('question').innerText = questions[currentQuestionIndex].question;
        document.getElementById('answer').value = '';
    } else {
        goToSummary();
    }
}

// Append Number to Answer Field
function appendNumber(num) {
    document.getElementById('answer').value += num;
}

// Undo Last Character
function undo() {
    let input = document.getElementById('answer').value;
    document.getElementById('answer').value = input.slice(0, -1);
}

// Submit Answer
function submitAnswer() {
    let userAnswer = parseInt(document.getElementById('answer').value);
    let correctAnswer = questions[currentQuestionIndex].answer;
    let feedbackMessage = document.getElementById('feedback-message');

    // Show feedback message
    feedbackMessage.classList.remove('hidden');
    if (userAnswer === correctAnswer) {
        score++;
        feedbackMessage.innerText = 'Correct! 🎉';
        feedbackMessage.style.color = 'green';
    } else {
        feedbackMessage.innerText = `Incorrect! The correct answer was ${correctAnswer}.`;
        feedbackMessage.style.color = 'red';
    }

    userAnswers.push({
        question: questions[currentQuestionIndex].question,
        userAnswer,
        correct: userAnswer === correctAnswer,
    });

    // Move to the next question after 1.5 seconds
    setTimeout(() => {
        feedbackMessage.classList.add('hidden');
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}

// Display Results
function displayResults() {
    document.getElementById('score').innerText = score;
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    userAnswers.forEach((item) => {
        let resultIcon = item.correct ? '✓' : '✗';
        resultsDiv.innerHTML += `<p>${item.question} - Your Answer: ${item.userAnswer} ${resultIcon}</p>`;
    });
}