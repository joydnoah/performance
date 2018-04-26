<template>
  <div>
    <div v-if="$schema && !$schema.then" id="form-container">
      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="separator"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="page-title">Aplicar a esta posición</div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid is-dirty': errors.first_name , 'is-dirty': dirty.first_name}">
            <label class="mdl-textfield__label" for="first_name">Nombre *</label>
            <input v-on:change="resetError('first_name')" v-model='schema.first_name' id="first_name" name="first_name" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">{{ errors.first_name_label }}</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid is-dirty': errors.last_name , 'is-dirty': dirty.last_name}">
            <label class="mdl-textfield__label" for="last_name">Apellido *</label>
            <input v-on:change="resetError('last_name')" v-model='schema.last_name' id="last_name" name="last_name" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">{{ errors.last_name_label }}</span>
          </div>
          <div id="email-box" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid is-dirty': errors.email , 'is-dirty': dirty.email}">
            <label class="mdl-textfield__label" for="email">Email *</label>
            <input v-on:change="resetError('email')" v-model='schema.email' id="email" name="email" class="mdl-textfield__input" type="text">
            <span id="email-error" class="mdl-textfield__error">{{ errors.email_label }}</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid is-dirty': errors.phone_number , 'is-dirty': dirty.phone_number}">
            <label class="mdl-textfield__label" for="phone_number">Teléfono *</label>
            <input v-on:change="resetError('phone_number')" v-model='schema.phone_number' id="phone_number" name="phone_number" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">{{ errors.phone_number_label }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="separator public-form-separator"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid is-dirty': errors.linkedin_user , 'is-dirty': dirty.linkedin_user}">
            <label class="mdl-textfield__label" for="linkedin_user">Perfil de linkedIn (opcional)</label>
            <input v-model='schema.linkedin_user' id="linkedin_user" name="linkedin_user" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">{{ errors.linkedin_user_label }}</span>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'is-invalid is-dirty': errors.twitter_user , 'is-dirty': dirty.twitter_user}">
            <label class="mdl-textfield__label" for="twitter_user">Usuario de Twitter (opcional)</label>
            <input v-model='schema.twitter_user' id="twitter_user" name="twitter_user" class="mdl-textfield__input" type="text">
            <span class="mdl-textfield__error">{{ errors.twitter_user_label }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="separator public-form-separator"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div class="page-subtitle">Los archivos que se adjunten deben ser PDF con maximo 7MB</div>
        </div>
      </div>

      <input type="file" style="opacity: 0" id="curriculum_vitae-upload" v-on:change="uploadManualFiles('curriculum_vitae', $event)">

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div id="curriculum_vitae" class="file-upload-container">
            <div class="upload-title">Curriculum Vitae</div>
            <!-- Add .hidden class to hide this div when the file is uploaded -->
            <div id="curriculum_vitae-upload">
              <div v-on:click="clickEvent('curriculum_vitae')" id="curriculum_vitae-container" class="upload-container" @drop.prevent="loadFiles" @dragover.prevent>
                <div class="upload-sub-title" id="curriculum_vitae-subtittle">
                  <i class="material-icons">cloud_upload</i>
                  Suelta el archivo aqui
                </div>
                <div class="upload-note" id="curriculum_vitae-note">formatos aceptados .PDF o .docx</div>
              </div>
              <div id="curriculum_vitae-file" class="uploaded-file hidden">
                <i class="material-icons file-icon">description</i>
                <span class="file-name">{{ curriculum_name }}</span>
                <i @click="deleteFile($event)" class="material-icons delete-icon">close</i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input type="file" style="opacity: 0" id="presentation_letter-upload" v-on:change="uploadManualFiles('presentation_letter', $event)">

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <div id="presentation_letter" class="file-upload-container">
            <div class="upload-title">Carta de presentación</div>
            <!-- Add .hidden class to hide this div when the file is uploaded -->
            <div id="presentation_letter-upload">
              <div v-on:click="clickEvent('presentation_letter')" id="presentation_letter-container" class="upload-container" @drop.prevent="loadFiles" @dragover.prevent>
                <div id="presentation_letter-subtittle" class="upload-sub-title">
                  <i class="material-icons">cloud_upload</i>
                  Suelta el archivo aqui
                </div>
                <div class="upload-note" id="presentation_letter-note">formatos aceptados .PDF o .docx</div>
              </div>
              <div id="presentation_letter-file" class="uploaded-file hidden">
                <i class="material-icons file-icon">description</i>
                <span class="file-name">{{ presentation_letter_name }}</span>
                <i @click="deleteFile($event)" class="material-icons delete-icon">close</i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-offset-1 col-xs-6">
          <button id="send-button" @click="post($v.schema)" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm">Enviar solicitud</button>
        </div>
      </div>
    </div>

    <div class="panel-body">
      <div id="alert-succes" style="display: none;" class="alert alert-success">
        <i class="glyphicon glyphicon-ok"></i> <strong>Proceso finalizado</strong>
        <p>Se ha enviado su solicitud de aplicante para la posición actual.</p>
      </div>
      <div id="alert-warning" style="display: none;" class="alert alert-warning">
        <i class="glyphicon glyphicon-ok"></i> <strong>Formulario no disponible</strong>
        <p>No es posible aplicar a la posición actual.</p>
      </div>
      <div id="alert-info" style="display: none;" class="alert alert-info">
        <i class="glyphicon glyphicon-ok"></i> <strong>Candidato Existente!</strong>
        <p>Existe un candidato registrado con ese correo</p>
      </div>

      <div style="display: none;" class="alert alert-danger" id="alert-error">
      </div>
    </div>
  </div>
</template>

<script src="../assets/js/applicationform.js"></script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
