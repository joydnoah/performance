<template>
</template>
<script>
  import { setIdToken, setAccessToken, getParameterByName, getAccessToken } from '../../utils/auth'

  export default {
    name: 'callback',
    mounted () {
      if (getParameterByName('error_description') === 'Please verify your email before logging in.') {
        window.location.href = '/verify-email'
      } else {
        this.$nextTick(function () {
          setAccessToken()
          setIdToken()
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`
          this.axios.get(process.env.AUDIENCE)
          .then(response => {
            localStorage.setItem('user_info', JSON.stringify({ user_id: response.data.user_id, picture: response.data.picture, name: response.data.name, nickname: response.data.nickname, email: response.data.email }))
            window.location.href = '/'
          })
          .catch(error => { console.log(error.response) })
        })
      }
    }
  }
</script>