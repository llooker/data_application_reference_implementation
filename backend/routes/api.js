var express = require('express')
var config = require('../config') 
var router = express.Router()

var NodeAPI = require('@looker/sdk/lib/node')
var NodeSettings = require('@looker/sdk-rtl/lib/NodeSettings')

var createSignedUrl = require('../auth/auth_utils')


// Init the Looker SDK using environment variables
const sdk = NodeAPI.LookerNodeSDK.init40(new NodeSettings.NodeSettings());

router.get('/me', async (req, res, next) => {
  const me = await sdk.ok(sdk.me())
    .catch(e => console.log(e))
  res.send(me)
  });

router.get('/looks', async (req, res, next) => {
    const looks = await sdk.ok(sdk.all_looks('id,title,embed_url,query_id'))
      .catch(e => console.log(e))
    res.send(looks)
    });
  
router.get('/looks/:id', async (req, res, next) => {
  let target_look = req.params.id;
  let query_data = await sdk.ok(sdk.look(target_look, 'query'))
    .catch(e => console.log(e))
    delete query_data.query.client_id

  let newQuery = await sdk.ok(sdk.create_query(query_data.query))
    .catch(e => console.log(e))

  let newQueryResults = await sdk.ok(sdk.run_query({query_id: Number(newQuery.id), result_format: "json"}))
    .catch(e => {
      console.log(e);
      res.send({error: e.message});
    })
  res.send(newQueryResults)
  });

// test endpoint
router.get('/test', (req, res, next) => res.send(config.api.testResponse))

//
// /api/token - looker user token
// /api/embed-user/token - get the embed user bearer toekn
// /api/auth - get signed emebed url

// auth for creating an api auth token
router.get('/token', async (req, res) => {
  const userCred = await sdk.ok(sdk.user_for_credential('embed', req.query.id));
  const embed_user_token = await sdk.login_user(userCred.id.toString())
  const u = {
    user_token: embed_user_token.value,
    token_last_refreshed: Date.now()
  }
  res.json({ ...u });
});

// update the embed users permissions
router.post('/embed-user/update', async (req, res) => {
  const userCred = await sdk.ok(sdk.user_for_credential('embed', req.query.id));
  const embed_user_token = await sdk.login_user(userCred.id.toString())
  const u = {
    api_user_token: embed_user_token.value,
    api_token_last_refreshed: Date.now()
  }
  res.json({ user: u });
});

// auth for creating an embed url
router.get('/auth', (req, res) => {
  const src = req.query.src;
  const host = process.env.LOOKERSDK_EMBED_HOST
  const secret = process.env.LOOKERSDK_EMBED_SECRET
  const user = config.authenticatedUser
  const url = createSignedUrl(src, user, host, secret);
  res.json({ url });
});


module.exports = router;
