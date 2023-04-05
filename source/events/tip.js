import Boom from '../librarys/boom.js';

export default function (data) {
  if (data.includes('说：')) {
    return;
  }

  if (data.includes('接下来我来告诉你一些这个世界的基本知识')) {
    this.logger.info(`角色创建成功：${this.name}`);
    this.send(`guid ${this.tasker}`);
  }

  if (data.includes('站着听课也累了，坐下来试试')) {
    this.send('zuo');
  }

  if (data.includes('有时候房间里有些隐藏物品可以操作')) {
    this.send('zuo2 yizi');
  }

  if (data.includes('来东面的训练室找我')) {
    this.send('go east');
  }

  if (data.includes('这本书上的内容对你来说太浅了')) {
    this.send(`next ${this.tasker}`);
  }

  if (data.includes('带点战利品回来')) {
    this.send('setting auto_get 1');
    this.send('go south');
  }

  if (data.includes('你身上的伤还没好呢')) {
    this.send('liaoshang');
  }

  if (data.includes('脸色看起来好了很多')) {
    this.send(`next ${this.tasker}`);
  }

  if (data.includes('接下来你就可以去闯荡江湖了')) {
    this.send(`ask6 ${this.tasker}`);
  }

  if (data.includes('你挥着铁镐开始认真挖矿')) {
    this.logger.info(`角色创建完成：${this.name}`);
    this.socketClose();
    new Boom(this.userConfig);
  }
}
