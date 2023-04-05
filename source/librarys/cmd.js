import { EventEmitter } from 'events';

export default class Cmd extends EventEmitter {
  #commandList = [];

  constructor() {
    super();
    this.socket;
  }

  send(commandString, wait = true) {
    if (typeof commandString !== 'string') {
      return;
    }

    if (!wait) {
      commandString.split(';').forEach((cmd) => this.socket.send(cmd));
      return;
    }

    this.#commandList = [...this.#commandList, ...commandString.split(';')];
    this.#commandQueue();
  }

  commandClear() {
    this.#commandList = [];
  }

  hasCommand() {
    return !!this.#commandList.length;
  }

  #commandQueue() {
    const nowTime = new Date().getTime();
    if (!this.hasCommand()) {
      return;
    }

    if (nowTime - this.lastCommandTime < 5e2 || this.socket.readyState !== 1) {
      setTimeout(() => this.#commandQueue(), 1e2);
      return;
    }

    this.socket.send(this.#commandList.shift());
    this.lastCommandTime = nowTime;

    if (this.hasCommand()) {
      setTimeout(() => this.#commandQueue(), 1e2);
    }
  }
}
