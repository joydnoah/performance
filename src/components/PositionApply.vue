<template>
  <div id="general-container">
    <div id="container-preview">
      <div class="panel panel-default">
        <div class="panel-body position-panel">
          <tooltip text="Copiar enlace">
            <button id="copy-link" v-clipboard:copy="url_position" class="btn btn-primary btn-xs"><i class="glyphicon glyphicon-link"></i></button>
          </tooltip>
          <h3>{{ name }} - {{ city }}</h3>

          <label v-show="isEmpty( description )">Descripción de la posición</label>
          <p>{{ description }}</p>

          <label v-show="isEmpty( work_team_description )">Descripción del equipo de trabajo</label>
          <p>{{ work_team_description }}</p>

          <label v-show="isEmpty( candidate_characteristics )">Características que estamos buscando en un empleado</label>
          <p>{{ candidate_characteristics }}</p>

          <application-form :position="id" :status="status_type"></application-form>
        </div>
      </div>
    </div>
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
        url_position: window.location.href
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
      }
    },
    mounted () {
      this.axios.get('/position/' + this.$route.params.id)
      .then((response) => {
        this.id = response.data.data.position.id
        this.name = response.data.data.position.name
        this.department_id = response.data.data.position.department_id
        this.description = response.data.data.position.description
        this.city = response.data.data.position.city
        this.work_team_description = response.data.data.position.work_team_description
        this.candidate_characteristics = response.data.data.position.candidate_characteristics
        this.status_type = response.data.data.position.status_type
      })
      .catch(error => { console.log(error.response) })
    }
    /*
    beforeCreate: function () {
      var metaTags = [
        ['property', 'og:title', 'Cotopaxi'],
        ['property', 'og:site_name', 'Cotopaxi'],
        ['property', 'og:description', 'contenido 3'],
        ['property', 'og:description', 'contenido 3'],
        ['property', 'og:image', 'http://placeme.life/images/opimage.jpg'],
        ['property', 'og:url', document.URL],
        ['property', 'og:type', 'website'],
        ['name', 'twitter:card', 'summary'],
        ['name', 'twitter:site', '@user'],
        ['name', 'twitter:creator', '@soyelhijo'],
        ['name', 'twitter:title', 'contenido 4'],
        ['name', 'twitter:image', 'http://placeme.life/images/opimage.jpg']
      ]
      for (var i = 0; i < metaTags.length; i++) {
        this.meta_tag = document.createElement('meta')
        this.meta_tag.setAttribute(metaTags[i][0], metaTags[i][1])
        this.meta_tag.setAttribute('content', metaTags[i][2])
        document.head.appendChild(this.meta_tag)
      }
    }
    */
  }
</script>
<style scoped>
    #container-preview{
      width: 60%;
      margin: 3em auto;
      margin-bottom: 1em;
    }
    .position-panel{
      padding: 3em 3em 3em 3em;
    }
    a{
      margin-bottom: 50px;
    }
    label{
      display: block;
      margin-top: 2em;
      margin-bottom: 1em;
      font-size: 1em;
    }

    p{
      display: block;
      text-align: justify;
      font-size: 1em;
    }
    #copy-link{
      float: right;
    }
</style>
