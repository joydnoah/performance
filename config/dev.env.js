var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_ID: '"3ZdqWf44EjTeXtIMGxMFFxiFevzr1ewq"',
  CLIENT_DOMAIN: '"xogost.auth0.com"' ,
  AUTH0_CALLBACK_REDIRECT: '"http://localhost:8080/callback"',
  SCOPE: '"full_access"',
  AUTH0_AUDIENCE: '"https://xogost.auth0.com/userinfo"',
  JOBS_API_URL: '"http://localhost:5000/"',
  DEV_SERVER: '"http://localhost"',
  LINKEDIN_CLIENT_ID: '"86i0y19veu734y"',
  LINKEDIN_CALLBACK: '"http://127.0.0.1:8080/linkedin-callback"',
  GOOGLE_API_KEY: '"AIzaSyB7eJ9C8ZnzzBD1sEpg2hDT9KC7GBCJiOU"',
  FACEBOOK_APP_ID: '"1463837437042501"'
})
