class Game {
  constructor(options) {
    this.body = options.body;
    this.container = options.container;
    this.statusElement = options.statusElement;
    this.selectLangElement = options.selectLangElement;
    this.dictionary = options.dictionary;
    this.word = options.word;
    this.guesses = [];
    this.pointer = 0;
    this.finished = false;
  }

  init() {
    this.guesses = [...Array(6)].map(() => {
      const guess = new Guess({ container: this.container  });
      guess.render();
      return guess;
    });
  }

  bindInput() {
    this.body.addEventListener('keydown', (key) => {
      const letter = key.key === 'Backspace' ? 'delete' : key.key.toLowerCase();
      this.input(letter);
    });
  }

  input(key) {
    if (this.finished) {
      return;
    }

    if (key === 'delete') {
      this.guesses[this.pointer].del();
    } else if (key === 'enter') {
      const result = this.guesses[this.pointer].evaluate(this.word, this.dictionary);
      this.evaluate(result);
    } else if (key.match(/^[a-zA-Z]$/)) {
      this.guesses[this.pointer].put(key);
    }
  }

  evaluate(result) {
    if (result === Guess.INVALID)
      return;

    if (result === Guess.CORRECT) {
      this.finished = true;
      return;
    }

    if (this.pointer == 5) {
      this.finished = true
      this.statusElement.textContent = this.word;
      return;
    }

    this.pointer += 1;
  }
}
