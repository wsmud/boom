import json5 from 'json5';
import WebSocket from 'ws';
import Cmd from './cmd.js';

export default class Socket extends Cmd {
  constructor(config) {
    super();
    this.socket;
    this.userConfig = config;

    try {
      this.socket = new WebSocket(this.userConfig.server);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
    } catch ({ message }) {
      this.emit('ERROR', message);
    }
  }

  onOpen() {
    this.emit('OPEN');
    this.socket.send(this.userConfig.token);
  }

  onClose() {
    this.emit('CLOSE');
  }

  onError({ message }) {
    this.emit('ERROR', message);
  }

  onMessage({ data }) {
    if (typeof data !== 'string') {
      return;
    }

    if (/^{.+}$/.test(data)) {
      const gameData = json5.parse(data);
      this.emit(gameData.type, gameData);
    } else {
      this.emit('tip', data);
    }
  }

  socketClose() {
    this.socket.close();
  }
}
