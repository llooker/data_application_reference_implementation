var express = require('express')

var config = require('../config') 
var createSignedUrl = require('../auth/auth_utils')

var router = express.Router()

// test endpoint
router.get('/test', (req, res, next) => res.send(config.api.testResponse))

// auth for creating an embed url
router.get('/auth', (req, res) => {
  const src = req.query.src;
  const host = process.env.LOOKERSDK_BASE_URL
  const secret = process.env.LOOKERSDK_EMBED_SECRET
  const user = config.authenticatedUser
  const url = createSignedUrl(src, user, host, secret);
  res.json({ url });
});

module.exports = router;
