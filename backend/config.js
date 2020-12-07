/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('../config.js')

require('dotenv').config()


/**
 * For all available permissions see https://docs.looker.com/reference/embedding/sso-embed#permissions
 */
config.authenticatedUser = {
    "external_user_id": "user1",
    "first_name": "Pat",
    "last_name": "Embed",
    "session_length": 600,
    "force_logout_login": true,
    "external_group_id": "passing_an_id",
    "group_ids": [4],
    "permissions": [
      "access_data",
      "see_looks",
      "see_user_dashboards",
      "explore",
      "save_content",
      "embed_browse_spaces"
    ],
    "models": ["red_look"],
    "user_attributes": { "locale": "en_US" }
  }

module.exports = config