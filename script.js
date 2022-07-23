const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

let shuffledQuestions, currentQuestionIndex 


function startGame() {
    console.log("started")
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function  selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "what is the capital of colombia ?",
        answers: [
            {text: "Bogota", correct: true},
            {text: "cali", correct: false},
            {text: "medelin", correct: false},
            {text: "guadalahara", correct: false}
        ]
    },
    {
        question: "when was Pablo Escobar killed ?",
        answers: [
            {text: "1990", correct: false},
            {text: "1993", correct: true},
            {text: "1989", correct: false},
            {text: "1992", correct: false}

        ]
    },

    {
        question: "what was Pablo Escobar's cousin's name ?",
        answers: [
            {text: "Miguel", correct: false},
            {text: "Fernandez", correct: false},
            {text: "Gustavo", correct: true},
            {text: "Rodriguez", correct: false}

        ]
    },

    {
        question: "what cartel was Pablo the head of ?",
        answers: [
            {text: "Cali", correct: false},
            {text: "sinaloa", correct: false},
            {text: "guadalaara", correct: false},
            {text: "Medilin", correct: true}

        ]
    }
]