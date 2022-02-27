const container = document.querySelector('.container');
const statusElement = document.querySelector('.status');
const selectLangElement = document.querySelector('select#lang');

status.textContent = selectLangElement.value;
selectLangElement.onchange = () => {
  status.textContent = selectLangElement.value;
};

const chosenWord = window.idWords[Math.floor(Math.random() * window.idWords.length)];

const game = window.game = new Game({
  body: document.body,
  container: container,
  statusElement: statusElement,
  selectLangElement: selectLangElement,
  dictionary: window.idWords,
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
