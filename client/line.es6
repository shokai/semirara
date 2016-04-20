export default class Line{
  constructor(opts){
    this.value = "";
    this.indent = 0;
    Object.assign(this, opts);
  }
}
