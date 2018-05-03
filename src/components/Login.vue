<template>
  <div id="general-container">
  </div>
</template>
<script>
import { login } from '../../utils/auth'
import { setup } from '../../utils/hotjar'

export default {
  data: function () {
    return {
    }
  },
  methods: {
    handleLogin () {
      login()
    }
  },
  mounted: function () {
    setup(this)
    this.handleLogin()
  }
}
</script>
<style scoped>
</style>
