import fs from 'fs';
import path from 'path';
import Socket from './socket.js';
import logger from './logger.js';

export default class Boom extends Socket {
  constructor(config) {
    super(config);
    this.logger = logger;
    this.events = new Map();
    this.init();
  }

  async init() {
    const events = fs.readdirSync(new URL('../events', import.meta.url));
    for (const eventName of events) {
      const eventFn = await import(`../events/${eventName}`);
      this.events.set(path.basename(eventName, '.js'), eventFn.default);
    }

    this.events.forEach((fn, name) => {
      this.on(name, fn);
    });
  }

  reInit() {
    this.events.forEach((fn, name) => {
      this.off(name, fn);
    });
    this.events.clear();
    this.init();
  }
}
