var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_ID: '',
  CLIENT_DOMAIN: '',
  REDIRECT: '',
  SCOPE: '',
  AUDIENCE: '',
  BASE_URL: ''
})
