<template>
  <div id="general-container">
    <div class="alert-message-container" id="alert"><!-- add class .is-active to show alert -->
      <div class="alert-message" v-bind:class="{ 'is-warning': testType('is-warning'), 'is-error': testType('is-error'), 'is-success': testType('is-success') }"><!-- add class status is-success is-warning is-error -->
        <p>
          <span>{{ typeMessage }}</span> {{ message }}
          <i @click="hideAlert()" class="material-icons">close</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type', 'activate', 'time', 'message', 'typeMessage'],
    name: 'alert-modal',
    data: function () {
      return {
        modalId: '',
        timeout: ''
      }
    },
    methods: {
      showForTime () {
        this.timeout = setTimeout(() => { this.hideAlert() }, this.time * 1000)
      },
      showAlert () {
        document.getElementById('alert').className += ' is-active'
      },
      hideAlert () {
        document.getElementById('alert').classList.remove('is-active')
        clearTimeout(this.timeout)
      },
      testType (type) {
        return type === this.type
      }
    },
    watch: {
      activate: function () {
        this.showAlert()
        this.showForTime()
      }
    }
  }
</script>

<style scoped>
  .alert-message-container{
    top: auto;
    bottom: 0;
  }
</style>
