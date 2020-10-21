var express = require('express')
var NodeAPI = require('@looker/sdk/lib/node')
var NodeSettings = require('@looker/sdk-rtl/lib/NodeSettings')
var config = require('../config') 
var createSignedUrl = require('../auth/auth_utils')

var router = express.Router()


// May be a better way to do this
let sdk = null;
const authLookerAPI = async () => {
  return sdk ? sdk : NodeAPI.LookerNodeSDK.init31(new NodeSettings.NodeSettings())
};

router.get('/current_user', async (req, res, next) => {
  sdk = await authLookerAPI();
  
  const me = await sdk.ok(sdk.me('id, first_name, last_name'))
    .catch(e => console.log(e))

  res.json({ me })

  });

// test endpoint
router.get('/test', (req, res, next) => res.send(config.api.testResponse)
  )

// auth for creating an embed url
router.get('/auth', (req, res) => {
  const src = req.query.src;
  const host = process.env.LOOKERSDK_EMBED_HOST // Might need to be different than API baseurl (port nums)
  const secret = process.env.LOOKERSDK_EMBED_SECRET
  const user = config.authenticatedUser
  const url = createSignedUrl(src, user, host, secret);
  res.json({ url });
});

module.exports = router;
