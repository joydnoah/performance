<template>
  <div id="general-container">
    <toolbar></toolbar>
    <!-- body-container start -->
    <div class="body-container">
      <!-- header start -->
      <div class="section-header">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s"></h1>
            </div>
          </div>
        </div>
      </div><!-- header end -->

      <div class="general-container">

        <div class="empty-message-container">

          <div class="row">
            <div class="col-xs-offset-4 col-xs-4">
              <div class="empty-icon">
                <i class="material-icons">email</i>
              </div>
              <div class="empty-message">Verifique su cuenta de Email y sigue las instrucciones</div>
              <button @click="goTo()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent empty-btn">Regresar</button>
            </div>
          </div>

        </div>
      </div>

    </div><!-- body-container end -->
  </div>
</template>

<script>
  import AppNav from './AppNav'
  import Toolbar from './Toolbar'

  export default {
    components: {
      Toolbar,
      AppNav
    },
    data: function () {
      return {
        positions: {}
      }
    },
    methods: {
      goTo () {
        window.location.href = '/login'
      }
    },
    mounted: function () {
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
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  #verify-div{
    width: 30%;
    margin: 3em auto;
  }
</style>
