<template>
  <div id="general-container">
    <toolbar></toolbar>

    <!-- body-container start -->

    <!-- only visible when there is no position created - start-->
    <div class="body-container">
      <layout-header title="Panel de ofertas laborales"></layout-header>

      <div class="general-container" v-show="!make_visible()">
        <div class="result-status-container">
          <div class="results-status-message">Crea una nueva oferta laboral</div>
        </div>
      </div>
      <div class="general-container" v-show="!make_visible()">
        <div class="right-side">
          <button v-show="isLoggedIn()" @click="go_to('/position')" class="btn btn-success">
            <i class="material-icons">note_add</i>Crear posición
          </button>
        </div>
      </div>
      <!-- only visible when there is no position created - end -->

      <!-- results-status start -->
      <div class="general-container" v-show="make_visible()">
        <div class="row">
          <div class="col-xs-12">
            <div class="result-status-container">
              <div class="results-status-number">{{ positions.length }}</div>
              <div class="results-status-message">Ofertas laborales actualmente abiertas</div>
            </div>
          </div>
        </div>
      </div><!-- results-status end -->

      <div class="general-container" v-show="make_visible()">
        <!-- offer-header start -->
        <div class="offer-header-container">
          <div class="row">
            <div class="col-xs-1">
              <p class="header-title">
                ID
              </p>
            </div>
            <div class="col-xs-2">
              <p class="header-title">
                Posición
              </p>
            </div>
            <div class="col-xs-2">
              <p class="header-title"><!-- .descending add sort down icon -->
                Ubicación
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title"><!-- .ascending add sort up icon -->
                Fecha de creación
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title">
                Fecha de publicación
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title">
                Estatus de solicitud
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title">
                Solicitudes recibidas
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title">
                Candidatos activos
              </p>
            </div>
            <div class="col-xs-2">
            </div>
          </div>
        </div><!-- offer-header end -->

        <!-- offer-header start -->
        <div class="offer-row-container" v-for="item in positions">
          <div class="row">
            <div class="col-xs-1">
              <p class="row-info row-title">
                {{ item.id }}
              </p>
            </div>
            <div class="col-xs-2">
              <p class="row-info row-title-link" @click="go_to('/applicants/' + item.id)">
                {{ item.name }}
              </p>
            </div>
            <div class="col-xs-2">
              <p class="row-info row-text">
                {{ item.city }}
              </p>
            </div>
            <div class="col-xs-1">
              <p class="row-info row-text">
                {{ item.created_at.substring(0, 10) }}
              </p>
            </div>
            <div class="col-xs-1">
              <p class="row-info row-text">
                {{ item.status_type !== "publish" ? "Sin Publicar" : item.publication_date_str.substring(0, 16) }}
              </p>
            </div>
            <div class="col-xs-1">
              <p class="row-info row-text">
                {{ get_status(item.status_type) }}
              </p>
            </div>
            <div class="col-xs-1">
              <p class="row-info row-text">
                {{ item.applicants_number }}
              </p>
            </div>
            <div class="col-xs-1">
              <p class="row-info row-text">
                {{ item.applicants_number }}
              </p>
            </div>
            <div class="col-xs-2">
              <div class="dropdown actions-dropdown">
                <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Acciones
                  <i class="material-icons">keyboard_arrow_down</i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel">
                  <li @click="go_to('/position?id=' + item.id)">Editar</li>
                  <li @click="go_to('/position-preview/' + item.id)">Vista previa</li>
                  <li v-clipboard:copy="copy_to_clipboard(item.id)">Link</li>
                  <li @click="go_to('/applicants/' + item.id)">Candidatos</li>
                  <li @click="set_status_position(item.id, 'publish')">Publicar</li>
                  <li @click="go_to('/filters/' + item.id)">Filtros</li>
                  <li @click="go_to('/email-templates/' + item.id)">Correos</li>
                  <li @click="go_to('/social-position/' + item.id)">Redes sociales</li>
                  <li @click="set_status_position(item.id, 'closed')" class="is-negative">Cerrar posición</li><!-- .is-negative add error color to negative acctions -->
                </ul>
              </div>
            </div>
          </div>
        </div><!-- offer-header end -->
      </div>

      <modal v-model="publish_problem" :footer="false" title="Estado de Posición">
        <p>No se puede publicar la posición ya que la fecha de vencimiento es menor a la fecha actual.</p>
      </modal>
    </div>

<!-- <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3 id="header-positions">Posiciones:</h3></div>
      <div class="panel-body">
        <div id="add-section">
          <router-link to="/position" class="btn btn-success">Agregar Posición</router-link>
          <router-link to="/company-jobs" class="btn btn-warning">Editar Página de Posiciones</router-link>
          <router-link v-bind:to="'/' + company.uri" target="_blank" class="btn btn-success">Página Empresa</router-link>
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
                    <li><a target="_blank" v-bind:href="'/filters/' + item.id" title="Filtros">Filtros</a></li>
                    <li><a target="_blank" v-bind:href="'/email-templates/' + item.id" title="Plantillas de email">Plantillas de email</a></li>
                    <li><a v-bind:href="'/social-position/' + item.id" title="Plantillas de email">Publicar en redes sociales</a></li>
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

      </div>
    </div> -->
  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import LayoutHeader from './LayoutHeader'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Tooltip, Dropdown } from 'uiv'

  export default {
    components: {
      Toolbar,
      LayoutHeader,
      Tooltip,
      Dropdown
    },
    data: function () {
      return {
        positions: {},
        publish_problem: false,
        company_id: localStorage['company_id'],
        company: {},
        bootstrap_min_js: null
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      go_to (url) {
        window.location.href = url
      },
      make_visible () {
        return this.positions.length > 0
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
      copy_to_clipboard (text) {
        return window.location.href.substr(0, window.location.href.length - 1) + '-apply/' + text
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

      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/company/' + this.company_id)
      .then((response) => {
        this.company = response.data.data.company
      })
      .catch(error => { console.log(error.response) })

      this.bootstrap_min_js = document.createElement('script')
      this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(this.bootstrap_min_js)
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  button{
    display: inline-block;
  }
</style>
