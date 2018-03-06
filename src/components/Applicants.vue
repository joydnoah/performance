<template>
  <div id="general-container">
    <div class="modal fade modal-confirmation" id="modal-confirmation">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="confirmation-message-container">
              <div class="confirmation-message">¿Desea activar la plantilla de correo electronico que se enviara automaticamente a los candidatos?</div>
            </div>
            <div class="confirmation-btn-container">
              <button v-on:click="hide('modal-confirmation')" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-cancel" data-dismiss="modal" aria-label="Close">No enviar correo por ahora</button>
              <button v-on:click="changeModal('modal-confirmation', 'modal-email')" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm" data-dismiss="modal" aria-label="Close">Si, activar plantilla</button>
            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>

    <div class="modal fade modal-email-template" id="modal-email-scheduled_call">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header">
              <h4 class="modal-title col-xs-10" id="modal-document-type">Detalle del aplicante</h4>
              <button v-on:click="hide('modal-email-' + statusAction)"  type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
            </div>
            <div class="modal-body">
              <div id="scheduled_call">
                scheduled call
                <email-control-template :send="saveForm0" :buttons="false" :position_id="position_id" :type_prop="'scheduled_call'" @status_change="onEmailUpdate($event, 0)" @saved="sendEmail()"></email-control-template>
                <div v-if="status[0]" class="email-template-content">
                  <div class="template-body is-active">
                    <div class="form-btn-container">
                      <button v-on:click="hide('modal-email-' + statusAction)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Salir sin guardar</button>
                      <button v-on:click="saveFormAction(0)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Guardar y salir</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>

    <div class="modal fade modal-email-template" id="modal-email-scheduled_interview">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header">
              <h4 class="modal-title col-xs-10" id="modal-document-type">Detalle del aplicante</h4>
              <button v-on:click="hide('modal-email-' + statusAction)"  type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
            </div>
            <div class="modal-body">

              <div  id="scheduled_interview'">
                scheduled interview
                <email-control-template :send="saveForm1" :buttons="false" :position_id="position_id" :type_prop="'scheduled_interview'" @status_change="onEmailUpdate($event, 1)" @saved="sendEmail()"></email-control-template>
                <div v-if="status[1]" class="email-template-content">
                  <div class="template-body is-active">
                    <div class="form-btn-container">
                      <button v-on:click="hide('modal-email-' + statusAction)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Salir sin guardar</button>
                      <button v-on:click="saveFormAction(1)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Guardar y salir</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>

    <div class="modal fade modal-email-template" id="modal-email-approved">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header">
              <h4 class="modal-title col-xs-10" id="modal-document-type">Detalle del aplicante</h4>
              <button v-on:click="hide('modal-email-' + statusAction)"  type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
            </div>
            <div class="modal-body">

              <div id="approved">
                approved
                <email-control-template :send="saveForm2" :buttons="false" :position_id="position_id" :type_prop="'approved'" @status_change="onEmailUpdate($event, 2)" @saved="sendEmail()"></email-control-template>
                <div v-if="status[2]" class="email-template-content">
                  <div class="template-body is-active">
                    <div class="form-btn-container">
                      <button v-on:click="hide('modal-email-' + statusAction)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Salir sin guardar</button>
                      <button v-on:click="saveFormAction(2)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Guardar y salir</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>

    <div class="modal fade modal-email-template" id="modal-email-rejection">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header">
              <h4 class="modal-title col-xs-10" id="modal-document-type">Detalle del aplicante</h4>
              <button v-on:click="hide('modal-email-' + statusAction)"  type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
            </div>
            <div class="modal-body">

              <div id="rejection">
                rejection
                <email-control-template :send="saveForm3" :buttons="false" :position_id="position_id" :type_prop="'reject'" @status_change="onEmailUpdate($event, 3)" @saved="sendEmail()"></email-control-template>
                <div v-if="status[3]" class="email-template-content">
                  <div class="template-body is-active">
                    <div class="form-btn-container">
                      <button v-on:click="hide('modal-email-' + statusAction)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Salir sin guardar</button>
                      <button v-on:click="saveFormAction(3)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Guardar y salir</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>
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
                <div class="results-status-number">{{ applicants.length }} de {{ applicants.length }}</div>
                <div class="results-status-message">Candidatos activos que concuerdan con tus requisitos mínimos</div>
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
                  Favoritos
                </p>
              </div>
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
              <div class="col-xs-2">
                <div :id="'id-' + item.applicant_id" class="row-compatibility"><!-- .is-high .is-medium .is-low change color compatibility -->
                  <p :id="'label-' + item.applicant_id">Sin Parsear</p>
                  <div class="compatibility-container">
                    <div class="compatibility-level">{{ getDocuments(item.applicant_id) }}</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-2">
                <div :id="'buttonMenu-' + item.id" class="dropdown actions-dropdown">
                  <button :id="'dLabel-' + item.id" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <!-- @click="openCloseMenu(item.id)"  -->
                    Acciones
                    <i class="material-icons">keyboard_arrow_down</i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dLabel">
                    <li @click="go_to(item.applicant_id, item.id)">Ver detalle</li>
                    <li @click="openEmailModal(item.id, 'scheduled_call')">Invitar a entrevista telefonica</li> <!-- set_status_application(item.id, 'scheduled_call') -->
                    <li @click="openEmailModal(item.id, 'scheduled_interview')">Invitar a entrevista presencial</li>
                    <li @click="openEmailModal(item.id, 'approved')">Marcar como contratado</li>
                    <li @click="openEmailModal(item.id, 'rejection')" class="is-negative">Rechazar candidato</li><!-- .is-negative add error color to negative acctions -->
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
          <a href="/positions" class="btn btn-warning">Regresar</a>
        </div>
      </div>
  </div>
</template>


<script>
  import Toolbar from './Toolbar'
  import LayoutHeader from './LayoutHeader'
  import EmailControlTemplate from './EmailControlTemplate'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'

  export default {
    components: {
      Toolbar,
      EmailControlTemplate,
      LayoutHeader
    },
    data: function () {
      return {
        applicants: {},
        position: {},
        position_id: this.$route.params.position_id,
        bootstrap_min_js: null,
        list: { 'first_name': true, 'created_at': true, 'status_application': true },
        actual_order_attribute: {atrribute: 'created_at', asc_desc: 'false'},
        saveForm0: false,
        saveForm1: false,
        saveForm2: false,
        saveForm3: false,
        status: [true, true, true, true],
        itemClicked: '',
        statusAction: 'scheduled_call'
      }
    },
    methods: {
      sendEmail () {
        this.set_status_application(this.itemClicked, this.statusAction)
      },
      onEmailUpdate (e, num) {
        this.status[num] = e
      },
      saveFormAction (num) {
        switch (num) {
          case 0:
            this.saveForm0 = !this.saveForm0
            break
          case 1:
            this.saveForm1 = !this.saveForm1
            break
          case 2:
            this.saveForm2 = !this.saveForm2
            break
          case 3:
            this.saveForm3 = !this.saveForm3
            break
        }
      },
      openEmailModal (itemClicked, itemAction) {
        this.itemClicked = itemClicked
        this.statusAction = itemAction
        this.show('modal-confirmation')
      },
      changeModal (idToHide, idToShow) {
        this.hide(idToHide)
        this.show(idToShow + '-' + this.statusAction)
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
          if (score === null) {
            document.getElementById('label-' + id).innerHTML = 'Esperando para calificar'
          } else {
            this.updateCompatibility(score, id)
          }
        })
        .catch(error => { console.log(error.response) })
      },
      changeCompatibilityValue (id, value) {
        document.getElementById('id-' + id).classList.add('is-' + value)
        document.getElementById('label-' + id).innerHTML = 'Compatibilidad ' + value.replace('low', 'baja').replace('medium', 'media').replace('high', 'alta')
      },
      updateCompatibility (score, id) {
        if (document.getElementById('label-' + id) !== null) {
          document.getElementById('id-' + id).className = 'row-compatibility'
          if (score < 40.0) {
            this.changeCompatibilityValue(id, 'low')
          }
          if (score >= 40.0 && score < 70.0) {
            this.changeCompatibilityValue(id, 'medium')
          }
          if (score >= 70.0) {
            this.changeCompatibilityValue(id, 'high')
          }
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
      set_status_application (id, status) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/application/' + id + '/' + status)
        .then(response => {
          this.get_applicants(this.actual_order_attribute.attribute, this.actual_order_attribute.asc_desc)
          this.hide('modal-email-' + this.statusAction)
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.get_applicants('created_at')
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.position_id)
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
