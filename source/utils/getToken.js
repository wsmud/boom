import axios from 'axios';
import { stringify } from 'qs';

export default async function getToken(account, password) {
  const res = await axios.post(
    'http://www.wamud.com/UserApi/Login',
    stringify({ code: account, pwd: password }),
  );

  if (res.status !== 200 || res.data.code !== 1 || !res.headers['set-cookie']) {
    return null;
  }

  const token = res.headers['set-cookie'].map((cookie) => cookie.match(/^(u|p)=(.+?);/)[2]);
  return token.join(' ');
};
