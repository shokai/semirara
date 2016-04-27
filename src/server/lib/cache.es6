const debug = require("debug")("semirara:lib:cache");

import memjs from "memjs";

const client = memjs.Client.create();

export default class Cache{

  constructor({prefix, expire}){
    this.prefix = prefix || "";
    this.expire = expire || 60;
  }

  key(key){
    return this.prefix + ":" + key;
  }

  set(key, value, expire){
    return new Promise((resolve, reject) => {
      const _key = this.key(key);
      const _value = JSON.stringify(value);
      debug(`set ${_key}`);
      client.set(_key, _value, (err, val) => {
        if(err) return reject(err);
        resolve(val);
      }, expire || this.expire);
    });
  }

  get(key){
    return new Promise((resolve, reject) => {
      const _key = this.key(key);
      debug(`get ${_key}`);
      client.get(_key, (err, val) => {
        if(err) return reject(err);
        debug(`hit ${_key}`);
        resolve(JSON.parse(val));
      });
    });
  }

}
