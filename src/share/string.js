export function camelize(str){
  return str.replace(/[\-_](.)/g, (_, c) => c.toUpperCase())
}
