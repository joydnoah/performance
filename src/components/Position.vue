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
            <textarea name='position_description' class="form-control" v-model='position_description'></textarea>
          </div>
          <div class="form-group">
            <label>Descripción del equipo de trabajo</label>
            <textarea name='work_team_description' class="form-control" v-model='work_team_description'></textarea>
          </div>
          <div class="form-group">
            <label>Características que estas buscando en un empleado</label>
            <textarea name='position_characteristics' class="form-control" v-model='position_characteristics'></textarea>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.expiration_date_position.$error }">
          <label>Fecha de caducidad de la oferta de posición</label>
          <input type='date' v-on:input="$v.expiration_date_position.$touch" name='expiration_date_position' class="form-control" v-model='expiration_date_position' />
          </div>
          <button class="btn btn-success" @click="post_position($v)">Guardar y Salir</button>
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
        position_description: '',
        work_team_description: '',
        position_characteristics: '',
        questions: '',
        preformulated_questions: '',
        expiration_date_position: ''
      }
    },
    validations: {
      name: {
        required
      },
      expiration_date_position: {
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
      post_position (v) {
        v.$touch()
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        if (!v.$error) {
          this.axios.post('/position/', {
            'name': this.name,
            'position_description': this.position_description,
            'work_team_description': this.work_team_description,
            'position_characteristics': this.position_characteristics,
            'expiration_date_position': this.expiration_date_position
          })
          .then(response => {
            window.location.href = '/positions'
          })
          .catch(error => { console.log(error.response) })
        }
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