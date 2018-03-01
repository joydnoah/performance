<template>
  <div id="general-container">
    <toolbar></toolbar>

    <div class="body-container">
      <!-- header start -->
      <div class="section-header">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Información empresarial</h1>
              <span class="header-title-link wow fadeInRight" data-wow-delay="0.4s" data-wow-duration="1.2s">
                <div class="link-message">Enlace para publicar manualmente</div>
                <a @click="confirmCopiedCompanyLink()" v-clipboard:copy="server + '/' + uri" class="link-url">{{ server }}/{{ uri }}</a>
              </span>
            </div>
          </div>
        </div>
      </div><!-- header end -->

      <!-- create-buttons-bars start -->
      <div class="create-buttons-bar-container">
        <div id="create-buttons-bar" class="create-buttons-bar">
          <div class="general-container">
            <div class="row">
              <div class="col-xs-offset-4 col-xs-10">
                <div class="buttons-container">
                  <router-link v-bind:to="'/' + uri" target="_blank" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success pull-left">Vista previa</router-link>
                  <button @click="update_company($v)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success pull-left">Guardar cambios</button>
                  <button @click="exit()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error pull-left">Cancelar</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-action pull-right" style="display: none;">Completar este paso luego</button>
                </div>
              </div>
            </div>
            <div style="display: none;" id="alert-success" class="alert alert-success" role="alert">
              <strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong>
              <p>La empresa se actualizó correctamente.</p>
            </div>
            <div style="display: none;" id="copy_link" class="alert alert-success" role="alert">
              <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Link Copiado</strong>
              <p></p>
            </div>
            <div style="display: none;" class="alert alert-danger">
              <i class="glyphicon glyphicon-remove-sign"></i> <strong>Campos requeridos</strong>
              <p>Antes de continuar por favor verifique la información suministrada.</p>
            </div>
            <div style="display: none;" class="alert alert-danger">
              <i class="glyphicon glyphicon-remove-sign"></i> <strong>Oops!</strong>
              <p>Ocurrio un error inesperado, por favor contacte al administrador del sistema.</p>
            </div>
          </div>
        </div><!-- create buttons bar end -->
      </div>



      <div id="create-form-container" class="general-container">
        <div class="email-template-content">
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-header">
                <div class="template-title-container">
                  <div class="template-title">Página publica empresarial</div>
                </div>
                <div class="template-instructions-container">
                  <div class="instructions-title">Instrucciones</div>
                  <div class="instructions-message">Esta es la información que veran los candidatos cuando busquen tu empresa, tambien aqui se listaran todas las ofertas laborales que tengas disponibles.</div>
                </div>
              </div>
            </div>

            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-body is-active">
                <div class="separator"></div>
              </div>
            </div>
          </div>

          <div class="logo-upload-container" style="display: none;">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-4">
                <div class="upload-title">Logo empresarial</div>
                <div class="upload-container">
                  <div class="upload-sub-title">
                    <i class="material-icons">cloud_upload</i>
                    Suelta el logo aquí
                  </div>
                  <div class="upload-text">O click para seleccionar la imagen</div>
                  <div class="upload-note">Archivos permitidos .jpg o .png tamaño de 600px X 200px</div>
                </div>
                <!-- Add .hidden class to hide this div when there is no logo -->
                <div class="uploaded-content hidden">
                  <img src="images/test.png">
                </div>
              </div>

              <div class="col-xs-4">
                <div class="buttons-container">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-action">Examinar</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success">Guardar</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error">Borrar</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xs-offset-2 col-xs-4">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
              <label id="name_label" class="mdl-textfield__label" for='name'>Enlace para publicar manualmente:</label>
              <input class="mdl-textfield__input" type="text" id='name' name='name' v-model='uri'>
              <span class="mdl-textfield__error">Este campo no puede estar en blanco</span>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-body is-active">
                <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                  <textarea v-model="description" class="mdl-textfield__input" type="text" rows= "4" id="template01"></textarea>
                  <label class="mdl-textfield__label" for="template01">Danos una descripcion corta de tu empresa. (Máximo 200 palabras)</label>
                  <span class="mdl-textfield__error">Error message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div><!-- body-container end -->
  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: {
      AppNav,
      Toolbar
    },
    data: function () {
      return {
        description: '',
        work_with_us: '',
        uri: '',
        server: process.env.HOST
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
      confirmCopiedCompanyLink () {
        document.getElementById('copy_link').style.display = 'block'
        document.getElementById('create-form-container').style.paddingTop = '70px'
      },
      setupLockButtonsBar () {
        var controller = new this.$scrollmagic.Controller()
        new this.$scrollmagic.Scene({ triggerElement: '#create-form-container', triggerHook: 0, offset: 0 })
        .setClassToggle('#create-buttons-bar', 'magic-scroll') // add .addIndicators() to check trigger position
        .addTo(controller)
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
            document.getElementById('create-form-container').style.paddingTop = '70px'
            this.exit()
          })
          .catch(error => {
            console.log(error)
            document.getElementsByClassName('alert-danger')[1].style.display = 'block'
            document.getElementById('create-form-container').style.paddingTop = '70px'
          })
        } else {
          document.getElementsByClassName('alert-danger')[0].style.display = 'block'
          document.getElementById('create-form-container').style.paddingTop = '70px'
        }
      }
    },
    mounted: function () {
      this.setupLockButtonsBar()
      this.bootstrap_min_js = document.createElement('script')
      this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(this.bootstrap_min_js)
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
