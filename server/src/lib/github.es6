const debug = require("debug")("semirara:lib:github");

import axios from "axios";

export default class GitHub{

  constructor(token){
    this.token = token;
    this.baseUrl = "https://api.github.com"
  }

  async get(path, params = {}){
    debug("get " + path);
    try{
      params.access_token = this.token;
      const url = this.baseUrl + path;
      const res = await axios.get(url, {params: params});
      debug(res);
      return res.data;
    }
    catch(err){
      console.error(err);
      throw err;
    }
  }

  getUser(){
    return this.get("/user");
  }
}
