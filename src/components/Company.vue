<template>
  <div id="general-container">
    <div id="container-preview">
      <div class="panel panel-default">
        <div class="panel-body position-panel">
          <p>
            {{ company.description }}
          </p>
          <h3> Pocisiones abiertas actualmente:</h3>
          <div class="form-group">
            <label></label>
            <select id="departments-list" class="form-control" v-model="department_to_filter" v-on:change="filter_department">
              <option value="0">
                Todos
              </option>
              <option v-for="item in department_list" v-bind:value="item.id">
                {{ item.name }}
              </option>
            </select>


            <div v-for="item in department_list" class="department-container" v-bind:id="'department-' + item.id">
              <h4>{{ item.name }}</h4>
              <div v-for="item_position in positions">
                <div v-if="item_position.department_name === item.name">
                  <a v-bind:href="'/position-apply/' + item_position.id">{{ item_position.name }} - {{ item_position.city }}</a>
                </div>
              </div>
            </div>

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
        department_list: [
        {'id': 0, 'name': 'Todos'}
        ],
        department_to_filter: '0'
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
        this.axios.get('/company/' + this.$route.params.uri + '/positions')
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
        this.axios.get('/departments/' + this.company.id)
        .then((response) => {
          this.department_list = response.data.data.departments
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      get_company () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/company/uri/' + this.$route.params.uri)
        .then((response) => {
          this.company = response.data.data.company
          this.get_departments()
        })
        .catch(error => { console.log(error.response) })
      },
      filter_department () {
        if (this.department_to_filter === '0') {
          for (var i = 0; i < document.getElementsByClassName('department-container').length; i++) {
            document.getElementsByClassName('department-container')[i].style.display = 'block'
          }
        } else {
          for (var j = 0; j < document.getElementsByClassName('department-container').length; j++) {
            document.getElementsByClassName('department-container')[j].style.display = 'none'
          }
          document.getElementById('department-' + this.department_to_filter).style.display = 'block'
        }
      }
    },
    mounted () {
      this.get_company()
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
    .department-container {
      margin-top: 2em;
      margin-bottom: 2em;
    }
    .department-container div{
      margin-top: 1em;
    }
</style>
