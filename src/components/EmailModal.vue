<template>
  <div id="general-container">
    <div class="modal fade modal-email-template" :id="modalId">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header">
              <h4 class="modal-title col-xs-10" id="modal-document-type">Detalle del aplicante</h4>
              <button v-on:click="hide()"  type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
            </div>
            <div class="modal-body">
              <div>
                <email-control-template :saveButtonMessage="'Guardar y enviar'" :type="'modal'" :position_id="positionId" :type_prop="typeProp" @saved="saved()" @go_back="hide()"></email-control-template>
              </div>
            </div>
          </div><!-- modal-body ends -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmailControlTemplate from './EmailControlTemplate'

  export default {
    components: {
      EmailControlTemplate
    },
    props: ['externalId', 'showModal', 'closeModal', 'positionId', 'typeProp'],
    name: 'email-modal',
    data: function () {
      return {
        modalId: ''
      }
    },
    methods: {
      saved () {
        this.$emit('saved', true)
      },
      show () {
        document.getElementById(this.modalId).className += ' show'
        document.getElementById(this.modalId).classList.remove('fade')
      },
      hide () {
        this.$emit('clear', true)
        document.getElementById(this.modalId).className += ' fade'
        document.getElementById(this.modalId).classList.remove('show')
      }
    },
    watch: {
      closeModal: function () {
        if (this.closeModal === this.externalId) {
          this.hide()
        }
      },
      showModal: function () {
        if (this.showModal === this.externalId) {
          this.show()
        }
      }
    },
    mounted: function () {
      this.modalId = 'modal-' + this.externalId
      this.check_box_id = 'checkbox-' + this.type_prop
      this.subject_id = 'subject-' + this.type_prop
      this.email_id = 'email-' + this.type_prop
      this.save_button_id = 'button-' + this.type_prop
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
  .modal {
    max-height: calc(100vh);
    overflow-y: auto;
  }
</style>
