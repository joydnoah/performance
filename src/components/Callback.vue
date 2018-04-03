<template>
  <div id="general-container">
    <div id="loading" class="panel panel-default">
      <div class="panel-body">
        <div id="loading-container" align="center" style="color: #007bb6;">
          <div class="loader">
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__bar"></div>
            <div class="loader__ball"></div>
          </div>
          Procesando por favor espere...
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { setIdToken, setAccessToken, getParameterByName, getAccessToken, getIdToken } from '../../utils/auth'
  import axios from 'axios'

  export default {
    name: 'callback',
    data: function () {
      return {
        interval: null
      }
    },
    mounted () {
      // <link rel="stylesheet" href="/static/html_layout/css/loader.css">
      this.loader_css = document.createElement('link')
      this.loader_css.setAttribute('rel', 'stylesheet')
      this.loader_css.setAttribute('href', '/static/html_layout/css/loader_css.css')
      document.head.appendChild(this.loader_css)
      if (getParameterByName('error_description') === 'Please verify your email before logging in.') {
        window.location.href = '/verify-email'
      } else {
        setAccessToken()
        setIdToken()
        var instance = axios.create({
          headers: {'Authorization': `Bearer ${getAccessToken()}`}
        })
        instance.get(process.env.AUTH0_AUDIENCE)
        .then(response => {
          localStorage.setItem('user_info', JSON.stringify({ user_id: response.data.user_id, picture: response.data.picture, name: response.data.name, nickname: response.data.nickname, email: response.data.email }))
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.get('/user/' + JSON.parse(localStorage['user_info']).user_id)
          .then((response) => {
            if (response.data.data.user === '[]') {
              window.location.href = '/create-company'
            } else {
              localStorage.setItem('company_id', JSON.parse(response.data.data.user)[0].company_id)
              window.location.href = '/positions'
            }
          })
          .catch(error => {
            console.log(error)
          })
        })
        .catch(error => { console.log(error) })
        this.$nextTick(function () {
        })
      }
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
