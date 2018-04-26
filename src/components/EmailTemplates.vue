<template>
  <div id="general-container">
    <alert-modal :typeMessage="typeMessage" :message="alertMessage" :activate="showAlert" :type="typeOfAlert" time="5"></alert-modal>
    <toolbar></toolbar>
    <!-- header start -->
    <div class="section-header">
      <div class="general-container">
        <div class="row">
          <div class="col-xs-12">
            <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Correos electrónicos automatizados</h1>
            <span class="header-title-message wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Posición {{ position.name }}</span>
          </div>
        </div>
      </div>
    </div><!-- header end -->

    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">

      <!-- <div class=""></div> -->
      <div class="email-tabs-container">
        <div class="general-container">
          <div class="row">
            <div class="mdl-tabs__tab-bar">
              <a href="#regards-template" class="mdl-tabs__tab is-active" >Agradecer solicitud</a>
              <a href="#reject-template" class="mdl-tabs__tab">Rechazar candidato</a>
              <!--<a href="#call-template" class="mdl-tabs__tab">Invitar candidato a llamada</a>
              <a href="#interview-template" class="mdl-tabs__tab">Invitar candidato a entrevista</a>
              <a href="#approved-template" class="mdl-tabs__tab">Contratado</a>-->
            </div>
          </div>
        </div><!-- general-container end -->
      </div><!-- email-tabs-container end -->

      <div class="general-container">
        <div class="row">
          <div class="col-xs-offset-2 col-xs-8">
            <div class="mdl-tabs__panel is-active" id="regards-template">
              <email-control-template :saveButtonMessage="'Guardar'" :type="'template'" :position_id="position_id" :type_prop="'in_process'" @saved="saved()" @go_back="go_back()"></email-control-template>
            </div>
            <div class="mdl-tabs__panel" id="reject-template">
              <email-control-template :saveButtonMessage="'Guardar'" :type="'template'" :position_id="position_id" :type_prop="'reject'" @saved="saved()" @go_back="go_back()"></email-control-template>
            </div>
            <!--<div class="mdl-tabs__panel" id="call-template">
              <email-control-template :saveButtonMessage="'Guardar'" :type="'template'" :position_id="position_id" :type_prop="'scheduled_call'" @saved="saved()" @go_back="go_back()"></email-control-template>
            </div>
            <div class="mdl-tabs__panel" id="interview-template">
              <email-control-template :saveButtonMessage="'Guardar'" :type="'template'" :position_id="position_id" :type_prop="'scheduled_interview'" @saved="saved()" @go_back="go_back()"></email-control-template>
            </div>
            <div class="mdl-tabs__panel" id="approved-template">
              <email-control-template :saveButtonMessage="'Guardar'" :type="'template'" :position_id="position_id" :type_prop="'approved'" @saved="saved()" @go_back="go_back()"></email-control-template>
            </div>-->
          </div>
        </div>
        <div style="display: none;" id="tempalteSaved" class="alert alert-success" role="alert">
          <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Plantilla Guardada</strong>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from './Toolbar'
  import EmailControlTemplate from './EmailControlTemplate'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Tabs } from 'uiv'
  import AlertModal from './AlertModal'

  export default {
    components: {
      Toolbar,
      EmailControlTemplate,
      Tabs,
      AlertModal
    },
    data: function () {
      return {
        position_id: this.$route.params.position_id,
        position: {},
        bootstrap_min_js: null,
        showAlert: true,
        typeOfAlert: '',
        typeMessage: '',
        alertMessage: '',
        config: {
          placeholderText: 'Edita tu contenido aquí!',
          events: {
            'froalaEditor.initialized': function () {
            }
          }
        }
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      saved () {
        this.showAlert = !this.showAlert
        this.typeOfAlert = 'is-success'
        this.typeMessage = 'Plantilla Guardada.'
        this.alertMessage = ''
        setTimeout(() => {
          window.location.href = '/positions'
        }, 500)
      },
      go_back () {
        window.location.href = '/positions'
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
