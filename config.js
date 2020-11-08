/* single config.js for monorepo - could be replaced by package level config files */

/* BACKEND CONFIG */
exports.api = {
  testResponse: 'Title from /config.js'
}

var selected_user = 'standard'

users = {
  standard: {
    "external_user_id": "user1",
    "first_name": "Standard",
    "last_name": "User",
    "session_length": 3600,
    "force_logout_login": true,
    "external_group_id": "external_group_1",
    "group_ids": [],
    "permissions": [
      "access_data",
      "see_looks",
      "see_user_dashboards",
      "explore",
      "create_table_calculations",
      "save_content",
      "embed_browse_spaces"
    ],
    "models": ["reference_implementation"],
    "user_attributes": { 
      "locale": "en_US",
      "state": "California",
      "city": "Albany" 
    }
  },
  viewOnly: {
    "external_user_id": "view_only_user",
    "first_name": "ViewOnly",
    "last_name": "User",
    "session_length": 3600,
    "force_logout_login": true,
    "external_group_id": "external_group_1",
    "group_ids": [],
    "permissions": [
      "access_data",
      "see_looks",
      "see_user_dashboards",
      "embed_browse_spaces"
    ],
    "models": ["reference_implementation"],
    "user_attributes": { 
      "locale": "en_US",
      "state": "California",
      "city": "Albany" 
    }
  }
}

exports.authenticatedUser = users[selected_user]

/* FRONTEND CONFIG */
exports.PBL_HOST = 'http://localhost:3001'
exports.LOOKERSDK_BASE_URL = 'https://dat.dev.looker.com:19999'
exports.LOOKER_EMBED_HOST = 'dat.dev.looker.com'
exports.EmbedSDK_dashboard = 13
