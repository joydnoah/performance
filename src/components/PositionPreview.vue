<template>
  <div id="general-container">
    <div class="general-container">
      <div class="public-page-content">

        <div class="row">
          <div class="col-xs-offset-0 col-xs-8">
            <div class="page-logo">
              <img :src="logo_uri">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-offset-1 col-xs-6">
            <div class="page-title">Acerca de la posición</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-offset-1 col-xs-6">
            <div class="page-item">
              <div class="item-label">Nombre de la posiciòn</div>
              <div class="item-description">{{ name }}</div>
            </div>
            <div class="page-item">
              <div class="item-label">Departamento de la posición</div>
              <div class="item-description">Departamento de finanzas</div>
            </div>
            <div v-show="isEmpty( city )" class="page-item">
              <div class="item-label">Ubicación de la posición</div>
              <div class="item-description">{{ city }}</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-offset-1 col-xs-6">
            <div v-show="isEmpty( description )" class="page-item">
              <div class="item-label">Descripción de la posición</div>
              <div id="description_id" class="item-description" style="word-break: break-all;"></div>
            </div>
            <div class="page-item">
              <div v-show="isEmpty( work_team_description )" class="item-label">Equipo de trabajo</div>
              <div id="work_team_description_id" class="item-description"></div>
            </div>
            <div class="page-item">
              <div v-show="isEmpty( candidate_characteristics )" class="item-label">Que buscamos</div>
              <div id="candidate_characteristics_id" class="item-description"></div>
            </div>
          </div>
        </div>

        <a @click="go_back()" class="btn btn-warning">Regresar</a>

      </div><!-- create-form end -->
    </div><!-- create-form-container end -->
  </div>
</template>
<script>
import ApplicationForm from './ApplicationForm'

export default {
  components: {
    ApplicationForm
  },
  data: function () {
    return {
      id: '',
      name: '',
      department_id: '',
      position_type_id: '',
      city: '',
      description: '',
      work_team_description: '',
      candidate_characteristics: '',
      questions: '',
      preformulated_questions: '',
      publication_date: '',
      expiration_date: '',
      status_type: '',
      bucket: process.env.AWS_S3_BUCKET,
      url_position: window.location.href,
      logo_uri: '/static/html_layout/images/logo-color.png'
    }
  },
  head: {
    meta: [
      { property: 'fb:app_id', content: '123456789' },
      { property: 'og:title', content: 'Content Title' },
      // with shorthand
      { p: 'og:image', c: 'https://example.com/image.jpg' }
    ]
  },
  methods: {
    exit () {
      window.location.href = '/positions'
    },
    isEmpty (str) {
      return !!str
    },
    go_back () {
      window.location.href = '/position?id=' + this.id
    },
    setDescriptionContent () {
      document.getElementById('description_id').innerHTML = this.description
      document.getElementById('work_team_description_id').innerHTML = this.work_team_description
      document.getElementById('candidate_characteristics_id').innerHTML = this.candidate_characteristics
    }
  },
  mounted () {
    this.axios.get('/position/' + this.$route.params.id)
    .then((response) => {
      if (response.data.data.logo_id !== null && response.data.data.logo_id !== undefined && response.data.data.logo_id !== '') {
        this.logo_uri = 'https://' + this.bucket + '.s3.amazonaws.com/' + response.data.data.logo_id
      }
      this.id = response.data.data.position.id
      this.name = response.data.data.position.name
      this.department_id = response.data.data.position.department_id
      this.description = response.data.data.position.description
      this.city = response.data.data.position.city
      this.work_team_description = response.data.data.position.work_team_description
      this.candidate_characteristics = response.data.data.position.candidate_characteristics
      this.status_type = response.data.data.position.status_type
      this.setDescriptionContent()
    })
    .catch(error => { console.log(error.response) })
  },
  created: function () {
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

</style>
