<template>
  <div>
    <div>
      <br/>
      <alert :closable="false" type="info">
        <strong>Nota:</strong> Este correo electrónico será enviado automáticamente a los candidatos que se rechazan en el proceso de entrevistas de esta posición
      </alert>
      <div class="form-group">
        <label>Correo de: </label>
        <input type='text' name='name' v-model="status.from_address" class="form-control" />
      </div>
      <alert :closable="false" type="info">
        <strong>Elementos Automáticos:</strong> Inserta estos elementos en el correo y nosotros los personalizaremos automáticamente.
        <br/>
        <ul>
          <li>[*NOMBRE*] = Primer nombre del candidato</li>
          <li>[*NOMBRE COMPLETO*] = Nombre completo del candidato</li>
          <li>[*POSICION*] = Nombre de la posición</li>
        </ul>
      </alert>
      <div class="form-group" align="left">
        <label><input type="checkbox" name="automatic_send" v-model="status.automatic_send"/> Activar envio de email automatico </label><br>
      </div>
      <div class="form-group">
        <label>Asunto: </label>
        <input type='text' name='name' v-model="status.subject" class="form-control" />
      </div>
      <div class="form-group">
        <label>Cuerpo del mensaje: </label>
        <froala :tag="'textarea'" :config="config" v-model="status.body"></froala>
      </div>
    </div>
    <button v-on:click="save()" class="btn btn-success">Guardar y Salir</button>
    <a href="/positions" class="btn btn-danger">Salir sin guardar</a>
  </div>
</template>

<script>
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Alert } from 'uiv'
  import VueFroala from 'vue-froala-wysiwyg'

  export default {
    components: {
      Alert,
      VueFroala
    },
    props: ['position_id', 'status_prop', 'type_prop'],
    name: 'email-control-template',
    data: function () {
      return {
        email_templates: [],
        config: {
          placeholderText: 'Edita tu contenido aquí!',
          events: {
            'froalaEditor.initialized': function () {
            }
          }
        },
        status: {
          from_address: '',
          subject: '',
          body: '',
          id: 0,
          automatic_send: true
        }
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      save () {
        if (this.status.id === 0) {
          this.post()
        } else {
          this.put()
        }
      },
      post () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/email_template', {
          'position_id': this.position_id,
          'from_address': this.status.from_address,
          'type': this.type_prop,
          'subject': this.status.subject,
          'body': this.status.body,
          'automatic_send': this.status.automatic_send
        })
        .then(response => {
          window.location.href = '/positions'
        })
        .catch(error => {
          console.log(error)
        })
      },
      put () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.put('/email_template/' + this.status.id, {
          'from_address': this.status.from_address,
          'subject': this.status.subject,
          'body': this.status.body,
          'automatic_send': this.status.automatic_send
        })
        .then(response => {
          window.location.href = '/positions'
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    watch: {
      status_prop: function () {
        this.status = this.status_prop
      }
    },
    mounted: function () {
      console.log(this.type_prop)
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.position_id)
      .then((response) => {
        this.position = response.data.data.position
      })
      .catch(error => { console.log(error.response) })

      this.axios.get('/email_template', { params: { 'position_id': this.position_id } })
      .then((response) => {
        this.email_templates = response.data.data.email_templates
        for (var item in this.email_templates) {
          if (this.email_templates[item].type_template === this.type_prop) {
            this.status = this.email_templates[item]
          }
        }
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
