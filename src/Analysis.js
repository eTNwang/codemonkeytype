// define the time limit
let TIME_LIMIT = 60;
 
const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {

  const contents = readFileSync(filename, 'utf-8');

  var problems = []

  const arr = contents.split("####");
  console.log(arr[0])
  console.log(arr[1])
  console.log(arr[2])


  function addtoproblems(input){
    var inputarr = input.split(/\r?\n/)
    let title = inputarr.shift();
    title  = title.replace("-", " ")
    title = title.replace(".py","")

    let probobj = {name: title, text: inputarr }
    problems.push(probobj)

  }
  arr.forEach((x, i) => addtoproblems(x));
  console.log(problems[0].name)
  console.log(problems[1].name)
  console.log(problems[2].name)

  console.log(problems[0].text)
  console.log(problems[1].text)
  console.log(problems[2].text)


  return problems;
}

syncReadFile('/Users/AmyEric/Desktop/codemonkeytype/src/problems.txt');





//temp params

//given text
// let quote_text = document.querySelector(".quote");
// //given input
// let input_area = document.querySelector(".input_area");
// //errornum tracker
// let error_text = document.querySelector(".curr_errors");
// //accuracy tracker
// let accuracy_text = document.querySelector(".curr_accuracy");





let timeLeft = 30;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

let curr_input = ""
let curr_input_array = ""
let quoteSpanArray = ""

let cpm = 0
let wpm = 0





function parseSolution(text){
    return text.split('\n')
}


//customize func later
function usersubmiut(timer){
    TIME_LIMIT = timer

}

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
   
    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      quote_text.appendChild(charSpan)
    })
   
    // roll over to the first quote
    if (quoteNo < quotes_array.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
  }


  //invoked on text change
  function processCurrentText() {
 
    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');
   
    // increment total characters typed
    characterTyped++;
   
    errors = 0;
   
    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index]
   
      // character not currently typed
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
   
        // correct character
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
   
        // incorrect character
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
   
        // increment number of errors
        errors++;
      }
    });
   
    // display the number of errors
   
    // update accuracy text
    let accuracyVal = (((characterTyped - (total_errors + errors)) / characterTyped) * 100);
   
    if (curr_input.length == current_quote.length) {
      updateQuote();
   
      // update total errors
      total_errors += errors;
   
      // clear the input area
      input_area.value = "";
    }
  }


  function startGame() {
 
    resetValues();
    updateQuote();
   
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
   
  function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
  
  }



  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timeElapsed++;
   
      // update the timer text as well

    }
    else {
      // finish the game
      finishGame();
    }
  }


function finishGame() {
  
   
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
   
    // update cpm and wpm text
    // display the cpm and wpm
    // // stop the timer
    // // disable the input area
    // // show finishing text
    // // display restart button

  }