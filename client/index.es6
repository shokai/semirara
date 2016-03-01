const debug = require("debug")("semirara");

import events from "events";

debug("hello");

class Foo extends events.EventEmitter{
}

const foo = new Foo();

foo.on("bar", (val) => {
  debug(`bar: ${val}`)
});

foo.emit("bar", "fooooooo");
