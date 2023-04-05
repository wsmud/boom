export default function (data) {
  if (!data.start) {
    this.send('go north');
    this.send(`next ${this.tasker}`);
  }
}
