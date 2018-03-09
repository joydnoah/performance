<template>
  <div id="general-container">
    <alert-modal :typeMessage="typeMessage" :message="alertMessage" :activate="showAlert" :type="typeOfAlert" time="5"></alert-modal>
    <toolbar></toolbar>

    <!-- body-container start -->

    <!-- only visible when there is no position created - start-->
    <div class="body-container">
      <layout-header title="Panel de ofertas laborales"></layout-header>

      <div class="empty-message-container" v-show="!make_visible()">

        <div class="row">
          <div class="col-xs-offset-4 col-xs-4">
            <div class="empty-icon">
              <i class="material-icons">note_add</i>
            </div>
            <div class="empty-message">En este momento no tienes ofertas laborales creadas</div>
            <button v-show="isLoggedIn()" @click="go_to('/position')" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent empty-btn">Crear posición</button>
          </div>
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

        <div style="display: none;" id="copy_link" class="alert alert-success" role="alert">
          <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Link Copiado</strong>
          <p></p>
        </div>

        <div class="offer-header-container">
          <div class="row">
            <div class="col-xs-1">
              <p class="header-title" @click="change_order($event.target.id)" id="position_number" v-show="visible_tittle('position_number')">
                ID&#9660
              </p>
              <p class="header-title" @click="change_order($event.target.id)" id="position_number" v-show="!visible_tittle('position_number')">
                ID&#9650
              </p>
            </div>
            <div class="col-xs-2">
              <p class="header-title" @click="change_order($event.target.id)" id="name" v-show="visible_tittle('name')">
                Posición&#9660
              </p>
              <p class="header-title" @click="change_order($event.target.id)" id="name" v-show="!visible_tittle('name')">
                Posición&#9650
              </p>
            </div>
            <div class="col-xs-2">
              <p class="header-title" @click="change_order($event.target.id)" id="city" v-show="visible_tittle('city')"><!-- .descending add sort down icon -->
                Ubicación&#9660
              </p>
              <p class="header-title" @click="change_order($event.target.id)" id="city" v-show="!visible_tittle('city')"><!-- .descending add sort down icon -->
                Ubicación&#9650
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title" @click="change_order($event.target.id)" id="created_at" v-show="visible_tittle('created_at')"><!-- .ascending add sort up icon -->
                Fecha de creación&#9660
              </p>
              <p class="header-title" @click="change_order($event.target.id)" id="created_at" v-show="!visible_tittle('created_at')"><!-- .ascending add sort up icon -->
                Fecha de creación&#9650
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title" @click="change_order($event.target.id)" id="publication_date" v-show="visible_tittle('publication_date')">
                Fecha de publicación&#9660
              </p>
              <p class="header-title" @click="change_order($event.target.id)" id="publication_date" v-show="!visible_tittle('publication_date')">
                Fecha de publicación&#9650
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title" @click="change_order($event.target.id)" id="status" v-show="visible_tittle('status')">
                Estatus de solicitud&#9660
              </p>
              <p class="header-title" @click="change_order($event.target.id)" id="status" v-show="!visible_tittle('status')">
                Estatus de solicitud&#9650
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title">
                Solicitudes recibidas&#9660
              </p>
            </div>
            <div class="col-xs-1">
              <p class="header-title">
                Candidatos activos&#9660
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
                {{ item.position_number }}
              </p>
            </div>
            <div class="col-xs-2">
              <a :href="'applicants/' + item.id" class="row-info row-title-link">
                {{ item.name }}
              </a>
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
                  <li @click="go_to('/position?id=' + item.id)">Editar y Publicar Posición</li>
                  <li @click="copy_now()" v-clipboard:copy="copy_to_clipboard(item.id)">Copiar Enlace de Posición</li>
                  <li @click="go_to('/applicants/' + item.id)">Ver Candidatos</li>
                  <li @click="go_to('/email-templates/' + item.id)">Editar Plantilla de Correos a Candidatos</li>
                  <li @click="go_to('/social-position/' + item.id)">Publicar en Redes Sociales</li>
                  <li @click="set_status_position(item.id, 'closed')" class="is-negative">Cerrar Posición</li><!-- .is-negative add error color to negative acctions -->
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

  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import LayoutHeader from './LayoutHeader'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Tooltip, Dropdown } from 'uiv'
  import AlertModal from './AlertModal'

  export default {
    components: {
      Toolbar,
      LayoutHeader,
      Tooltip,
      Dropdown,
      AlertModal
    },
    data: function () {
      return {
        positions: {},
        publish_problem: false,
        company_id: localStorage['company_id'],
        company: {},
        copyn: false,
        bootstrap_min_js: null,
        showAlert: true,
        typeOfAlert: '',
        typeMessage: '',
        alertMessage: '',
        list: { 'position_number': true, 'name': true, 'city': true, 'created_at': true, 'publication_date': true, 'status': true }
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      change_order (id) {
        this.get_positions(id, this.list[id])
        this.list[id] = !this.list[id]
      },
      copy_now () {
        this.copyn = true
      },
      go_to (url) {
        window.location.href = url
      },
      make_visible () {
        return this.positions.length > 0
      },
      visible_tittle (id) {
        return this.list[id]
      },
      get_positions (order, inc) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position', {params: {'company_id': localStorage['company_id'], 'order_by': order, 'asc_or_desc': inc}})
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
        if (this.copyn) {
          this.copyn = false
          this.showAlert = !this.showAlert
          this.typeOfAlert = 'is-success'
          this.typeMessage = 'Link Copiado'
        }
        return window.location.href.substr(0, window.location.href.length - 1) + '-apply/' + text
      },
      set_status_position (id, status) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/position/' + id + '/' + status)
        .then(response => {
          this.get_positions('created_at', true)
        })
        .catch(error => {
          this.publish_problem = true
          console.log(error)
        })
      }
    },
    mounted: function () {
      this.get_positions('created_at', true)

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
