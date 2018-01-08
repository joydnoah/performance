<template>
  <div>
    <div class="email-template-content">
      <div class="template-header">
        <div class="template-title-container">
          <div class="template-title">Plantilla para invitar candidato a llamada</div>
          <div class="switch-container">
            <span class="switch-message">Activar plantilla</span>

            <div class="switch-content">
              <div class="onoffswitch" v-if="type_prop === 'in_process'">
                <input v-model="status.automatic_send" id="tab-switch-01" type="checkbox" name="switchitem1" class="onoffswitch-checkbox"">
                <label class="onoffswitch-label" for="tab-switch-01">
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
              <div class="onoffswitch" v-if="type_prop === 'reject'">
                <input v-model="status.automatic_send" id="tab-switch-02" type="checkbox" name="switchitem2" class="onoffswitch-checkbox">
                <label class="onoffswitch-label" for="tab-switch-02">
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
              <div class="onoffswitch" v-if="type_prop === 'scheduled_call'">
                <input v-model="status.automatic_send" id="tab-switch-03" type="checkbox" name="switchitem3" class="onoffswitch-checkbox">
                <label class="onoffswitch-label" for="tab-switch-03">
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
              <div class="onoffswitch" v-if="type_prop === 'scheduled_interview'">
                <input v-model="status.automatic_send" id="tab-switch-04" type="checkbox" name="switchitem4" class="onoffswitch-checkbox">
                <label class="onoffswitch-label" for="tab-switch-04">
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
      <div class="template-body is-active">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div class="offer-header-container">
            <label class="header-title" for="email">Correo del remitente</label>
            <input v-model="status.from_address" class="mdl-textfield__input" type="text" id="email" name="email" autofocus>
            <span class="mdl-textfield__error">Error message</span>
          </div>
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
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <div class="offer-header-container">
            <label class="header-title" for="template02">Asunto</label>
            <input v-model="status.subject" class="mdl-textfield__input" type="text" id="template02" name="template02" autofocus>
            <span class="mdl-textfield__error">Error message</span>
          </div>
        </div>
        <div class="form-group">
          <label>Cuerpo del mensaje: </label>
          <quill-editor v-model="status.body"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"></quill-editor>
        </div>
        <div class="separator"></div>
        <div class="form-btn-container">
          <button v-on:click="save()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Guardar y Salir</button>
          <button v-on:click="go_back()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Salir sin guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Alert } from 'uiv'

  export default {
    components: {
      Alert,
      quillEditor
    },
    props: ['position_id', 'status_prop', 'type_prop'],
    name: 'email-control-template',
    data: function () {
      return {
        email_templates: [],
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
      this.bootstrap_min_js = document.createElement('script')
      this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(this.bootstrap_min_js)
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
