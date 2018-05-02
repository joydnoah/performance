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
        <router-link to="/positions" class="navbar-brand" @click="redirect()">Cotopaxi-io</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li>
            <button class="btn btn-default navbar-btn" v-show="!isLoggedIn()" @click="handleLogin()">Ingresar</button>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li id="li-profile" v-show="isLoggedIn()">
            <img id="img-profile" class="img-circle" :src="user_info.picture" /> <span>{{ user_info.name }}</span>
          </li>
          <li>
            <button v-show="isLoggedIn()" @click="handleLogout()" class="btn btn-default navbar-btn"> Cerrar Sesión</button>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import { isLoggedIn, login, logout, getUserInfo } from '../../utils/auth'
  import { setup } from '../../utils/hotjar'

  export default {
    name: 'app-nav',
    data: function () {
      return {
        user_info: {
          picture: '',
          name: ''
        }
      }
    },
    methods: {
      handleLogin () {
        login()
      },
      handleLogout () {
        logout()
        window.location.href = '/'
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      getUserInfo () {
        this.user_info = JSON.parse(getUserInfo())
      }
    },
    mounted: function () {
      setup(this)
      if (this.isLoggedIn()) {
        this.getUserInfo()
      }
      this.handleLogin()
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
#li-profile{
  color: #fff;
  text-align: right;
  padding-right: 1em;
  font-weight: 550;
}
#img-profile{
  width: 36px;
  margin: 0.5em;
}
</style>
