<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Redes Sociales</h3></div>
      <div class="panel-body">
        <legend>Conexión con redes sociales</legend>
        <h4>Facebook</h4>
        <div v-if="social_network_connections.length === 0">
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
        <div v-if="social_network_connections.length > 0">
          <div id="facebook-connected" class="alert alert-info">
            <strong>Cuenta Conectada!</strong> <button class="btn btn-default" @click="disconnect()">Desconectar</button>
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
          <button @click="put()" class="btn btn-primary">Publicar</button>
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
        fbSignInParams: {
          scope: 'email, public_profile, manage_pages, publish_actions, publish_pages',
          return_scopes: true
        },
        facebook_auth_response: {},
        pages: [],
        social_network_connections: [],
        text_post: ''
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
        this.axios.post('/social_network_connection/' + window.localStorage['company_id'], {
          'access_token': this.facebook_auth_response.access_token,
          'page_id': this.facebook_auth_response.id
        })
        .then(response => {
          this.get_connections()
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      put () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.put('/social_network_connection/' + window.localStorage['company_id'], {
          'text_post': this.text_post
        })
        .then(response => {
          this.get_connections()
          document.getElementById('success-post').style.display = 'block'
          setTimeout(function () {
            document.getElementById('success-post').style.display = 'none'
          }, 2500)
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      disconnect () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.delete('/social_network_connection/' + window.localStorage['company_id'], {
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
        this.axios.get('/social_network_connection/' + localStorage['company_id'])
        .then(response => {
          this.social_network_connections = response.data.data.social_network_connections
        })
        .catch(error => { console.log(error.response) })
      }
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