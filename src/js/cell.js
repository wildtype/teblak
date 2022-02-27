class Cell {
  constructor(options) {
    this.container = options.container;

    this.content = null;
    this.state = 'blank';

    this.element = document.createElement('div');
    this.element.className = 'cell';

    this.rendered = false;
  }

  render() {
    if (this.content) {
      this.element.textContent = this.content;
    } else {
      this.element.innerHTML = '&nbsp;';
    }
    this.element.dataset.state = this.state;

    if (!this.rendered) {
      this.container.appendChild(this.element);
      this.rendered = true;
    }
  }
}
