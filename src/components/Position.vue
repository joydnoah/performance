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
            <label>Departamento</label>
            <multiselect id="department_create" v-model="department" :options="department_list" tag-placeholder="Agregar departamento" placeholder="Buscar o agregar departamento" label="name" :multiple="true" :hide-selected="true" track-by="name" @input="onChange" :taggable="true"  @tag="add_department"></multiselect>

            <multiselect id="department_update" v-model="department_update" :options="department_list" tag-placeholder="Agregar departamento" placeholder="Buscar o agregar departamento" label="name" :multiple="false" :hide-selected="true" track-by="name" @input="onChange" :taggable="true"  @tag="add_department_update"></multiselect>
          </div>
          <div class="form-group">
            <label>Lugar de trabajo</label>
            <vue-google-autocomplete
                id="cities"
                classname="form-control"
                placeholder="Buscar Lugar de trabajo"
                types="geocode"
                v-on:placechanged="getAddressData"
            >
            </vue-google-autocomplete>
            <div v-if="city.length > 0">
              <table id="cities_table" class="table">
                <thead>
                  <tr>
                    <th>
                      Lugar de trabajo
                    </th>
                    <th>
                      Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in city">
                    <td>{{ item }}</td>
                    <td><button class="btn btn-danger btn-xs" v-on:click="remove_city(index)"><i class="glyphicon glyphicon-remove"></i></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <vue-google-autocomplete
                id="cities_update"
                classname="form-control"
                placeholder="Buscar Lugar de trabajo"
                types="geocode"
                v-on:placechanged="getAddressData"
            >
            </vue-google-autocomplete>
            <p id="container-city-update">{{ city_update }}</p>
          </div>
          <div class="form-group">
            <label>Descripción del equipo de trabajo</label>
            <textarea name='work_team_description' class="form-control" v-model='work_team_description'></textarea>
          </div>
          <div class="form-group">
            <label>Características que estas buscando en un empleado</label>
            <textarea name='candidate_characteristics' class="form-control" v-model='candidate_characteristics'></textarea>
          </div>
          <div class="form-group">
            <label>Fecha de caducidad de la oferta de posición *</label>
            <datepicker required v-model='expiration_date' id='expiration_date' name='expiration_date' :disabled="disabled" language="es" format="dd/MM/yyyy" input-class="form-control form__input"></datepicker>
          </div>

          <table class="table table-striped">
            <caption>
              <h4>Nivel educativo buscado</h4>
            </caption>
            <tbody>
              <tr v-if="filters_education_level.length === 0">
                <td>
                  <select v-model="education_level" class="form-control" v-on:change="add_education_level()">
                    <option value="Bachiller">Bachiller</option>
                    <option value="Ténico">Técnico</option>
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
                  <div class="input-group">
                    <span class="input-group-addon">Min</span>
                    <input type="text" class="form-control" v-model="experience_years_min">
                  </div>
                </td>
                <td>
                  <button class="btn btn-default" @click='add_experience_years()'>Asignar</button>
                </td>
              <tr v-for="item in filters_experience_years">
                <td>
                  <div class="input-group">
                    <span class="input-group-addon">Min</span>
                    <input type="text" class="form-control" v-on:change="set_experience_years(item, $event)" v-bind:value="item.value.split('-')[0]">
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

          <div style="display: none;" id="alert-error" class="alert alert-danger" role="alert">
            <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Error</strong>
            <p>Error</p>
          </div>
          <div style="display: none;" id="alert-success" class="alert alert-success" role="alert">
            <strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong>
            <p>La posición se almaceno correctamente.</p>
          </div>

          <button id="submit" class="btn btn-success" @click="save($v)">Guardar y Salir</button>
          <a class="btn btn-warning" target="_blank" id="preview-button" :href="'/position-preview/' + id">Previsualizar</a>
          <button class="btn btn-danger" v-on:click="exit()">Salir sin Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppNav from './AppNav'
  import Multiselect from 'vue-multiselect'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { required } from 'vuelidate/lib/validators'
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      AppNav,
      Multiselect,
      VueGoogleAutocomplete,
      Datepicker
    },
    data: function () {
      return {
        google_api_plugin: null,
        id: null,
        name: '',
        new_department: '',
        department_list: [],
        department: '',
        departments: [],
        department_update: '',
        position_type_id: '',
        city: [],
        city_update: '',
        description: '',
        work_team_description: '',
        candidate_characteristics: '',
        questions: '',
        preformulated_questions: '',
        expiration_date: '',
        disabled: {
          to: new Date()
        },
        is_valid_expiration_date: false,

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
        radioValue: 1,
        valid: true

      }
    },
    validations: {
      name: {
        required
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      preview () {
        window.location.href = '/position-preview?id=' + this.id
      },
      exit () {
        window.location.href = '/positions'
      },
      onChange () {
      },
      remove_city (index) {
        this.city.splice(index, 1)
      },
      remove_department (index) {
        this.new_departments.splice(index, 1)
      },
      add_department (newTag) {
        if (this.department === '') {
          this.department = []
        }
        const tag = {
          name: newTag,
          id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.department_list.push(tag)
        this.department.push(tag)
      },
      add_department_update (newTag) {
        const tag = {
          name: newTag,
          id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.department_list.push(tag)
        this.department_update = tag
      },
      getAddressData: function (addressData, placeResultData) {
        addressData.position_city = ''
        if (addressData.locality !== undefined) {
          addressData.position_city += addressData.locality + ', '
        }
        if (addressData.administrative_area_level_1 !== undefined) {
          addressData.position_city += addressData.administrative_area_level_1 + ', '
        }

        addressData.position_city += addressData.country

        if (this.$route.query.id !== undefined) {
          this.city_update = addressData.position_city
        } else {
          this.city.push(addressData.position_city)
        }
      },
      save (v) {
        this.hide_alerts()
        if (this.id !== undefined && this.id !== null) {
          this.put(v)
        } else {
          this.post(v)
        }
      },
      get_departments () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/departments/' + localStorage['company_id'])
        .then((response) => {
          this.department_list = response.data.data.departments
        })
        .catch(error => {
          console.log(error)
        })
      },
      valid_form (v) {
        return !v.$error && this.is_valid_expiration_date && this.valid
      },
      put (v) {
        v.$touch()
        this.is_valid_expiration_date = this.validate_expiration_date()
        if (this.valid_form(v)) {
          document.getElementById('submit').disabled = true
          this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill)
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/position/' + this.id, {
            'name': this.name,
            'company_id': localStorage['company_id'],
            'department': this.department_update.name,
            'description': this.description,
            'city': this.city_update,
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'expiration_date': this.expiration_date,
            'filters': JSON.stringify(this.filters)
          })
          .then(response => {
            this.show_success()
          })
          .catch(error => {
            console.log(error.response)
            document.getElementById('submit').disabled = false
            this.show_error()
          })
        } else {
          this.show_error()
        }
      },
      post (v) {
        v.$touch()
        this.is_valid_expiration_date = this.validate_expiration_date()
        if (this.valid_form(v)) {
          document.getElementById('submit').disabled = true
          this.departments = []
          for (var item in this.department) {
            this.departments.push(this.department[item].name)
          }
          this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill)
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.post('/position', {
            'company_id': localStorage['company_id'],
            'name': this.name,
            'description': this.description,
            'department': JSON.stringify(this.departments),
            'city': JSON.stringify(this.city),
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'expiration_date': this.expiration_date,
            'filters': JSON.stringify(this.filters)
          })
          .then(response => {
            this.show_success()
          })
          .catch(error => {
            console.log(error.response)
            document.getElementById('submit').disabled = false
            this.show_error()
          })
        } else {
          this.show_error()
        }
      },
      show_error () {
        document.getElementById('alert-error').style.display = 'block'
        if (this.valid) {
          document.getElementById('alert-error').innerHTML = 'Por favor diligencie todos los campos requeridos (*)'
        } else {
          document.getElementById('alert-error').innerHTML = 'Cambie el numero de años de experiencia a un valor valido entre 0 - 50.'
        }
      },
      show_success () {
        document.getElementById('alert-success').style.display = 'block'
        setTimeout(function () {
          window.location.href = '/positions'
        }, 500)
      },
      hide_alerts () {
        document.getElementById('alert-error').style.display = 'none'
        document.getElementById('alert-success').style.display = 'none'
      },
      validate_expiration_date () {
        if (this.expiration_date === '') {
          document.getElementById('expiration_date').parentElement.parentElement.parentElement.className = 'form-group has-error'
          return false
        } else {
          document.getElementById('expiration_date').parentElement.parentElement.parentElement.className = 'form-group'
          return true
        }
      },
      set_value () {
        switch (this.type) {
          case 'education_level':
            this.value = this.education_level
            break
          case 'experience_years':
            this.value = this.experience_years_min
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
      get_filters (iid) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.query.id + '/filter')
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
          position_id: this.id,
          type_filter: 'technical_skill',
          value: this.technical_skill
        })
        this.technical_skill = ''
      },
      add_business_skill () {
        this.filters_business_skill.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'business_skill',
          value: this.business_skill
        })
        this.business_skill = ''
      },
      add_education_level () {
        this.filters_education_level.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'education_level',
          value: this.education_level
        })
        this.education_level = ''
      },
      add_experience_years () {
        this.filters_experience_years.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'experience_years',
          value: this.experience_years_min
        })
        this.experience_years = ''
      },
      set_experience_years (item, event) {
        var yrs = event.target.parentElement.parentElement.getElementsByTagName('input')[0].value
        if (yrs >= 0 && yrs <= 50) {
          item.value = yrs
          this.valid = true
        } else {
          this.valid = false
        }
      }
    },
    mounted () {
      this.get_departments()
      if (this.$route.query.id !== undefined) {
        document.getElementsByClassName('multiselect')[0].style.display = 'none'
        if (document.getElementById('cities_table') !== null) {
          document.getElementById('cities_table').style.display = 'none'
        }
        document.getElementById('cities').style.display = 'none'
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.query.id)
        .then((response) => {
          this.id = response.data.data.position.id
          this.name = response.data.data.position.name
          this.department_update = { name: response.data.data.position.department_name, id: Math.floor((Math.random() * 10000000)) }
          this.city_update = response.data.data.position.city
          this.description = response.data.data.position.description
          this.work_team_description = response.data.data.position.work_team_description
          this.candidate_characteristics = response.data.data.position.candidate_characteristics
          this.expiration_date = response.data.data.position.expiration_date.substring(0, 10)
        })
        .catch(error => { console.log(error.response) })
      } else {
        document.getElementsByClassName('multiselect')[1].style.display = 'none'
        document.getElementById('cities_update').style.display = 'none'
        document.getElementById('preview-button').style.display = 'none'
      }
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.id)
      .then((response) => {
        this.position = response.data.data.position
      })
      .catch(error => { console.log(error.response) })

      this.get_filters(this.$route.query.id)
    },
    created: function () {
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
    #container-city-update{
      margin-top: 1em;
      padding-left: 0.5em;
    }
</style>
