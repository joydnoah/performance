<template>
  <!-- topbar -->
  <div class="topbar wow fadeIn" data-wow-delay="0.4s" data-wow-duration="1.2s">
    <div class="topbar-container general-container">
      <div class="row">
        <div class="col-xs-12">
          <div class="left-side">
            <div class="logo">
              <a href="/positions">
                <img :src="'/static/html_layout/images/company-logo.svg'">
              </a>
            </div>
          </div>
          <div class="right-side">
            <div class="main-nav">
              <div v-show="isLoggedIn()" @click="go_to('/positions')" class="nav-item">
                <i class="material-icons">dashboard</i>Panel de Ofertas
              </div>
              <div v-show="isLoggedIn()" @click="go_to('/company-jobs')" class="nav-item">
                <i class="material-icons">dashboard</i>Página Empresa
              </div>
              <div v-show="!isLoggedIn()" @click="handleLogin()" class="nav-item">
                <i class="material-icons">account_circle</i>Login
              </div>
              <div v-show="isLoggedIn()" @click="go_to('/position')" class="nav-item">
                <i class="material-icons">note_add</i>Crear Posición
              </div>
              <div v-show="isLoggedIn()" class="nav-item item-nav-dropdown">
                <i class="material-icons">account_circle</i>{{ user_info.name }}
                <i class="material-icons icon-row">keyboard_arrow_down</i>
                <div class="dropdown-nav-container">
                  <div class="dropdown-nav arrow-right">
                    <span class="dropdown-list-title">Opciones de usuario</span>
                    <ul class="dropdown-list">
                      <li><a @click="go_to('/' + company.uri)">Informacion empresarial</a></li>
                      <li><a @click="handleLogout()" href="#">Cerrar sesión</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!-- row end -->
    </div>
  </div>
  <!-- topbar end -->
</template>

<script>
  import { isLoggedIn, login, logout, getUserInfo, getIdToken, getAccessToken } from '../../utils/auth'

  export default {
    name: 'toolbar',
    data: function () {
      return {
        user_info: {
          picture: '',
          name: ''
        },
        company: {}
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
      },
      go_to (url) {
        window.location.href = url
      }
    },
    mounted: function () {
      if (this.isLoggedIn()) {
        this.getUserInfo()
      }
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/company/' + window.localStorage['company_id'])
      .then((response) => {
        this.company = response.data.data.company
      })
      .catch(error => { console.log(error.response) })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pending {
    position:relative;
  }
  .pending[data-badge]:after {
    content:attr(data-badge);
    position:absolute;
    top: -10px;
    right: -10px;
    font-size: .7em;
    background: red;
    color: white;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height:18px;
    border-radius: 50%;
    box-shadow: 0 0 1px #333;
  }
</style>
