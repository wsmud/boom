export default function (data) {
  if (data.name === '<hiw>木头人</hiw>') {
    this.send(`kill ${data.id}`);
  }
}
