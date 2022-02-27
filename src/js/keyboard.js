class Keyboard {
  constructor(rows) {
    this.buttons = [];

    const keys = [
      ["q","w","e","r","t","y","u","i","o","p"],
      ["a","s","d","f","g","h","j","k","l"],
      ["Enter","z","x","c","v","b","n","m","Del"]
    ];

    rows.forEach((row, idx) => {
      const kbRow = keys[idx];
      kbRow.forEach(key => {
        const btn = document.createElement('button');
        btn.name = key;
        btn.textContent = key;
        row.appendChild(btn);
        this.buttons.push(btn);
      });
    });
  }

  bindInput(callback) {
    this.buttons.forEach(btn => {
      const key = btn.name === 'Del' ? 'Backspace' : btn.name;
      btn.onclick = () => {
        document.body.dispatchEvent(
          new KeyboardEvent('keydown', { key: key })
        );
        btn.blur();
      };
    });
  }

  bindKbEval() {
    document.body.addEventListener('kbEval', (e) => {
      const key = e.detail.key;
      const state = e.detail.state;

      const targetButton = this.buttons.find(btn => btn.name === key);
      if (targetButton) {
        if (targetButton.dataset.state) {
          if (targetButton.dataset.state === 'correct')
            return;

          if (targetButton.dataset.state === 'present' && state === 'wrong')
            return
        }

        targetButton.dataset.state = state;
      }
    });
  }

  clear() {
    this.buttons.forEach(button => {
      delete button.dataset.state;
    });
  }
}
