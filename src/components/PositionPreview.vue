<template>
  <div id="general-container">
    <div id="container-preview">
      <div class="panel panel-default">
        <div class="panel-body position-panel">
          <h3>{{ name }} - {{ city }}</h3>

          <label v-show="isEmpty( description )">Descripción de la posición</label>
          <div id="description_id"></div>

          <label v-show="isEmpty( candidate_characteristics )">Características que estamos buscando en un empleado</label>
          <div id="candidate_characteristics_id"></div>

          <label v-show="isEmpty( work_team_description )">Informacion adicional sobre la posición</label>
          <div id="work_team_description_id"></div>

          <a @click="go_back()" class="btn btn-warning">Regresar</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'

  export default {
    components: {
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
      go_back () {
        window.history.back()
      },
      exit () {
        window.location.href = '/positions'
      },
      isEmpty (str) {
        return !!str
      },
      setDescriptionContent () {
        document.getElementById('description_id').innerHTML = this.description
        document.getElementById('work_team_description_id').innerHTML = this.work_team_description
        document.getElementById('candidate_characteristics_id').innerHTML = this.candidate_characteristics
      }
    },
    mounted () {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.$route.params.id)
      .then((response) => {
        this.id = response.data.data.position.id
        this.name = response.data.data.position.name
        this.department_id = response.data.data.position.department_id
        this.description = response.data.data.position.description
        this.city = response.data.data.position.city
        this.work_team_description = response.data.data.position.work_team_description
        this.candidate_characteristics = response.data.data.position.candidate_characteristics
        this.expiration_date = response.data.data.position.expiration_date.substring(0, 10)
        this.setDescriptionContent()
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
</style>
