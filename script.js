console.log("init complete");
document.getElementById("questionInput").addEventListener("submit",questionInput);
let textInput = "";
let fileInput = "";

function questionInput() {
    //testing: alert the value of each?
    console.log("Event determined");
    const file = document.getElementById("questionFileInput").files[0];
    textInput = document.getElementById("questionTextInput").value;

    //read file input
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => storeResults(reader.result);
        function storeResults(result) {
        fileInput = result;
        }
        reader.onerror = () => console.log("File input failed to read");
    } else {
        console.log("File empty");
    }

    // if (fileInput && textInput) {
    //     console.log("Two inputs detected:\n" + fileInput + "\n" + textInput);
    // }
    // else if (fileInput) {
    //     console.log("File input:\n" + fileInput);
    // }
    // else if (textInput) {
    //     console.log("Text input:\n" + textInput);
    // }

}
console.log(fileInput);
console.log(textInput); 