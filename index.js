import "./main.css";
import "./game";
import { commonWords } from "./constants.js";

// PICK A RANDOM WORD CONTAINING 3 LETTERS OR MORE
let randomWord = commonWords.filter((words) => words.length >= 3);
let word = randomWord[Math.floor(Math.random() * randomWord.length)];
console.log(word);

// GENERATE BUTTONS
let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((letter) => `<button class="letters" id="${letter}">${letter}</button>`)
  .join("");

document.querySelector("#keyboard").innerHTML = buttonsHTML;

// CREATE DASHES
let answerArray = [];
for (let i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}

document.querySelector("#dashes").innerHTML = answerArray.join(" ");

// SET NUMBER OF TURNS
let turns = 7;
document.querySelector("#turns").innerHTML = turns;

// VARIABLE TO KEEP TRACK OF CORRECT GUESSES
let counter = 0;

// CHANGE STATE AFTER GUESS
document.querySelector("#keyboard").addEventListener("click", (e) => {
  e.target.disabled = true;
  let guess = e.target.id;
  for (let j = 0; j < word.length; j++) {
    if (word[j] === guess) {
      answerArray[j] = guess;
      document.querySelector("#dashes").innerHTML = answerArray.join(" ");
      counter += 1;
    }
  }
  if (word[j] !== guess) {
    turns = turns - 1;
    document.querySelector("#turns").innerHTML = turns;
  }
  if (turns === 0) {
    document.querySelector("#gameOver").innerHTML = "GAME OVER";
  }
  if (counter === answerArray.length) {
    document.querySelector("#gameOver").innerHTML = "YOU WIN";
  }
});

// REFRESH PAGE WHEN RESET BUTTON IS CLICKED
document.querySelector("#reset").addEventListener("click", () => {
  window.location.reload();
});
