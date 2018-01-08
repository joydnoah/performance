<template>
  <div id="general-container">
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
              <a href="#regards-template" class="mdl-tabs__tab is-active" @click="make_dirty('in_process')">Agradecer solicitud</a>
              <a href="#reject-template" class="mdl-tabs__tab" @click="make_dirty('reject')">Rechazar candidato</a>
              <a href="#call-template" class="mdl-tabs__tab" @click="make_dirty('scheduled_call')">Invitar candidato a llamada</a>
              <a href="#interview-template" class="mdl-tabs__tab" @click="make_dirty('scheduled_interview')">Invitar candidato a entrevista</a>
            </div>
          </div>
        </div><!-- general-container end -->
      </div><!-- email-tabs-container end -->

      <div class="general-container">
        <div class="row">
          <div class="col-xs-offset-2 col-xs-8">
            <div class="mdl-tabs__panel is-active" id="regards-template">
              <email-control-template :position_id="position_id" :type_prop="'in_process'"></email-control-template>
            </div>
            <div class="mdl-tabs__panel" id="reject-template">
              <email-control-template :position_id="position_id" :type_prop="'reject'"></email-control-template>
            </div>
            <div class="mdl-tabs__panel" id="call-template">
              <email-control-template :position_id="position_id" :type_prop="'scheduled_call'"></email-control-template>
            </div>
            <div class="mdl-tabs__panel" id="interview-template">
              <email-control-template :position_id="position_id" :type_prop="'scheduled_interview'"></email-control-template>
            </div>
          </div>
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

  export default {
    components: {
      Toolbar,
      EmailControlTemplate,
      Tabs
    },
    data: function () {
      return {
        position_id: this.$route.params.position_id,
        position: {},
        bootstrap_min_js: null,
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
      make_dirty (typeProp) {
        document.getElementById('email-' + typeProp).parentElement.classList.add('is-dirty')
        document.getElementById('subject-' + typeProp).parentElement.classList.add('is-dirty')
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
        this.make_dirty('in_process')
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
