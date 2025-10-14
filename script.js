const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const nextButton = document.getElementById('next-btn');

let quizQuestions = []; 
let currentQuestionIndex;
let userAnswers = []; // New array to store the user's choices

// The full list of your questions remains here
const allQuestions = [
    // ... (all 33 of your Nemesis questions go here) ...
    {
        question: "What is Nemesis’s core offering?",
        answers: [
            { text: "A centralized trading platform for derivatives", correct: false },
            { text: "A protocol to buy or short any on-chain token", correct: true },
            { text: "A crypto lending marketplace", correct: false },
            { text: "A stablecoin issuance platform", correct: false }
        ]
    },
    // (I've included just one for brevity, but you should have your full list)
    // Paste your full list of 33 question objects here
    {
        question: "In Nemesis, who controls funds used in trading?",
        answers: [
            { text: "Central custodian", correct: false },
            { text: "Market maker firm", correct: false },
            { text: "Smart contracts (non-custodial)", correct: true },
            { text: "Exchange treasury", correct: false }
        ]
    }
];


nextButton.addEventListener('click', startQuiz);

function startQuiz() {
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    quizQuestions = shuffledQuestions.slice(0, 3);
    
    currentQuestionIndex = 0;
    userAnswers = []; // Reset answers for the new quiz
    
    resultContainerElement.classList.add('hide');
    resultContainerElement.innerHTML = '';
    questionTextElement.style.display = 'block';
    nextButton.classList.add('hide');

    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion(quizQuestions[currentQuestionIndex]);
    } else {
        // All questions answered, now show the review
        showReview();
    }
}

function showQuestion(question) {
    questionTextElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    // Store the text of the selected answer
    userAnswers.push(selectedButton.innerText);
    currentQuestionIndex++;
    setNextQuestion();
}

function showReview() {
    resetState();
    questionTextElement.style.display = 'none'; // Hide the main question text
    resultContainerElement.classList.remove('hide');
    
    let score = 0;

    quizQuestions.forEach((question, index) => {
        const userAnswerText = userAnswers[index];
        const questionReviewBlock = document.createElement('div');
        questionReviewBlock.classList.add('review-block');

        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `${index + 1}. ${question.question}`;
        questionReviewBlock.appendChild(questionTitle);

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.disabled = true; // Make buttons unclickable in the review

            // Check if this option was the user's answer
            if (answer.text === userAnswerText) {
                if (answer.correct) {
                    button.classList.add('correct');
                    score++;
                } else {
                    button.classList.add('wrong');
                }
            }
            // Also highlight the correct answer if the user was wrong
            if (answer.correct && answer.text !== userAnswerText) {
                 button.classList.add('correct');
            }
            questionReviewBlock.appendChild(button);
        });
        resultContainerElement.appendChild(questionReviewBlock);
    });

    // Add final score
    const scoreText = document.createElement('h2');
    scoreText.innerText = `You scored ${score} out of ${quizQuestions.length}`;
    scoreText.style.textAlign = 'center';
    scoreText.style.marginTop = '30px';
    resultContainerElement.prepend(scoreText);

    // Show restart button
    nextButton.innerText = "Restart Quiz";
    nextButton.classList.remove('hide');
}

// Start the quiz when the script loads
startQuiz();
