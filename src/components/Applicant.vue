<template>
  <div id="general-container">
    <email-modal externalId="scheduled_interview" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'scheduled_interview'" @clear="clear()" @saved="sendEmail('scheduled_interview')"></email-modal>

    <email-modal externalId="scheduled_call" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'scheduled_call'" @clear="clear()" @saved="sendEmail('scheduled_call')"></email-modal>

    <email-modal externalId="rejection" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'reject'" @clear="clear()" @saved="sendEmail('rejection')"></email-modal>

    <email-modal externalId="approved" :showModal="showModal" :closeModal="hideModal" :positionId="positionId" :typeProp="'approved'" @clear="clear()" @saved="sendEmail('approved')"></email-modal>

    <modal :scrollable="false" :adaptive="true" width="60%" height="100%" name="show-pdf">
      <div slot="top-right">
        <button style="padding-right: 20px;" @click="$modal.hide('show-pdf')" class="close-button">
          ❌
        </button>
      </div>
      <div style="width:100%; height:100%;">
        <iframe :src="src" style="width:100%; height:100%;" frameborder="0"></iframe>
      </div>
    </modal>
    <toolbar></toolbar>
    <div class="body-container">
      <div class="section-header">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Detalle del aplicante</h1>
            </div>
          </div>
        </div>
      </div><!-- header end -->
      <div class="applicant-modal-header-container">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-4">
              <div class="header-bookmark is-active"><!-- add .is-active to add blue color as bookmarked -->
                <i class="material-icons">thumb_up</i>
              </div>
              <p class="header-name">
                {{ first_name }} {{ last_name }}
              </p>
            </div>
            <div class="col-xs-2">
              <p class="header-info">Status:</p>
              <p class="header-info">{{ status }}</p>
            </div>
            <div class="col-xs-2">
              <p class="header-info">Score Status:</p>
              <p class="header-info">{{ score_status }}</p>
            </div>
            <div class="col-xs-2">
              <div id="compatibility" class="header-compatibility"><!-- .is-high .is-medium .is-low change color compatibility -->
                <p id="compatibility-text">Esperando a ser calificado</p>
                <p id="compatibility-text-value">-</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="applicant-modal-buttons">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-10">
              <div class="buttons-container">
                <!-- <button id="button_scheduled_call" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success" @click="openModal('scheduled_call')">Invitar a entrevista telefonica</button> -->
                <!-- <button id="button_scheduled_interview" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success" @click="openModal('scheduled_interview')">Invitar a entrevista presencial</button> -->
                <button id="button_approved" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success" @click="openModal('approved')">Marcar como contratado</button>
                <button id="button_rejection" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error" @click="openModal('rejection')">Rechazar candidato</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="applicant-modal-content">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-title">Datos Personales</div>
            </div>
            <div class="col-xs-offset-2 col-xs-8">
              <div class="content-item">e-Mail: {{ email }}</div>
              <div class="content-item">Teléfono: {{ phone_number }}</div>
            </div>
            <div class="col-xs-offset-2 col-xs-8">
              <div class="content-item">Usuario Linkedin: {{ linkedin_user }}</div>
              <div class="content-item">Usuario Twitter: {{ twitter_user }}</div>
            </div>
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-separator"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="false" class="applicant-modal-content">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-title">Description</div>
            </div>
            <div class="col-xs-offset-2 col-xs-8">
              <div class="content-text">The customers are athletes who do not yet have large commercial contracts - these are aspiring and young dedicated and focussed individuals, many of whom have Tokyo 2020 in mind. The other side of the market is brands, who are looking to get involved in the lives of the athletes, and are looking to reach the fans and followers of these athletes.</div>
            </div>
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-separator"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="skills_list.length > 0"  class="applicant-modal-content">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-title">Habilidades</div>
            </div>
            <div class="col-xs-offset-2 col-xs-8">
              <div v-for="items in skills_list" class="content-tag">{{ items[1] }}</div>
            </div>
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-separator"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="degree.length > 0"  class="applicant-modal-content">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-title">Educación</div>
            </div>
            <div class="col-xs-offset-2 col-xs-8">
              <div v-for="items in degree">
                <div v-if="items.Degree !== undefined" class="content-item">Nivel: {{ items.Degree["@degreeType"] }}</div>
                <div v-if="items.School !== undefined" class="content-item">Lugar: {{ items.School.SchoolName }}</div>
                <div class="content-item">{{ items.Degree.Comments }}</div>
              </div>
            </div>
            <div class="col-xs-offset-1 col-xs-10">
              <div class="content-separator"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="applicant-modal-download">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-offset-1 col-xs-8">
              <div class="download-title">Documentos</div>
            </div>
          </div>
          <div  v-for="item in documents" class="row">
            <div style="padding-top: 30px;" class="col-xs-offset-2 col-xs-4">
              <div class="content-item">{{ item.original_name }}</div>
            </div>
            <div style="padding-top: 30px;" class="col-xs-4">
              <div class="content-item">{{ item.type_file == 'presentation_letter'? 'Carta de presentación': 'Curriculum Vitae' }}</div>
            </div>
            <div style="padding-top: 30px;" class="col-xs-2">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent download-button" @click="show(item)">Ver</button>
            </div>
          </div>
        </div>
      </div>

      <div class="pdf-viewer">

      </div>

    </div><!-- modal-body ends -->
    <!--
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Detalles del candidato</h3></div>
      <div class="panel-body">
        <div class="form">
          <label>Nombre</label>
          <p>{{ first_name }}</p>
          <label>Apellido</label>
          <p>{{ last_name }}</p>
          <label>e-Mail</label>
          <p>{{ email }}</p>
          <label>Teléfono</label>
          <p>{{ phone_code }} - {{ phone_number }}</p>
          <label>Usuario Linkedin</label>
          <p>{{ linkedin_user }}</p>
          <label>Usuario Twitter</label>
          <p>{{ twitter_user }}</p>
          <label>Status</label>
          <p>{{ status }}</p>
          <label>Score</label>
          <p>{{ score }}</p>
          <table class="table">
            <caption>Documentos Adjuntos</caption>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Nombre Archivo</th>
                <th>Tipo de Archivo</th>
                <th>Ver Archivo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in documents">
                <td>{{ item.position_name }}</td>
                <td>{{ item.original_name }}</td>
                <td>{{ item.type_file == 'presentation_letter'? 'Carta de presentación': 'Curriculum Vitae' }}</td>
                <td>
                  <button @click="show(item)">Open</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="general-container">
          <a @click="go_back()" class="btn btn-warning">Regresar</a>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import Toolbar from './Toolbar'
  import EmailModal from './EmailModal'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'

  export default {
    components: {
      Toolbar,
      AppNav,
      EmailModal
    },
    data: function () {
      return {
        positionId: this.$route.params.applications_id,
        applicant_id: this.$route.params.position_id,
        id: this.$route.params.id,
        first_name: '',
        last_name: '',
        email: '',
        phone_code: '',
        phone_number: '',
        linkedin_user: '',
        twitter_user: '',
        created_at: '',
        documents: [],
        bucket: process.env.AWS_S3_BUCKET,
        page: 1,
        numPages: 0,
        rotate: 0,
        src: '',
        parse: null,
        score: null,
        score_status: 'No parseado',
        status: '',
        skills_list: [],
        degree: [],
        showModal: '',
        hideModal: ''
      }
    },
    methods: {
      openModal (id) {
        this.showModal = id
      },
      clear () {
        this.showModal = ''
        this.hideModal = ''
      },
      sendEmail (id) {
        this.set_status_application(id)
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      buildPdfUrl (id, extension) {
        return 'https://' + this.bucket + '.s3.amazonaws.com/' + id
      },
      buildDocUrl (id, extension) {
        var wordUrl = 'https://view.officeapps.live.com/op/view.aspx?src='
        var file = 'https%3A%2F%2F' + this.bucket + '.s3.amazonaws.com%2F' + id
        return wordUrl + file
      },
      show (item) {
        var extension = item.original_name.split('.').slice(-1)[0]
        if (extension === 'pdf') {
          this.src = this.buildPdfUrl(item.id, extension)
        } else {
          this.src = this.buildDocUrl(item.id, extension)
        }
        this.$modal.show('show-pdf')
      },
      hide () {
        this.$modal.hide('show-pdf')
      },
      go_back () {
        history.go(-1)
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
      set_status_application (status) {
        var defaultButtonMessage = document.getElementById('button_' + status).innerHTML
        this.changeButtonMessage('button_' + status, 'Enviando...')
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/application/' + this.id + '/' + status)
        .then(response => {
          this.get_status()
          this.changeButtonMessage('button_' + status, defaultButtonMessage)
          this.hideModal = status
        })
        .catch(error => { console.log(error.response) })
      },
      get_parser_status () {
        this.axios.get('/parse/' + this.documents[0].id)
        .then((response) => {
          if (response.data.data.parse[1] !== null) {
            this.score_status = 'Parseado'
            this.skills_list = response.data.data.skills_list
            this.degree = response.data.data.education_history
            this.get_score()
          }
        })
        .catch(error => { console.log(error.response) })
      },
      change_compatibility (score) {
        document.getElementById('compatibility-text').innerHTML = 'Compatibilidad:'
        document.getElementById('compatibility-text-value').innerHTML = score + '%'
        if (score < 40.0) {
          document.getElementById('compatibility').classList.add('is-low')
        }
        if (score >= 40.0 && score < 70.0) {
          document.getElementById('compatibility').classList.add('is-medium')
        }
        if (score >= 70.0) {
          document.getElementById('compatibility').classList.add('is-high')
        }
      },
      get_score () {
        this.axios.get('/score/' + this.documents[0].id)
        .then((response) => {
          this.score = response.data.data.score[2]
          if (this.score === null) {
            this.score_status = 'Esperando para calificar'
          } else {
            this.score_status = 'Calificado'
            this.change_compatibility(this.score)
          }
        })
        .catch(error => { console.log(error.response) })
      },
      changeButtonMessage (buttonId, message) {
        var buttonElement = document.getElementById(buttonId)
        buttonElement.disabled = !document.getElementById(buttonId).disabled
        buttonElement.innerHTML = message
        // The following code is to remove the additional span created when the button is clicked, if removed after click the button would look brigther.
        if (buttonElement.childNodes[1] !== undefined) {
          buttonElement.removeChild(buttonElement.childNodes[1])
        }
      },
      get_status () {
        this.axios.get('/applications/' + this.$route.params.applications_id)
        .then((response) => {
          for (var i = 0; i < response.data.data.applicants.length; i++) {
            if (response.data.data.applicants[i].id === this.id) {
              this.status = this.get_applicants_status(response.data.data.applicants[i].status_application)
            }
          }
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.get_status()
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/applicant/' + this.applicant_id)
      .then((response) => {
        this.first_name = response.data.data.applicant.first_name
        this.last_name = response.data.data.applicant.last_name
        this.email = response.data.data.applicant.email
        this.phone_code = response.data.data.applicant.phone_code
        this.phone_number = response.data.data.applicant.phone_number
        this.linkedin_user = response.data.data.applicant.linkedin_user
        this.twitter_user = response.data.data.applicant.twitter_user
        this.created_at = response.data.data.applicant.created_at
      })
      .catch(error => { console.log(error.response) })
      this.axios.get('/applicant/documents/' + this.applicant_id)
      .then((response) => {
        this.documents = response.data.data.documents
        this.get_parser_status()
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
  #container-positions{
    width: 60%;
    margin: 0 auto;
  }
  #add-section{
    text-align: right;
    width: 100%;
    padding: 1em 1em 1em 1em;
  }
  .required-span{
    color: #a94442;
  }
  .v--modal-overlay {
    background: rgba(0,0,0,0.8) ;
  }
</style>
