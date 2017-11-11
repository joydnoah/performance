<template>
  <div id="general-container">
    <toolbar></toolbar>
    
    <!-- body-container start -->
    <div class="body-container">
      <layout-header title="Panel de ofertas laborales"></layout-header>
    
      <div v-if="positions.length > 0">
        <!-- results-status start -->
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <div class="result-status-container">
                <div class="results-status-number">{{ positions.length }}</div>
                <div class="results-status-message">Ofertas laborales actualmente abiertas</div>
              </div>
            </div>
          </div>
        </div><!-- results-status end -->
        
        <div class="general-container">
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
                <p @click="go_to('/applicants/' + item.id)" class="row-info row-title-link">
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
                    <li v-clipboard:copy="host + '/position-apply/' + item.id">Link</li>
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
      </div>
      <div class="general-container not-positions" v-if="positions.length == 0">
        <h4>No existen posiciones creadas, para crear tu primera vacante utiliza el siguiente botón.</h4>
        <br/>
        <a class="btn btn-default" href="/position">CREAR TU PRIMERA VACANTE</a>
      </div>

      <modal v-model="publish_problem" :footer="false" title="Estado de Posición">
        <p>No se puede publicar la posición ya que la fecha de vencimiento es menor a la fecha actual.</p>
      </modal>
    </div>
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
        bootstrap_min_js: null,
        host: process.env.HOST
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      go_to (url) {
        window.location.href = url
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

<style scoped>
  .not-positions{
    text-align: center;
    margin-top: 2em;
    color: #9C9C9C;
  }
</style>