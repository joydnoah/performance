<template>
  <div id="general-container">
      <toolbar></toolbar>
      <!-- body-container start -->
      <div class="body-container">
        <layout-header :title="position.name"></layout-header>
        
        <!-- results-status start -->
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <div class="result-status-container">
                <div class="results-status-number">{{ applicants.length }} de {{ applicants.length }}</div>
                <div class="results-status-message">Candidatos activos que concuerdan con tus requisitos mínimos</div>
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
                  Favoritos
                </p>
              </div>
              <div class="col-xs-3">
                <p class="header-title">
                  Nombre
                </p>
              </div>
              <div class="col-xs-2">
                <p class="header-title"><!-- .descending add sort down icon -->
                  Fecha de solicitud
                </p>
              </div>
              <div class="col-xs-2">
                <p class="header-title"><!-- .ascending add sort up icon -->
                  Status
                </p>
              </div>
              <div class="col-xs-2">
                <p class="header-title">
                  Compatibilidad
                </p>
              </div>
              <div class="col-xs-2">
              </div>
            </div>
          </div><!-- offer-header end -->


          <!-- applicant-row start -->
          <div class="applicant-row-container" v-for="item in applicants">
            <div class="row top-row">
              <div class="col-xs-1">
                <div class="row-bookmark is-active"><!-- add .is-active to add blue color as bookmarked -->
                  <i class="material-icons">thumb_up</i>
                </div>
              </div>
              <div class="col-xs-3">
                <p class="row-info row-name-link">
                  {{ item.applicant_first_name }} {{ item.applicant_last_name }}
                </p>
              </div>
              <div class="col-xs-2">
                <p class="row-info row-text">
                  {{ item.created_at.substring(0, 10) }}
                </p>
              </div>
              <div class="col-xs-2">
                <p class="row-info row-text">
                  {{ get_applicants_status(item.status_application) }}
                </p>
              </div>
              <div class="col-xs-2">
                <div class="row-compatibility is-high"><!-- .is-high .is-medium .is-low change color compatibility -->
                  <!--<p>Alto</p>
                  <div class="compatibility-container">
                    <div class="compatibility-level"></div>
                  </div>-->
                </div>
              </div>
              <div class="col-xs-2">
                <div class="dropdown actions-dropdown">
                  <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Acciones
                    <i class="material-icons">keyboard_arrow_down</i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dLabel">
                    <li><a :href="'/applicant/' + item.applicant_id">Ver detalle</a></li>
                    <li @click="set_status_application(item.id, 'scheduled_call')">Invitar a entrevista telefonica</li>
                    <li @click="set_status_application(item.id, 'scheduled_interview')">Invitar a entrevista presencial</li>
                    <li @click="set_status_application(item.id, 'approved')">Marcar como contratado</li>
                    <li @click="set_status_application(item.id, 'rejection')" class="is-negative">Rechazar candidato</li><!-- .is-negative add error color to negative acctions -->
                  </ul>
                </div>
              </div>
            </div>
            <div class="row bottom-row">
              <div class="col-xs-12">
                <div class="row-info">
                  <!-- "
                  <p class="row-description">
                     It is a long established fact that reader will distracted looking at the readable content pag will distracted looking at the readable content looking at the readable content
                  </p>
                  ” -->
                </div>
              </div>
            </div>
          </div><!-- applicant-row end -->
        </div>
      </div>
  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import LayoutHeader from './LayoutHeader'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
  export default {
    components: {
      Toolbar,
      LayoutHeader
    },
    data: function () {
      return {
        applicants: {},
        position: {},
        bootstrap_min_js: null
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_applicants () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/applications/' + this.$route.params.position_id)
        .then(response => {
          this.applicants = response.data.data.applicants
        })
        .catch(error => { console.log(error.response) })
      },
      get_applicants_status (status) {
        if (status === 'approved') {
          return 'Aprobado'
        } else if (status === 'in_process' || status === null) {
          return 'En Proceso'
        } else if (status === 'rejection') {
          return 'Rechazado'
        } else if (status === 'scheduled_call') {
          return 'Invitación a LLamada'
        } else if (status === 'scheduled_interview') {
          return 'Invitación a Entrevista'
        }
      },
      set_status_application (id, status) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/application/' + id + '/' + status)
        .then(response => {
          this.get_applicants()
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.get_applicants()

      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.$route.params.position_id)
      .then((response) => {
        this.position = response.data.data.position
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
  
  </style>