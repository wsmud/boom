import axios from 'axios';

export default async function getServer(serverNum) {
  const res = await axios.get('http://www.wamud.com/Game/GetServer');

  if (res.status !== 200 || !Array.isArray(res.data) || res.data.length < serverNum) {
    return null;
  }

  const serverIndo = res.data[serverNum];
  return `ws://${serverIndo.IP}:${serverIndo.Port}`;
};
