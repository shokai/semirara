export function buildPath({wiki, title}){
  return `/${wiki}/${title}`;
}

export function parseRoute(path){
  if(!path) path = location.pathname+location.search;
  let route = {};
  const m = decodeURIComponent(path).match(/^\/([^\/]+)\/(.+)/);
  if(m){
    if(validateWiki(m[1]).valid) route.wiki = m[1];
    if(validateTitle(m[2]).valid) route.title = m[2];
  }
  return route;
}

class ValidationResult{
  constructor(errors = []){
    this.errors = [];
  }
  get valid(){
    return this.errors.length < 1;
  }
  get invalid(){
    return !this.valid;
  }
}

const blacklist = ["auth", "login", "logout", "config", "api"];

// common rules for wiki & title
export function validateName(name){
  const result = new ValidationResult();

  if(typeof name !== "string"){
    result.errors.push("name must be a String");
    return result;
  }

  if(name.length < 1){
    result.errors.push("name is empty");
  }

  if(name.length > 64){
    result.errors.push("name is too long");
  }

  for(let s of blacklist){
    if(name.toLowerCase() === s){
      result.errors.push(`"${name}" is reserved for system`);
    }
  }

  if(name.trim() !== name){
    result.errors.push("name cannot have space at head or tail.");
  }

  for(let c of "#\n\r"){
    if(name.indexOf(c) > -1){
      result.errors.push(`name cannot contain "${c}"`);
    }
  }

  try{
    if(decodeURIComponent(name) !== name){
      result.errors.push("name cannot contain URI encoded char");
    }
  }
  catch(err){
    result.errors.push(err.message);
  }

  return result;
}

// validate page name
export function validateTitle(name){
  const result = validateName(name);
  if(!result.valid) return result;

  return result;
}

// validate wiki name
export function validateWiki(name){
  const result = validateName(name);
  if(!result.valid) return result;

  if(/^\//.test(name)){
    result.errors.push(`wiki cannot start with "/"`);
  }

  for(let c of "/:"){
    if(name.indexOf(c) > -1){
      result.errors.push(`wiki cannot contain "${c}"`);
    }
  }

  return result;
}

export function validateRoute({wiki, title}){
  const result = validateWiki(wiki);
  result.errors.push(...validateTitle(title).errors);
  return result;
}
