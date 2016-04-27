import shortid from "shortid";
import hasDom from "has-dom";

export default class Line{
  constructor(opts){
    this.value = "";
    this.indent = 0;
    this.user = hasDom() && window.user ? window.user.id : null;
    this.id = shortid.generate();
    Object.assign(this, opts);
  }
}
