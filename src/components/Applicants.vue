<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3 id="header-positions">Solicitantes:</h3></div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Solicitud</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in applicants">
              <td>{{ item.first_name }}</td>
              <td>{{ item.last_name }}</td>
              <td>{{ item.created_at.substring(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
        <a href="/positions" class="btn btn-warning">Retornar a posiciones</a>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
        applicants: {}
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_applicants () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/applications/' + this.$route.query.position_id)
        .then(response => {
          this.applicants = JSON.parse(response.data.data.applicants)
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.get_applicants()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  </style>