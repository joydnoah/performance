<template>
</template>
<script>
  import { setIdToken, setAccessToken } from '../../utils/auth'

  export default {
    name: 'callback',
    mounted () {
      this.$nextTick(function () {
        setAccessToken()
        setIdToken()
        window.location.href = '/'
      })
    }
  }
</script>