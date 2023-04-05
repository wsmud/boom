export default function (data) {
  if (data.selllist) {
    const gao = data.selllist.find((good) => good.name === '<wht>铁镐</wht>');
    if (gao) {
      this.send(`buy 1 ${gao.id} from ${data.seller};wakuang`);
    }
  }
}
