<template>
  <div id="general-container">
    <app-nav></app-nav>
    <div id="container-positions" class="panel panel-default">
      <div class="panel-heading"><h3 id="header-positions">Canditatos:</h3></div>
      <div class="panel-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Estado</th>
              <th>Fecha de Solicitud</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in applicants">
              <td>{{ item.applicant_first_name }}</td>
              <td>{{ item.applicant_last_name }}</td>
              <td>
                {{ get_applicants_status(item.status_application) }}
              </td>
              <td>{{ item.created_at.substring(0, 10) }}</td>
              <td>
                <a class="btn btn-warning" :href="'/applicant/' + item.applicant_id">Detalles</a>
                <tooltip text="Aprobar">
                  <button @click="set_status_application(item.id, 'approved')" class="btn btn-success"><i class="glyphicon glyphicon-ok"></i></button>
                </tooltip>
                <tooltip text="Rechazar">
                  <button @click="set_status_application(item.id, 'rejection')" class="btn btn-danger"><i class="glyphicon glyphicon-remove"></i></button>
                </tooltip>
                <tooltip text="Invitar a LLamada">
                  <button @click="set_status_application(item.id, 'scheduled_call')" class="btn btn-info"><i class="glyphicon glyphicon-phone"></i></button>
                </tooltip>
                <tooltip text="Invitar a Entrevista">
                  <button @click="set_status_application(item.id, 'scheduled_interview')" class="btn btn-default"><i class="glyphicon glyphicon-user"></i></button>
                </tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <a href="/positions" class="btn btn-warning">Retornar a posiciones</a>
      </div>
    </div>
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
  export default {
    components: {
      AppNav
    },
    data: function () {
      return {
        applicants: {}
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      get_applicants () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/applications/' + this.$route.params.position_id)
        .then(response => {
          this.applicants = response.data.data.applicants
        })
        .catch(error => { console.log(error.response) })
      },
      get_applicants_status (status) {
        if (status === 'approved') {
          return 'Aprobado'
        } else if (status === 'in_process' || status === null) {
          return 'En Proceso'
        } else if (status === 'rejection') {
          return 'Rechazado'
        } else if (status === 'scheduled_call') {
          return 'Invitación a LLamada'
        } else if (status === 'scheduled_interview') {
          return 'Invitación a Entrevista'
        }
      },
      set_status_application (id, status) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.post('/application/' + id + '/' + status)
        .then(response => {
          this.get_applicants()
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted: function () {
      this.get_applicants()
    }
  }
</script>

<style scoped>
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  </style>