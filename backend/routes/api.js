import express from 'express'

import config from '../config' 
import { createSignedUrl } from 'auth/auth_utils'

let router = express.router
// test endpoint
router.get('/test', (req, res, next) => res.send(config.api.testResponse))
 
app.get('/auth', function(req, res) {
  // Authenticate the request is from a valid user here
  const src = req.query.src;
  const host = 'https://looker.example.com'
  const secret = YOUR_EMBED_SECRET
  const user = authenticatedUser
  const url = createSignedUrl(src, user, host, secret);
  res.json({ url });
});

module.exports = router;
