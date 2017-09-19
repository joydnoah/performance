<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Posición {{ position.name }} - Correos electrónicos automatizados</h3></div>
      <div class="panel-body">
        <tabs :justified="true">
          <tab title="<i class='glyphicon glyphicon-ok'></i> Agradecer solicitud" :html-title="true"></tab>
          <tab title="<i class='glyphicon glyphicon-thumbs-down'></i> Rechazar Candidato" :html-title="true">
            <div>
              <br/>
              <alert :closable="false" type="info">
                <strong>Nota:</strong> Este correo electrónico será enviado automáticamente a los candidatos que se rechazan en el proceso de entrevistas de esta posición
              </alert>
              <div class="form-group">
                <label>Correo de: </label>
                <input type='text' name='name' v-model="reject.from_address" class="form-control" />
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
              <div class="form-group">
                <label>Asunto: </label>
                <input type='text' name='name' v-model="reject.subject" class="form-control" />
              </div>
              <div class="form-group">
                <label>Cuerpo del mensaje: </label>
                <froala :tag="'textarea'" :config="config" v-model="reject.body"></froala>
              </div>
            </div>
            <button v-on:click="save_reject()" class="btn btn-success">Guardar y Salir</button>
            <a href="/positions" class="btn btn-danger">Salir sin guardar</a>
          </tab>
          <tab title="<i class='glyphicon glyphicon-phone-alt'></i> Invitar Candidato a LLamada" :html-title="true"></tab>
          <tab title="<i class='glyphicon glyphicon-thumbs-up'></i> Invitar Candidato a Entrevista" :html-title="true"></tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Tabs, Alert } from 'uiv'
  import VueFroala from 'vue-froala-wysiwyg'
  
  export default {
    components: {
      AppNav,
      Tabs,
      Alert,
      VueFroala
    },
    data: function () {
      return {
        position_id: this.$route.params.position_id,
        position: {},
        email_templates: [],
        config: {
          placeholderText: 'Edita tu contenido aquí!',
          events: {
            'froalaEditor.initialized': function () {
            }
          }
        },
        reject: {
          from_address: '',
          subject: '',
          body: '',
          id: 0
        }
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      save_reject () {
        if (this.reject.id === 0) {
          this.post_reject()
        } else {
          this.put_reject()
        }
      },
      post_reject () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/email_template', {
          'position_id': this.position_id,
          'from_address': this.reject.from_address,
          'type': 'reject',
          'subject': this.reject.subject,
          'body': this.reject.body
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      },
      put_reject () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.put('/email_template/' + this.reject.id, {
          'from_address': this.reject.from_address,
          'subject': this.reject.subject,
          'body': this.reject.body
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    mounted: function () {
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
          if (this.email_templates[item].type_template === 'reject') {
            this.reject = this.email_templates[item]
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