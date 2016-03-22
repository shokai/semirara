const debug = require("debug")("semirara:socket:pageroom");

export default class PageRoom{
  constructor(socket){
    this.socket = socket;
    this.page = null;
    socket.once("disconnect", () => {
      this.leave();
      this.socket = null;
    });
  }

  get name(){
    return `${this.page.wiki}::${this.page.title}`;
  }

  // leave current room, then join new room.
  join(page){
    if(!page &&
       page.title === this.page.title &&
       page.wiki === this.page.wiki) return;
    this.leave();
    this.page = page;
    this.socket.join(this.name);
    debug(`${this.socket.id} joins room ${this.name}`);
  }

  leave(){
    if(!this.page) return;
    debug(`${this.socket.id} leaves room ${this.name}`);
    this.socket.leave(this.name);
    this.page = null;
  }
}
