<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3 id="header-positions">Posiciones:</h3></div>
      <div class="panel-body">
        <div id="add-section">
          <router-link to="/position" class="btn btn-success">Agregar Posición</router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>ID de posición</th>
              <th>Nombre</th>
              <th>Descripción de Posición</th>
              <th>Fecha de Vencimiento</th>
              <th>Fecha de Publicación</th>
              <th>Fecha de Creación</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in positions">
              <td>
                {{ item.id }}
              </td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.description }}
              </td>
              <td>
                {{ item.expiration_date.substring(0, 10) }}
              </td>
              <td>
                {{ item.publication_date.substring(0, 10) }}
              </td>
              <td>
                {{ item.created_at.substring(0, 10) }}
              </td>
              <td>
                <a v-bind:href="'/position?id=' + item.id" class="btn btn-warning">Editar</a>
              </td>
            </tr>
          </tbody>
        </table>
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
        positions: {}
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_positions () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/positions', {params: {'company_id': localStorage['company_id']}})
        .then(response => {
          this.positions = JSON.parse(response.data.data.positions)
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