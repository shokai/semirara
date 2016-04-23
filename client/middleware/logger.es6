const debug = require("debug")("semirara:middleware:logger");

export default store => next => action => {
  debug(`TYPE "${action.type}"`, "VALUE", action.value);
  const result = next(action);
  debug("STATE", store.getState());
  return result;
};
