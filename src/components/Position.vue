<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-position" class="panel panel-default">
      <div class="panel-heading"><h3>Crear Oferta de Posición</h3></div>
        <div class="panel-body">
          <div class="form-group" v-bind:class="{ 'has-error': $v.name.$error }">
            <label>Nombre de la posición *</label>
            <input type='text' name='name' v-on:input="$v.name.$touch" class="form-control form__input" v-model='name' />
          </div>
          <div class="form-group">
            <label>Descripción de la posición</label>
            <textarea name='description' class="form-control" v-model='description'></textarea>
          </div>
          <div class="form-group">
            <label>Descripción del equipo de trabajo</label>
            <textarea name='work_team_description' class="form-control" v-model='work_team_description'></textarea>
          </div>
          <div class="form-group">
            <label>Características que estas buscando en un empleado</label>
            <textarea name='candidate_characteristics' class="form-control" v-model='candidate_characteristics'></textarea>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.publication_date.$error }">
            <label>Fecha de Publicación</label>
            <input type='date' v-on:input="$v.publication_date.$touch" name='publication_date' class="form-control" v-model='publication_date' />
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.expiration_date.$error }">
            <label>Fecha de caducidad de la oferta de posición</label>
            <input type='date' v-on:input="$v.expiration_date.$touch" name='expiration_date' class="form-control" v-model='expiration_date' />
          </div>
          <button class="btn btn-success" @click="save($v)">Guardar y Salir</button>
          <button class="btn btn-danger" v-on:click="exit()">Salir sin Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { required } from 'vuelidate/lib/validators'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
        name: '',
        department_id: '',
        position_type_id: '',
        city_id: '',
        description: '',
        work_team_description: '',
        candidate_characteristics: '',
        questions: '',
        preformulated_questions: '',
        publication_date: '',
        expiration_date: ''
      }
    },
    validations: {
      name: {
        required
      },
      expiration_date: {
        required
      },
      publication_date: {
        required
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      exit () {
        window.location.href = '/positions'
      },
      save (v) {
        if (this.id !== undefined) {
          this.put(v)
        } else {
          this.post(v)
        }
      },
      put (v) {
        v.$touch()
        if (!v.$error) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/position/' + this.id, {
            'name': this.name,
            'description': this.description,
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'publication_date': this.publication_date,
            'expiration_date': this.expiration_date
          })
          .then(response => {
            window.location.href = '/positions'
          })
          .catch(error => { console.log(error.response) })
        }
      },
      post (v) {
        v.$touch()
        if (!v.$error) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.post('/positions', {
            'company_id': localStorage['company_id'],
            'name': this.name,
            'description': this.description,
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'publication_date': this.publication_date,
            'expiration_date': this.expiration_date
          })
          .then(response => {
            window.location.href = '/positions'
          })
          .catch(error => { console.log(error.response) })
        }
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
    #container-position{
      width: 80%;
      margin: 0 auto;
      margin-bottom: 1em;
    }
    input, label, textarea, select, button{
      display: block;
      margin: 0 auto;
    }
    button{
      display: inline-block;
    }
</style>