<template>
  <div id="general-container">
    <div id="loading" class="panel panel-default">
      <div class="panel-body">
        <div id="loading-container">
          <img src="~@/assets/loading.gif">
          Procesando por favor espere...
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getIdToken, getAccessToken } from '../../utils/auth'

  export default {
    name: 'callback',
    data: function () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.post('/social-network-connection/' + window.localStorage['company_id'], {
        'access_token': '0',
        'access_token_secret': '0',
        'provider': 'twitter',
        'page_id': 'No Aplica',
        'oauth_token': window.localStorage['twitter_request_token'],
        'oauth_verifier': this.$route.query.oauth_verifier
      })
      .then(response => {
        window.localStorage.removeItem('twitter_request_token')
        window.location.href = window.localStorage['position_url_social_return']
      })
      .catch(error => {
        window.location.href = window.localStorage['position_url_social_return']
      })
    }
  }
</script>
<style scoped>
  #loading{
    width: 20%;
    margin: 5em auto;
    font-weight: bold;
    text-align: center;
  }
  #loading img{
    margin: 0 auto;
    display: block;
  }
</style>