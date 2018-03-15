<template>
  <div id="general-container">
    <alert-modal :typeMessage="typeMessage" :message="alertMessage" :activate="showAlert" :type="typeOfAlert" time="5"></alert-modal>
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
                <router-link v-bind:to="'/' + uri" target="_blank" class="link-url">{{ server }}/{{ uri }}</router-link>
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

          <input type="file" class="form-control" id="logo-file-input" style="display: none;" v-on:change="manualLoadFile($event)" />
          <div class="logo-upload-container">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-4">
                <div class="upload-title">Logo empresarial</div>
                <div id="logo-uploader" class="upload-container">
                  <div @drop.prevent="loadFiles" @dragover.prevent class="upload-sub-title">
                    <i class="material-icons">cloud_upload</i>
                    Suelta el logo aquí
                  </div>
                  <div class="upload-text">O click para seleccionar la imagen</div>
                  <div class="upload-note">Archivos permitidos .jpg o .png tamaño de 600px X 200px</div>
                </div>
                <!-- Add .hidden class to hide this div when there is no logo -->
                <div id="logo_img_container" class="uploaded-content hidden">
                  <div>{{ logo['name'] }}</div>
                  <img id="logo_img" v-on:change="helpFun()">
                </div>
              </div>

              <div class="col-xs-4">
                <div class="buttons-container">
                  <button v-on:click="manualUpload()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-action">Examinar</button>
                  <button v-on:click="uploadAndValidateLogo(false)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success">Guardar</button>
                  <button v-on:click="showLogoInput()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error">Borrar</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-offset-2 col-xs-6">

            </div>
            <div class="col-xs-3">
              <div class="check-level-container">
                <div class="check-level-item">

                </div>
              </div>
            </div>
          </div>

          <div class="row abilities">
            <div class="col-xs-offset-2 col-xs-8" style="padding-bottom: 0px; border-right: 0px;">
              <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                <div class="offer-header-container" v-bind:class="{ 'has-error': $v.uri.$error }">
                  <label class="header-title">Enlace de página de empresa <span class="required-span">*</span></label>
                  <div class="input-group">
                    <span class="input-group-addon">{{ server }}/</span>
                    <input type="text" class="form-control" v-on:input="$v.uri.$touch" v-model="uri" id="uri" name="uri" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-offset-4 col-xs-5">
              <div class="offer-header-container" v-bind:class="{ 'has-error': $v.uri.$error }">
                <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label" style="padding-top: 0px; padding-left: 20%">
                  <button @click="confirmCopiedCompanyLink()" v-clipboard:copy="server + '/' + uri" class="btn btn-default" style="padding-left: 60px; padding-right: 60px">Copiar link</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-body is-active">
                <div class="offer-header-container">
                  <label class="header-title" for="template01">Danos una descripcion corta de tu empresa. (Máximo 200 palabras)</label>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <textarea v-model="description" class="form-control" type="text" rows= "4" id="template01"></textarea>
                  </div>
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
  import AlertModal from './AlertModal'

  export default {
    components: {
      AppNav,
      Toolbar,
      AlertModal
    },
    data: function () {
      return {
        description: '',
        work_with_us: '',
        uri: '',
        server: process.env.HOST,
        logo: '',
        logoValidType: true,
        logoValidSize: true,
        imageURL: '',
        data: null,
        showAlert: true,
        typeOfAlert: '',
        typeMessage: '',
        alertMessage: '',
        actualLogo: null
      }
    },
    validations: {
      uri: {
        required
      }
    },
    methods: {
      manualUpload () {
        document.getElementById('logo-file-input').click()
      },
      manualLoadFile (e) {
        this.setFile(e.target.files[0])
      },
      loadFiles (e) {
        this.setFile(e.dataTransfer.files[0])
      },
      setFile (file) {
        this.logoValidType = this.validateFileType(file['type'])
        this.logo = file
        this.showLogoPreview(file)
      },
      validateFileType (fileType) {
        var png = fileType === 'image/png'
        var jpeg = fileType === 'image/jpeg'
        return png || jpeg
      },
      showLogoPreview (file) {
        var reader = new FileReader()
        var localInstance = this
        reader.onload = function () {
          var dataURL = reader.result
          var output = document.getElementById('logo_img')
          localInstance.validateSize(dataURL)
          output.src = dataURL
        }
        reader.readAsDataURL(file)
        this.hiddeLogoInput()
      },
      hiddeLogoInput () {
        document.getElementById('logo-uploader').className += ' hidden'
        document.getElementById('logo_img_container').classList.remove('hidden')
      },
      showLogoInput () {
        document.getElementById('logo_img_container').className += ' hidden'
        document.getElementById('logo-uploader').classList.remove('hidden')
        this.resetLogoValues()
      },
      resetLogoValues () {
        this.logo = ''
        this.logoValidType = true
        this.logoValidSize = true
        this.imageURL = ''
        this.data = null
      },
      validateSize (imageURL) {
        var localInstance = this
        var img = new Image()
        img.onload = function () {
          localInstance.logoValidSize = this.width <= 600 && this.height <= 200
        }
        img.src = imageURL
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      exit () {
        window.location.href = '/positions'
      },
      confirmCopiedCompanyLink () {
        this.showAlert = !this.showAlert
        this.typeOfAlert = 'is-success'
        this.typeMessage = 'Link Copiado.'
        this.alertMessage = ''
      },
      setupLockButtonsBar () {
        var controller = new this.$scrollmagic.Controller()
        new this.$scrollmagic.Scene({ triggerElement: '#create-form-container', triggerHook: 0, offset: 0 })
        .setClassToggle('#create-buttons-bar', 'magic-scroll') // add .addIndicators() to check trigger position
        .addTo(controller)
      },
      uploadAndValidateLogo (exit) {
        if (this.validateLogo()) {
          this.uploadLogo(exit, 'El logo ha sido actualizado.')
        } else {
          this.showLogoInput()
          var msg = 'La imagen no es valida.'
          if (this.logoValidSize) {
            msg = msg + ' El tipo de archivo no es el correcto.'
          }
          if (this.logoValidType) {
            msg = msg + ' El tamaño debe ser menor a 600x200 px'
          }
          this.showError(msg)
        }
      },
      getLogoUri () {
        this.axios.get('/company/' + localStorage['company_id'] + '/logo')
        .then(response => {
          this.actualLogo = response.data.data.logo.id
        })
      },
      postLogo (exit, msg) {
        this.axios.post('/company/' + localStorage['company_id'] + '/logo', this.data)
        .then(response => {
          this.showSuccess(msg)
          if (exit) {
            setTimeout(() => {
              this.exit()
            }, 500)
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      updateLogo (exit, msg) {
        this.axios.put('/company/' + localStorage['company_id'] + '/logo', this.data)
        .then(response => {
          this.showSuccess(msg)
          if (exit) {
            setTimeout(() => {
              this.exit()
            }, 500)
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      uploadLogo (exit, msg) {
        this.getLogoUri()
        this.data = new FormData()
        this.data.append('logo_file', this.logo)
        console.log(this.actualLogo)
        if (this.actualLogo === undefined || this.actualLogo === null) {
          this.postLogo(exit, msg)
        } else {
          this.updateLogo(exit, msg)
        }
      },
      validateLogo () {
        return this.logoValidSize && this.logoValidType
      },
      validateDocument (v) {
        v.$touch()
        return !v.$error && this.validateLogo()
      },
      showError (msg) {
        this.showAlert = !this.showAlert
        this.typeOfAlert = 'is-error'
        this.typeMessage = 'Error:'
        this.alertMessage = msg
      },
      showSuccess (msg) {
        this.showAlert = !this.showAlert
        this.typeOfAlert = 'is-success'
        this.typeMessage = 'Success:'
        this.alertMessage = msg
      },
      update_company (v) {
        document.getElementsByClassName('alert-danger')[0].style.display = 'none'
        document.getElementsByClassName('alert-danger')[1].style.display = 'none'
        document.getElementsByClassName('alert-success')[0].style.display = 'none'
        if (this.validateDocument(v)) {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/company/' + localStorage['company_id'], {
            'description': this.description,
            'work_with_us': this.work_with_us,
            'uri': this.uri
          })
          .then(response => {
            if (this.logo !== '') {
              this.uploadAndValidateLogo(true)
            } else {
              this.showSuccess('La empresa se actualizó correctamente.')
              setTimeout(() => {
                this.exit()
              }, 500)
            }
          })
          .catch(error => {
            console.log(error)
            this.showError('Ocurrio un error inesperado, por favor contacte al administrador del sistema.')
          })
        } else {
          this.showError('Antes de continuar por favor verifique la información suministrada.')
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
