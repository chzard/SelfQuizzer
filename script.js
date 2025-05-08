console.log("init complete");
document.getElementById("questionInput").addEventListener("click",takeQuestionInput);
document.getElementById("start").addEventListener("click", startQuizzer)
var textInput = "";
var fileInput = "";
var quizQuestions = "";

function takeQuestionInput() {
    //testing: alert the value of each?
    console.log("Event determined");
    const file = document.getElementById("questionFileInput").files[0];
    textInput = document.getElementById("questionTextInput").value;

    //read file input
    if (file) {
        console.log("Loading file");
        document.getElementById("loading").hidden = false;
        document.getElementById("quizFieldSet").hidden = true;
        const reader = new FileReader();
        var contents = "";
        reader.readAsText(file);
        reader.onload = () => storeResults(reader.result);
        function storeResults(result) {
        fileInput = result;
        console.log("File read")
        document.getElementById("loading").hidden = true;
        document.getElementById("quizFieldSet").hidden = false;
        }
        reader.onerror = () => {console.log("File input failed to read"); document.getElementById("questionInputError").innerHTML = "Could not upload questions!";};
    } else {
        console.log("File empty");
    }
    console.log(textInput);
}

function startQuizzer() {
    if (fileInput && textInput) {
        console.log("Two inputs detected");
        document.getElementById("Two question inputs detected; please reinput only one");
    }
    else if (!(fileInput || textInput)) {
        console.log("No input detected");
        document.getElementById("Please input the questions you want to be quizzed about above.");
    }  
    else {
        if (fileInput) {quizQuestions = fileInput;}
        else if (textInput) {quizQuestions = textInput;}
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
    console.log("Question/answer input:", quizQuestions);
}

function textAnswerQuiz() {
    console.log("Text Answer Quiz");
    console.log("Question/answer input:", quizQuestions);
}

function wrongAnswersQuiz() {
    console.log("Wrong answers quiz");
    console.log("Question/answer input:", quizQuestions);
}