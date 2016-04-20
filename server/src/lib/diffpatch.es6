import * as JSONDiffPatch from "jsondiffpatch";
import md5 from "md5";

export const diffpatch = JSONDiffPatch.create({
  // https://github.com/benjamine/jsondiffpatch/blob/master/docs/arrays.md
  objectHash: (obj, index) => {
    if(typeof obj === "object") return md5(obj.value + obj.indent);
    return md5(obj);
  }
});
