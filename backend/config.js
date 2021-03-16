/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('../config.js')

require('dotenv').config()

/*
The following is two hard coded users with different permissions, which is intended to simulate how you would use identifying information
from the headers sent in EmbedSDK.init() to lookup a specific user from your database and grant their permissions / user attributes
*/
config.authenticatedUser = 
{ 
  user1: {
    //The external user ID should be a unique value from your system
    "external_user_id": "user1",
    "first_name": "Pat",
    "last_name": "Embed",
    "session_length": 3600,
    "force_logout_login": true,
    "external_group_id": "group1",
    "group_ids": [],
    //For available permissions see: https://docs.looker.com/reference/embedding/sso-embed#permissions
    "permissions": [
      "access_data",
      "see_looks",
      "see_user_dashboards",
      "explore",
      "save_content",
      "embed_browse_spaces"
    ],
    "models": ["reference_implementation"],
    "user_attributes": { "locale": "en_US" }
  },
  user2: {
    "external_user_id": "user2",
    "first_name": "Jane",
    "last_name": "Doe",
    "session_length": 3600,
    "force_logout_login": true,
    "external_group_id": "group2",
    "group_ids": [],
    "permissions": [
      "access_data",
      "see_looks",
      "see_user_dashboards"
    ],
    "models": ["reference_implementation"],
    "user_attributes": { "locale": "es_US" }
  }
}

module.exports = config