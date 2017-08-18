<template>
  <div id="general-container">
    <div id="container-preview">
      <div class="panel panel-default">
        <div class="panel-body position-panel">
          <h3>{{ name }} - {{ city }}</h3>
          <router-link to="/positions">(Ver Todas las posiciones)</router-link>

          <label>Descripción de la posición</label>
          <p>{{ description }}</p>

          <label>Descripción del equipo de trabajo</label>
          <p>{{ work_team_description }}</p>

          <label>Características que estamos buscando en un empleado</label>
          <p>{{ candidate_characteristics }}</p>

          <application-form :position="id"></application-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ApplicationForm from './ApplicationForm'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
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
        expiration_date: ''
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      exit () {
        window.location.href = '/positions'
      }
    },
    mounted () {
      if (this.$route.query.id !== undefined) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.query.id)
        .then((response) => {
          this.id = JSON.parse(response.data.data.position).id
          this.name = JSON.parse(response.data.data.position).name
          this.department_id = JSON.parse(response.data.data.position).department_id
          this.description = JSON.parse(response.data.data.position).description
          this.city = JSON.parse(response.data.data.position).city
          this.work_team_description = JSON.parse(response.data.data.position).work_team_description
          this.candidate_characteristics = JSON.parse(response.data.data.position).candidate_characteristics
          this.publication_date = JSON.parse(response.data.data.position).publication_date.substring(0, 10)
          this.expiration_date = JSON.parse(response.data.data.position).expiration_date.substring(0, 10)
        })
        .catch(error => { console.log(error.response) })
      }
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
</style>