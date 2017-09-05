<template>
  <div id="general-container">
    <div id="container-preview">
      <div class="panel panel-default">
        <div class="panel-body position-panel">
          <tooltip text="Copiar enlace">
            <button id="copy-link" v-clipboard:copy="url_position" class="btn btn-primary btn-xs"><i class="glyphicon glyphicon-link"></i></button>
          </tooltip>
          <h3>{{ name }} - {{ city }}</h3>

          <label>Descripción de la posición</label>
          <p>{{ description }}</p>

          <label>Descripción del equipo de trabajo</label>
          <p>{{ work_team_description }}</p>

          <label>Características que estamos buscando en un empleado</label>
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
    methods: {
      exit () {
        window.location.href = '/positions'
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