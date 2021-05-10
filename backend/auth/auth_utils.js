/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/*
 * This exports a utility function for generating signed URLs for embedding
 * https://docs.looker.com/reference/embedding/sso-embed#building_the_embed_url 
 *
 * It is used by the /auth endpoint
 */

var createHmac = require('create-hmac')

function stringify (params) {
  const result = []
  for (const key in params) {
    const param = params[key]
    if (typeof param === 'string') {
      result.push(`${key}=${encodeURIComponent(param)}`)
    }
  }
  return result.join('&')
}

function forceUnicodeEncoding (val) {
  return decodeURIComponent(encodeURIComponent(val))
}

function signEmbedUrl (data, secret) {
  const stringsToSign = [
    data.host,
    data.embed_path,
    data.nonce,
    data.time,

    data.session_length,
    data.external_user_id,
    data.permissions,
    data.models
  ]
  if (data.group_ids) stringsToSign.push(data.group_ids)
  if (data.external_group_id) stringsToSign.push(data.external_group_id)
  if (data.user_attributes) stringsToSign.push(data.user_attributes)
  stringsToSign.push(data.access_filters)

  const stringToSign = stringsToSign.join('\n')
  return createHmac('sha1', secret).update(forceUnicodeEncoding(stringToSign)).digest('base64').trim()
}

function createNonce (len) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''

  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

function createSignedUrl (
  src,
  user,
  host,
  secret,
  nonce) {
  const jsonTime = JSON.stringify(Math.floor((new Date()).getTime() / 1000))
  const jsonNonce = JSON.stringify(nonce || createNonce(16))
  const params = {
    external_user_id: JSON.stringify(user.external_user_id),
    first_name: JSON.stringify(user.first_name),
    last_name: JSON.stringify(user.last_name),
    session_length: JSON.stringify(user.session_length),
    force_logout_login: JSON.stringify(user.force_logout_login),
    permissions: JSON.stringify(user.permissions),
    models: JSON.stringify(user.models),
    group_ids: JSON.stringify(user.group_ids),
    external_group_id: JSON.stringify(user.external_group_id),
    user_attributes: JSON.stringify(user.user_attributes),
    access_filters: JSON.stringify(user.access_filters || {}),
    user_timezone: JSON.stringify(user.user_timezone),
    nonce: jsonNonce,
    time: jsonTime
  }

  const embedPath = '/login/embed/' + encodeURIComponent(src)

  const signingParams = {
    host,
    embed_path: embedPath,
    nonce: jsonNonce,
    time: jsonTime,
    session_length: params.session_length,
    external_user_id: params.external_user_id,
    permissions: params.permissions,
    models: params.models,
    group_ids: params.group_ids,
    external_group_id: params.external_group_id,
    user_attributes: params.user_attributes,
    access_filters: params.access_filters
  }

  const signature = signEmbedUrl(signingParams, secret)

  Object.assign(params, { signature })
  return `https://${host}${embedPath}?${stringify(params)}`
}

module.exports = createSignedUrl