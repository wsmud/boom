export default function (data) {
  this.emit(data.dialog, data);
}
