class Pubsub {
  static bind(event, callback) {
    if (!window.pubSubHandler) {
      window.pubSubHandler = {};
    }

    if (!window.pubSubHandler[event]) {
      window.pubSubHandler[event] = [];
    }

    window.pubSubHandler[event].push(callback);
  }

  static dispatchEvent(event, data) {
    if (
      window.pubSubHandler &&
      Array.isArray(window.pubSubHandler[event])
    ) {
      window.pubSubHandler[event].forEach((handler) => {
        handler(data);
      });
    }
  }
}