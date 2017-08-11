<template>
  <div id="general-container">
    <div id="loading" class="panel panel-default">
      <div class="panel-body">
        <img src="~@/assets/loading.gif">
        Procesando por favor espere...
      </div>
    </div>
  </div>
</template>
<script>
  import { setIdToken, setAccessToken, getParameterByName, getAccessToken, getIdToken } from '../../utils/auth'
  import axios from 'axios'

  export default {
    name: 'callback',
    mounted () {
      if (getParameterByName('error_description') === 'Please verify your email before logging in.') {
        window.location.href = '/verify-email'
      } else {
        this.$nextTick(function () {
          setAccessToken()
          setIdToken()
          var instance = axios.create({})
          instance.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'
          instance.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`
          instance.get(process.env.AUDIENCE)
          .then(response => {
            localStorage.setItem('user_info', JSON.stringify({ user_id: response.data.user_id, picture: response.data.picture, name: response.data.name, nickname: response.data.nickname, email: response.data.email }))
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
            return this.axios.get('/user', {params: {'user_id': response.data.user_id}})
          })
          .then((response) => {
            if (response.data.data.user === '[]') {
              window.location.href = '/create-company'
            } else {
              localStorage.setItem('company_id', JSON.parse(response.data.data.user)[0].company_id)
              window.location.href = '/positions'
            }
          })
          .catch(error => { console.log(error.response) })
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