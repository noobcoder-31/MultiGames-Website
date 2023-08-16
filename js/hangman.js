// Array of words for the game
var words = [
  // Fruits
  ["apple", "A popular fruit"],
  ["banana", "A long, yellow fruit"],
  ["orange", "A citrus fruit"],
  ["strawberry", "A small, red fruit"],
  ["watermelon", "A large, juicy fruit"],
  ["grape", "A small, sweet fruit"],
  ["mango", "A tropical fruit"],
  ["kiwi", "A small, green fruit with black seeds"],

  // Animals
  ["elephant", "A large, gray mammal with a trunk"],
  ["giraffe", "A long-necked animal with spots"],
  ["tiger", "A large, striped cat"],
  ["lion", "A large, carnivorous feline"],
  ["penguin", "A flightless bird living in cold climates"],
  ["dolphin", "A marine mammal known for its intelligence"],
  ["panda", "A bear native to China with black and white fur"],
  ["koala", "A marsupial native to Australia"],

  // Sports
  ["football", "A team sport played with a ball"],
  ["basketball", "A sport played with a ball and hoop"],
  ["tennis", "A racquet sport played on a rectangular court"],
  ["soccer", "A popular sport played with a round ball"],
  ["cricket", "A bat-and-ball game played on a field"],
  ["swimming", "A sport involving moving through water"],
  ["golf", "A precision club-and-ball sport"],
  ["volleyball", "A sport played with a ball over a net"],

  // Sports Personalities
  ["serenawilliams", "An iconic tennis player"],
  ["leomessi", "A legendary footballer"],
  ["michaeljordan", "A famous basketball player"],
  ["usainbolt", "An Olympic champion sprinter"],
  ["cristianoronaldo", "A renowned footballer"],
  ["lindseyvonn", "A successful alpine ski racer"],
  ["muhammadali", "A legendary boxer"],
  ["neymarjr", "A skilled footballer"],

  // Technology
  ["computer", "An electronic device"],
  ["smartphone", "A mobile phone with advanced capabilities"],
  ["robot", "A machine capable of carrying out complex actions"],
  ["artificialintelligence", "Intelligence demonstrated by machines"],
  ["virtualreality", "A computer-generated simulation of reality"],
  ["drones", "Unmanned aerial vehicles"],
  [
    "augmentedreality",
    "A technology that overlays digital content on the real world",
  ],
  ["selfdrivingcar", "An autonomous vehicle"],
];

// Selecting a random word from the array
var randomIndex = Math.floor(Math.random() * words.length);
var selectedWord = words[randomIndex][0];
var selectedHint = words[randomIndex][1];

let hintContainer = document.querySelector(".hint-container");
let infobtn = document.querySelector("#info-btn");
infobtn.addEventListener("click", () => {
  hintContainer.textContent = selectedHint;
  setTimeout(() => {
    hintContainer.textContent = "";
  }, 5000);
});

// Array to store the guessed letters
var guessedLetters = [];

// Maximum number of allowed wrong guesses
var maxWrongGuesses = 6;

// Counters for correct and wrong guesses
var correctGuesses = 0;
var wrongGuesses = 0;

// Function to display the hangman
function displayHangman() {
  var drawContainer = document.querySelector(".draw-container");
  drawContainer.innerHTML =
    "<img src='../images/hang-" + Number(wrongGuesses + 1) + ".png'>";
}

// Function to display the word with masked letters
function displayWord() {
  var wordContainer = document.querySelector(".word-container");
  wordContainer.innerHTML = "";

  for (var i = 0; i < selectedWord.length; i++) {
    var letter = selectedWord[i];
    if (guessedLetters.includes(letter)) {
      wordContainer.innerHTML += letter + " ";
    } else {
      wordContainer.innerHTML += "_ ";
    }
  }
}

// Function to handle the key press event
function handleKeyPress(event) {
  var keyPressed = event.target.value;

  if (guessedLetters.includes(keyPressed)) {
    return; // Do nothing if the letter has already been guessed
  }

  guessedLetters.push(keyPressed);

  var occurrences = 0;
  for (var i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === keyPressed) {
      occurrences++;
    }
  }

  if (occurrences > 0) {
    correctGuesses += occurrences;
  } else {
    wrongGuesses++;
    displayHangman();
  }

  displayWord();

  if (correctGuesses === selectedWord.length) {
    var drawContainer = document.querySelector(".draw-container");
    drawContainer.textContent = "Correct Answer!!!!🎉";
    let a = document.createElement("button");
    let aText = document.createTextNode("Next");
    a.appendChild(aText);
    drawContainer.classList.add("result");
    a.classList.add("nextbtn");
    drawContainer.appendChild(a);
    let exit = document.querySelector(".ext");
    exit.hidden = false;
    a.addEventListener("click", () => {
      resetGame();
    });
  } else if (wrongGuesses === maxWrongGuesses) {
    var drawContainer = document.querySelector(".draw-container");
    drawContainer.textContent = "Wrong Answer!!!!😢";
    let a = document.createElement("button");
    let aText = document.createTextNode("Next");
    drawContainer.classList.add("result");
    a.classList.add("nextbtn");
    a.appendChild(aText);
    drawContainer.appendChild(a);
    let exit = document.querySelector(".ext");
    exit.hidden = false;
    a.addEventListener("click", () => {
      resetGame();
    });
  }
}

// Function to reset the game
function resetGame() {
  guessedLetters = [];
  correctGuesses = 0;
  wrongGuesses = 0;
  randomIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[randomIndex][0];
  selectedHint = words[randomIndex][1];
  let exit = document.querySelector(".ext");
  exit.hidden = true;
  displayHangman();
  displayWord();
}

// Event listeners for the keyboard buttons
var keys = document.querySelectorAll(".key");
keys.forEach(function (key) {
  key.addEventListener("click", handleKeyPress);
});

function start() {
  let drawContainer = document.querySelector(".instruct-container");
  let instruct = document.createElement("ul");
  let i1 = document.createElement("l1");
  let i2 = document.createElement("l2");
  let i3 = document.createElement("l3");
  let i4 = document.createElement("l4");
  let i5 = document.createElement("l5");

  let i1text = document.createTextNode("1. This is a word guessing game.");
  let i2text = document.createTextNode(
    "2. You need to guess the word without wrong guesses."
  );
  let i3text = document.createTextNode(
    "3. On each wrong guess man will be hanged to death."
  );
  let i4text = document.createTextNode(
    "4. I Provided you with a hint to pass on and also you can only use keys shown below."
  );
  let i5text = document.createTextNode("ALL THE BEST.");
  i1.appendChild(i1text);
  i2.appendChild(i2text);
  i3.appendChild(i3text);
  i4.appendChild(i4text);
  i5.appendChild(i5text);
  instruct.appendChild(i1);
  instruct.appendChild(i2);
  instruct.appendChild(i3);
  instruct.appendChild(i4);
  instruct.appendChild(i5);
  let startbtn = document.createElement("button");
  let btntext = document.createTextNode("Start");
  startbtn.appendChild(btntext);
  startbtn.classList.add("nextbtn");
  drawContainer.appendChild(instruct);
  drawContainer.appendChild(startbtn);
  startbtn.addEventListener("click", () => {
    drawContainer.textContent = "";
    let no = document.querySelector("#info-btn");
    no.classList.add("info-btn");
    var keyContainer = document.querySelector(".key-container");
    keyContainer.removeAttribute("hidden");
    displayWord();
    displayHangman();
  });
}

// Initial setup
start();
