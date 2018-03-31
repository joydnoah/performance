<template>
  <div>
    <div id="form-container">
      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="separator"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="page-title">Aplicar a esta posición</div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid': $v.first_name.$error }">
            <label class="mdl-textfield__label" for="first_name">Nombre *</label>
            <input v-on:input="$v.first_name.$touch" v-model='first_name' id="first_name" name="first_name" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">Este campo no puede estar vacio</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid': $v.last_name.$error }">
            <label class="mdl-textfield__label" for="last_name">Apellido *</label>
            <input v-on:input="$v.last_name.$touch" v-model='last_name' id="last_name" name="last_name" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">Este campo no puede estar vacio</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid': $v.email.$error }">
            <label class="mdl-textfield__label" for="email">Email *</label>
            <input v-on:input="$v.email.$touch" v-model='email' id="email" name="email" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">Este campo no puede estar vacio</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid': $v.phone_number.$error }">
            <label class="mdl-textfield__label" for="phone_number">Teléfono *</label>
            <input v-model='phone_number' id="phone_number" name="phone_number" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">Este campo no puede estar vacio</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="separator public-form-separator"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <label class="mdl-textfield__label" for="linkedin_user">Perfil de linkedIn (opcional)</label>
            <input v-model='linkedin_user' id="linkedin_user" name="linkedin_user" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">Error message</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <label class="mdl-textfield__label" for="twitter_user">Usuario de Twitter (opcional)</label>
            <input v-model='twitter_user' id="twitter_user" name="twitter_user" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">Error message</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="separator public-form-separator"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="page-subtitle">Los archivos que se adjunten deben ser PDF con maximo 7MB</div>
        </div>
      </div>

      <input type="file" style="opacity: 0" id="curriculum_vitae-upload" v-on:change="uploadManualFiles('curriculum_vitae', $event)">

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div id="curriculum_vitae" class="file-upload-container">
            <div class="upload-title">Curriculum Vitae</div>
            <!-- Add .hidden class to hide this div when the file is uploaded -->
            <div id="curriculum_vitae-upload">
              <div v-on:click="clickEvent('curriculum_vitae')" id="curriculum_vitae-container" class="upload-container" @drop.prevent="loadFiles" @dragover.prevent>
                <div class="upload-sub-title" id="curriculum_vitae-subtittle">
                  <i class="material-icons">cloud_upload</i>
                  Suelta el archivo aqui
                </div>
                <div class="upload-note" id="curriculum_vitae-note">formatos aceptados .PDF o .docx</div>
              </div>
              <div id="curriculum_vitae-file" class="uploaded-file hidden">
                <i class="material-icons file-icon">description</i>
                <span class="file-name">{{ curriculum_name }}</span>
                <i @click="deleteFile($event)" class="material-icons delete-icon">close</i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input type="file" style="opacity: 0" id="presentation_letter-upload" v-on:change="uploadManualFiles('presentation_letter', $event)">

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div id="presentation_letter" class="file-upload-container">
            <div class="upload-title">Carta de presentación</div>
            <!-- Add .hidden class to hide this div when the file is uploaded -->
            <div id="presentation_letter-upload">
              <div v-on:click="clickEvent('presentation_letter')" id="presentation_letter-container" class="upload-container" @drop.prevent="loadFiles" @dragover.prevent>
                <div id="presentation_letter-subtittle" class="upload-sub-title">
                  <i class="material-icons">cloud_upload</i>
                  Suelta el archivo aqui
                </div>
                <div class="upload-note" id="presentation_letter-note">formatos aceptados .PDF o .docx</div>
              </div>
              <div id="presentation_letter-file" class="uploaded-file hidden">
                <i class="material-icons file-icon">description</i>
                <span class="file-name">{{ presentation_letter_name }}</span>
                <i @click="deleteFile($event)" class="material-icons delete-icon">close</i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <button id="send-button" @click="post($v)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Enviar solicitud</button>
        </div>
      </div>
    </div>

    <div class="panel-body">
      <div id="alert-succes" style="display: none;" class="alert alert-success">
        <i class="glyphicon glyphicon-ok"></i> <strong>Proceso finalizado</strong>
        <p>Se ha enviado tu solicitud de aplicante para la posición actual.</p>
      </div>
      <div id="alert-warning" style="display: none;" class="alert alert-warning">
        <i class="glyphicon glyphicon-ok"></i> <strong>Formulario no disponible</strong>
        <p>No es posible aplicar a la posición actual.</p>
      </div>
      <div id="alert-info" style="display: none;" class="alert alert-info">
        <i class="glyphicon glyphicon-ok"></i> <strong>Candidato Existente!</strong>
        <p>Existe un candidato registrado con ese correo</p>
      </div>

      <div style="display: none;" class="alert alert-danger" id="alert-error">
      </div>
    </div>
  </div>
</template>

<script>
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    name: 'application-form',
    components: {
    },
    props: ['position', 'status'],
    data: function () {
      return {
        applicant_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone_code: '0',
        phone_number: '',
        linkedin_user: '',
        twitter_user: '',
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
    validations: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      phone_number: {
        required
      },
      email: {
        required,
        email
      }
    },
    methods: {
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
        console.log(e.path[0])
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
      validate_file (validType, validSize, errorId) {
        var validation = validSize && validType
        if (!validation) {
          var msg = 'Solo se pueden adjuntar archivos'
          if (!validSize) {
            msg = msg + ' menores a 7MB '
          }
          if (!validType) {
            msg = msg + ' en formato PDF. '
          }
          document.getElementById('alert-error' + errorId).style.display = 'block'
          document.getElementById('alert-error' + errorId).innerHTML = msg
        }
        return validation
      },
      validate_form (validCurriculum, validLetter) {
        var msg = ''
        var validation = validCurriculum && validLetter && this.required_file
        if (!this.required_file) {
          msg = msg + '<div> Es necesario anexar un Curriculum Vitae. </div>'
        }
        if (!validation) {
          document.getElementById('alert-error').style.display = 'block'
          document.getElementById('alert-error').innerHTML = msg
        }
        return validation
      },
      post (v) {
        v.$touch()
        var validCurriculum = this.validate_file(this.valid_file_type_curriculum, this.valid_file_size_curriculum, '1')
        var validLetter = this.validate_file(this.valid_file_type_presentation_letter, this.valid_file_size_presentation_letter, '2')
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
        this.form_data.append('first_name', this.first_name)
        this.form_data.append('last_name', this.last_name)
        this.form_data.append('email', this.email)
        this.form_data.append('phone_code', this.phone_code)
        this.form_data.append('phone_number', this.phone_number)
        this.form_data.append('linkedin_user', this.linkedin_user)
        this.form_data.append('twitter_user', this.twitter_user)

        this.axios.post('/application', this.form_data)
        .then(response => {
          console.log(response.data)
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
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
