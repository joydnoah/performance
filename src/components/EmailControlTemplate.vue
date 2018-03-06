<template>
  <div>
    <div class="email-template-content">
      <div class="template-header">
        <div class="template-title-container">
          <div class="template-title">Plantilla para invitar candidato a llamada</div>
          <div class="switch-container">
            <span class="switch-message">Activar plantilla</span>

            <div class="switch-content">
              <div class="onoffswitch">
                <input v-on:click="changeTemplateStatus()" v-model="status.automatic_send" :id="check_box_id" type="checkbox" name="switchitem1" class="onoffswitch-checkbox"">
                <label class="onoffswitch-label" :for="check_box_id">
                  <span class="onoffswitch-inner">
                    <span class="onoffswitch-active">
                      <span class="onoffswitch-switch transition-mdl-elements">SI</span>
                    </span>
                    <span class="onoffswitch-inactive">
                      <span class="onoffswitch-switch transition-mdl-elements">NO</span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="template-instructions-container">
          <div class="instructions-title">Instrucciones</div>
          <div class="instructions-message">Este correo electrónico será enviado automaticamente a los candidatos que apruebes en el proceso de entrevistas de esta posición</div>
        </div>

      </div>
      <div class="separator"></div>
      <div v-if="status.automatic_send">
        <div class="template-body is-active">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
              <label class="mdl-textfield__label" :for="email_id">Correo del remitente</label>
              <input v-model="status.from_address" class="mdl-textfield__input" type="text" :id="email_id" :name="email_id" autofocus>
              <span class="mdl-textfield__error">Error message</span>
          </div>
          <div class="separator"></div>
          <div class="template-explanation-container">
            <div class="explanation-title">Elementos automáticos</div>
            <div class="explanation-text">
              Inserta estos elementos en el correo y nosotros los personalizaremos automáticamente.
              <br><br>
              <strong>[*NOMBRE*]</strong> = Primer nombre del candidato
              <br><br>
              <strong>[*NOMBRE COMPLETO*]</strong> = Nombre completo del candidato
              <br><br>
              <strong>[*POSICION*]</strong> = Nombre de la posición
            </div>
          </div>
          <div class="separator"></div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty">
            <label class="mdl-textfield__label" :for="subject_id">Asunto</label>
            <input v-model="status.subject" class="mdl-textfield__input" type="text" :id="subject_id" :name="subject_id" autofocus>
            <span class="mdl-textfield__error">Error message</span>
          </div>
          <div class="form-group">
            <label>Cuerpo del mensaje: </label>
            <quill-editor v-model="status.body"
                    ref="myQuillEditor"
                    :options="{ placeholder: '' }"></quill-editor>
          </div>
          <div class="separator"></div>
          <div v-if="buttons" class="form-btn-container">
            <button :id="save_button_id" v-on:click="save()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Guardar</button>
            <button v-on:click="go_back()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Salir sin guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Alert } from 'uiv'

  export default {
    components: {
      Alert
    },
    props: ['position_id', 'status_prop', 'type_prop', 'send', 'buttons'],
    name: 'email-control-template',
    data: function () {
      return {
        email_templates: [],
        check_box_id: 'checkbox-',
        subject_id: '',
        email_id: '',
        save_button_id: '',
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
      go_back () {
        window.location.href = '/positions'
      },
      save () {
        if (this.status.id === 0) {
          this.post()
        } else {
          this.put()
        }
      },
      changeTemplateStatus () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.put('/email_template/' + this.status.id, {
          'automatic_send': !this.status.automatic_send
        })
        .then(response => {
          this.$emit('status_change', this.status.automatic_send)
        })
        .catch(error => {
          console.log(error)
          this.status.automatic_send = !this.status.automatic_send
        })
      },
      changeSaveButtonMessage (message) {
        if (this.buttons) {
          document.getElementById(this.save_button_id).innerHTML = message
        }
      },
      post () {
        this.changeSaveButtonMessage('Guardando...')
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
          document.getElementById('tempalteSaved').style.display = 'block'
          this.changeSaveButtonMessage('Guardar')
          this.$emit('saved', true)
        })
        .catch(error => {
          console.log(error)
        })
      },
      put () {
        this.changeSaveButtonMessage('Guardando...')
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.put('/email_template/' + this.status.id, {
          'from_address': this.status.from_address,
          'subject': this.status.subject,
          'body': this.status.body,
          'automatic_send': this.status.automatic_send
        })
        .then(response => {
          if (this.buttons) {
            document.getElementById('tempalteSaved').style.display = 'block'
            this.changeSaveButtonMessage('Guardar')
          }
          this.$emit('saved', true)
        })
        .catch(error => {
          console.log(error)
        })
      },
      make_dirty () {
        document.getElementById(this.subject_id).parentElement.classList.add('is-dirty')
        document.getElementById(this.email_id).parentElement.classList.add('is-dirty')
      }
    },
    watch: {
      status_prop: function () {
        this.status = this.status_prop
      },
      send: function () {
        this.put()
      }
    },
    mounted: function () {
      this.check_box_id = 'checkbox-' + this.type_prop
      this.subject_id = 'subject-' + this.type_prop
      this.email_id = 'email-' + this.type_prop
      this.save_button_id = 'button-' + this.type_prop
      this.bootstrap_min_js = document.createElement('script')
      this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(this.bootstrap_min_js)
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/email_template', { params: { 'position_id': this.position_id } })
      .then((response) => {
        this.email_templates = response.data.data.email_templates
        for (var item in this.email_templates) {
          if (this.email_templates[item].type_template === this.type_prop) {
            this.status = this.email_templates[item]
          }
        }
        // TODO: Email and subject values are being overlaped with their lables.
        // TODO: Find out why 'setTimeout(() => { this.make_dirty() }, 0)' solves the problem
        // TODO: While 'this.make_dirty()' does not solve it.
        if (this.status.automatic_send) {
          setTimeout(() => { this.make_dirty() }, 0)
        }
        this.$emit('status_change', this.status.automatic_send)
      })
      .catch(error => {
        console.log(error.response)
      })
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
