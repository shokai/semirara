/* global Promise */

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
      client.set(_key, _value, (err, val) => {
        if(err) return reject(err);
        resolve(val);
      }, expire || this.expire);
    });
  }

  get(key, value){
    return new Promise((resolve, reject) => {
      const _key = this.key(key);
      client.get(_key, (err, val) => {
        if(err) return reject(err);
        resolve(JSON.parse(val));
      });
    });
  }

}
