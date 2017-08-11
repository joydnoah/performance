<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Ahora cuéntanos un poco sobre tu empresa</h3></div>
      <div class="panel-body">
        <div class="form">
          <div style="display: none;" class="alert alert-danger">
            <i class="glyphicon glyphicon-remove-sign"></i> <strong>Campos requeridos</strong>
            <p>Antes de continuar por favor verifique la información suministrada.</p>
          </div>
          <div style="display: none;" class="alert alert-danger">
            <i class="glyphicon glyphicon-remove-sign"></i> <strong>Oops!</strong>
            <p>Ocurrio un error inesperado, por favor contacte al administrador del sistema.</p>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.number_employees.$error }">
            <label>¿Cuantos empledos tiene su empresa? <span class="required-span">*</span></label>
            <input type="number" v-on:input="$v.number_employees.$touch" v-model="number_employees" class="form-control" id="number_employees" name="number_employees" />
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.industry.$error }">
            <label>¿En que industria se desempeña tu empresa? <span class="required-span">*</span></label>
            <input type="text" class="form-control" v-on:input="$v.industry.$touch" v-model="industry" id="industry" name="industry" />
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.company_role.$error }">
            <label>¿Cuál es tu rol dentro de la empresa? <span class="required-span">*</span></label>
            <input type="text" class="form-control" v-on:input="$v.company_role.$touch" v-model="company_role" id="company_role" name="company_role" />
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.name.$error }">
            <label>¿Cuál es el nombre de tu empresa? <span class="required-span">*</span></label>
            <input type="text" class="form-control" v-on:input="$v.name.$touch" v-model="name" id="name" name="name" />
          </div>
          <button class="btn btn-success" @click="create_company($v)">Continuar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn, getUserInfo } from '../../utils/auth'
  import { required, between } from 'vuelidate/lib/validators'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
        number_employees: '',
        industry: '',
        company_role: '',
        name: '',
        user_id: ''
      }
    },
    validations: {
      number_employees: {
        required,
        between: between(1, 100000000)
      },
      industry: {
        required
      },
      company_role: {
        required
      },
      name: {
        required
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      getUserInfo () {
        this.user_info = JSON.parse(getUserInfo())
        this.user_id = this.user_info.user_id
      },
      create_company (v) {
        document.getElementsByClassName('alert-danger')[0].style.display = 'none'
        document.getElementsByClassName('alert-danger')[1].style.display = 'none'
        v.$touch()
        if (!v.$error) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.post('/companies', {
            'number_employees': this.number_employees,
            'industry': this.industry,
            'name': this.name
          })
          .then(response => {
            this.axios.post('/users/', {
              'company_role': this.company_role,
              'company_id': response.data.data.company_id,
              'user_id': this.user_id
            })
            .then(response => {
              window.location.href = '/positions'
            })
            .catch(error => {
              console.log(error)
              document.getElementsByClassName('alert-danger')[1].style.display = 'block'
            })
          })
          .catch(error => {
            console.log(error)
            document.getElementsByClassName('alert-danger')[1].style.display = 'block'
          })
        } else {
          document.getElementsByClassName('alert-danger')[0].style.display = 'block'
        }
      }
    },
    mounted: function () {
      this.getUserInfo()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 40%;
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
</style>