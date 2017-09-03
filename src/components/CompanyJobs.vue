<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Crea tu página de lista de posiciones de la empresa</h3></div>
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
          <div class="form-group">
            <label>Carga el logotipo de tu empresa</label>
            <input type="file" class="form-control" />
          </div>
          <div class="form-group">
            <label>Danos una descripción corta de tu empresa. (Máximo 200 palabras)</label>
            <textarea rows="10" class="form-control" v-model="description" id="description" name="description"></textarea>
          </div>
          <div class="form-group">
            <label>Danos una descripción corta de tu empresa. (Máximo 200 palabras)</label>
            <textarea rows="10" class="form-control" v-model="work_with_us" id="work_with_us" name="work_with_us"></textarea>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.uri.$error }">
            <label>Enlace de página de empresa <span class="required-span">*</span></label>
            <div class="input-group">
              <span class="input-group-addon">https://recruiters-portal-development.herokuapp.com/</span>
              <input type="text" class="form-control" v-on:input="$v.uri.$touch" v-model="uri" id="uri" name="uri" />
            </div>
          </div>

          <div style="display: none;" id="alert-success" class="alert alert-success" role="alert">
            <strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong>
            <p>La empresa se actualizó correctamente.</p>
          </div>

          <button id="submit" class="btn btn-success" @click="update_company($v)">Guardar Cambios</button>
          <a class="btn btn-warning" target="_blank" id="preview-button" href="#">Vista Preliminar</a>
          <button class="btn btn-danger" @click="exit()">Salir sin Guardar</button>
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
        description: '',
        work_with_us: '',
        uri: ''
      }
    },
    validations: {
      uri: {
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
      update_company (v) {
        document.getElementsByClassName('alert-danger')[0].style.display = 'none'
        document.getElementsByClassName('alert-danger')[1].style.display = 'none'
        document.getElementsByClassName('alert-success')[0].style.display = 'none'
        v.$touch()
        if (!v.$error) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/company/' + localStorage['company_id'], {
            'description': this.description,
            'work_with_us': this.work_with_us,
            'uri': this.uri
          })
          .then(response => {
            console.log(response)
            document.getElementsByClassName('alert-success')[0].style.display = 'block'
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
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/company/' + localStorage['company_id'])
      .then((response) => {
        this.description = response.data.data.company.description
        this.work_with_us = response.data.data.company.work_with_us
        this.uri = response.data.data.company.uri
      })
      .catch(error => { console.log(error.response) })
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
</style>