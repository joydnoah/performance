var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_ID: '"' + process.env.CLIENT_ID + '"',
  CLIENT_DOMAIN: '"' + process.env.CLIENT_DOMAIN + '"' ,
  AUTH0_CALLBACK_REDIRECT: '"' + process.env.AUTH0_CALLBACK_REDIRECT + '"',
  SCOPE: '"full_access"',
  AUTH0_AUDIENCE: '"' + process.env.AUTH0_AUDIENCE + '"',
  JOBS_API_URL: '"' + process.env.JOBS_API_URL + '"'
})
