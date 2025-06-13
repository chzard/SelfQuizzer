console.log("init complete");
document.getElementById("questionTextInput").value = "";
document.getElementById("userAnswer").value = "";

document.getElementById("questionInput").addEventListener("click",takeQuestionInput);
document.getElementById("start").addEventListener("click", initQuiz);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);
document.getElementById("nextQuestion").addEventListener("click", nextQuestion);

var textInput = "";
var fileInput = "";
var quizMaterial = ""; //for interpreting read input
var quizQuestions = []; 
var quizAnswers = [];
var answeredQuestions = []; //stores indices of questions already answered from quizQuestions
var wrongQuestions = []; 
var wrongQuestionsAnswers = [];

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
}

function initQuiz() {
    document.getElementById("start").innerHTML = "Start Quizzing!";
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

        if (document.getElementById('incOnly').checked) {
            quizQuestions = [...wrongQuestions];
            quizAnswers = [...wrongQuestionsAnswers];
        }

        console.log("Questions:", quizQuestions);
        console.log("Answers:", quizAnswers);

        answeredQuestions = [];
        nextQuestion();
    }
}

function interpretUserInput() {
    var lines = quizMaterial.split(/\r?\n|\r|\n/g);
    quizQuestions = [];
    quizAnswers = [];
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
    
    if (curQuestion == "") {
        //empty question
        document.getElementById("answerFeedback").innerHTML = "You can't check if you answered correctly to a nonexistent question! Input your question/answer set and press the start quizzing button.";
    }
    else {
        var curQuestion = document.getElementById("quizQuestion").innerHTML;
        var curAnswer = document.getElementById("userAnswer").value;
        var ind = quizQuestions.indexOf(curQuestion);
        //if answer is correct
        if (curAnswer == quizAnswers[ind]) {
            document.getElementById("answerFeedback").innerHTML = "Your answer is correct!";
        }
        else { //incorrect answer
            document.getElementById("answerFeedback").innerHTML = "Incorrect;\nThe answer was " + quizAnswers[ind];
            wrongQuestions.push(curQuestion);
            wrongQuestionsAnswers.push(quizAnswers[ind]);
            //delete first "no incorrect answers yet"
            document.getElementById("noInc").hidden = true;
            //add to incorrect questions
            const node = document.createElement("li");
            const textnode = document.createTextNode(curQuestion);
            node.appendChild(textnode);
            document.getElementById("incorrectQuestions").appendChild(node);
        }
        document.getElementById("checkAnswer").disabled = true;
    }
}



function nextQuestion() {
    document.getElementById("checkAnswer").disabled = false;
    document.getElementById("start").innerHTML = "Start Quizzing";
    document.getElementById("nextQuestion").disabled = false;
    document.getElementById("answerFeedback").innerHTML = "";
    document.getElementById("userAnswer").value = "";
    
    if (answeredQuestions.length < quizQuestions.length) {
        qNum = getRandomInt(0, quizQuestions.length);
        //make sure question was not answered before
        while (itemInList(qNum,answeredQuestions)) {
            qNum = getRandomInt(0, quizQuestions.length); 
        }
        answeredQuestions.push(qNum);
        document.getElementById("quizQuestion").innerHTML = quizQuestions[qNum]; 
    }
    else {
        console.log("all questions asked");
        answeredQuestions = [];
        document.getElementById("quizQuestion").innerHTML = "All questions asked";
        document.getElementById("checkAnswer").disabled = true;
        document.getElementById('start').innerHTML = "Restart quiz";
        document.getElementById('nextQuestion').disabled = true;
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