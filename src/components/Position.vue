<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-position" class="panel panel-default">
      <div class="panel-heading"><h3>Crear Oferta de Posición</h3></div>
        <div class="panel-body">
          <div class="form-group">
            <label>Nombre de la posición</label>
            <input type='text' class="form-control" name='name' v-model='name' />
          </div>
          <!--<label>Departamento de la posición</label>
          <select name='department_id' v-model='department_id'>
            <option></option>
          </select>
          <label>Tipo de posición</label>
          <select name='position_type_id' v-model='position_type_id'>
            <option></option>
          </select>
          <label>Ubicación de la posición (ciudad)</label>
          <select name='city_id' v-model='city_id'>
            <option></option>
          </select>-->
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
          <!--<div class="form-group">
            <label>Preguntas para los candidatos</label>
            <input type='text' name='questions' v-model='questions' />
          </div>
          <div class="form-group">
            <label>O también agrega pre-formuladas</label>
            <select name='preformulated_questions' v-model='preformulated_questions'>
              <option></option>
            </select>
          </div>-->
          <div class="form-group">
          <label>Fecha de caducidad de la oferta de posición</label>
          <input type='date' name='expiration_date_position' class="form-control" v-model='expiration_date_position' />
          </div>
          <button class="btn btn-success" v-on:click="post_position()">Guardar y Salir</button>
          <button class="btn btn-danger" v-on:click="exit()">Salir sin Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
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
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      exit () {
        window.location.href = '/positions'
      },
      post_position () {
        axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        if (this.city !== '') {
          axios.post('/position/', {
            'name': this.name,
            // 'department_id': this.department_id,
            // 'position_type_id': this.position_type_id,
            // 'city_id': this.city_id,
            'position_description': this.position_description,
            'work_team_description': this.work_team_description,
            'position_characteristics': this.position_characteristics,
            // 'questions': this.questions,
            // 'preformulated_questions': this.preformulated_questions,
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