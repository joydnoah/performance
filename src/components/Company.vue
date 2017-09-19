<template>
  <div id="general-container">
    <div id="container-preview">
      <div class="panel panel-default">
        <div class="panel-body position-panel">
          <p>
            {{ company.description }}
          </p>
          <h3> Pocisiones Abiertas Actualmente en {{ company.name }}</h3>
          <div class="form-group">
            <label></label>
            <select id="departments-list" class="form-control">
              <option v-for="item in department_list" v-bind:value="id">
                {{ item.name }}
              </option>
            </select>

            <ol class="list-positions">
              <li v-for="item in positions" v-bind:value="id">
                <a v-bind:href="'/position-apply/' + item.id">{{ item.name }} - {{ item.city }}</a>
                <br/>
                <strong>{{ item.department_name }}</strong>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  
  export default {
    components: {
    },
    data: function () {
      return {
        id: this.$route.params.company_id,
        company: {},
        positions: [],
        department_list: []
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      exit () {
      },
      get_positions () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position', {params: {'company_id': this.id}})
        .then(response => {
          for (var item in response.data.data.positions) {
            if (response.data.data.positions[item].status_type === 'publish') {
              this.positions.push(response.data.data.positions[item])
            }
          }
        })
        .catch(error => { console.log(error.response) })
      },
      get_departments () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/departments/' + this.id)
        .then((response) => {
          this.department_list = response.data.data.departments
        })
        .catch(error => {
          console.log(error.response)
        })
      }
    },
    mounted () {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/company/' + this.id)
      .then((response) => {
        this.company = response.data.data.company
      })
      .catch(error => { console.log(error.response) })

      this.get_departments()
      this.get_positions()
    }
  }
</script>
<style scoped>
    #container-preview{
      width: 90%;
      margin: 3em auto;
      margin-bottom: 1em;
    }
    .position-panel{
      padding: 3em 3em 3em 3em;
    }
    a{
      margin-bottom: 50px;
      cursor: pointer;
    }
    label{
      display: block;
      margin-top: 2em;
      margin-bottom: 1em;
      font-size: 1em;
    }

    p{
      display: block;
      text-align: justify;
      font-size: 1em;
    }
    #departments-list{
      width: 30%;
    }
    .list-positions{
      margin-top: 2em;
      font-size: 1.1em;
    }
    .list-positions li{
      margin-top: 2em;
    }
</style>