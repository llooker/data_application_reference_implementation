var express = require('express')
var config = require('../config') 
var router = express.Router()
var NodeAPI = require('@looker/sdk/lib/node')
var NodeSettings = require('@looker/sdk-rtl/lib/NodeSettings')
var createSignedUrl = require('../auth/auth_utils')


/*****************************************
 * Authentication                        *
 *****************************************/ 


/**
 * Create an API auth token based on the provided embed user credentials
 */ 
router.get('/embed-user/token', async (req, res) => {
  const userCred = await sdk.ok(sdk.user_for_credential('embed', req.query.id));
  const embed_user_token = await sdk.login_user(userCred.id.toString())
  const u = {
    user_token: embed_user_token.value,
    token_last_refreshed: Date.now()
  }
  res.json({ ...u });
});

/**
 * Update the embed users permissions
 */
router.post('/embed-user/:id/update', async (req, res) => {
  const userCred = await sdk.ok(sdk.user_for_credential('embed', req.params.id));
  const attrs = {
    value: "Jeans",
  }
  await sdk.set_user_attribute_user_value(userCred.id, 23, attrs)
  res.json({ status: 'updated' });
});


/**
 * Create a signed URL for embedding content
 */
router.get('/auth', (req, res) => {
  console.log(req.headers.usertoken);
  const src = req.query.src;
  const host = process.env.LOOKERSDK_EMBED_HOST // Might need to be different than API baseurl (port nums)
  const secret = process.env.LOOKERSDK_EMBED_SECRET
  const user = config.authenticatedUser[req.headers.usertoken]
  const url = createSignedUrl(src, user, host, secret);
  res.json({ url });
});


/****************************************
 * Backend Data API calls               *
 ****************************************/

// Init the Looker SDK using environment variables
// const sdk = NodeAPI.LookerNodeSDK.init40(new NodeSettings.NodeSettings());
const sdk = NodeAPI.LookerNodeSDK.init40();

/**
 * Get details of the current authenticated user
 */
router.get('/me', async (req, res, next) => {
  const me = await sdk.ok(sdk.me())
    .catch(e => console.log(e))
  res.send(me)
  });

/**
 * Get a list of all looks the authenticated user can access
 */
router.get('/looks', async (req, res, next) => {
    const looks = await sdk.ok(sdk.all_looks('id,title,embed_url,query_id'))
      .catch(e => console.log(e))
    res.send(looks)
    });
  
/**
 * Run the query associated with a look, and return that data as a json response
 */
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

module.exports = router;
