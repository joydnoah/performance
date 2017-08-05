<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Administración de posiciones</h3></div>
      <div class="panel-body">
        <div id="add-section">
          <router-link to="/position" class="btn btn-success">Agregar Posición</router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción de Posición</th>
              <th>Fecha de Vencimiento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in positions">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.position_description }}
              </td>
              <td>
                {{ item.expiration_date_position }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
        positions: {}
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_positions () {
        axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

        axios.get('/position/')
        .then(response => {
          this.positions = JSON.parse(response.data)
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.get_positions()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  #add-section{
    text-align: right;
    width: 100%;
    padding: 1em 1em 1em 1em;
  }
</style>