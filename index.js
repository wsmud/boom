import Socket from './source/librarys/boom.js';
import tokens from './tokens.json' assert { type: 'json' };

tokens.forEach((token) => {
  new Socket(token);
});
