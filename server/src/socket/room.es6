// socket.io room
// each socket has one room - leave cunrrent room when join to other room, or disconnected.

const debug = require("debug")("semirara:socket:room");

export default class Room{
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
