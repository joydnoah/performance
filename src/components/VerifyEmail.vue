<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="verify-div" class="alert alert-info" role="alert">
      <i class="glyphicon glyphicon-envelope"></i> 
      Por favor verifica tu cuenta de e-Mail y vuelve a intentarlo. <router-link to="/">Regresar</router-link>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
        positions: {}
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  #verify-div{
    width: 30%;
    margin: 3em auto;
  }
</style>