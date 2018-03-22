<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-dashboard">
      
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  // import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
      }
    },
    methods: {
      isLoggedIn () {
        // return isLoggedIn()
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
  #container-dashboard{
    width: 80%;
    margin: 0 auto;
  }
</style>