<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand">Cotopaxi-io</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li><router-link v-show="isLoggedIn()" to="/positions">Posiciones</router-link></li>
          <li>
            <a v-show="!isLoggedIn()" @click="handleLogin()" href="#">Ingresar</a>
          </li>
          <li>
            <a v-show="isLoggedIn()" @click="handleLogout()" href="#">Cerrar Sesión</a>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import { isLoggedIn, login, logout } from '../../utils/auth'

  export default {
    name: 'app-nav',
    methods: {
      handleLogin () {
        login()
      },
      handleLogout () {
        logout()
      },
      isLoggedIn () {
        return isLoggedIn()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
.header-networks{
  vertical-align: middle;
  text-align: right;
}
.header-networks a{
  display: inline;
}
.header-networks img{
  width: 6%;
  margin-top: 0.7em;
}
.a-button{
  margin-top: 20px;
}
</style>