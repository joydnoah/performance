<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Crear Filtros para la posición: {{ position.name }}</h3></div>
      <div class="panel-body">
        <table class="table table-striped">
          <caption>
            <h4>Nivel educativo buscado</h4>
          </caption>
          <tbody>
            <tr v-if="filters_education_level.length === 0">
              <td>
                <select v-model="education_level" class="form-control" v-on:change="add_education_level()">
                  <option value="Bachiller">Bachiller</option>
                  <option value="Ténico">Ténico</option>
                  <option value="Universitario">Universitario</option>
                  <option value="Post-grado">Post-grado</option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr v-for="item in filters_education_level">
              <td>
                <select v-model="item.value" class="form-control">
                  <option value="Bachiller">Bachiller</option>
                  <option value="Ténico">Ténico</option>
                  <option value="Universitario">Universitario</option>
                  <option value="Post-grado">Post-grado</option>
                </select>
              </td>
              <td>
                <div class="btn-group" data-toggle="buttons">
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="0" autocomplete="off"> Baja
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="1" autocomplete="off"> Media
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="2" autocomplete="off"> Alta
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-striped">
          <caption>
            <h4>Años de experiencia relevante</h4>
          </caption>
          <tbody>
            <tr v-if="filters_experience_years.length === 0">
              <td>
                <div class="input-group min-max">
                  <span class="input-group-addon">Min</span>
                  <input type="text" class="form-control" v-model="experience_years_min">
                </div>
                <div class="input-group min-max">
                  <span class="input-group-addon">Max</span>
                  <input type="text" class="form-control" v-model="experience_years_max">
                </div>
              </td>
              <td>
                <button class="btn btn-default" @click='add_experience_years()'>Asignar</button>
              </td>
            <tr v-for="item in filters_experience_years">
              <td>
                <div class="input-group min-max">
                  <span class="input-group-addon">Min</span>
                  <input type="text" class="form-control" v-on:change="set_experience_years(item, $event)" v-bind:value="item.value.split('-')[0]">
                </div>
                <div class="input-group min-max">
                  <span class="input-group-addon">Max</span>
                  <input type="text" class="form-control" v-on:change="set_experience_years(item, $event)" v-bind:value="item.value.split('-')[1]">
                </div>
              </td>
              <td>
                <div class="btn-group" data-toggle="buttons">
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="0" autocomplete="off"> Baja
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="1" autocomplete="off"> Media
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="2" autocomplete="off"> Alta
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-striped">
          <caption>
            <h4>Habilidades de negocios buscadas</h4>
          </caption>
          <tbody>
            <tr>
              <td>
                <input type='text' class="form-control" v-model="business_skill" @keyup.enter="add_business_skill()">
              </td>
              <td></td>
            </tr>
            <tr v-for="item in filters_business_skill">
              <td>
                <input type='text' class="form-control" v-model="item.value">
              </td>
              <td>
                <div class="btn-group" data-toggle="buttons">
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="0" autocomplete="off"> Baja
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="1" autocomplete="off"> Media
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="2" autocomplete="off"> Alta
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-striped">
          <caption>
            <h4>Habilidades ténicas buscadas</h4>
          </caption>
          <tbody>
            <tr>
              <td>
                <input type='text' class="form-control" v-model="technical_skill" @keyup.enter="add_technical_skill()">
              </td>
              <td></td>
            </tr>
            <tr v-for="item in filters_technical_skill">
              <td>
                <input type='text' class="form-control" v-model="item.value" >
              </td>
              <td>
                <div class="btn-group" data-toggle="buttons">
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="0" autocomplete="off"> Baja
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="1" autocomplete="off"> Media
                  </label>
                  <label class="btn btn-default" v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }">
                    <input type="radio" v-model="item.importance" value="2" autocomplete="off"> Alta
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click='post()' class="btn btn-success">Guardar y salir</button>
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
        filters_education_level: [],
        filters_experience_years: [],
        filters_technical_skill: [],
        filters_business_skill: [],
        filters: [],
        education_level: '',
        experience_years_min: '',
        experience_years_max: '',
        technical_skill: '',
        business_skill: '',
        value: '',
        type: 'education_level',
        importance: -1,
        radioValue: 1
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
        this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill)
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/position/' + this.position_id + '/filter', {
          'filters': JSON.stringify(this.filters)
        })
        .then(response => {
          window.location.href = '/positions'
        })
        .catch(error => {
          console.log(error.response)
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
          for (var item in response.data.data.filters) {
            switch (response.data.data.filters[item].type_filter) {
              case 'education_level':
                this.filters_education_level.push(response.data.data.filters[item])
                break
              case 'experience_years':
                this.filters_experience_years.push(response.data.data.filters[item])
                break
              case 'technical_skill':
                this.filters_technical_skill.push(response.data.data.filters[item])
                break
              case 'business_skill':
                this.filters_business_skill.push(response.data.data.filters[item])
                break
            }
          }
        })
        .catch(error => { console.log(error.response) })
      },
      add_technical_skill () {
        this.filters_technical_skill.push({
          importance: -1,
          position_id: this.position_id,
          type_filter: 'technical_skill',
          value: this.technical_skill
        })
        this.technical_skill = ''
      },
      add_business_skill () {
        this.filters_business_skill.push({
          importance: -1,
          position_id: this.position_id,
          type_filter: 'business_skill',
          value: this.business_skill
        })
        this.business_skill = ''
      },
      add_education_level () {
        this.filters_education_level.push({
          importance: -1,
          position_id: this.position_id,
          type_filter: 'education_level',
          value: this.education_level
        })
        this.education_level = ''
      },
      add_experience_years () {
        this.filters_experience_years.push({
          importance: -1,
          position_id: this.position_id,
          type_filter: 'experience_years',
          value: this.experience_years_min + '-' + this.experience_years_max
        })
        this.experience_years = ''
      },
      set_experience_years (item, event) {
        item.value = event.target.parentElement.parentElement.getElementsByTagName('input')[0].value.trim(' ') + '-' + event.target.parentElement.parentElement.getElementsByTagName('input')[1].value.trim(' ')
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
  td{
    padding: 1em 1em 1em 1em;
  }
  legend {
    margin-top: 2em;
  }
  .min-max{
    display: inline-table;
    width: 49%;
  }
</style>