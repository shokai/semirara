/* global Promise */

const debug = require("debug")("semirara:lib:cache");

import memjs from "memjs";

const client = memjs.Client.create();

export default class Cache{

  constructor(opts){
    this.prefix = opts.prefix || "";
    this.expire = opts.expire || 60;
  }

  key(key){
    return this.prefix + ":" + key;
  }

  set(key, value, expire){
    return new Promise((resolve, reject) => {
      const _key = this.key(key);
      const _value = JSON.stringify(value);
      debug(`set ${_key}=${_value}`);
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
        resolve(JSON.parse(val));
      });
    });
  }

}
