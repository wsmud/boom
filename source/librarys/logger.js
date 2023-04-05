import { appendFileSync } from 'fs';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { EOL } from 'os';

dayjs.locale('zh-cn');

function print(msg, type = 'info') {
  const color = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    debug: 'cyan',
  };

  switch (typeof msg) {
    case 'object':
      msg = JSON.stringify(msg, null, 2);
      break;
    case 'function':
      msg = msg.toString();
      break;
    default:
      break;
  }

  const logMsg = `${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${chalk[
    color[type]
  ](type)}] ${msg}`;
  appendFileSync('boom.log', logMsg + EOL);
  console.log(logMsg);
}

function success(msg) {
  print(msg, 'success');
}

function warning(msg) {
  print(msg, 'warning');
}

function error(msg) {
  print(msg, 'error');
}

function info(msg) {
  print(msg);
}

function debug(msg) {
  if (global.debugMode) {
    print(msg, 'debug');
  }
}

export default {
  success,
  warning,
  error,
  info,
  debug,
};
