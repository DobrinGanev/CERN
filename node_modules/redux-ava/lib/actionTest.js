'use strict'

module.exports = (actionCreator, data, type, description) => t => {
  t.deepEqual(actionCreator(data), type, description)
}
