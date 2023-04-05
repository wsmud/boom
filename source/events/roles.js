import getName from '../utils/name.js';

export default function (data) {
  if (data.roles.length >= 10) {
    this.socketClose();
  } else {
    this.name = getName();
    this.logger.info(`开始尝试创建角色：${this.name}`);
    this.send(`createrole ${this.name} 2 20 15 15 30`);
  }
}
