<template>
  <div id="general-container">
    <div>
      <div class="body-container">

        <div class="general-container">
          <div class="public-page-content">

            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="page-logo" style="padding-bottom: 10%">
                  <img :src="logo_uri">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div class="page-title">Acerca de la empresa</div>
              </div>
              <div v-show="isEmpty( company.description )" class="col-xs-offset-2 col-xs-8">
                <div class="page-item">
                  <div class="item-label">Descripción de la empresa</div>
                  <div class="item-description">{{ company.description }}</div>
                </div>
              </div>
              <div v-show="false" class="col-xs-offset-2 col-xs-8">
                <div class="page-item">
                  <div class="item-label">Nombre de la empresa</div>
                  <div class="item-description">{{ company.name }}</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-offset-2 col-xs-8">
                <div v-if="openPositions(department_list)" class="page-title">Posiciones abiertas</div>
              </div>
              <div class="col-xs-offset-2 col-xs-8">
                <div v-if="!openPositions(department_list)" class="page-title">Aun no existen posiciones abiertas</div>
              </div>
              <div class="col-xs-offset-2 col-xs-8">
                <div class="separator"></div>
              </div>
            </div>

            <div v-for="item in department_list" v-bind:value="item.id">
              <div v-if="testPosition(item)">
                <div class="page-position-container">
                  <div class="row">
                    <div class="col-xs-offset-2 col-xs-3">
                      <div class="position-title">{{ item.name }}</div>
                    </div>
                    <div class="col-xs-5">
                      <div v-for="item_position in positions">
                        <div v-if="item_position.department_name === item.name || (item_position.department_name == null && item.name === 'Otros')">
                          <div class="position-item">
                            <div class="item-label">{{ item_position.city }}</div>
                            <div v-on:click="goTo( '/position-apply/' + item_position.id )" class="item-description">{{ item_position.name }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-offset-2 col-xs-8">
                    <div class="separator"></div>
                  </div>
                </div>
              </div>
            </div>

          </div><!-- create-form end -->
        </div><!-- create-form-container end -->

      </div><!-- body-container end -->
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
        bucket: process.env.AWS_S3_BUCKET,
        company: {},
        positions: [],
        department_list: [
        {'id': 0, 'name': 'Todos'}
        ],
        department_to_filter: '0',
        logo_uri: ''
      }
    },
    methods: {
      openPositions (positions) {
        var aux = false
        for (var i = 0; i < positions.length; i++) {
          aux = aux || this.testPosition(positions[i])
        }
        return aux
      },
      goTo (url) {
        window.location.href = url
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      isEmpty (str) {
        return !!str
      },
      testPosition (position) {
        for (var i = 0; i < this.positions.length; i++) {
          if (this.positions[i].department_name === position.name || (this.positions[i].department_name == null && position.name === 'Otros')) {
            return true
          }
        }
        return false
      },
      otherPositions () {
        for (var i = 0; i < this.department_list.length; i++) {
          if (!this.department_list[i].name) {
            this.department_list[i].name = 'Otros'
          }
        }
      },
      getPositions () {
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
      getDepartments () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/departments/' + this.company.id)
        .then((response) => {
          this.department_list = response.data.data.departments
          this.otherPositions()
        })
        .catch(error => {
          console.log(error.response)
        })
      },
      getLogoUri () {
        this.axios.get('/company/' + this.company.id + '/logo')
        .then(response => {
          if (response.data.data.logo.id !== null && response.data.data.logo.id !== undefined && response.data.data.logo.id !== '') {
            this.logo_uri = 'https://' + this.bucket + '.s3.amazonaws.com/' + response.data.data.logo.id
          } else {
            this.logo_uri = '/static/html_layout/images/no-logo.png'
          }
        })
      },
      getCompany () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/company/uri/' + this.$route.params.uri)
        .then((response) => {
          this.company = response.data.data.company
          this.getLogoUri()
          this.getDepartments()
        })
        .catch(error => { console.log(error.response) })
      }
    },
    mounted () {
      this.getCompany()
      this.getPositions()
      this.bootstrap_min_js = document.createElement('script')
      this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js')
      this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa')
      this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous')
      document.head.appendChild(this.bootstrap_min_js)
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
