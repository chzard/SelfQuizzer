# Quizzer App

### This is my feeble attempt to recreate a Quizlet flashcards-like quizzing tool for vocabulary using vanilla HTML, CSS, and JavaScript.
Deployed w/ github static sites __[here!](https://chzard.github.io/SelfQuizzer/)__


## HOW IT WORKS:

There are two options for inputting questions: __file input__ and __text input__. !["Screenshot of question input"](https://github.com/user-attachments/assets/36bff712-ffd1-4a52-807c-9a69df4f0df0)

Both look for the same formatting. Each question and its answer should be on the same line separated by a __tab__, and each q/a pair should be separated by a __newline__ (or simply pressing enter).

### Best way to input question data:
  __File__: Upload your questions to a spreadsheet (think Google Sheets or Excel). Keep your questions in one column and their corresponding answers in another column. Download your data as a .tsv file and upload to Quizzer. 
  
  An example:
  
  !["Example of questions in a spreadsheet"](https://github.com/user-attachments/assets/5b483259-393e-497c-9808-718a37449956 "questions in google sheets") 
  !["download tsv file option on google sheets"](https://github.com/user-attachments/assets/9c3dc93f-4360-4c74-80db-81b28f730040 "note: might look different in excel -- this is just an example in google sheets")
  
  (Question A has answer "Happy", B has answer "Sad", and C has answer "Angry")
   
  __Text__: Format your questions in a spreadsheet (just like how you would for file input above), and directly copy + paste into the text input option in Quizzer.
  
  Like so:
  
  !["Selected cells to be copied"](https://github.com/user-attachments/assets/4876a23b-bbad-4999-a633-1726af73a451 "Copy your cells like this")
  !["Pasted cells in Quizzer"](https://github.com/user-attachments/assets/551242b2-befd-4cec-9bf9-c410b96e0aa2 "Directly paste your questions+answers")

### Quizzing:

Click on "Start quizzing" to begin quizzing.

SelfQuizzer will store your incorrectly answered questions and will display the question you've answered incorrectly in a list. Once you finish one problemset, you have the option to either reupload questions, restart the same quiz, or quiz yourself on your __past incorrect__ only. (Note that this option quizzes you on __all__ past incorrect questions, so it spans over multiple problem sets. You can clear your incorrectly answered questions with __Reset incorrect questions__)

!["Incorrect questions list"](https://github.com/user-attachments/assets/a01d645d-fe4b-4f4b-91c6-e9b72b4483ec)
!["Options for incorrect questions"](https://github.com/user-attachments/assets/99a0f2df-678a-4ed2-aaf1-94fa3740d5a4)

## Other
Fonts

### notes
this is very simple project; i'm a beginner in development and wanted a refresher on basic HTML/CSS/Javascript. i still have a lot to learn, thanks for checking this out :)

[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)
