console.log("init complete");
document.getElementById("questionTextInput").value = "";
document.getElementById("userAnswer").value = "";

document.getElementById("questionInput").addEventListener("click",takeQuestionInput);
document.getElementById("start").addEventListener("click", initQuiz);
document.getElementById("checkAnswer").addEventListener("click", checkAnswer);
document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
document.getElementById("skipQuestion").addEventListener("click", skipQuestion);
document.getElementById("resetInc").addEventListener("click", resetInc);
document.getElementById("themes").addEventListener("click", expThemes);
//document.getElementsByName("theme").addEventListener("change", updateTheme);

var themeradios = document.forms["themesForm"].elements["theme"];
for (var i=0; i < themeradios.length; i++) {
    //themeradios[i].onclick = updateTheme();
    themeradios[i].addEventListener("click", updateTheme);
}

var textInput = "";
var fileInput = "";
var quizMaterial = ""; //for interpreting read input
var quizQuestions = []; 
var quizAnswers = [];
var answeredQuestions = []; //stores indices of questions already answered from quizQuestions
var totalWrongQuestions = [];
var totalWrongQuestionsAnswers = [];
var wrongQuestions = []; 
var wrongQuestionsAnswers = [];
var prevQ = -1;

var skippedQuestionsCount = 0;

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
        //document.getElementById("loading").hidden = false;
        //document.getElementById("quizFieldSet").hidden = true;
        //read file input
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => storeResults(reader.result);
        function storeResults(result) {
            fileInput = result;
            console.log("File read");
            document.getElementById("inputFeedback").innerHTML = "File read!";
            //document.getElementById("loading").hidden = true;
            //document.getElementById("quizFieldSet").hidden = false;
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
            quizQuestions = [...totalWrongQuestions];
            quizAnswers = [...totalWrongQuestionsAnswers];
        }
        //debugging
        //console.log("Questions:", quizQuestions);
        //console.log("Answers:", quizAnswers);
        document.getElementById("start").innerHTML = "Start Quizzing";
        document.getElementById("nextQuestion").disabled = false;
        document.getElementById("totalQuestionsCount").innerHTML = quizQuestions.length;
        document.getElementById("unansweredQuestionsCount").innerHTML = quizAnswers.length;
        prevQ = -1; 
        wrongQuestions = [];
        wrongQuestionsAnswers = [];
        skippedQuestionsCount = 0;
        answeredQuestions = [];
        updateStats(); document.getElementById("accuracyNum").innerHTML = 0;
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
        if (!(q in quizQuestions) && (a != null) && (q != null)) {
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
    else if (quizQuestions.length == 0) {
        document.getElementById("answerFeedback").innerHTML = "You haven't inputted any questions!";
    }
    else {
        document.getElementById("skipQuestion").hidden = true;
        document.getElementById("nextQuestion").hidden = false;
        var curQuestion = document.getElementById("quizQuestion").innerHTML;
        var curAnswer = document.getElementById("userAnswer").value;
        var ind = quizQuestions.indexOf(curQuestion);
        //if answer is correct
        if (curAnswer == quizAnswers[ind]) {
            document.getElementById("answerFeedback").innerHTML = "Your answer is correct!";
            if (itemInList(curQuestion, totalWrongQuestions)) {
                console.log('Remove correct')
                //Remove the question's list element if it's correct
                i = totalWrongQuestions.indexOf(curQuestion);
                var lis = document.querySelectorAll('li');
                li = lis[i+1];
                li.parentNode.removeChild(li);
                totalWrongQuestions = delItemList(i, totalWrongQuestions);
                totalWrongQuestionsAnswers = delItemList(i, totalWrongQuestionsAnswers);
                //console.log(totalWrongQuestions);
                //console.log(totalWrongQuestionsAnswers);
                if (totalWrongQuestionsAnswers.length==0) {document.getElementById("noInc").hidden = false;}
            }
        }
        else { //incorrect answer
            
            document.getElementById("answerFeedback").innerHTML = "Incorrect;\nThe answer was " + quizAnswers[ind];
            wrongQuestions.push(curQuestion);
            wrongQuestionsAnswers.push(quizAnswers[ind]);
            if (!itemInList(curQuestion, totalWrongQuestions)){
                //delete first "no incorrect answers yet"
                document.getElementById("noInc").hidden = true;
                //add to incorrect questions
                var node = document.createElement("li");
                var textnode = document.createTextNode(curQuestion);
                node.appendChild(textnode);
                document.getElementById("incorrectQuestionsList").appendChild(node);
                totalWrongQuestions.push(curQuestion);
                totalWrongQuestionsAnswers.push(quizAnswers[ind]);
            }
        }
        updateStats();
        document.getElementById("checkAnswer").disabled = true;
    }
}

function updateStats() {
    document.getElementById("skippedQuestionsCount").innerHTML = skippedQuestionsCount;
    document.getElementById("incorrectQuestionsCount").innerHTML = wrongQuestions.length;
    document.getElementById("correctQuestionsCount").innerHTML = answeredQuestions.length - wrongQuestions.length;
    document.getElementById("answeredQuestionsCount").innerHTML = answeredQuestions.length;
    document.getElementById("unansweredQuestionsCount").innerHTML = quizQuestions.length - answeredQuestions.length;
    document.getElementById("accuracyNum").innerHTML = Math.trunc((answeredQuestions.length - wrongQuestions.length) * 1000 / answeredQuestions.length) / 10 //to the tenths place
}

function skipQuestion() {
    if (quizQuestions.length == 0) {return;}
    setNewQuestion(true); 
    skippedQuestionsCount++; document.getElementById("skippedQuestionsCount").innerHTML = skippedQuestionsCount;
}

function nextQuestion() {
    document.getElementById("checkAnswer").disabled = false;
    document.getElementById("answerFeedback").innerHTML = "";
    document.getElementById("userAnswer").value = "";
    document.getElementById("nextQuestion").hidden = true; document.getElementById("skipQuestion").hidden = false;
    if (answeredQuestions.length < quizQuestions.length) {
        setNewQuestion(false);
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

function setNewQuestion(skip = false) {
    if (skip) {answeredQuestions.splice(answeredQuestions.length-1, 1);}
    qNum = getRandomInt(0, quizQuestions.length);
    //make sure question was not answered before
    while (itemInList(qNum,answeredQuestions) || qNum == prevQ) {
        qNum = getRandomInt(0, quizQuestions.length); 
    }
    answeredQuestions.push(qNum);
    document.getElementById("quizQuestion").innerHTML = quizQuestions[qNum]; 
    prevQ = qNum;
}

function resetInc() {
    var node = document.getElementById("incorrectQuestionsList");
    for (var i=0; i<totalWrongQuestions.length; i++) {
        node.removeChild(node.lastChild);
    }
    document.getElementById("noInc").hidden = false;
    totalWrongQuestions = []; totalWrongQuestionsAnswers = [];

}

function expThemes() {
    var hide = document.getElementById("themesWrapper").hidden;
    document.getElementById("themesWrapper").hidden = !hide;
    var text = document.getElementById("themes").innerHTML;
    if (text == "Expand themes") {document.getElementById("themes").innerHTML = "Collapse themes";}
    else {document.getElementById("themes").innerHTML = "Expand themes";}
}

function updateTheme() {
    //var tm = document.getElementsByName("theme").value;
    //var tm = document.getElementById("themesForm").value;
    var tm = document.querySelector('input[name="theme"]:checked').value;
    console.log("Theme updating");
    console.log(tm);
    switch (tm) {
        case "dark":
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
            break;
        default:
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            document.body.style.fontFamily = 'Courier New', monospace;
            break;
    }
}


//helper functions
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

function itemInList(element, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return true;
        }
    }
    return false;
}

function delItemList(ind, array) {
    var newArray = [];
    for (var i=0; i<array.length; i++) {
        if (i != ind) {newArray.push(array[i]);}
    }
    return newArray;
}