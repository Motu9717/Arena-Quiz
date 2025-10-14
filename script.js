const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const nextButton = document.getElementById('next-btn');

let quizQuestions = []; 
let currentQuestionIndex;
let score;

// The full list of your questions remains here
const allQuestions = [
    // ... (all 33 of your Nemesis questions go here) ...
    // Make sure to paste your full list of question objects here
    {
        question: "What is Nemesis’s core offering?",
        answers: [
            { text: "A centralized trading platform for derivatives", correct: false },
            { text: "A protocol to buy or short any on-chain token", correct: true },
            { text: "A crypto lending marketplace", correct: false },
            { text: "A stablecoin issuance platform", correct: false }
        ]
    },
    {
        question: "In Nemesis, who controls funds used in trading?",
        answers: [
            { text: "Central custodian", correct: false },
            { text: "Market maker firm", correct: false },
            { text: "Smart contracts (non-custodial)", correct: true },
            { text: "Exchange treasury", correct: false }
        ]
    },
    {
        question: "Which term describes the novel liquidity framework used by Nemesis?",
        answers: [
            { text: "Automated Market Maker (AMM)", correct: false },
            { text: "Order Book Matching Engine", correct: false },
            { text: "Omni-Directional Market Maker (OMM)", correct: true },
            { text: "Centralized Liquidity Pool (CLP)", correct: false }
        ]
    }
    // (Add the rest of your questions here)
];

function startQuiz() {
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    quizQuestions = shuffledQuestions.slice(0, 3);
    
    currentQuestionIndex = 0;
    score = 0;
    
    resultContainerElement.classList.add('hide');
    resultContainerElement.innerHTML = '';
    questionTextElement.style.display = 'block';
    nextButton.removeEventListener('click', startQuiz); // Remove old listener
    nextButton.addEventListener('click', handleNextButton); // Add new one

    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(quizQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionTextElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Disable all buttons to prevent changing the answer
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    // Show immediate feedback
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
        const correctButton = Array.from(answerButtonsElement.children).find(button => button.dataset.correct === "true");
        if (correctButton) {
            correctButton.classList.add('correct');
        }
    }
    
    // Set button text for the next action
    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextButton.innerText = "Next Question";
    } else {
        nextButton.innerText = "Finish";
    }

    nextButton.classList.remove('hide');
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    resetState();
    questionTextElement.style.display = 'none';
    resultContainerElement.classList.remove('hide');
    
    const resultTitle = document.createElement('h2');

    // Show congratulations only if all answers are correct
    if (score === quizQuestions.length) {
        resultTitle.innerText = `Congratulations! You scored ${score} out of ${quizQuestions.length}!`;
    } else {
        resultTitle.innerText = `You scored ${score} out of ${quizQuestions.length}. Try again!`;
    }
    
    resultContainerElement.appendChild(resultTitle);

    // Prepare restart button
    nextButton.innerText = "Restart Quiz";
    nextButton.removeEventListener('click', handleNextButton);
    nextButton.addEventListener('click', startQuiz);
    nextButton.classList.remove('hide');
}

// Start the quiz when the page loads
startQuiz();
