<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  html, body, h1, h2, h3, h4, h5, h6, p, a, span, input, select, textarea, div, label{
    font-family: 'Roboto', sans-serif !important;
  }
  html, #general-container{
    background: url('~@/assets/background.png');
  }
</style>
