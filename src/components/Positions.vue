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
              <th>Estado</th>
              <th>Cantidad Candidatos</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Publicación</th>
              <th>Fecha de Vencimiento</th>
              <th></th>
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
                {{ get_status(item.status_type) }}
              </td>
              <td>
                {{ item.applicants_number }}
              </td>
              <td>
                {{ item.created_at.substring(0, 10) }}
              </td>
              <td>
                {{ item.status_type !== "publish" ? "Sin Publicar" : item.publication_date_str.substring(0, 16) }}
              </td>
              <td>
                {{ item.expiration_date.substring(0, 10) }}
              </td>
              <td>
                <dropdown>
                  <button data-role="trigger" class="btn btn-warning dropdown-toggle" type="button">
                    <span>Acciones</span>
                    <span class="caret"></span>
                  </button>
                  <template slot="dropdown">
                    <li><a v-bind:href="'/position?id=' + item.id" title="Editar">Editar</a></li>
                    <li><a v-bind:href="'/position-preview/' + item.id" target="_blank" title="Previsualizar">Previsualizar</a></li>
                    <li><a target="_blank" v-bind:href="'/position-apply/' + item.id" title="Link Posición">Link de posición</a></li>
                    <li><a v-bind:href="'/applicants/' + item.id" title="Canditatos">Ver Candidatos</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a target="_blank" v-bind:href="'/email-templates/' + item.id" title="Plantillas de email">Plantillas de email</a></li>
                  </template>
                </dropdown>
              </td>
              <td>
                <tooltip text="Publicar">
                  <button @click="set_status_position(item.id, 'publish')" class="btn btn-success"><i class="glyphicon glyphicon-bullhorn"></i></button>
                </tooltip>
                <tooltip text="Cerrar">
                  <button @click="set_status_position(item.id, 'closed')" class="btn btn-danger"><i class="glyphicon glyphicon-ban-circle"></i></button>
                </tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <modal v-model="publish_problem" :footer="false" title="Estado de Posición">
          <p>No se puede publicar la posición ya que la fecha de vencimiento es menor a la fecha actual.</p>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Tooltip, Dropdown } from 'uiv'
  
  export default {
    components: {
      AppNav,
      Tooltip,
      Dropdown
    },
    data: function () {
      return {
        positions: {},
        publish_problem: false
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
          this.positions = response.data.data.positions
        })
        .catch(error => { console.log(error.response) })
      },
      get_status (status) {
        if (status === 'publish') {
          return 'Publicado'
        } else if (status === 'unpublished' || status === null) {
          return 'Sin Publicar'
        } else if (status === 'closed') {
          return 'Cerrada'
        }
      },
      set_status_position (id, status) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/position/' + id + '/' + status)
        .then(response => {
          this.get_positions()
        })
        .catch(error => {
          this.publish_problem = true
          console.log(error)
        })
      }
    },
    mounted: function () {
      this.get_positions()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 95%;
    margin: 0 auto;
  }
  #add-section{
    text-align: right;
    width: 100%;
    padding: 1em 1em 1em 1em;
  }
  </style>