<template>
  <div id="general-container">
    <app-nav></app-nav>
    
    <!-- body-container start -->
    <div class="body-container">
      
      <layout-header title="Inicio"></layout-header>

      <!-- results-status start -->
      <div class="general-container">
        <div class="home-title">
          <h3>
          ¡Cotopaxi te ayuda a reclutar!
          La manera mas rapida de contratar ejecutivos y empleados.
          </h3>
          <p>
            Con Cotopaxi ahorra tiempo publicando y manejando solicitudes de empleo a tu empresa.
          </p>
        </div>
      </div><!-- results-status end -->
    </div>
  </div>
</template>
<script>
  import AppNav from './AppNav'
  import LayoutHeader from './LayoutHeader'
  export default {
    components: {
      AppNav,
      LayoutHeader
    }
  }
</script>

<style scoped>
  .home-title {
  	text-align: center;
  	height: 300px;
  	padding-top: 4em;
  }
  .home-title h3{
  	width: 30%;
  	margin: 1em auto;
  	text-align: left;
  }
  .home-title p{
  	width: 30%;
  	margin: 1em auto;
  	text-align: left;
  }
</style>