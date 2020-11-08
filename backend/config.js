/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('../config.js')

require('dotenv').config()

module.exports = config