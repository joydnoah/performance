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
          
          <div style="display: none;" id="alert-error" class="alert alert-danger" role="alert">
            <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Error</strong>
            <p>Por favor diligencie todos los campos requeridos (*)</p>
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
        is_valid_expiration_date: false
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
          console.log(error.response)
        })
      },
      put (v) {
        v.$touch()
        this.is_valid_expiration_date = this.validate_expiration_date()
        if (!v.$error && this.is_valid_expiration_date) {
          document.getElementById('submit').disabled = true
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/position/' + this.id, {
            'name': this.name,
            'company_id': localStorage['company_id'],
            'department': this.department_update.name,
            'description': this.description,
            'city': this.city_update,
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'expiration_date': this.expiration_date
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
        if (!v.$error && this.is_valid_expiration_date) {
          document.getElementById('submit').disabled = true
          this.departments = []
          for (var item in this.department) {
            this.departments.push(this.department[item].name)
          }
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.post('/position', {
            'company_id': localStorage['company_id'],
            'name': this.name,
            'description': this.description,
            'department': JSON.stringify(this.departments),
            'city': JSON.stringify(this.city),
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'expiration_date': this.expiration_date
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
