<template>
</template>
<script>
  import { setIdToken, setAccessToken, getParameterByName } from '../../utils/auth'

  export default {
    name: 'callback',
    mounted () {
      // var error = getParameterByName('error');
      if (getParameterByName('error_description') === 'Please verify your email before logging in.') {
        window.location.href = '/verify-email'
      } else {
        this.$nextTick(function () {
          setAccessToken()
          setIdToken()
          window.location.href = '/'
        })
      }
    }
  }
</script>