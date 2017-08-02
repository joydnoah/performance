<template>
	<div>
		<app-nav></app-nav>
		<h3 class="text-center">Cotopaxi-io</h3>
		<button v-on:click="link()">Get Hello</button>
	</div>
</template>

<script>
  import axios from 'axios'
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
        sources: null
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      link () {
        console.log(`Bearer ${getIdToken()}`)
        const url = '/positions/get'
        axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        axios.get(url)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error.response) })
        // axios.post(url).then(response => console.log(response.data))
      }
    }
  }
</script>

<style scoped>
	
</style>