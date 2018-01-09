<template>
  <div id="general-container">
    <toolbar></toolbar>
    <!-- header start -->
    <div class="section-header">
      <div class="general-container">
        <div class="row">
          <div class="col-xs-12">
            <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Redes sociales</h1>
          </div>
        </div>
      </div>
    </div><!-- header end -->
    <div class="create-form">
      <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
          <div class="separator"></div>
        </div>
      </div>
      <div class="collapse-group" role="tablist" aria-multiselectable="true">
        <div class="" role="tab" id="headingOne">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#twitter" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="form-title">Publicar en Twitter
                  <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div id="twitter" class="panel-collapse collapse create-form-container" role="tabpanel" aria-labelledby="headingOne">
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="social-connection-container">
                <!-- Delete .is-active to hide the div content -->
                <div class="connection-content is-active" v-if="twitter_status !== 'connected'">
                  <button v-if="!connecting_twitter" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-twitter " @click="post_twitter()"><span class="btn-social-icon"></span>Conectar a Twitter</button>
                  <div v-if="connecting_twitter" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-twitter "><span class="btn-social-icon"></span>Conectando...</div>
                </div>
                <div class="connected-content is-active" v-if="twitter_status === 'connected'">
                  <div class="connected-message">Esta cuenta se encuentra activa</div>
                  <button id="twitter-disconnect-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-logout" @click="disconnect('twitter')">Desconectar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="twitter_status === 'connected'">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="social-form-container is-active">
                <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                  <textarea class="mdl-textfield__input" type="text" rows= "3" id="socialtext01" v-model="text_post_twitter" v-on:keyup="get_counter_characters('twitter')"></textarea>
                  <label id="twitter_label" class="mdl-textfield__label" for="socialtext01">Texto para la publicación</label>
                  <span class="mdl-textfield__error">Error message</span>
                </div>
                <div id="counter_characters">{{ counter_characters_twitter }}</div>
                <div class="form-note-message">
                  <strong>Nota: </strong>
                  El enlace de la publicación se agregara al final del texto automaticamente
                </div>
                <div style="display: none;" id="success-post-twitter" class="alert alert-info">La publicación se ha realizado correctamente!</div>
                <div class="form-btn-container">
                  <button id="twitter-save-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-publish" @click="publish('twitter')">Publicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
          <div class="separator"></div>
        </div>
      </div>




      <div class="collapse-group" role="tablist" aria-multiselectable="true">
        <div class="" role="tab" id="headingTwo">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#facebook" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="form-title">Publicar en Facebook
                  <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div id="facebook" class="panel-collapse collapse create-form-container" role="tabpanel" aria-labelledby="headingTwo">
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="social-connection-container">
                <!-- Delete .is-active to hide the div content -->
                <div v-on:click="facebook_connect_button_change()" class="connection-content is-active" v-if="pages.length <= 0 && facebook_status !== 'connected' && !connecting_facebook">
                  <fb-signin-button id="facebook-button"
                    :params="fbSignInParams"
                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-facebook "
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    <span class="btn-social-icon"></span>Conectar a Facebook
                  </fb-signin-button>
                </div>
                <div class="connection-content is-active" v-if="pages.length <= 0 && facebook_status !== 'connected' && connecting_facebook">
                  <fb-signin-button id="facebook-button"
                    :params="fbSignInParams"
                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-facebook "
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    <span class="btn-social-icon"></span>Conectando...
                  </fb-signin-button>
                </div>
                <div class="social-table-content is-active" v-if="pages.length > 0 && facebook_status !== 'connected'">
                  <table class="mdl-data-table mdl-js-data-table social-table">
                    <caption>
                      Listado de paginas relacionadas con la cuenta actual
                    </caption>
                    <thead>
                      <tr>
                        <th class="mdl-data-table__cell--non-numeric">Página</th>
                        <th class="mdl-data-table__cell--non-numeric">Categoría</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in pages">
                        <td class="mdl-data-table__cell--non-numeric">{{ item.name }}</td>
                        <td class="mdl-data-table__cell--non-numeric cell-category">{{ item.category }}</td>
                        <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social" @click="set_token(item.access_token, item.id, $event)">Vincular Página</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="connected-content is-active" v-if="facebook_status === 'connected'">
                  <div id="facebook-connected" class="connected-content is-active">
                    <div class="connected-message">Esta cuenta se encuentra activa</div>
                    <button id="facebook-disconnect-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-logout" @click="disconnect('facebook')">Desconectar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="facebook_status === 'connected'">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="social-form-container is-active">
                <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                  <textarea class="mdl-textfield__input" type="text" rows= "3" id="socialtext02" v-model="text_post_facebook" v-on:keyup="get_counter_characters('facebook')"></textarea>
                  <label id="facebook_label" class="mdl-textfield__label">Texto para la publicación</label>
                  <span class="mdl-textfield__error">Error message</span>
                </div>
                <div id="counter_characters">{{ counter_characters_facebook }}</div>
                <div class="form-note-message">
                  <strong>Nota: </strong>
                  El enlace de la publicación se agregara al final del texto automaticamente
                </div>
                <div style="display: none;" id="success-post-facebook" class="alert alert-info">La publicación se ha realizado correctamente!</div>
                <div class="form-btn-container">
                  <button id="facebook-save-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-publish"  @click="publish('facebook')">Publicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
          <div class="separator"></div>
        </div>
      </div>




      <div class="collapse-group" role="tablist" aria-multiselectable="true">
        <div class="" role="tab" id="headingThree">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#linkedin" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="form-title">Publicar en LinkedIn
                  <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div id="linkedin" class="panel-collapse collapse create-form-container" role="tabpanel" aria-labelledby="headingThree">
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="social-connection-container">
                <!-- Delete .is-active to hide the div content -->
                <div class="connection-content is-active" v-if="linkedin_status !== 'connected'">
                  <button v-if="!connecting_linkedin" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-linkedin " @click="send_linkedin()"><span class="btn-social-icon"></span>Conectar a LinkedIn</button>
                  <div v-if="connecting_linkedin" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-linkedin "><span class="btn-social-icon"></span>Conectando...</div>
                </div>
                <div class="connected-content is-active" v-if="linkedin_status === 'connected'">
                  <div class="connected-message">Esta cuenta se encuentra activa</div>
                  <button id="linkedin-disconnect-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-logout" @click="disconnect('linkedin')">Desconectar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="linkedin_status === 'connected'">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="social-form-container is-active">
                <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                  <textarea class="mdl-textfield__input" type="text" rows= "3" id="socialtext03" v-model="text_post_linkedin" v-on:keyup="get_counter_characters('linkedin')"></textarea>
                  <label id="linkedin_label" class="mdl-textfield__label" for="socialtext03">Texto para la publicación</label>
                  <span class="mdl-textfield__error">Error message</span>
                </div>
                <div id="counter_characters">{{ counter_characters_linkedin }}</div>
                <div class="form-note-message">
                  <strong>Nota: </strong>
                  El enlace de la publicación se agregara al final del texto automaticamente
                </div>
                <div style="display: none;" id="success-post-linkedin" class="alert alert-info">La publicación se ha realizado correctamente!</div>
                <div class="form-btn-container">
                  <button id="linkedin-save-button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-publish" @click="publish('linkedin')">Publicar</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
          <div class="separator"></div>
        </div>
      </div>
    </div><!-- create-form end -->
  </div>
</template>
<script>
  import Toolbar from './Toolbar'
  import FBSignInButton from 'vue-facebook-signin-button'
  import { getAccessToken, getIdToken } from '../../utils/auth'

  export default {
    components: {
      Toolbar,
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
        twitter_status: 'not_connected',
        facebook_status: 'not_connected',
        linkedin_status: 'not_connected',
        position: {},
        text_post: '',
        text_post_link: '',
        text_post_facebook: '',
        text_post_linkedin: '',
        text_post_twitter: '',
        counter_characters_facebook: 0,
        counter_characters_linkedin: 0,
        counter_characters_twitter: 0,
        connecting_twitter: false,
        connecting_facebook: false,
        connecting_linkedin: false
      }
    },
    methods: {
      onSignInSuccess (response) {
        window.FB.api('/me/accounts', dude => {
          this.pages = dude.data
        })
      },
      facebook_connect_button_change () {
        this.connecting_facebook = true
      },
      onSignInError (error) {
        console.log('La cuenta no ha sido autorizada!', error)
        this.connecting_facebook = false
      },
      set_token (token, id, event) {
        event.target.innerHTML = 'Vinculando...'
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
          event.target.innerHTML = 'Vincular Página'
          this.get_connections()
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      publish (provider) {
        var buttonId = provider + '-save-button'
        document.getElementById(buttonId).innerHTML = 'Publicando...'
        switch (provider) {
          case 'facebook':
            this.text_post = this.text_post_facebook + ' ' + this.text_post_link
            break
          case 'twitter':
            this.text_post = this.text_post_twitter + ' ' + this.text_post_link
            break
          case 'linkedin':
            this.text_post = this.text_post_linkedin + ' ' + this.text_post_link
            break
        }
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/social-network/' + provider + '/company/' + window.localStorage['company_id'] + '/publish', {
          'text_post': this.text_post
        })
        .then(response => {
          document.getElementById('success-post-' + provider).style.display = 'block'
          setTimeout(function () {
            document.getElementById('success-post-' + provider).style.display = 'none'
          }, 2500)
          document.getElementById(buttonId).innerHTML = 'Publicar'
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      disconnect (provider) {
        document.getElementById(provider + '-disconnect-button').innerHTML = 'Desconectando...'
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
        this.connecting_twitter = true
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/social-network/twitter/company/' + localStorage['company_id'] + '/connection')
        .then(response => {
          window.localStorage.setItem('position_url_social_return', window.location.href)
          window.localStorage.setItem('twitter_request_token', JSON.stringify(response.data.data.request_token))
          window.location.href = response.data.data.url
        })
        .catch(error => { console.log(error.response) })
      },
      send_linkedin () {
        this.connecting_linkedin = true
        window.localStorage.setItem('position_url_social_return', window.location.href)
        window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id=' + process.env.LINKEDIN_CLIENT_ID + '&redirect_uri=' + process.env.LINKEDIN_CALLBACK + '&state=f1576406b382b7d1c8c2607f7c563d4f&response_type=code&scope=r_basicprofile w_share'
      },
      get_position () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.params.position_id)
        .then((response) => {
          this.position = response.data.data.position
          this.text_post_link = this.position.name + ' - ' + process.env.HOST + '/position-apply/' + this.position.id
          this.get_counter_characters()
        })
        .catch(error => { console.log(error.response) })
      },
      get_counter_characters (provider) {
        var selectedLabel = ''
        switch (provider) {
          case 'facebook':
            selectedLabel = 'facebook_label'
            this.counter_characters_facebook = this.text_post_facebook.length
            break
          case 'twitter':
            selectedLabel = 'twitter_label'
            this.counter_characters_twitter = this.text_post_twitter.length
            break
          case 'linkedin':
            selectedLabel = 'linkedin_label'
            this.counter_characters_linkedin = this.text_post_linkedin.length
            break
        }
        document.getElementById(selectedLabel).parentElement.classList.add('is-focused')
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
      this.bootstrap_min_js = document.createElement('script')
      this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(this.bootstrap_min_js)
    },
    mounted: function () {
      this.get_position()
      this.get_connections()
      window.localStorage.removeItem('position_url_social_return')
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
  #counter_characters {
    width: 100%;
    text-align: right;
    color: #337ab7;
    font-weight: bold;
  }
</style>
