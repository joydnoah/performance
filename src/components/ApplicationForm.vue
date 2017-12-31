<template>
  <div class="panel panel-default">
    <div class="panel-heading">Enviar solicitud a esta posición</div>
    <div class="panel-body">
      <div style="display: none;" class="alert alert-success">
        <i class="glyphicon glyphicon-ok"></i> <strong>Proceso finalizado</strong>
        <p>Se ha enviado tu solicitud de aplicante para la posición actual.</p>
      </div>
      <div style="display: none;" class="alert alert-warning">
        <i class="glyphicon glyphicon-ok"></i> <strong>Formulario no disponible</strong>
        <p>No es posible aplicar a la posición actual.</p>
      </div>
      <div style="display: none;" class="alert alert-info">
        <i class="glyphicon glyphicon-ok"></i> <strong>Candidato Existente!</strong>
        <p>Existe un candidato registrado con ese correo</p>
      </div>

      <div class="form form-horizontal">
        <div class="form-group" v-bind:class="{ 'has-error': $v.email.$error }">
          <label class="col-sm-2 control-label" >Correo Electrónico *</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-on:change="get_applicant()" v-on:input="$v.email.$touch" v-model='email' id="email" >
          </div>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.first_name.$error }">
          <label class="col-sm-2 control-label" >Nombre *</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-on:input="$v.first_name.$touch" v-model='first_name' id="first_name" >
          </div>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.last_name.$error }">
          <label class="col-sm-2 control-label" >Apellido *</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-on:input="$v.last_name.$touch" v-model='last_name' id="last_name">
          </div>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': $v.phone_number.$error }">
          <label class="col-sm-2 control-label" >Teléfono *</label>

          <div class="col-sm-10">
            <input type="text" class="form-control" v-on:input="$v.phone_number.$touch" v-model='phone_number' id="phone_number" >
          </div>
        </div>
        <legend></legend>
      </div>

      <div class="form">
        <div class="form-group">
          <label for="exampleInputEmail1">Perfil de LinkedIn (opcional)</label>
          <input type="text" class="form-control" v-model='linkedin_user' id="linkedin_user" >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Usuario de Twitter (opcional)</label>
          <input type="text" class="form-control" v-model='twitter_user' id="twitter_user" >
        </div>
      </div>

      <div class="form form-horizontal">
        <legend>Los archivos que se adjunten deben ser PDF con maximo 7mb</legend>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Curriculum Vitae</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="name" v-on:change="set_files('curriculum_vitae', $event)" />
          </div>
        </div>
        <div style="display: none;" class="alert alert-danger" id="alert-error1">
          <i class="glyphicon glyphicon-ok"></i> <strong>Ops!</strong>
          <p id="error_message"></p>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Carta de presentación</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="name" v-on:change="set_files('presentation_letter', $event)" />
          </div>
        </div>
        <div style="display: none;" class="alert alert-danger" id="alert-error2">
          <i class="glyphicon glyphicon-ok"></i> <strong>Ops!</strong>
          <p id="error_message"></p>
        </div>
      </div>

      <div class="form" style="display: none;">
        <legend></legend>
        <button class="btn btn-success" @click="post($v)">Enviar Solicitud</button>
        <br/>
        <br/>
      </div>
      <div style="display: none;" class="alert alert-danger" id="alert-error">
        <i class="glyphicon glyphicon-ok"></i> <strong>Ops!</strong>
        <p id="error_message"></p>
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
        valid_file_type_presentation_letter: true,
        valid_file_size_presentation_letter: true
      }
    },
    validations: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required,
        email
      },
      phone_number: {
        required
      },
      phone_code: {
        required
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      set_files (type, event) {
        var validSize = event.target.files[0]['size'] <= 7000000
        var validType = event.target.files[0]['type'] === 'application/pdf'
        switch (type) {
          case 'curriculum_vitae':
            this.valid_file_type_curriculum = validType
            this.valid_file_size_curriculum = validSize
            this.curriculum_vitae = event.target.files[0]
            break

          case 'presentation_letter':
            this.valid_file_type_presentation_letter = validType
            this.valid_file_size_presentation_letter = validSize
            this.presentation_letter = event.target.files[0]
            break
        }
      },
      get_applicant () {
        if (this.email.trim() !== '') {
          this.email = this.email.trim().toLowerCase()
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.get('/applicant/' + this.email + '/verify')
          .then((response) => {
            if (response.data.data.applicant !== '{}') {
              this.applicant_id = response.data.data.applicant.id
              document.getElementsByClassName('form')[2].style.display = 'block'
              document.getElementsByClassName('alert')[2].style.display = 'block'
            }
          })
          .catch(error => { console.log(error.response) })
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
      post (v) {
        document.getElementsByClassName('alert')[5].style.display = 'none'
        v.$touch()
        var validCurriculum = this.validate_file(this.valid_file_type_curriculum, this.valid_file_size_curriculum, '1')
        var validLetter = this.validate_file(this.valid_file_type_presentation_letter, this.valid_file_size_presentation_letter, '2')
        if (validCurriculum && validLetter) {
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
        document.getElementsByTagName('button')[1].disabled = true
        document.getElementsByTagName('button')[1].innerHTML = 'Procesando, por favor espere...'
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
          document.getElementsByClassName('form')[0].style.display = 'none'
          document.getElementsByClassName('form')[1].style.display = 'none'
          document.getElementsByClassName('form')[2].style.display = 'none'
          document.getElementsByClassName('form')[3].style.display = 'none'
          document.getElementsByClassName('alert')[2].style.display = 'none'
          document.getElementsByClassName('alert')[0].style.display = 'block'
          document.getElementsByTagName('button')[1].innerHTML = 'Enviar Solicitud'
          document.getElementsByTagName('button')[1].disabled = false
        })
        .catch(error => {
          document.getElementById('error_message').innerHTML = error.response.data.message
          document.getElementsByClassName('alert')[5].style.display = 'block'
          document.getElementsByTagName('button')[1].innerHTML = 'Enviar Solicitud'
          document.getElementsByTagName('button')[1].disabled = false
        })
      }
    },
    watch: {
      status: function () {
        if (this.status !== 'publish') {
          document.getElementsByClassName('form')[0].style.display = 'none'
          document.getElementsByClassName('form')[1].style.display = 'none'
          document.getElementsByClassName('form')[2].style.display = 'none'
          document.getElementsByClassName('alert')[1].style.display = 'block'
        } else {
          document.getElementsByClassName('form')[0].style.display = 'block'
          document.getElementsByClassName('form')[1].style.display = 'block'
          document.getElementsByClassName('form')[2].style.display = 'block'
          document.getElementsByClassName('form')[3].style.display = 'block'
          document.getElementsByClassName('alert')[1].style.display = 'none'
        }
      }
    },
    mounted () {
      if (this.status !== 'publish') {
        document.getElementsByClassName('form')[0].style.display = 'none'
        document.getElementsByClassName('form')[1].style.display = 'none'
        document.getElementsByClassName('form')[2].style.display = 'none'
        document.getElementsByClassName('alert')[1].style.display = 'block'
      }
    }
  }
</script>

<style scoped>

</style>
