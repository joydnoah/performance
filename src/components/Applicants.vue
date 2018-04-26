<template>
  <div id="general-container">
    <alert-modal :typeMessage="typeMessage" :message="alertMessage" :activate="showAlert" :type="typeOfAlert" time="5"></alert-modal>

    <div class="modal fade modal-confirmation" id="modal-confirmation">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="confirmation-message-container">
              <div class="confirmation-message">¿Desea activar la plantilla de correo electronico que se enviara automaticamente a los candidatos?</div>
            </div>
            <div class="confirmation-btn-container">
              <button v-on:click="changeWithNoEmail()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-cancel" data-dismiss="modal" aria-label="Close">No enviar correo por ahora</button>
              <button v-on:click="changeModal('modal-confirmation', 'modal-email')" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm" data-dismiss="modal" aria-label="Close">Si, activar plantilla</button>
            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>

    <email-modal externalId="scheduled_interview" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'scheduled_interview'" @clear="clear()" @saved="sendEmail('scheduled_interview')"></email-modal>

    <email-modal externalId="scheduled_call" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'scheduled_call'" @clear="clear()" @saved="sendEmail('scheduled_call')"></email-modal>

    <email-modal externalId="rejection" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'reject'" @clear="clear()" @saved="sendEmail('rejection')"></email-modal>

    <email-modal externalId="approved" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'approved'" @clear="clear()" @saved="sendEmail('approved')"></email-modal>


      <toolbar></toolbar>
      <!-- body-container start -->
      <div class="body-container">
        <layout-header :title="position.name"></layout-header>
        <div class="empty-message-container" v-show="!make_visible()">

          <div class="row">
            <div class="col-xs-offset-4 col-xs-4">
              <div class="empty-icon">
                <i class="material-icons">account_circle</i>
              </div>
              <div class="empty-message">En este momento no hay candidatos que hayan aplicado a esta oferta</div>
            </div>
          </div>

        </div>
        <!-- results-status start -->
        <div class="general-container" v-show="make_visible()">
          <div class="row">
            <div class="col-xs-12">
              <div class="result-status-container">
                <!-- <div class="results-status-number">{{ applicants.length }} de {{ applicants.length }}</div>
                <div class="results-status-message">Candidatos activos que concuerdan con tus requisitos mínimos</div> -->
                <div class="results-status-message">Candidatos</div>
              </div>
            </div>
          </div>
        </div><!-- results-status end -->

        <div class="general-container" v-show="make_visible()">
          <!-- offer-header start -->
          <div class="offer-header-container">
            <div class="row">
              <div class="col-xs-3">
                <p id='first_name' class="header-title" @click="changeOrder($event.target.id)">
                  Nombre
                </p>
              </div>
              <div class="col-xs-2">
                <p id="created_at" class="header-title" @click="changeOrder($event.target.id)"><!-- .descending add sort down icon -->
                  Fecha de solicitud
                </p>
              </div>
              <div class="col-xs-2">
                <p id="status_application" class="header-title"  @click="changeOrder($event.target.id)"><!-- .ascending add sort up icon -->
                  Status
                </p>
              </div>
              <div class="col-xs-5">
                <p class="header-title compatibility-title">
                  Educación
                </p>
                <p class="header-title compatibility-title">
                  Experiencia
                </p>
                <p class="header-title compatibility-title">
                  Habilidades
                </p>
                <p class="header-title compatibility-title">
                  Total
                </p>
              </div>
              <div class="col-xs-2">
              </div>
            </div>
          </div><!-- offer-header end -->

          <div class="applicant-row-container" v-for="item in applicants">
            <div class="row top-row">
              <div class="row-bookmark is-active"><!-- add .is-active to add blue color as bookmarked -->
                <i class="material-icons">thumb_up</i>
              </div>
              <div class="col-xs-3">
                <a @click="go_to(item.applicant_id, item.id)" class="row-info row-name-link">
                  {{ item.applicant_first_name }} {{ item.applicant_last_name }}
                </a>
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
              <div class="col-xs-5">
                <div :id="'id-education-' + item.applicant_id" class="row-compatibility"><!-- .is-high .is-medium .is-low change color compatibility -->
                  <p :id="'value-education-' + item.applicant_id">-</p>
                </div>

                <div :id="'id-experience-' + item.applicant_id" class="row-compatibility"><!-- .is-high .is-medium .is-low change color compatibility -->
                  <p :id="'value-experience-' + item.applicant_id">-</p>
                </div>

                <div :id="'id-skills-' + item.applicant_id" class="row-compatibility"><!-- .is-high .is-medium .is-low change color compatibility -->
                  <p :id="'value-skills-' + item.applicant_id">-</p>
                </div>

                <div :id="'id-' + item.applicant_id" class="row-compatibility compatibility-total"><!-- .is-high .is-medium .is-low change color compatibility -->
                  <p :id="'value-' + item.applicant_id">-{{ getDocuments(item.applicant_id) }}</p>
                </div>
              </div>
              <div class="dropdown actions-dropdown">
                <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="material-icons">more_horiz</i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dLabel">
                  <li @click="go_to(item.applicant_id, item.id)">Ver detalle</li>
                  <!-- <li @click="openEmailModal(item.id, 'scheduled_call')">Invitar a entrevista telefonica</li> -->
                  <!-- <li @click="openEmailModal(item.id, 'scheduled_interview')">Invitar a entrevista presencial</li> -->
                  <li @click="set_status_application(item.id, 'approved', 'modal-confirmation')"">Marcar como contratado</li>
                  <li @click="openEmailModal(item.id, 'rejection')" class="is-negative">Rechazar candidato</li><!-- .is-negative add error color to negative acctions -->
                </ul>
              </div>
            </div>
            <div class="row bottom-row">
              <div class="col-xs-12">
                <div class="row-info">
                  <p class="row-description">
                  </p>
                </div>
              </div>
            </div>
          </div><!-- applicant-row end -->

          <a href="/positions" class="btn btn-warning">Regresar</a>
        </div>
      </div>
  </div>
</template>


<script>
  import Toolbar from './Toolbar'
  import LayoutHeader from './LayoutHeader'
  import EmailControlTemplate from './EmailControlTemplate'
  import EmailModal from './EmailModal'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import AlertModal from './AlertModal'

  export default {
    components: {
      Toolbar,
      EmailControlTemplate,
      LayoutHeader,
      EmailModal,
      AlertModal
    },
    data: function () {
      return {
        showModal: '',
        hideModal: '',
        applicants: {},
        position: {},
        positionId: this.$route.params.position_id,
        bootstrap_min_js: null,
        list: { 'first_name': true, 'created_at': true, 'status_application': true },
        actual_order_attribute: {atrribute: 'created_at', asc_desc: 'false'},
        clickedApplicantId: '',
        showAlert: true,
        typeOfAlert: '',
        typeMessage: '',
        alertMessage: '',
        statusAction: 'scheduled_call'
      }
    },
    methods: {
      changeWithNoEmail () {
        this.set_status_application(this.clickedApplicantId, this.statusAction, 'modal-confirmation')
        this.hide('modal-confirmation')
      },
      openModal (id) {
        this.showModal = id
      },
      closeModal (id) {
        this.hideModal = id
      },
      clear () {
        this.showModal = ''
        this.hideModal = ''
      },
      sendEmail (id) {
        this.set_status_application(this.clickedApplicantId, this.statusAction, id)
      },
      openEmailModal (clickedApplicantId, itemAction) {
        this.clickedApplicantId = clickedApplicantId
        this.statusAction = itemAction
        this.show('modal-confirmation')
      },
      changeModal (idToHide, idToShow) {
        this.hide(idToHide)
        this.openModal(this.statusAction)
      },
      show (id) {
        document.getElementById(id).className += ' show'
        document.getElementById(id).classList.remove('fade')
      },
      hide (id) {
        document.getElementById(id).className += ' fade'
        document.getElementById(id).classList.remove('show')
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      changeOrder (id) {
        this.get_applicants(id)
        this.list[id] = !this.list[id]
      },
      getDocuments (id) {
        this.axios.get('/applicant/documents/' + id)
        .then((response) => {
          this.getParserStatus(response.data.data.documents[0].id, id)
        })
        .catch(error => { console.log(error.response) })
      },
      getParserStatus (documentId, id) {
        this.axios.get('/parse/' + documentId)
        .then((response) => {
          if (response.data.data.parse[1] !== null) {
            this.getScore(documentId, id)
          }
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      getScore (documentId, id) {
        this.axios.get('/score/' + documentId)
        .then((response) => {
          var score = response.data.data.score[2]
          var experienceScore = response.data.data.subscores.experience[3]
          var educationScore = response.data.data.subscores.education[3]
          var skillsScore = response.data.data.subscores.skills[3]
          if (score !== null) {
            this.updateCompatibility(experienceScore, 'experience-' + id, 'row-compatibility')
            this.updateCompatibility(educationScore, 'education-' + id, 'row-compatibility')
            this.updateCompatibility(skillsScore, 'skills-' + id, 'row-compatibility')
            this.updateCompatibility(score, id, 'row-compatibility compatibility-total')
          }
        })
        .catch(error => { console.log(error.response) })
      },
      changeCompatibilityValue (id, value, score) {
        document.getElementById('id-' + id).classList.add('is-' + value)
        document.getElementById('value-' + id).innerHTML = score + '<span>%</span>'
      },
      updateCompatibility (score, id, parentClass) {
        document.getElementById('id-' + id).className = parentClass
        if (score < 40.0) {
          this.changeCompatibilityValue(id, 'low', score)
        }
        if (score >= 40.0 && score < 70.0) {
          this.changeCompatibilityValue(id, 'medium', score)
        }
        if (score >= 70.0) {
          this.changeCompatibilityValue(id, 'high', score)
        }
      },
      make_visible () {
        return this.applicants.length > 0
      },
      go_to (positionId, id) {
        window.location.href = '/applicant/' + positionId + '/' + id + '/' + this.$route.params.position_id
      },
      get_applicants (order) {
        this.actual_order_attribute.attribute = order
        this.actual_order_attribute.asc_desc = this.list[order]
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/applications/' + this.$route.params.position_id, {
          params: {
            'order_by': order,
            'asc_or_desc': this.list[order]
          }
        })
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
      set_status_application (id, status, modalId) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/application/' + id + '/' + status)
        .then(response => {
          this.get_applicants(this.actual_order_attribute.attribute, this.actual_order_attribute.asc_desc)
          this.hideModal = modalId
          this.showSuccess('El estato del aplicante a sido cambiado con exito.')
        })
        .catch(error => {
          console.log(error.response)
          this.showError(error)
        })
      },
      showSuccess (msg) {
        this.showAlert = !this.showAlert
        this.typeOfAlert = 'is-success'
        this.typeMessage = msg
        this.alertMessage = ''
      },
      showError (msg) {
        this.showAlert = !this.showAlert
        this.typeOfAlert = 'is-error'
        this.typeMessage = 'Error: '
        this.alertMessage = msg
      }
    },
    mounted: function () {
      this.get_applicants('created_at')
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.positionId)
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
  .modal {
    max-height: calc(100vh);
    overflow-y: auto;
  }
</style>
