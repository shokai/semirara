import * as JSONDiffPatch from "jsondiffpatch";
import md5 from "md5"

export const diffpatch = JSONDiffPatch.create({
  // https://github.com/benjamine/jsondiffpatch/blob/master/docs/arrays.md
  objectHash: (obj, index) => {
    return md5(obj);
  }
});

export function clone(obj){
  if(obj instanceof Array) return obj.concat();
  return Object.assign({}, obj);
}
