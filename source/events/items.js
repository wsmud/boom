export default function (data) {
  const tasker = data.items.find(
    (item) => item.name === '<hig>新手导师</hig> <hic>指引者</hic>'
  );
  const tieJiang = data.items.find((item) => item.name === '铁匠铺老板 铁匠');

  if (tasker) {
    this.tasker = tasker.id;
  }

  if (tieJiang) {
    this.send(`list ${tieJiang.id}`);
  }
}
