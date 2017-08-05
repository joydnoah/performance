<template>
	<div>
		<app-nav></app-nav>
		<h3 class="text-center">Cotopaxi-io</h3>
    <input type="text" v-model="city"  />
    <button v-on:click="create_city()">Create City</button>
		<button v-on:click="get_cities()">Get Cities</button>

    <ul id="example-1">
      <li v-for="item in cities">
        {{ item.city }}
      </li>
    </ul>
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
        city: '',
        sources: null,
        cities: {}
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_cities () {
        axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

        axios.get('/city/')
        .then(response => {
          console.log(response)
          this.cities = JSON.parse(response.data)
        })
        .catch(error => { console.log(error.response) })
      },
      create_city () {
        axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        if (this.city !== '') {
          axios.post('/city/', { city: this.city })
          .then(response => {
            this.city = ''
            console.log(response)
          })
          .catch(error => { console.log(error.response) })
        }
      }
    }
  }
</script>

<style scoped>
	
</style>