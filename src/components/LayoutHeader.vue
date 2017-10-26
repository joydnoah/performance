<template>
  <!-- header start -->
  <div class="section-header">
    <div class="general-container">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">{{ title }}</h1>
          <!-- <span class="header-title-message wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Ultima creación 07/08/2016</span> -->
        </div>
      </div>
    </div>
  </div><!-- header end -->
</template>

<script>
  export default {
    name: 'layout-header',
    props: ['title'],
    data: function () {
      return {
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>