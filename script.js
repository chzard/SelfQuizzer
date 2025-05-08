console.log("init complete");
document.getElementById("questionInput").addEventListener("click",questionInput);
document.getElementById("start").addEventListener("click", startQuizzer)
var textInput = "";
var fileInput = "";

function questionInput() {
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
        reader.onerror = () => console.log("File input failed to read");
    } else {
        console.log("File empty");
    }
    console.log(textInput);
}

function startQuizzer() {
    if (fileInput && textInput) {
        console.log("Two inputs detected:\n" + fileInput + "\n" + textInput);
    }
    else if (fileInput) {
        console.log("File input:\n" + fileInput);
    }
    else if (textInput) {
        console.log("Text input:\n" + textInput);
    }
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

function multiChoiceQuiz() {
    console.log("Multiple Choice Quiz");
}

function textAnswerQuiz() {
    console.log("Text Answer Quiz");
}

function wrongAnswersQuiz() {
    console.log("Wrong answers quiz");
}