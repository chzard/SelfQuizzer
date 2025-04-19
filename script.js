var questionAnswer = new Map();
console.log("init complete");

//figure out input somehow?
document.getElementById("questionInput").addEventListener("submit",questionInput);
function questionInput(evt) {
    //testing: alert the value of each?
    console.log("Event determined");
    const f = document.getElementById("questionFileInput").files[0];
    const textInput = document.getElementById("questionTextInput").value;
    let fileInput = "";

    //read file input
    if (f) {
        var reader = new FileReader();
        reader.readAsText(f);
        fileInput = reader.result;
        console.log("File read")
    } else {
        console.log("Failed to load file input!");
    }

    if (f && textInput) {
        console.log("Two inputs detected:\n" + fileInput + "\n" + textInput);
    }
    else if (f) {
        console.log("File input:\n" + fileInput);
    }
    else if (textInput) {
        console.log("Text input:\n" + textInput);
    }

}