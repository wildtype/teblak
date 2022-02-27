class Guess {
  static INVALID = 0;
  static INCORRECT = 1;
  static CORRECT = 2;

  constructor(options) {
    this.container = options.container;
    this.game = options.game;
    this.pointer = 0;

    this.element = document.createElement('div');
    this.element.className = 'guess';
    this.word = '';

    this.cells = [...Array(5)].map(
      () => new Cell({ container: this.element })
    );
  }

  isPuttable() {
    if (this.cells[this.pointer].content && this.pointer === 4) {
      return false;
    }

    return true;
  }

  put(letter) {
    if (!this.isPuttable())
      return;

    if (this.pointer <= 4) {
      this.word += letter;
      this.cells[this.pointer].content = letter;
      this.cells[this.pointer].state = 'filled';
      this.cells[this.pointer].render();

      if (this.pointer < 4) {
        this.pointer += 1;
      }
    }

    return this.pointer;
  }

  isDeletable() {
    if (!this.cells[this.pointer].content && this.pointer === 0) {
      return false;
    }

    return true;
  }

  del() {
    if (!this.isDeletable())
      return;

    if (this.cells[this.pointer].content === null) {
      this.pointer -= 1;
    }

    if (this.pointer >= 0) {
      this.word = this.word.slice(0, -1);
      this.cells[this.pointer].content = null;
      this.cells[this.pointer].state = 'blank';
      this.cells[this.pointer].render();
    }

    return this.pointer;
  }

  evaluate(correctWord, dictionary) {
    if (this.pointer !== 4 || !this.cells[4].content) {
      return Guess.INVALID;
    }

    if (dictionary.indexOf(this.word) === -1) {
      return Guess.INVALID;
    }

    if (this.word === correctWord) {
      this.cells.forEach(cell => {
        cell.state = 'correct';
        cell.render();
      });

      return Guess.CORRECT;
    } else {
      this.cells.forEach((cell, index) => {
        if (cell.content === correctWord[index]) {
          cell.state = 'correct';
        } else if (correctWord.indexOf(cell.content) > -1) {
          cell.state = 'present';
        } else {
          cell.state = 'wrong';
        }

        cell.render();
        document.body.dispatchEvent(
          new CustomEvent('kbEval', {
            detail: { key: cell.content, state: cell.state }
          })
        );
      });

      return Guess.INCORRECT;
    }
  }

  clear() {
    this.word = '';
    this.pointer = 0;
    this.cells.forEach(cell => {
      cell.content = null;
      cell.state = 'blank';
      cell.render();
    });
  }


  render(beforeElement) {
    this.container.insertBefore(this.element, beforeElement);
    this.cells.forEach((cell) => {
      cell.render();
    });
  }
}
