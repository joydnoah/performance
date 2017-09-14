<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Crear Filtros para la posición: {{ position.name }}</h3></div>
      <div class="panel-body">
        <div class="form">
          <div class="form-group">
            <label>Tipo</label>
            <select v-model="type" class="form-control">
              <option value="education_level">Nivel Educativo</option>
              <option value="experience_years">Experiencia en años</option>
              <option value="technical_skill">Habilidad Ténica</option>
              <option value="business_skill">Habilidad de Negocios</option>
            </select>
          </div>
          <div v-if="type === 'education_level'" class="form-group">
            <label>Nivel Educativo</label>
            <select v-model="education_level" class="form-control">
              <option value="Bachiller">Bachiller</option>
              <option value="Ténico">Ténico</option>
              <option value="Universitario">Universitario</option>
              <option value="Post-grado">Post-grado</option>
            </select>
          </div>
          <div v-if="type === 'experience_years'" class="form-group">
            <label>Años de experiencia relevante</label>
            <table id="min-max" class="table">
              <tr>
                <td>
                  <div class="input-group">
                    <span class="input-group-addon">Min</span>
                    <input v-model="experience_years_min" type="number" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
                  </div>
                </td>
                <td>
                  <div class="input-group">
                    <span class="input-group-addon">Max</span>
                    <input v-model="experience_years_max" type="number" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="type === 'technical_skill'" class="form-group">
            <label>Habilidad Buscada</label>
            <input v-model="technical_skill" type="text" class="form-control" value="" />
          </div>
          <div v-if="type === 'business_skill'" class="form-group">
            <label>Habilidad Buscada</label>
            <input v-model="business_skill" type="text" class="form-control" value="" />
          </div>
        </div>
        <div class="form-group">
          <label>Importancia</label>
          <select v-model="importance" class="form-control">
            <option value="0">Baja</option>
            <option value="1">Media</option>
            <option value="2">Alta</option>
          </select>
        </div>
        <button class="btn btn-success" @click="set_value()">Agregar Filtro</button>
        <legend>Filtros de la Posición: {{ position.name }}</legend>
        <table class="table">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Importancia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filters">
              <td>{{ item.value }}</td>
              <td>{{ get_type(item.type_filter) }}</td>
              <td>{{ get_importance(item.importance) }}</td>
            </tr>
          </tbody>
        </table>
        <a class="btn btn-danger" href="/positions">Salir sin Guardar</a>
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
        position_id: this.$route.params.position_id,
        position: {},
        filters: {},
        education_level: '',
        experience_years_min: '',
        experience_years_max: '',
        technical_skill: '',
        business_skill: '',
        value: '',
        type: 'education_level',
        importance: -1
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      set_value () {
        switch (this.type) {
          case 'education_level':
            this.value = this.education_level
            break
          case 'experience_years':
            this.value = this.experience_years_min + ' - ' + this.experience_years_max
            break
          case 'technical_skill':
            this.value = this.technical_skill
            break
          case 'business_skill':
            this.value = this.business_skill
            break
        }
        this.post()
      },
      post () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/position/' + this.position_id + '/filter', {
          'value': this.value,
          'type': this.type,
          'importance': this.importance
        })
        .then(response => {
          console.log(response)
          this.get_filters()
        })
        .catch(error => {
          console.log(error.response)
          this.show_error()
        })
      },
      put (id) {
      },
      get_type (type) {
        switch (type) {
          case 'education_level':
            return 'Nivel Educativo'
          case 'experience_years':
            return 'Experiencia en años'
          case 'technical_skill':
            return 'Habilidad Ténica'
          case 'business_skill':
            return 'Habilidad de Negocios'
        }
      },
      get_importance (importance) {
        switch (importance) {
          case 0:
            return 'Baja'
          case 1:
            return 'Media'
          case 2:
            return 'Alta'
        }
      },
      get_filters () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.position_id + '/filter')
        .then((response) => {
          this.filters = response.data.data.filters
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.position_id)
      .then((response) => {
        this.position = response.data.data.position
      })
      .catch(error => { console.log(error.response) })

      this.get_filters()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 80%;
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
  #min-max td{
    padding: 0 1em 0 1em;
  }
  legend {
    margin-top: 2em;
  }
</style>