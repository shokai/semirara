export default class Line{
  constructor(opts){
    this.value = "";
    this.indent = 0;
    this.user = window.user.id;
    Object.assign(this, opts);
  }
}
