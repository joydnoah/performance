import Toolbar from '../../components/Toolbar'
import AppNav from '../../components/AppNav'
import { getAccessToken, getIdToken, isLoggedIn } from '../../../utils/auth'
import { required } from 'vuelidate/lib/validators'
import AlertModal from '../../components/AlertModal'
import axios from 'axios'

export default {
  components: {
    AppNav,
    Toolbar,
    AlertModal
  },
  data: function () {
    return {
      schema: {
        uri: '',
        description: '',
        work_with_us: ''
      },
      errors: {
        uri: '',
        uri_label: '',
        description: '',
        description_label: '',
        work_with_us: '',
        work_with_us_label: ''
      },
      dirty: {
        uri: false,
        description: false,
        work_with_us: false
      },
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
      actualLogo: null,
      logo_uri: null,
      bucket: process.env.AWS_S3_BUCKET,
      logo_showed: false
    }
  },
  schema: [
    function loadSchemaOnCreate() {
      let schemaDataPromise = new Promise((resolve, reject) => {
        axios.get('/schemas/companyJobs.json')
        .then(response => {
          resolve(response.data)
        })
      });
      return schemaDataPromise
    }
  ],
  methods: {
    showErrorsLabel (v) {
      var inputKeys = Object.keys(this.schema)
      for (var i = 0; i < inputKeys.length; i++) {
        this.showErrorLabel(v, inputKeys[i])
      }
    },
    showErrorLabel (v, input) {
      this.errors[input] = v[input].$error
      this.dirty[input] = v[input].$dirty
      if (this.errors[input]) {
        var listOfErrors = Object.keys(v[input].$params)
        for (var i = 0; i < listOfErrors.length; i++) {
          if (!v[input][listOfErrors[i]]) {
            this.errors[input + '_label'] = v[input].$params[listOfErrors[i]].schema.errorMessage[listOfErrors[i]]
          }
        }
      }
    },
    manualUpload () {
      document.getElementById('logo-file-input').click()
    },
    show_logo (show) {
      if (show) {
        document.getElementById('actual-logo').style.display = 'none'
        document.getElementById('to-upload-logo').style.display = 'block'
      } else {
        document.getElementById('actual-logo').style.display = 'block'
        document.getElementById('to-upload-logo').style.display = 'none'
      }
    },
    manualLoadFile (e) {
      this.setFile(e.target.files[0])
    },
    loadFiles (e) {
      this.setFile(e.dataTransfer.files[0])
    },
    setFile (file) {
      this.logo_showed = this.logo_showed || true
      this.show_logo(this.logo_showed)
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
    uploadAndValidateLogo (button, exit) {
      var oldMsg = document.getElementById(button).innerHTML
      this.show_waiting(button, 'Guardando...')
      if (this.validateLogo()) {
        this.uploadLogo(button, oldMsg, exit, 'El logo ha sido actualizado.')
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
        this.logo_showed = this.logo_showed || response.data.data.logo.id === undefined
        this.show_logo(this.logo_showed)
        if (response.data.data.logo.id !== undefined) {
          this.actualLogo = response.data.data.logo.id
          this.logo_uri = 'https://' + this.bucket + '.s3.amazonaws.com/' + this.actualLogo
        }
      })
    },
    postLogo (button, oldMsg, exit, msg) {
      this.axios.post('/company/' + localStorage['company_id'] + '/logo', this.data)
      .then(response => {
        this.afterUpdateMessage(exit, msg)
        this.restoreButton(button, oldMsg)
      })
      .catch(error => {
        console.log(error)
        this.restoreButton(button, oldMsg)
      })
    },
    updateLogo (button, oldMsg, exit, msg) {
      this.axios.put('/company/' + localStorage['company_id'] + '/logo', this.data)
      .then(response => {
        this.afterUpdateMessage(exit, msg)
        this.restoreButton(button, oldMsg)
      })
      .catch(error => {
        console.log(error)
        this.restoreButton(button, oldMsg)
      })
    },
    afterUpdateMessage (exit, msg) {
      if (exit) {
        this.showSuccess('La empresa se actualizó correctamente.')
        setTimeout(() => {
          this.exit()
        }, 500)
      } else {
        this.showSuccess(msg)
      }
    },
    uploadLogo (button, oldMsg, exit, msg) {
      this.getLogoUri()
      this.data = new FormData()
      this.data.append('logo_file', this.logo)
      if (this.actualLogo === undefined || this.actualLogo === null) {
        this.postLogo(button, oldMsg, exit, msg)
      } else {
        this.updateLogo(button, oldMsg, exit, msg)
      }
    },
    validateLogo () {
      return this.logoValidSize && this.logoValidType
    },
    validateDocument (v) {
      v.$touch()
      this.showErrorsLabel(v)
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
      this.typeMessage = 'Exito:'
      this.alertMessage = msg
    },
    show_waiting (id, msg) {
      document.getElementById(id).innerHTML = msg
      document.getElementById(id).style.color = 'white'
      document.getElementById(id).disabled = true
    },
    restoreButton (id, msg) {
      document.getElementById(id).innerHTML = msg
      document.getElementById(id).disabled = false
    },
    update_company (button, v) {
      var oldMsg = document.getElementById(button).innerHTML
      document.getElementsByClassName('alert-danger')[0].style.display = 'none'
      document.getElementsByClassName('alert-danger')[1].style.display = 'none'
      document.getElementsByClassName('alert-success')[0].style.display = 'none'
      if (this.validateDocument(v)) {
        this.show_waiting(button, 'Guardando...')
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.put('/company/' + localStorage['company_id'], {
          'description': this.schema.description,
          'work_with_us': this.schema.work_with_us,
          'uri': this.schema.uri
        })
        .then(response => {
          if (this.logo !== '') {
            this.uploadAndValidateLogo(button, true)
          } else {
            this.showSuccess('La empresa se actualizó correctamente.')
            setTimeout(() => {
              this.restoreButton(button, oldMsg)
              this.exit()
            }, 500)
          }
        })
        .catch(error => {
          console.log(error)
          this.showError('Ocurrio un error inesperado, por favor contacte al administrador del sistema.')
          this.restoreButton(button, oldMsg)
        })
      } else {
        // 'Antes de continuar por favor verifique la información suministrada.'
        var msg = this.errors.description_label
        this.showError(msg)
      }
    }
  },
  mounted: function () {
    this.getLogoUri()
    this.setupLockButtonsBar()
    document.head.appendChild(this.bootstrap_min_js)
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
    this.axios.get('/company/' + localStorage['company_id'])
    .then((response) => {
      this.schema.description = response.data.data.company.description
      this.schema.work_with_us = response.data.data.company.work_with_us
      this.schema.uri = response.data.data.company.uri
    })
    .catch(error => { console.log(error.response) })
  },
  created: function () {
    this.bootstrap_min_js = document.createElement('script')
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
  }
}
