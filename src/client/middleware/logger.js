const debug = require("../../share/debug")(__filename)

export default store => next => action => {
  debug(`TYPE "${action.type}"`, "VALUE", action.value)
  const result = next(action)
  debug("STATE", store.getState())
  return result
}
