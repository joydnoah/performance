<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3 id="header-positions">Posiciones:</h3></div>
      <div class="panel-body">
        <div id="add-section">
          <router-link to="/position" class="btn btn-success">Agregar Posición</router-link>
          <router-link to="/company-jobs" class="btn btn-success">Editar Página de Posiciones</router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Cantidad Candidatos</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Publicación</th>
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
                {{ item.department_name }}
              </td>
              <td>
                {{ item.city }}
              </td>
              <td>
                {{ item.applicants_number }}
              </td>
              <td>
                {{ item.created_at.substring(0, 10) }}
              </td>
              <td>
                {{ item.publication_date == null? "Sin Publicar" : item.publication_date.substring(0, 10) }}
              </td>
              <td>
                {{ item.expiration_date.substring(0, 10) }}
              </td>
              <td>
                <tooltip text="Editar">
                  <a v-bind:href="'/position?id=' + item.id" title="Editar" class="btn btn-warning"><i class="glyphicon glyphicon-pencil"></i></a> 
                </tooltip>
                <tooltip text="Previsualizar">
                  <a v-bind:href="'/position-preview?id=' + item.id" target="_blank" title="Previsualizar" class="btn btn-default"><i class="glyphicon glyphicon-eye-open"></i></a>
                </tooltip>
                <tooltip text="Canditatos">
                  <a v-bind:href="'/applicants?position_id=' + item.id" title="Canditatos" class="btn btn-primary"><i class="glyphicon glyphicon-user"></i></a>
                </tooltip>
                <tooltip text="Publicar">
                  <a target="_blank" v-bind:href="'/position-apply?id=' + item.id" title="Publicar" class="btn btn-success"><i class="glyphicon glyphicon-bullhorn"></i></a>
                </tooltip>
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
  import { Tooltip } from 'uiv'
  
  export default {
    components: {
      AppNav,
      Tooltip
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
        this.axios.get('/position', {params: {'company_id': localStorage['company_id']}})
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