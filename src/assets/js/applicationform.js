import { getAccessToken, getIdToken, isLoggedIn } from '../../../utils/auth'
import axios from 'axios'

export default {
  name: 'application-form',
  components: {
  },
  props: ['position', 'status'],
  data: function () {
    return {
      schema: {
        first_name: null,
        last_name: null,
        email: null,
        phone_code: '0',
        phone_number: null,
        linkedin_user: null,
        twitter_user: null
      },
      errors: {
        first_name: false,
        first_name_label: '',
        last_name: false,
        last_name_label: '',
        email: false,
        email_label: '',
        phone_code: false,
        phone_code_label: '',
        phone_number: false,
        phone_number_label: '',
        linkedin_user: false,
        linkedin_user_label: '',
        twitter_user: false,
        twitter_user_label: ''
      },
      dirty: {
        first_name: false,
        last_name: false,
        email: false,
        phone_code: false,
        phone_number: false,
        linkedin_user: false,
        twitter_user: false
      },
      applicant_id: 0,
      curriculum_vitae: '',
      presentation_letter: '',
      form_data: null,
      valid_file_type_curriculum: true,
      valid_file_size_curriculum: true,
      curriculum_name: '',
      valid_file_type_presentation_letter: true,
      valid_file_size_presentation_letter: true,
      presentation_letter_name: '',
      required_file: false,
      meta_tag: ''
    }
  },
  schema: [
    function loadSchemaOnCreate () {
      let schemaDataPromise = new Promise((resolve, reject) => {
        axios.get('/schemas/application.json')
        .then(response => {
          resolve(response.data)
        })
      })
      return schemaDataPromise
    }
  ],
  methods: {
    resetError (name) {
      this.errors[name] = false
    },
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
    clickEvent (type) {
      document.getElementById(type + '-upload').click()
    },
    uploadManualFiles (type, e) {
      document.getElementById(type + '-container').className += ' hidden'
      document.getElementById(type + '-upload').className += '.hidden'
      document.getElementById(type + '-file').classList.remove('hidden')
      this.set_files(type, e.target.files)
    },
    loadFiles (e) {
      var id = e.path[0].id.split('-')[0]
      document.getElementById(id + '-container').className += ' hidden'
      document.getElementById(id + '-upload').className += '.hidden'
      document.getElementById(id + '-file').classList.remove('hidden')
      this.set_files(id, e.dataTransfer.files)
    },
    deleteFile (e) {
      var id = e.path[1].id.split('-')[0]
      document.getElementById(id + '-file').className += ' hidden'
      document.getElementById(id + '-container').classList.remove('hidden')
      document.getElementById(id + '-upload').className = 'upload-sub-title'
      this.unsetFiles(id)
    },
    unsetFiles (type) {
      switch (type) {
        case 'curriculum_vitae':
          this.valid_file_type_curriculum = true
          this.valid_file_size_curriculum = true
          this.curriculum_vitae = ''
          this.curriculum_name = ''
          this.required_file = false
          break

        case 'presentation_letter':
          this.valid_file_type_presentation_letter = true
          this.valid_file_size_presentation_letter = true
          this.presentation_letter = ''
          this.presentation_letter_name = ''
          break
      }
    },
    isLoggedIn () {
      return isLoggedIn()
    },
    validateFileType (fileType) {
      var pdf = fileType === 'application/pdf'
      var doc = fileType === 'application/msword'
      var docx = fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      return pdf || doc || docx
    },
    set_files (type, files) {
      var validSize = files[0]['size'] <= 7000000
      var validType = this.validateFileType(files[0]['type'])
      switch (type) {
        case 'curriculum_vitae':
          this.valid_file_type_curriculum = validType
          this.valid_file_size_curriculum = validSize
          this.curriculum_vitae = files[0]
          this.curriculum_name = files[0].name
          this.required_file = true
          break

        case 'presentation_letter':
          this.valid_file_type_presentation_letter = validType
          this.valid_file_size_presentation_letter = validSize
          this.presentation_letter = files[0]
          this.presentation_letter_name = files[0].name
          break
      }
    },
    validate_file (validType, validSize, typeOfMessage) {
      var validation = validSize && validType
      if (!validation) {
        var msg = '<div>' + typeOfMessage
        if (!validSize) {
          msg = msg + ' menor a 7MB'
        }
        if (!validType) {
          msg = msg + ' en formato PDF o WORD'
        }
        document.getElementById('alert-error').style.display = 'block'
        document.getElementById('alert-error').innerHTML = document.getElementById('alert-error').innerHTML + msg + '.' + '</div>'
      }
      return validation
    },
    validate_form (validCurriculum, validLetter) {
      var msg = ''
      var validation = validCurriculum && validLetter && this.required_file
      if (!this.required_file) {
        msg = msg + '<div> Es necesario anexar un Curriculum Vitae. </div>' + document.getElementById('alert-error').innerHTML
        document.getElementById('alert-error').style.display = 'block'
        document.getElementById('alert-error').innerHTML = msg
      }
      return validation
    },
    validateEmail (notValid) {
      if (notValid) {
        document.getElementById('email-box').className += ' is-invalid'
      } else {
        document.getElementById('email-box').classList.remove('is-invalid')
      }
    },
    hideAlerts () {
      document.getElementById('alert-error').style.display = 'none'
      document.getElementById('alert-error').innerHTML = ''
      document.getElementById('alert-succes').style.display = 'none'
      document.getElementById('alert-warning').style.display = 'none'
      document.getElementById('alert-info').style.display = 'none'
    },
    post (v) {
      this.hideAlerts()
      v.$touch()
      this.showErrorsLabel(v)
      // this.validateEmail(v.email.$invalid)
      var validCurriculum = this.validate_file(this.valid_file_type_curriculum, this.valid_file_size_curriculum, 'El curriculum vitae debe ser un archivo ')
      var validLetter = this.validate_file(this.valid_file_type_presentation_letter, this.valid_file_size_presentation_letter, 'La carta de presentacion debe ser un archivo ')
      if (this.validate_form(validCurriculum, validLetter)) {
        if (this.applicant_id === 0) {
          if (!v.$error) {
            this.save()
          }
        } else {
          this.save()
        }
      }
    },
    save () {
      document.getElementById('send-button').disabled = true
      document.getElementById('send-button').innerHTML = 'Procesando, por favor espere...'
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.form_data = new FormData()
      this.form_data.append('curriculum_vitae', this.curriculum_vitae)
      this.form_data.append('presentation_letter', this.presentation_letter)
      this.form_data.append('applicant_id', this.applicant_id)
      this.form_data.append('position_id', this.position)
      this.form_data.append('first_name', this.schema.first_name)
      this.form_data.append('last_name', this.schema.last_name)
      this.form_data.append('email', this.schema.email)
      this.form_data.append('phone_code', this.schema.phone_code)
      this.form_data.append('phone_number', this.schema.phone_number)
      this.form_data.append('linkedin_user', this.schema.linkedin_user)
      this.form_data.append('twitter_user', this.schema.twitter_user)

      this.axios.post('/application', this.form_data)
      .then(response => {
        document.getElementsByClassName('alert')[0].style.display = 'block'
        document.getElementById('send-button').disabled = false
        document.getElementById('send-button').innerHTML = 'Enviar Solicitud'
        document.getElementById('form-container').style.display = 'none'
      })
      .catch(error => {
        // TODO: identify how to avoid setting a console.log to prevent error ...
        console.log(error.response)
      })
    }
  },
  watch: {
    status: function () {
      if (this.status !== 'publish') {
        document.getElementById('form-container').style.display = 'none'
        document.getElementsByClassName('alert')[1].style.display = 'block'
      } else {
        document.getElementById('form-container').style.display = 'block'
        document.getElementsByClassName('alert')[1].style.display = 'none'
      }
    }
  },
  mounted () {
    if (this.status !== 'publish') {
      document.getElementById('form-container').style.display = 'none'
      document.getElementsByClassName('alert')[1].style.display = 'block'
    }
  },
  created: function () {
    this.bootstrap_min_js = document.createElement('script')
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
    document.head.appendChild(this.bootstrap_min_js)
  }
}
