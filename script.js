console.log("init complete");

document.getElementById("questionInput").addEventListener("click",takeQuestionInput);
document.getElementById("start").addEventListener("click", startQuizzer);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);

var textInput = "";
var fileInput = "";
var quizMaterial = "";
var quizQuestions = [];
var quizAnswers = [];

function takeQuestionInput() {
    console.log("Event determined");

    //reset quizQuestions, quizAnswers
    quizQuestions = [];
    quizAnswers = [];

    const file = document.getElementById("questionFileInput").files[0];
    textInput = document.getElementById("questionTextInput").value;

    if (file) {
        //Loading
        console.log("Loading file");
        document.getElementById("loading").hidden = false;
        document.getElementById("quizFieldSet").hidden = true;
        //read file input
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => storeResults(reader.result);
        function storeResults(result) {
            fileInput = result;
            console.log("File read")
            document.getElementById("loading").hidden = true;
            document.getElementById("quizFieldSet").hidden = false;
        }
        reader.onerror = () => {console.log("File input failed to read"); document.getElementById("questionInputError").innerHTML = "Could not upload questions!";};
    } 
    // else {
    //     console.log("File empty");
    // }
    //console.log(textInput);
}

function startQuizzer() {
    if (fileInput && textInput) {
        console.log("Two inputs detected");
        document.getElementById("questionInputError").innerHTML = "Two question inputs detected; please reinput only one";
    }
    else if (!(fileInput || textInput)) {
        console.log("No input detected");
        document.getElementById("questionInputError").innerHTML = "Please input the questions you want to be quizzed about above.";
    }  
    else {
        if (fileInput) {quizMaterial = fileInput;}
        else if (textInput) {quizMaterial = textInput;}
        
        console.log("Quiz starting");
        interpretUserInput();

        if (document.getElementById("multiple choice").checked) {
            multiChoiceQuiz();
        }
        else if (document.getElementById("input answer").checked) {
            textAnswerQuiz();
        }
        else if (document.getElementById("incorrect only").checked) {
            wrongAnswersQuiz();
        }
    }
}

function multiChoiceQuiz() {
    console.log("Multiple Choice Quiz");
    console.log("Questions:", quizQuestions);
    console.log("Answers:", quizAnswers);

    //start quiz loop
    document.getElementById("quizQuestion").innerHTML = quizQuestions[0];

}

function textAnswerQuiz() {
    console.log("Text Answer Quiz");
    console.log("Questions:", quizQuestions);
    console.log("Answers:", quizAnswers);
    var answeredQuestionIndex = [];
    var qNum = 0;
    //start quiz loop
    while (answeredQuestionIndex.length < quizQuestions.length) {
        qNum = getRandomInt(0, quizQuestions.length);
        //make sure question was not answered before
        while (itemInList(qNum,answeredQuestionIndex)) {
            qNum = getRandomInt(0, quizQuestions.length); 
        }
        answeredQuestionIndex.push(qNum);
        document.getElementById("quizQuestion").innerHTML = quizQuestions[qNum]; 
    }
    

}



function wrongAnswersQuiz() {
    console.log("Wrong answers quiz");
    console.log("Questions:", quizQuestions);
    console.log("Answers:", quizAnswers);
}

function interpretUserInput() {
    var lines = quizMaterial.split(/\r?\n|\r|\n/g);
    var q = ""; var a = ""; 
    var line = [];
    for (let i = 0; i < lines.length; i++) {
        line = lines[i].split("\t");
        q = line[0]; a = line[1];
        if (!(q in quizQuestions)) {
            quizQuestions.push(q);
            quizAnswers.push(a);
        }
    }
}

function checkAnswer() {
    if (document.getElementById("quizQuestion").innerHTML == "") {
        document.getElementById("answerFeedback").innerHTML = "You can't check if you answered correctly to a nonexistent question! Input your question/answer set and press the start quizzing button.";
    }
    else {
        var ind = quizQuestions.indexOf(document.getElementById("quizQuestion").innerHTML);
        //if answer is correct
        if (document.getElementById("userAnswer").value == quizAnswers[ind]) {
            document.getElementById("answerFeedback").innerHTML = "Your answer is correct!";
        }
        else { //incorrect answer
            document.getElementById("answerFeedback").innerHTML = "Incorrect;\nThe answer was " + quizAnswers[ind];
        }
    }
}


//helper functions
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

function itemInList(element, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return true;
        }
    }
    return false;

}