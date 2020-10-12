/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('../config.js')

// appends to config setting for demo purposes
config.api.testResponse += ', via /backend/config.js'

module.exports = config