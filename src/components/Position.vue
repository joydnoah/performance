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
            <multiselect id="department_create" v-model="department" :options="department_list" label="name" :multiple="true" :hide-selected="true" track-by="name" @input="onChange"></multiselect>
            <select id="department_update" v-model="department_update" class="form-control">
              <option v-for = "item in department_list" :value="item.id" >{{item.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Ciudad</label>
            <vue-google-autocomplete
                id="cities"
                classname="form-control"
                placeholder="Buscar Ciudad"
                types="geocode"
                v-on:placechanged="getAddressData"
            >
            </vue-google-autocomplete>
            <table id="cities_table" class="table">
              <thead>
                <tr>
                  <th>
                    Ciudad
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
            <vue-google-autocomplete
                id="cities_update"
                classname="form-control"
                placeholder="Buscar Ciudad"
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
          <div class="form-group" v-bind:class="{ 'has-error': $v.publication_date.$error }">
            <label>Fecha de Publicación</label>
            <input type='date' v-on:input="$v.publication_date.$touch" name='publication_date' class="form-control" v-model='publication_date' />
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.expiration_date.$error }">
            <label>Fecha de caducidad de la oferta de posición</label>
            <input type='date' v-on:input="$v.expiration_date.$touch" name='expiration_date' class="form-control" v-model='expiration_date' />
          </div>
          <button class="btn btn-success" @click="save($v)">Guardar y Salir</button>
          <button class="btn btn-warning" id="preview-button" @click="preview()">Previsualizar</button>
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

  export default {
    components: {
      AppNav,
      Multiselect,
      VueGoogleAutocomplete
    },
    data: function () {
      return {
        name: '',
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
      preview () {
        window.location.href = '/position-preview?id=' + this.id
      },
      exit () {
        window.location.href = '/positions'
      },
      onChange () {
        this.departments = []
        for (var item in this.department) {
          this.departments.push(this.department[item].name)
        }
      },
      remove_city (index) {
        this.city.splice(index, 1)
      },
      getAddressData: function (addressData, placeResultData) {
        if (this.$route.query.id !== undefined) {
          this.city_update = addressData.administrative_area_level_1 + ', ' + addressData.country
        } else {
          this.city.push(addressData.administrative_area_level_1 + ', ' + addressData.country)
        }
      },
      save (v) {
        if (this.id !== undefined) {
          this.put(v)
        } else {
          this.post(v)
        }
      },
      get_departments () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/departments/' + localStorage['company_id'])
        .then((response) => {
          this.department_list = JSON.parse(response.data.data.departments)
        })
        .catch(error => { console.log(error.response) })
      },
      put (v) {
        v.$touch()
        if (!v.$error) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/position/' + this.id, {
            'name': this.name,
            'department_id': this.department_update,
            'description': this.description,
            'city': this.city_update,
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
          this.axios.post('/position', {
            'company_id': localStorage['company_id'],
            'name': this.name,
            'description': this.description,
            'department': JSON.stringify(this.departments),
            'city': JSON.stringify(this.city),
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
      this.get_departments()
      if (this.$route.query.id !== undefined) {
        document.getElementsByClassName('multiselect')[0].style.display = 'none'
        document.getElementById('cities_table').style.display = 'none'
        document.getElementById('cities').style.display = 'none'
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.query.id)
        .then((response) => {
          this.id = JSON.parse(response.data.data.position).id
          this.name = JSON.parse(response.data.data.position).name
          this.department_update = JSON.parse(response.data.data.position).department_id
          this.city_update = JSON.parse(response.data.data.position).city
          this.description = JSON.parse(response.data.data.position).description
          this.work_team_description = JSON.parse(response.data.data.position).work_team_description
          this.candidate_characteristics = JSON.parse(response.data.data.position).candidate_characteristics
          this.publication_date = JSON.parse(response.data.data.position).publication_date.substring(0, 10)
          this.expiration_date = JSON.parse(response.data.data.position).expiration_date.substring(0, 10)
        })
        .catch(error => { console.log(error.response) })
      } else {
        document.getElementById('department_update').style.display = 'none'
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
