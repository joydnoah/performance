<template>
  <div>
    hola!!
  </div>
</template>
<script>
import { login } from '../../utils/auth'

export default {
  beforeCreate () {
    login()
  }
}
</script>
