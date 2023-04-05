export default function (data) {
  if (data.can_study) {
    this.send(`study ${data.id}`);
  }

  if (data.can_open) {
    this.send('jh fam 0 start;go east;go east;go south');
  }
}
