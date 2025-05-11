console.log("init complete");

document.getElementById("questionInput").addEventListener("click",takeQuestionInput);
document.getElementById("start").addEventListener("click", startQuizzer)

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

}

function textAnswerQuiz() {
    console.log("Text Answer Quiz");
    console.log("Questions:", quizQuestions);
    console.log("Answers:", quizAnswers);
}

function wrongAnswersQuiz() {
    console.log("Wrong answers quiz");
    console.log("Questions:", quizQuestions);
    console.log("Answers:", quizAnswers);
}

function interpretUserInput() {
    //takes user question input and stores question/answer into arrays
    var lines = quizMaterial.split(/\r?\n|\r|\n/g);
    var q; var a; 
    var line = [];
    for (let i = 0; i < lines.length; i++) {
        line = lines[i].split("\t");
        q = line[0];
        a = line[1];
        console.log(line, quizQuestions)
        if (!(q in quizQuestions)) {
            quizQuestions.push(q);
            quizAnswers.push(a);
        }
    }
}