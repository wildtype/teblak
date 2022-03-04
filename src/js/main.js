const cellContainer = document.querySelector('.cell-container');
const statusElement = document.querySelector('.status');
const restartButton = document.querySelector('button[name="restart"]');
const selectLanguage = document.querySelector('select#lang');
const customGameNum = document.querySelector('input[name="customGameNum"]');
const customGameButton = document.querySelector('button[name="goCustomGame"]');
const teblakNumber = document.querySelector('span[name="teblakNumber"]');

const dictionaryTemplates = document.querySelectorAll('template.dictionary');
window.dictionaries = [];

[...dictionaryTemplates].forEach(tmp => {
  const lang = tmp.dataset.lang;
  const words = tmp.innerHTML.trim().split(' ');

  window.dictionaries[lang] = words;
});

const lang = selectLanguage.value;
const dictionary = window.dictionaries[lang];

const wordNum = Math.floor(Math.random() * dictionary.length);
const chosenWord = dictionary[wordNum];

const game = window.game = new Game({
  body: document.body,
  container: cellContainer,
  statusElement: statusElement,
  dictionary: dictionary,
  word: chosenWord
});

const keyboard = new Keyboard([
  document.querySelector('.kb-row-1'),
  document.querySelector('.kb-row-2'),
  document.querySelector('.kb-row-3')
]);

keyboard.bindInput(game.input);
keyboard.bindKbEval();

game.init();
game.bindInput();

window.addEventListener('load', () => {
  showWordNum(wordNum);
});

showWordNum = (wordNum) => {
  teblakNumber.textContent = wordNum;
};

newGame = (wordNum) => {
  const lang = selectLanguage.value;
  const chosenDictionary = window.dictionaries[lang];

  const newChosenWord = chosenDictionary[wordNum];

  keyboard.clear();
  game.restart(newChosenWord, chosenDictionary);
  showWordNum(wordNum);
};

restart = () => {
  newGame(Math.floor(Math.random() * dictionary.length));
};

customGame = (wordNum) => {
  newGame(wordNum);
}

selectLanguage.addEventListener('change', () => {
  restart();
  selectLanguage.blur();
});

restartButton.addEventListener('click', () => {
  restart();
  restartButton.blur();
});

Pubsub.bind('restart', restart);
customGameButton.addEventListener('click', () => {
  customGame(customGameNum.value);
});
