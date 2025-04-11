var questionAnswer = new Map();
console.log("init complete");

//figure out input somehow?
document.getElementById("questionInput").addEventListener("submit",questionInput);
function questionInput(evt) {
    //testing: alert the value of each?
    console.log("Event determined");
    let fileInput = document.getElementById("questionFileInput");
    let textInput = document.getElementById("questionTextInput");

    //read file input
    if (fileInput) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            document.getElementById("ReadResult").innerHTML = contents;
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file input!");
    }

    if (fileInput && textInput) {
        console.log("Two inputs detected:\n" + fileInput + "\n" + textInput);
    }
    else if (fileInput) {
        console.log("File input:\n" + fileInput);
    }
    else if (textInput) {
        console.log("Text input:\n" + textInput);
    }

}