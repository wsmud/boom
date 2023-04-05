import Boom from '../librarys/boom.js';

export default function () {
  this.logger.info(`角色创建失败：${this.name}`);
  this.socketClose();
  new Boom(this.userConfig);
}
