import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import getServer from './getServer.js';
import getToken from './getToken.js';

const tokens = [];

(async () => {
  const questions = [
    {
      type: 'list',
      name: 'server',
      message: '服务器？',
      choices: [
        { name: '一区', value: 0 },
        { name: '二区', value: 1 },
        { name: '三区', value: 2 },
        { name: '四区', value: 3 },
        { name: '测试服', value: 4 },
      ],
      async filter(thisAnswer) {
        return await getServer(thisAnswer);
      },
    },
    {
      type: 'input',
      name: 'account',
      message: '账号？',
      validate(thisAnswer) {
        return thisAnswer.length < 1 ? chalk.red('输账号啊！') : true;
      },
    },
    {
      type: 'password',
      name: 'password',
      mask: '*',
      message: '密码？',
      async validate(thisAnswer, answers) {
        if (thisAnswer.length < 1) {
          return chalk.red('输密码啊!');
        }

        answers.token =  await getToken(answers.account, thisAnswer);
        return !!answers.token ? true : chalk.red('密码错误！');
      },
    },
    {
      type: 'confirm',
      name: 'continue',
      message: '是否继续添加？',
    }
  ];

  let continueFlag = true;
  while (continueFlag) {
    const answers = await inquirer.prompt(questions);
    continueFlag = answers.continue;
    tokens.push({
      server: answers.server,
      token: answers.token,
    })
  }

  fs.writeFileSync('tokens.json', JSON.stringify(tokens))
})();
