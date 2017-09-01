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
        <p>Existe un candidato registrado como <strong>{{ email }}</strong>, ¿Desea enviar la solicitud?</p>
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
        <div class="form-group">
          <label class="col-sm-2 control-label" >Teléfono *</label>
          <div class="col-sm-2">
            <input type="text" class="form-control" v-model='phone_code' id="phone_code" >
          </div>
          <div class="col-sm-8">
            <input type="text" class="form-control" v-model='phone_number' id="phone_number" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Curriculum Vitae *</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="name" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Carta de presentación *</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="name" >
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
        <legend></legend>
        <button class="btn btn-success" @click="post($v)">Enviar Solicitud</button>
      </div>
      <div style="display: none;" class="form">
        <legend></legend>
        <button class="btn btn-success" @click="save($v)">Enviar Solicitud</button>
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
        phone_code: '',
        phone_number: '',
        linkedin_user: '',
        twitter_user: ''
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
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_applicant () {
        if (this.email.trim() !== '') {
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.get('/applicant/' + this.email + '/verify')
          .then((response) => {
            if (response.data.data.Applicant !== '{}') {
              this.applicant_id = JSON.parse(response.data.data.Applicant).id
              document.getElementsByClassName('form')[0].style.display = 'none'
              document.getElementsByClassName('form')[1].style.display = 'none'
              document.getElementsByClassName('form')[2].style.display = 'block'
              document.getElementsByClassName('alert')[2].style.display = 'block'
            }
          })
          .catch(error => { console.log(error.response) })
        }
      },
      post (v) {
        v.$touch()
        if (!v.$error) {
          this.save()
        }
      },
      save () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/application', {
          'applicant_id': this.applicant_id,
          'position_id': this.position,
          'first_name': this.first_name,
          'last_name': this.last_name,
          'email': this.email,
          'phone_code': this.phone_code,
          'phone_number': this.phone_number,
          'linkedin_user': this.linkedin_user,
          'twitter_user': this.twitter_user
        })
        .then(response => {
          document.getElementsByClassName('form')[0].style.display = 'none'
          document.getElementsByClassName('form')[1].style.display = 'none'
          document.getElementsByClassName('form')[2].style.display = 'none'
          document.getElementsByClassName('alert')[2].style.display = 'none'
          document.getElementsByClassName('alert')[0].style.display = 'block'
        })
        .catch(error => { console.log(error.response) })
      }
    },
    watch: {
      status: function () {
        if (this.status !== 'publish') {
          document.getElementsByClassName('form')[0].style.display = 'none'
          document.getElementsByClassName('form')[1].style.display = 'none'
          document.getElementsByClassName('alert')[1].style.display = 'block'
        } else {
          document.getElementsByClassName('form')[0].style.display = 'block'
          document.getElementsByClassName('form')[1].style.display = 'block'
          document.getElementsByClassName('alert')[1].style.display = 'none'
        }
      }
    },
    mounted () {
      if (this.status !== 'publish') {
        document.getElementsByClassName('form')[0].style.display = 'none'
        document.getElementsByClassName('form')[1].style.display = 'none'
        document.getElementsByClassName('alert')[1].style.display = 'block'
      }
    }
  }
</script>

<style scoped>
		
</style>