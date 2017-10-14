<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3>Posición {{ position.name }} - Correos electrónicos automatizados</h3></div>
      <div class="panel-body">
        <tabs :justified="true">
          <tab title="<i class='glyphicon glyphicon-ok'></i> Agradecer solicitud" :html-title="true">
            <email-control-template :position_id="position_id" :type_prop="'in_process'"></email-control-template>
          </tab>
          <tab title="<i class='glyphicon glyphicon-thumbs-down'></i> Rechazar Candidato" :html-title="true">
            <email-control-template :position_id="position_id" :type_prop="'reject'"></email-control-template>
          </tab>
          <tab title="<i class='glyphicon glyphicon-phone-alt'></i> Invitar Candidato a LLamada" :html-title="true">
            <email-control-template :position_id="position_id" :type_prop="'scheduled_call'"></email-control-template>
          </tab>
          <tab title="<i class='glyphicon glyphicon-thumbs-up'></i> Invitar Candidato a Entrevista" :html-title="true">
            <email-control-template :position_id="position_id" :type_prop="'scheduled_interview'"></email-control-template>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import EmailControlTemplate from './EmailControlTemplate'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { Tabs } from 'uiv'
  
  export default {
    components: {
      AppNav,
      EmailControlTemplate,
      Tabs
    },
    data: function () {
      return {
        position_id: this.$route.params.position_id,
        position: {},
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
      }
    },
    mounted: function () {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.position_id)
      .then((response) => {
        this.position = response.data.data.position
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