<template>
  <div id="general-container">
  </div>
</template>
<script>
import { login } from '../../utils/auth'
import { setup } from '../../utils/hotjar'

export default {
  beforeCreate: function () {
    setup(this)
    login()
  }
}
</script>
<style scoped>
</style>
