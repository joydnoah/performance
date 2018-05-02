<template>
  <div id="general-container">

  </div>
</template>
<script>
import { isLoggedIn, login, logout, getUserInfo, getIdToken, getAccessToken } from '../../utils/auth'
import { setup } from '../../utils/hotjar'

export default {
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
    setup(this)
    if (this.isLoggedIn()) {
      this.getUserInfo()
    }
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
    this.axios.get('/company/' + window.localStorage['company_id'])
    .then((response) => {
      this.company = response.data.data.company
      this.handleLogin()
    })
    .catch(error => { console.log(error.response) })
  }
}
</script>
<style scoped>
  #loading{
    width: 20%;
    margin: 5em auto;
    font-weight: bold;
    text-align: center;
  }
  #loading img{
    margin: 0 auto;
    display: block;
  }
</style>
