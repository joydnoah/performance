<template>
  <div>
    <div class="home-title">
    </div>
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

<style scoped>
  .home-title {
    text-align: center;
    height: 300px;
    border-bottom: 1px solid #9c9c9c;
    padding-top: 4em;
  }
  .home-title h3{
  width: 30%;
  margin: 1em auto;
  text-align: left;
  }
  .home-title p{
  width: 30%;
  margin: 1em auto;
  text-align: left;
  }
</style>
