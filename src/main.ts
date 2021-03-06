import "./style.css";

type State = {
  word: string;
  characters: string[];
  maxMistakes: number;
  streak: number;
};

const WORDS = [
  "abruptly",
  "absurd",
  "abyss",
  "affix",
  "askew",
  "avenue",
  "awkward",
  "axiom",
  "azure",
  "bagpipes",
  "bandwagon",
  "banjo",
  "beekeeper",
  "bikini",
  "blitz",
  "blizzard",
  "boggle",
  "bookworm",
  "boxcar",
  "boxful",
  "buckaroo",
  "buffalo",
  "buffoon",
  "buzzard",
  "buzzing",
  "buzzwords",
  "caliph",
  "cobweb",
  "cockiness",
  "croquet",
  "crypt",
  "curacao",
  "cycle",
  "daiquiri",
  "disavow",
  "dizzying",
  "duplex",
  "dwarves",
  "embezzle",
  "equip",
  "espionage",
  "euouae",
  "exodus",
  "faking",
  "fishhook",
  "fixable",
  "fjord",
  "flapjack",
  "flopping",
  "fluffiness",
  "flyby",
  "foxglove",
  "frazzled",
  "frizzled",
  "fuchsia",
  "funny",
  "galaxy",
  "galvanize",
  "gazebo",
  "giaour",
  "gizmo",
  "glowworm",
  "glyph",
  "gnarly",
  "gnostic",
  "gossip",
  "grogginess",
  "haiku",
  "haphazard",
  "hyphen",
  "icebox",
  "injury",
  "ivory",
  "ivy",
  "jackpot",
  "jaundice",
  "jawbreaker",
  "jaywalk",
  "jazziest",
  "jazzy",
  "jelly",
  "jigsaw",
  "jinx",
  "jiujitsu",
  "jockey",
  "jogging",
  "joking",
  "jovial",
  "joyful",
  "juicy",
  "jukebox",
  "jumbo",
  "kayak",
  "kazoo",
  "keyhole",
  "khaki",
  "kilobyte",
  "kiosk",
  "kitsch",
  "kiwifruit",
  "klutz",
  "knapsack",
  "larynx",
  "lengths",
  "lucky",
  "luxury",
  "lymph",
  "marquis",
  "matrix",
  "megahertz",
  "microwave",
  "mnemonic",
  "mystify",
  "naphtha",
  "nightclub",
  "nowadays",
  "numbskull",
  "nymph",
  "onyx",
  "ovary",
  "oxidize",
  "oxygen",
  "pajama",
  "peekaboo",
  "phlegm",
  "pixel",
  "pizazz",
  "pneumonia",
  "polka",
  "pshaw",
  "psyche",
  "puppy",
  "puzzling",
  "quartz",
  "queue",
  "quips",
  "quixotic",
  "quiz",
  "quizzes",
  "quorum",
  "razzmatazz",
  "rhubarb",
  "rhythm",
  "rickshaw",
  "schnapps",
  "scratch",
  "shiv",
  "snazzy",
  "sphinx",
  "spritz",
  "squawk",
  "staff",
  "strength",
  "strengths",
  "stretch",
  "stronghold",
  "stymied",
  "subway",
  "swivel",
  "syndrome",
  "thriftless",
  "thumbscrew",
  "topaz",
  "transcript",
  "transgress",
  "transplant",
  "triphthong",
  "twelfth",
  "twelfths",
  "unknown",
  "unworthy",
  "unzip",
  "uptown",
  "vaporize",
  "vixen",
  "vodka",
  "voodoo",
  "vortex",
  "voyeurism",
  "walkway",
  "waltz",
  "wave",
  "wavy",
  "waxy",
  "wellspring",
  "wheezy",
  "whiskey",
  "whizzing",
  "whomever",
  "wimpy",
  "witchcraft",
  "wizard",
  "woozy",
  "wristwatch",
  "wyvern",
  "xylophone",
  "yachtsman",
  "yippee",
  "yoked",
  "youthful",
  "yummy",
  "zephyr",
  "zigzag",
  "zigzagging",
  "zilch",
  "zipper",
  "zodiac",
  "zombie",
];

function getRandomWord() {
  let randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}

let state: State = {
  word: getRandomWord(),
  characters: [],
  maxMistakes: 5,
  streak: 0,
};

function restartGame() {
  state.word = getRandomWord();
  state.characters = [];
  render();
}
function getMistakes() {
  return state.characters.filter((char) => !state.word.includes(char));
}

function getMistakeCount() {
  let mistakes = getMistakes();
  return mistakes.length;
}

function getCorrectGuesses() {
  return state.characters.filter((char) => state.word.includes(char));
}

function checkIfUserWon() {
  for (let char of state.word) {
    if (!state.characters.includes(char)) return false;
  }

  return true;
}

function checkIfUserLost() {
  return getMistakeCount() >= state.maxMistakes;
}

function renderWord() {
  let wordEl = document.createElement("div");
  wordEl.className = "word";

  let correctGuesses = getCorrectGuesses();

  for (let char of state.word) {
    let charEl = document.createElement("span");
    charEl.className = "char";

    if (correctGuesses.includes(char)) {
      charEl.textContent = char;
    } else {
      charEl.textContent = "_";
    }
    wordEl.append(charEl);
  }
  return wordEl;
}

function renderMistakes() {
  let mistakesSpan = document.createElement("div");
  mistakesSpan.className = "mistakes";
  mistakesSpan.textContent = `Mistakes:${getMistakes()} (${getMistakeCount()})`;

  if (getMistakeCount() === state.maxMistakes - 1)
    mistakesSpan.classList.add("almost-lost");

  return mistakesSpan;
}

function renderWinningMessage() {
  let winMessageDiv = document.createElement("div");

  let winMessageP = document.createElement("p");
  winMessageP.textContent = "You  Win!";

  let restartButton = document.createElement("button");
  restartButton.textContent = "RESTART";
  restartButton.className = "restart-button";
  restartButton.addEventListener("click", function () {
    state.streak++;

    restartGame();
  });

  winMessageDiv.append(winMessageP, restartButton);

  return winMessageDiv;
}

function renderLosingMessage() {
  let lostMessageDiv = document.createElement("div");

  let lostMessageP = document.createElement("p");
  lostMessageP.textContent = `You lose! The word was: ${state.word}`;

  let restartButton = document.createElement("button");
  restartButton.textContent = "RESTART";
  restartButton.className = "restart-button";
  restartButton.addEventListener("click", function () {
    state.streak = 0;

    restartGame();
  });

  lostMessageDiv.append(lostMessageP, restartButton);

  return lostMessageDiv;
}

function renderStreak() {
  let streakDiv = document.createElement("div");
  streakDiv.className = "streak";
  streakDiv.textContent = `Streak: ${state.streak}`;

  return streakDiv;
}

function render() {
  let appEl = document.querySelector("#app");
  if (appEl === null) return;
  appEl.textContent = "";

  let wordEl = renderWord();
  let mistakesSpan = renderMistakes();
  let streakEl = renderStreak();

  appEl.append(wordEl, mistakesSpan, streakEl);

  if (checkIfUserWon()) {
    let winMessageDiv = renderWinningMessage();
    appEl.append(winMessageDiv);
  }

  if (checkIfUserLost()) {
    let lostMessageDiv = renderLosingMessage();
    appEl.append(lostMessageDiv);
  }
}

function listenToUserKeypresses() {
  document.addEventListener("keyup", function (event) {
    let guess = event.key.toLowerCase();

    let letters = "abcdefghijklmnopqrstuvwxyz";

    if (!letters.includes(guess)) return;
    if (state.characters.includes(guess)) return;
    if (checkIfUserLost()) return;
    if (checkIfUserWon()) return;

    state.characters.push(guess);
    render();
  });
}

listenToUserKeypresses();
render();
