<template>
  <div id="general-container">
    <modal :scrollable="false" :adaptive="true" width="60%" height="100%" name="show-pdf">
      <div slot="top-right">
        <button @click="$modal.hide('show-pdf')" class="close-button">
          ❌
        </button>
      </div>
      <div style="width:100%; height:100%;">
        <iframe :src="src" style="width:100%; height:100%;" frameborder="0"></iframe>
      </div>
    </modal>
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
        status: 'No parseado'
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      show (item) {
        this.src = 'https://' + this.bucket + '.s3.amazonaws.com/' + item.id + '.' + item.original_name.split('.')[1]
        this.$modal.show('show-pdf')
      },
      hide () {
        this.$modal.hide('show-pdf')
      },
      go_back () {
        history.go(-1)
      },
      get_parser_status () {
        this.axios.get('/parse/' + this.documents[0].id)
        .then((response) => {
          if (response.data.data.parse[1] !== null) {
            this.status = 'Parseado'
            this.get_score()
          }
        })
        .catch(error => { console.log(error.response) })
      },
      get_score () {
        this.axios.get('/score/' + this.documents[0].id)
        .then((response) => {
          this.score = response.data.data.score[2]
          if (this.score === null) {
            this.status = 'Esperando para calificar'
          } else {
            this.status = 'Calificado'
          }
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/applicant/' + this.id)
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
      this.axios.get('/applicant/documents/' + this.id)
      .then((response) => {
        this.documents = response.data.data.documents
        this.get_parser_status()
      })
      .catch(error => { console.log(error.response) })
    }
  }
</script>

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
