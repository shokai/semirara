// separate socket.io room by Wiki

const debug = require("debug")("semirara:socket:wikiroom");

export default class WikiRoom{
  constructor(socket){
    this.socket = socket;
    this.name = null;
    socket.once("disconnect", () => {
      this.leave();
      this.socket = null;
    });
  }

  // leave current room, then join new room.
  join(name){
    if(this.name === name) return;
    this.leave();
    this.name = name;
    this.socket.join(this.name);
    debug(`${this.socket.id} joins room ${this.name}`);
  }

  leave(){
    if(!this.name) return;
    debug(`${this.socket.id} leaves room ${this.name}`);
    this.socket.leave(this.name);
    this.page = null;
  }
}
