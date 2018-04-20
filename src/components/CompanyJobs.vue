<template>
  <div id="general-container">
    <alert-modal :typeMessage="typeMessage" :message="alertMessage" :activate="showAlert" :type="typeOfAlert" time="5"></alert-modal>
    <toolbar></toolbar>

    <div class="body-container">
      <!-- header start -->
      <div class="section-header">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <h1 class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Información empresarial</h1>
              <span style="display: none;" class="header-title-link wow fadeInRight" data-wow-delay="0.4s" data-wow-duration="1.2s">
                <div class="link-message">Enlace para publicar manualmente</div>
                <router-link v-bind:to="'/' + schema.uri" target="_blank" class="link-url">{{ server }}/{{ schema.uri }}</router-link>
              </span>
            </div>
          </div>
        </div>
      </div><!-- header end -->

      <!-- create-buttons-bars start -->
      <div class="create-buttons-bar-container">
        <div id="create-buttons-bar" class="create-buttons-bar">
          <div class="general-container">
            <div class="row">
              <div class="col-xs-offset-4 col-xs-10">
                <div class="buttons-container">
                  <router-link v-bind:to="'/' + schema.uri" target="_blank" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success pull-left">Vista previa</router-link>
                  <button @click="update_company($v.schema)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success pull-left">Guardar cambios</button>
                  <button @click="exit()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error pull-left">Salir</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-action pull-right" style="display: none;">Completar este paso luego</button>
                </div>
              </div>
            </div>
            <div style="display: none;" id="alert-success" class="alert alert-success" role="alert">
              <strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong>
              <p>La empresa se actualizó correctamente.</p>
            </div>
            <div style="display: none;" id="copy_link" class="alert alert-success" role="alert">
              <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Link Copiado</strong>
              <p></p>
            </div>
            <div style="display: none;" class="alert alert-danger">
              <i class="glyphicon glyphicon-remove-sign"></i> <strong>Campos requeridos</strong>
              <p>Antes de continuar por favor verifique la información suministrada.</p>
            </div>
            <div style="display: none;" class="alert alert-danger">
              <i class="glyphicon glyphicon-remove-sign"></i> <strong>Oops!</strong>
              <p>Ocurrio un error inesperado, por favor contacte al administrador del sistema.</p>
            </div>
          </div>
        </div><!-- create buttons bar end -->
      </div>



      <div id="create-form-container" class="general-container">
        <div class="email-template-content">
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-header">
                <div class="template-title-container">
                  <div class="template-title">Página publica empresarial</div>
                </div>
                <div class="template-instructions-container">
                  <div class="instructions-title">Instrucciones</div>
                  <div class="instructions-message">Esta es la información que veran los candidatos cuando busquen tu empresa, tambien aqui se listaran todas las ofertas laborales que tengas disponibles.</div>
                </div>
              </div>
            </div>

            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-body is-active">
                <div class="separator"></div>
              </div>
            </div>
          </div>

          <input type="file" class="form-control" id="logo-file-input" style="display: none;" v-on:change="manualLoadFile($event)" />
          <div class="logo-upload-container">
            <div class="row">
              <div class="col-xs-offset-2 col-xs-4">
                <div id="actual-logo" style="display: block;">
                  <div class="uploaded-content">
                    <img :src="logo_uri">
                  </div>
                </div>
                <div id="to-upload-logo" style="display: none;">
                  <div class="upload-title">Logo empresarial</div>
                  <div id="logo-uploader" class="uploaded-content">
                  </div>
                  <!-- Add .hidden class to hide this div when there is no logo -->
                  <div id="logo_img_container" class="uploaded-content hidden">
                    <div>{{ logo['name'] }}</div>
                    <img id="logo_img" v-on:change="helpFun()">
                  </div>
                </div>
              </div>

              <div class="col-xs-4">
                <div class="buttons-container">
                  <button v-on:click="manualUpload()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-action">Buscar</button>
                  <button v-on:click="uploadAndValidateLogo(false)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success">Guardar</button>
                  <button style="display: none;" v-on:click="showLogoInput()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error">Borrar</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-offset-2 col-xs-6">

            </div>
            <div class="col-xs-3">
              <div class="check-level-container">
                <div class="check-level-item">

                </div>
              </div>
            </div>
          </div>

          <div v-if="$schema && !$schema.then" style="display: none;" class="row abilities">
            <div class="col-xs-offset-2 col-xs-8" style="padding-bottom: 0px; border-right: 0px;">
              <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                <div class="offer-header-container" v-bind:class="{ 'has-error': $v.schema.uri.$error }">
                  <label class="header-title">Enlace de página de empresa <span class="required-span">*</span></label>
                  <div class="input-group">
                    <span class="input-group-addon">{{ server }}/</span>
                    <input type="text" class="form-control" v-on:input="$v.schema.uri.$touch" v-model="schema.uri" id="uri" name="uri" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-offset-4 col-xs-5">
              <div class="offer-header-container" v-bind:class="{ 'has-error': $v.schema.uri.$error }">
                <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label" style="padding-top: 0px; padding-left: 20%">
                  <button @click="confirmCopiedCompanyLink()" v-clipboard:copy="server + '/' + schema.uri" class="btn btn-default" style="padding-left: 60px; padding-right: 60px">Copiar link</button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="template-body is-active">
                <div class="offer-header-container">
                  <label class="header-title" for="template01">Danos una descripcion corta de tu empresa. (Máximo 200 palabras)</label>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <textarea v-model="schema.description" class="form-control" type="text" rows= "4" id="template01"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div><!-- body-container end -->
  </div>
</template>

<script src="../assets/js/companyjobs.js"></script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
  #container-positions{
    width: 80%;
    margin: 0 auto;
  }
  #add-section{
    text-align: right;
    width: 100%;
    padding: 1em 1em 1em 1em;
  }
  .required-span{
    color: #a94442;
  }
</style>
