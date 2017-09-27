<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Redes Sociales</h3></div>
      <div class="panel-body">
        <legend>Conexión con redes sociales</legend>
        <h4>Facebook</h4>
        <div v-if="facebook_status !== 'connected'">
          <fb-signin-button id="facebook-button"
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Facebook
          </fb-signin-button>

          <table class="table table-striped">
            <caption>
              Listado de paginas relacionadas con la cuenta actual
            </caption>
            <thead>
              <tr>
                <th>Página</th>
                <th>Categoría</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pages">
                <td>{{ item.name }}</td>
                <td>{{ item.category }}</td>
                <td><button class="btn btn-warning" @click="set_token(item.access_token, item.id)">Vincular Página</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="facebook_status === 'connected'">
          <div id="facebook-connected" class="alert alert-info">
            <strong>Cuenta Conectada!</strong> <button class="btn btn-default" @click="disconnect('facebook')">Desconectar</button>
          </div>
        </div>
        <br/>
        <h4>Iniciar Sesión Twitter</h4>
        <div v-if="twitter_status !== 'connected'">
          <button class="btn btn-info" @click='post_twitter'>Login Twitter</button>
        </div>
        <div v-if="twitter_status === 'connected'">
          <div id="twitter-connected" class="alert alert-info">
            <strong>Cuenta Conectada!</strong> <button class="btn btn-default" @click="disconnect('twitter')">Desconectar</button>
          </div>
        </div>
        <br/>
        <h4>LinkedIn</h4>
        <div v-if="linkedin_status !== 'connected'">
          <button @click="send_linkedin" class="btn btn-primary">Iniciar Sesión LinkedIn</button>
        </div>
        <div v-if="linkedin_status === 'connected'">
          <div id="linkedin-connected" class="alert alert-info">
            <strong>Cuenta Conectada!</strong> <button class="btn btn-default" @click="disconnect('linkedin')">Desconectar</button>
          </div>
        </div>
        <div v-if="social_network_connections.length > 0">
          <legend>Contenido del post</legend>
          <div class="form">
            <div class="form-group">
              <label>Texto</label>
              <textarea v-model="text_post" class="form-control" rows="10"></textarea>
            </div>
          </div>
          <div style="display: none;" id="success-post" class="alert alert-info">La publicación se ha realizado correctamente!</div>
          <button @click="publish('facebook')" class="btn btn-primary">Publicar en Facebook</button>
          <button @click="publish('twitter')" class="btn btn-primary">Publicar en Twitter</button>
          <button @click="publish('linkedin')" class="btn btn-primary">Publicar en Linkedin</button>
          <legend></legend>
        </div>
        <a href="/positions" class="btn btn-danger">Salir</a>
      </div>
    </div>
  </div>
</template>
<script>
  import AppNav from './AppNav'
  import FBSignInButton from 'vue-facebook-signin-button'
  import { getAccessToken, getIdToken } from '../../utils/auth'
  
  export default {
    components: {
      AppNav,
      FBSignInButton
    },
    data: function () {
      return {
        script_html: '',
        facebook_plugin: null,
        fbSignInParams: {
          scope: 'email, public_profile, manage_pages, publish_actions, publish_pages',
          return_scopes: true
        },
        facebook_auth_response: {},
        pages: [],
        social_network_connections: [],
        text_post: '',
        twitter_status: 'not_connected',
        facebook_status: 'not_connected',
        linkedin_status: 'not_connected'
      }
    },
    methods: {
      onSignInSuccess (response) {
        window.FB.api('/me/accounts', dude => {
          this.pages = dude.data
        })
      },
      onSignInError (error) {
        console.log('La cuenta no ha sido autorizada!', error)
      },
      set_token (token, id) {
        this.facebook_auth_response.access_token = token
        this.facebook_auth_response.id = id

        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/social-network-connection/' + window.localStorage['company_id'], {
          'access_token': this.facebook_auth_response.access_token,
          'page_id': this.facebook_auth_response.id,
          'provider': 'facebook',
          'access_token_secret': '0',
          'oauth_token': '0',
          'oauth_verifier': '0'
        })
        .then(response => {
          this.get_connections()
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      publish (provider) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/social-network/' + provider + '/company/' + window.localStorage['company_id'] + '/publish', {
          'text_post': this.text_post
        })
        .then(response => {
          document.getElementById('success-post').style.display = 'block'
          setTimeout(function () {
            document.getElementById('success-post').style.display = 'none'
          }, 2500)
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      disconnect (provider) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.delete('/social-network/' + provider + '/company/' + window.localStorage['company_id'] + '/connection', {
        })
        .then(response => {
          window.location.reload()
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      get_connections () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/social-network-connection/' + localStorage['company_id'])
        .then(response => {
          this.social_network_connections = response.data.data.social_network_connections
          for (var index in this.social_network_connections) {
            if (this.social_network_connections[index].provider === 'facebook') {
              this.facebook_status = 'connected'
            } else if (this.social_network_connections[index].provider === 'twitter') {
              this.twitter_status = 'connected'
            } else if (this.social_network_connections[index].provider === 'linkedin') {
              this.linkedin_status = 'connected'
            }
          }
        })
        .catch(error => { console.log(error.response) })
      },
      post_twitter () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/social-network/twitter/company/' + localStorage['company_id'] + '/connection')
        .then(response => {
          window.localStorage.setItem('twitter_request_token', JSON.stringify(response.data.data.request_token))
          window.location.href = response.data.data.url
        })
        .catch(error => { console.log(error.response) })
      },
      send_linkedin () {
        window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id=' + process.env.LINKEDIN_CLIENT_ID + '&redirect_uri=' + process.env.LINKEDIN_CALLBACK + '&state=f1576406b382b7d1c8c2607f7c563d4f&response_type=code&scope=r_basicprofile w_share'
      }
    },
    created: function () {
      // TODO: improve embedded string approach
      this.facebook_plugin = document.createElement('script')
      this.facebook_plugin.setAttribute('type', 'text/javascript')
      this.script_html += 'window.fbAsyncInit = function() {\n'
      this.script_html += '  FB.init({\n'
      this.script_html += '    appId      : "' + process.env.FACEBOOK_APP_ID + '",\n'
      this.script_html += '    cookie     : true,  // enable cookies to allow the server to access the session\n'
      this.script_html += '    xfbml      : true,  // parse social plugins on this page\n'
      this.script_html += '    version    : "v2.10" // use graph api version 2.8\n'
      this.script_html += '  });\n'
      this.script_html += '};\n'
      this.script_html += '(function(d, s, id) {\n'
      this.script_html += '  var js, fjs = d.getElementsByTagName(s)[0];\n'
      this.script_html += '  if (d.getElementById(id)) return;\n'
      this.script_html += '  js = d.createElement(s); js.id = id;\n'
      this.script_html += '  js.src = "//connect.facebook.net/en_US/sdk.js";\n'
      this.script_html += '  fjs.parentNode.insertBefore(js, fjs);\n'
      this.script_html += '}(document, "script", "facebook-jssdk"));\n'
      this.facebook_plugin.innerHTML = this.script_html
      document.body.appendChild(this.facebook_plugin)
    },
    mounted: function () {
      this.get_connections()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  #add-section{
    text-align: right;
    width: 100%;
    padding: 1em 1em 1em 1em;
  }
  .required-span{
    color: #a94442;
  }
  td{
    padding: 1em 1em 1em 1em;
  }
  legend {
    margin-top: 2em;
  }
  .min-max{
    display: inline-table;
    width: 49%;
  }
  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }
</style>