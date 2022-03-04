const cellContainer = document.querySelector('.cell-container');
const statusElement = document.querySelector('.status');
const restartButton = document.querySelector('button[name="restart"]');
const selectLanguage = document.querySelector('select#lang');

const dictionaryTemplates = document.querySelectorAll('template.dictionary');
window.dictionaries = [];

[...dictionaryTemplates].forEach(tmp => {
  const lang = tmp.dataset.lang;
  const words = tmp.innerHTML.trim().split(' ');

  window.dictionaries[lang] = words;
});

const lang = selectLanguage.value;
const dictionary = window.dictionaries[lang];

const chosenWord = dictionary[
  Math.floor(Math.random() * dictionary.length)
];

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

restart = () => {
  const lang = selectLanguage.value;
  const chosenDictionary = window.dictionaries[lang];

  const newChosenWord = chosenDictionary[
    Math.floor(Math.random() * chosenDictionary.length)
  ];

  keyboard.clear();
  game.restart(newChosenWord, chosenDictionary);
};

selectLanguage.addEventListener('change', () => {
  restart();
  selectLanguage.blur();
});

restartButton.addEventListener('click', () => {
  restart();
  restartButton.blur();
});

Pubsub.bind('restart', restart);