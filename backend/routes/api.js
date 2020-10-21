var express = require('express')
var NodeAPI = require('@looker/sdk/lib/node')
var NodeSettings = require('@looker/sdk-rtl/lib/NodeSettings')
var config = require('../config') 
var createSignedUrl = require('../auth/auth_utils')
var router = express.Router()

// Init the Looker SDK using environment variables
const sdk = NodeAPI.LookerNodeSDK.init31(new NodeSettings.NodeSettings());

router.get('/current_user', async (req, res, next) => {
  const me = await sdk.ok(sdk.me('id, first_name, last_name'))
    .catch(e => console.log(e))
  res.send(me)
  });

router.get('/all_looks', async (req, res, next) => {
    const looks = await sdk.ok(sdk.all_looks('id,title,embed_url,query_id'))
      .catch(e => console.log(e))
    res.send(looks)
    });
  
router.post('/look_data', async (req, res, next) => {
  let target_look = req.body.look_id;
  let query_data = await sdk.ok(
    sdk.look(target_look, 'query'))
    .catch(e => console.log(e))
  delete query_data.client_id
  // Pass this to a query constructor and get the results from inline query
  
  // let newQuery = SDKModels.IRequestRunInlineQuery(query_data);
  // let query_results = await sdk.ok(
  //   sdk.run_inline_query(newQuery)
  // )
  //   .catch(e => console.log(e))
  //   console.log(query_results)
  res.send([1,2,3])
  });

// test endpoint
router.get('/test', (req, res, next) => res.send(config.api.testResponse))

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
