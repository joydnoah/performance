<template>
  <div id="general-container">
    <!--<app-nav></app-nav>-->
    <alert-modal :typeMessage="typeMessage" :message="alertMessage" :activate="showAlert" :type="typeOfAlert" time="5"></alert-modal>
    <toolbar></toolbar>
    <!-- body-container start -->
    <div class="body-container">
      <!-- header start -->
      <div class="section-header">
        <div class="general-container">
          <div class="row">
            <div class="col-xs-12">
              <h1 v-if="id === null" class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Crear nueva posición</h1>
              <h1 v-if="id !== null" class="header-title wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1.2s">Editar posición</h1>
            </div>
          </div>
        </div>
      </div><!-- header end -->

      <!-- create-buttons-bars start -->
      <div class="create-buttons-bar-container">
        <div id="create-buttons-bar" class="create-buttons-bar">
          <div class="general-container">
            <div class="row">
              <div class="col-xs-offset-1 col-xs-10">
                <div class="buttons-container">
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-warning" @click="save($v)" id="send-button">Guardar</button>
                  <button v-if="id !== null" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success" @click="preview($v, 'preview', 'Vista previa')" id="preview">Vista previa</button>
                  <button v-if="id !== null" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-warning" @click="set_status_position('publish', $v)" id="publish">Publicar</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error" v-on:click="exit()">Salir</button>
                </div>

                <div style="display: none;" id="alert-error" class="alert alert-danger" role="alert">
                  <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Error</strong>
                  <p>Error</p>
                </div>
                <div style="display: none;" id="alert-success" class="alert alert-success" role="alert">
                </div>

                <div v-if="id !== null && status == 'published'" class="col-xs-offset-5 col-xs-10" style="padding-top: 1%; padding-left: 5%;">
                  Compartir:
                </div>
                <div v-if="id !== null && status == 'published'" class="col-xs-offset-4 col-xs-10" style="padding-top: 1%">
                  <social-sharing :url="shareUrl"
                                  :title="name"
                                  :quote="facebookQuote"
                                  inline-template>
                                  <network network="facebook">
                                    <a onmouseover="" style="cursor: pointer; padding-right: 3%;">
                                      <i class="fa fa-facebook"></i> Facebook
                                    </a>
                                  </network>
                  </social-sharing>
                  <social-sharing :url="shareUrl"
                                  :title="name"
                                  :description="strippedDescription"
                                  inline-template>
                                  <network network="linkedin">
                                    <a onmouseover="" style="cursor: pointer; padding-right: 3%;">
                                      <i class="fa fa-linkedin"></i> LinkedIn
                                    </a>
                                  </network>
                  </social-sharing>
                  <social-sharing :url="shareUrl"
                                  :title="name"
                                  inline-template>
                                  <network network="twitter">
                                    <a onmouseover="" style="cursor: pointer; padding-right: 3%;">
                                      <i class="fa fa-twitter"></i> Twitter
                                    </a>
                                  </network>
                  </social-sharing>
                </div>
              </div>
            </div>
          </div>
        </div><!-- create buttons bar end -->
      </div>

      <div id="create-form-container" class="general-container" style="padding-top: 4%;">
        <div class="create-form">
          <div class="collapse-group" role="tablist" aria-multiselectable="true">
            <div class="" role="tab" id="headingOne">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#general-info" aria-expanded="false" aria-controls="collapseOne" class="">
                <div class="row">
                  <div class="col-xs-offset-2 col-xs-8">
                    <div class="form-title">Información general
                      <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div id="general-info" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
              <div class="row">
                <div class="col-xs-offset-2 col-xs-4">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{ 'has-error': $v.name.$error }">
                    <label id="name_label" class="mdl-textfield__label" for='name'>Nombre de la posición *</label>
                    <input class="mdl-textfield__input" type="text" id='name' name='name' v-on:input="$v.name.$touch" v-model='name'>
                    <span class="mdl-textfield__error">Este campo no puede estar en blanco</span>
                  </div>
                </div>

                <div class="col-xs-4">
                  <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                    <multiselect
                      id="department_create"
                      v-model="department"
                      :options="department_list"
                      tag-placeholder="Agregar departamento"
                      placeholder="Buscar o agregar departamento"
                      label="name"
                      :multiple="false"
                      :hide-selected="true"
                      track-by="name"
                      @input="onChange"
                      :taggable="true"
                      @tag="add_department">
                    </multiselect>
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                </div>

                <div class="col-xs-offset-2 col-xs-4">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <vue-google-autocomplete
                        id='cities'
                        name='cities'
                        class="mdl-textfield__input"
                        placeholder="Buscar Lugar de trabajo"
                        type="text"
                        types="geocode"
                        v-on:placechanged="getAddressData"
                    >
                    </vue-google-autocomplete>
                  </div>
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <div v-if="city.length > 0 && city[0] !== '' && city[0] !== null">
                      <table id="cities_table" class="table">
                        <thead>
                          <tr>
                            <th>
                              Lugar de trabajo
                            </th>
                            <th>
                              Eliminar
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in city">
                            <td v-if="item !== '' && item !== null">{{ item }}</td>
                            <td><button v-if="item !== '' && item !== null" class="btn btn-danger btn-xs" v-on:click="remove_city(index)"><i class="glyphicon glyphicon-remove"></i></button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="col-xs-offset-2 col-xs-8">
                  <label>Descripción</label>
                  <quill-editor v-model='description'
                          ref="myQuillEditor"
                          @change="getDescriptionLength($event)"
                          :options="{placeholder: 'Descripción...'}">
                  </quill-editor>
                </div>
                <!--
                <div class="col-xs-offset-2 col-xs-8">
                  <label>Características que estas buscando en un empleado</label>
                  <quill-editor v-model='candidate_characteristics'
                          ref="myQuillEditor"
                          :options="{placeholder: 'Caracteristicas...'}"></quill-editor>
                </div>

                <div class="col-xs-offset-2 col-xs-8">
                  <label>Informacion adicional sobre la posición</label>
                  <quill-editor v-model='work_team_description'
                          ref="myQuillEditor"
                          :options="{placeholder: 'Informacion adicional...'}"></quill-editor>
                </div>
                -->

                <div class="col-xs-offset-2 col-xs-4">
                  <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                    <div id="date">Fecha de caducidad de la oferta *</div>
                    <datepicker required v-model='expiration_date' id='expiration_date' name='expiration_date' :disabled="disabled" language="es" format="dd/MM/yyyy" input-class="form-control form__input"></datepicker>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="separator"></div>
            </div>
          </div>

          <div class="collapse-group" role="tablist" aria-multiselectable="true">
            <div class="" role="tab" id="headingTwo">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#abilities" aria-expanded="false" aria-controls="collapseOne" class="">
                <div class="row">
                  <div class="col-xs-offset-2 col-xs-8">
                    <div class="form-title">Habilidades y experiencia
                      <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div id="abilities" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
              <div class="row abilities">
                <div class="col-xs-offset-2 col-xs-4">
                  <table class="table table-striped">
                    <tbody>
                      <div v-if="filters_education_level.length === 0" class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                          <select id="abilitiesaux" v-model="education_level" class="mdl-selectfield__select" v-on:change="add_education_level()">
                            <option value="" disabled selected hidden>Grado academico...</option>
                            <option value="bachiller">Bachiller</option>
                            <option value="tecnico">Técnico</option>
                            <option value="licenciatura">Universitario</option>
                            <option value="postgrado">Post-grado</option>
                          </select>
                          <label class="mdl-selectfield__label" for="abilitiesaux"></label>
                      </div>
                      <div v-for="item in filters_education_level" class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                          <select id="abilitiesaux" v-model="item.value" class="mdl-selectfield__select">
                            <option value="bachiller">Bachiller</option>
                            <option value="tecnico">Técnico</option>
                            <option value="licenciatura">Universitario</option>
                            <option value="postgrado">Post-grado</option>
                          </select>
                          <label class="mdl-selectfield__label" for="abilitiesaux"></label>
                      </div>
                    </tbody>
                  </table>
                </div>

                <div class="col-xs-3">
                  <span class="static-label">Nivel te importancia</span>
                    <div v-for="item in filters_education_level" class="check-level-container">
                          <div class="check-level-item">
                            <input type="radio" v-model="item.importance" value="0" autocomplete="off" class="check-level" id="check-level-10" name="check-level-04">
                            <label v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }" for="check-level-10"> Baja </label>
                          </div>
                          <div class="check-level-item">
                            <input type="radio" v-model="item.importance" value="1" autocomplete="off" class="check-level" id="check-level-11" name="check-level-04">
                            <label v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }" for="check-level-11"> Media </label>
                          </div>
                          <div class="check-level-item">
                            <input type="radio" v-model="item.importance" value="2" autocomplete="off" class="check-level" id="check-level-12" name="check-level-04">
                            <label v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }" for="check-level-12"> Alta </label>
                          </div>
                    </div>
                </div>
              </div>

              <div class="row abilities">
                <div class="col-xs-offset-2 col-xs-4" v-if="filters_experience_years.length === 0">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <label id="years_label" class="mdl-textfield__label" for="abilities05" >Años de experiencia minimos</label>
                    <input class="mdl-textfield__input" type="text" id="info04" name="abilities05" v-model="experience_years_min" >
                    <span class="mdl-textfield__error">Digite un numero valido de años de experiencia minimos</span>
                  </div>
                </div>

                <div class="col-xs-offset-2 col-xs-4" v-for="item in filters_experience_years">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" id="info04" name="abilities04" v-on:change="set_experience_years(item, $event)" v-bind:value="item.value.split('-')[0]">
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                </div>

                <div class="col-xs-3" v-if="filters_experience_years.length === 0">
                  <div class="check-level-container">
                    <div class="check-level-item">
                      <button class="btn btn-default" @click='add_experience_years()'>Incluir</button>
                    </div>
                  </div>
                </div>
                <div class="col-xs-3">
                  <div class="check-level-container" v-for="item in filters_experience_years">
                    <div class="check-level-item">
                      <input type="radio" v-model="item.importance" value="0" autocomplete="off" class="check-level" id="check-level-30" name="check-level-03">
                      <label v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }" for="check-level-30"> Baja </label>
                    </div>
                    <div class="check-level-item">
                      <input type="radio" v-model="item.importance" value="1" autocomplete="off" class="check-level" id="check-level-31" name="check-level-03">
                      <label v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }" for="check-level-31"> Media </label>
                    </div>
                    <div class="check-level-item">
                      <input type="radio" v-model="item.importance" value="2" autocomplete="off" class="check-level" id="check-level-32" name="check-level-03">
                      <label v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }" for="check-level-32"> Alta </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-offset-2 col-xs-7">
                  <div class="separator"></div>
                  <br>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-offset-2 col-xs-7">
                  <div class="email-template-content">
                    <div class="template-header" style="padding-top: 2%; padding-bottom: 0%;">
                      <div class="template-instructions-container">
                        <div class="instructions-message">
                          Incluir máximo hasta 6 habilidades
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row abilities">
                <div class="col-xs-offset-2 col-xs-6">
                  <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                    <multiselect
                      id="skills_select"
                      v-model="skills_info"
                      :options="skills_list"
                      tag-placeholder="Agregar habilidades"
                      placeholder="Buscar o agregar habilidades"
                      label="name"
                      :multiple="false"
                      :hide-selected="true"
                      track-by="name"
                      :taggable="false"
                      @tag="">
                    </multiselect>
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                </div>
                <div class="col-xs-4">
                  <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                    <button class="btn btn-default" @click="add_skills()">Incluir</button>
                  </div>
                </div>
              </div>

              <div class="col-xs-offset-2 col-xs-7">
                <div style="display: none;" id="alert-error-skills" class="alert alert-danger" role="alert">
                  <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Error</strong>
                  <p>Error</p>
                </div>
              </div>

              <div class="row abilities" v-for="(item, index) in filters_business_skill">
                <div class="col-xs-offset-2 col-xs-4">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <label type='text' class="form-control">{{ item.value }}</label>
                  </div>
                </div>
                <div class="col-xs-3">
                  <div class="check-level-container">
                    <div class="check-level-item">
                      <input type="radio" v-model="item.importance" value="0" autocomplete="off" class="check-level" :id="'business_skill' + index + '1'" :name="'business_skill' + index + '1'">
                      <label v-bind:class="{ 'active': parseInt(item.importance) === 0 ? 'active' : '' }" :for="'business_skill' + index + '1'"> Baja </label>
                    </div>
                    <div class="check-level-item">
                      <input type="radio" v-model="item.importance" value="1" autocomplete="off" class="check-level" :id="'business_skill' + index + '2'" :name="'business_skill' + index + '2'">
                      <label v-bind:class="{ 'active': parseInt(item.importance) === 1 ? 'active' : '' }" :for="'business_skill' + index + '2'"> Media </label>
                    </div>
                    <div class="check-level-item">
                      <input type="radio" v-model="item.importance" value="2" autocomplete="off" class="check-level" :id="'business_skill' + index + '3'" :name="'business_skill' + index + '3'">
                      <label v-bind:class="{ 'active': parseInt(item.importance) === 2 ? 'active' : '' }" :for="'business_skill' + index + '3'"> Alta </label>
                    </div>
                  </div>
                  <div class="row-action-btn remove-btn" @click="remove_skill(index, item.id)">
                    <i class="material-icons">cancel</i>
                    <span>Eliminar</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="separator"></div>
            </div>
          </div>

          <div class="collapse-group" role="tablist" aria-multiselectable="true" v-if="false">
            <div class="" role="tab" id="headingThree">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#questions" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
                <div class="row">
                  <div class="col-xs-offset-2 col-xs-8">
                    <div class="form-title">Preguntas personalizadas
                      <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div id="questions" class="panel-collapse collapse create-form-container" role="tabpanel" aria-labelledby="headingThree">

              <div class="row questions">
                <div class="col-xs-offset-2 col-xs-6">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <label class="mdl-textfield__label" for="questions01">Pregunta 01</label>
                    <input class="mdl-textfield__input" type="text" id="questions01" name="questions01">
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                  <div class="row-action-btn remove-btn">
                    <i class="material-icons">cancel</i>
                    <span>Eliminar</span>
                  </div>
                </div>
              </div>
              <div class="row questions">
                <div class="col-xs-offset-2 col-xs-6">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <label class="mdl-textfield__label" for="questions02">Pregunta 02</label>
                    <input class="mdl-textfield__input" type="text" id="questions02" name="questions02">
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                  <div class="row-action-btn remove-btn">
                    <i class="material-icons">cancel</i>
                    <span>Eliminar</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-offset-2 col-xs-8">
                  <div class="add-ability-btn">
                    <i class="material-icons">add_circle</i>
                    <span>Agregar pregunta</span>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-xs-offset-2 col-xs-8">
                  <div class="form-subtitle">Preguntas preformuladas
                  </div>
                </div>
              </div>

              <div class="row questions">
                <div class="col-xs-offset-2 col-xs-6">
                  <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
                    <select id="questions03" class="mdl-selectfield__select">
                      <option value=""></option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                    <label class="mdl-selectfield__label" for="questions03">Seleccione tipo de pregunta</label>
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                  <div class="row-action-btn add-btn">
                    <i class="material-icons">add_circle</i>
                    <span>Agregar pregunta</span>
                  </div>
                </div>
              </div>

              <div class="row questions">
                <div class="col-xs-offset-2 col-xs-6">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label read-only">
                    <label class="mdl-textfield__label">Pregunta 01</label>
                    <span class="mdl-textfield__input">Pregunta 01</span>
                  </div>
                  <div class="row-action-btn remove-btn">
                    <i class="material-icons">cancel</i>
                    <span>Eliminar</span>
                  </div>
                </div>
              </div>

              <div class="row questions">
                <div class="col-xs-offset-2 col-xs-6">
                  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label read-only">
                    <label class="mdl-textfield__label">Pregunta 01</label>
                    <span class="mdl-textfield__input">Pregunta 01</span>
                  </div>
                  <div class="row-action-btn remove-btn">
                    <i class="material-icons">cancel</i>
                    <span>Eliminar</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
              <div class="separator"></div>
            </div>
          </div>
        </div><!-- create-form end -->
      </div><!-- create-form-container end -->
    </div>
  </div>
</template>

<script src="../assets/js/position.js"></script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
    #container-position{
      width: 80%;
      margin: 0 auto;
    }
    input, label, textarea, select, button{
      display: block;
      margin: 0 auto;
    }
    button{
      display: inline-block;
    }
    #container-city-update{
      margin-top: 1em;
      padding-left: 0.5em;
    }
    .create-form{
      padding-top: 0px;
    }
    .quill-editor,
    .quill-code {
      width: 100%;
      margin: 1;
      height: 20rem;
      resize: vertical;
      padding-bottom: 7rem;
    }
</style>
