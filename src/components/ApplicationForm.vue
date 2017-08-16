<template>
  <div class="panel panel-default">
    <div class="panel-heading">Enviar solicitud a esta posición</div>
    <div class="panel-body">
      <div class="form form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label" >Nombre *</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Apellido *</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Correo Electrónico *</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Teléfono *</label>
          <div class="col-sm-2">
            <input type="text" class="form-control" id="name" >
          </div>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="name" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Curriculum Vitae *</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="name" >
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" >Carta de presentación *</label>
          <div class="col-sm-10">
            <input type="file" class="form-control" id="name" >
          </div>
        </div>
      </div>
      <legend></legend>
      <div class="form">
        <div class="form-group">
          <label for="exampleInputEmail1">Perfil de LinkedIn (opcional)</label>
          <input type="text" class="form-control" >
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Usuario de Twitter (opcional)</label>
          <input type="text" class="form-control" >
        </div>
      </div>
      <legend></legend>
      <button class="btn btn-success">Enviar Solicitud</button>
    </div>
  </div>
</template>

<script>
  import { isLoggedIn } from '../../utils/auth'
  
  export default {
    name: 'application-form',
    components: {
    },
    data: function () {
      return {
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
		
</style>