const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempts = 0;

//push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestions = quiz.length;
    for(let i = 0; i < totalQuestions; i++){
        availableQuestions.push(quiz[i]);
    }
}

//set question num and question and options
function getNewQuestion(){
    //Question Number
    questionNumber.innerHTML = "Pregunta " + (questionCounter + 1) + " de " + quiz.length;

    //Question Text
    //Get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    
    //Index position of questionIndex from availableQuestions Array
    const index1 = availableQuestions.indexOf(questionIndex);

    //Remove questionIndex from availableQuestions Array to no repeat questions
    availableQuestions.splice(index1,1);

    //show img if exist
    if(currentQuestion.hasOwnProperty('img')){
        const img = document.createElement('img');
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }

    //Set options
    //get the length of options
    const optionLength = currentQuestion.options.length;
    
    //push into availableOptions array
    for(let i = 0; i < optionLength; i++){
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';

    let animationDelay = 0.15;

    //create options in html
    for(let i = 0; i < optionLength; i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        
        //get position of option index from availableOptions array
        const index2 = availableOptions.indexOf(optionIndex);

        //Remove option index from availableOptions array to no repeat option
        availableOptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)")
    }
    questionCounter++;
}

// get the result of the attempt
function getResult(element){
    const id = parseInt(element.id);

    //get answer comparing the clicked option id
    if(id === currentQuestion.answer){
        //set green to correct
        element.classList.add("correct");
        //add the correct indicator mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }else{
        //set red to wrong
        element.classList.add("wrong");
        //add the wrong indicator mark
        updateAnswerIndicator("wrong");

        //if is incorrect shows de correct
        const optionLength = optionContainer.children.length;
        for(let i = 0; i < optionLength; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct")
            }
        }
    }
    
    attempts++;
    unclickeableOptions();
}
//make optios unclickeable once click one
function unclickeableOptions(){
    const optionLength = optionContainer.children.length;
    for(let i = 0; i < optionLength; i++){
        optionContainer.children[i].classList.add("already-answered")
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestions = quiz.length;
    for(let i = 0; i<totalQuestions; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }else{
        getNewQuestion();  
    }
}

function quizOver(){
    //hide quiz
    quizBox.classList.add("hide");

    //show result
    resultBox.classList.remove("hide");

    quizResult();
}

//get the quiz result
function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempts").innerHTML = attempts;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempts - correctAnswers;
    const percentage = (correctAnswers / quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempts = 0;
}

function tryAgainQuiz(){
    //hide result
    resultBox.classList.add("hide");

    //show quiz
    quizBox.classList.remove("hide");

    resetQuiz();
    startQuiz();
}

function goToHome(){
    //hide result 
    resultBox.classList.add("hide");

    //show home box
    homeBox.classList.remove("hide");

    resetQuiz();
}

// Starting Point
function startQuiz(){

    //hide home box
    homeBox.classList.add("hide");

    //show quiz box
    quizBox.classList.remove("hide");

    //First set questions in availableQuestions array
    setAvailableQuestions();

    //Second call getNewQuestion()
    getNewQuestion();

    //create answers indicators
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-questions").innerHTML = quiz.length;
}