<template>
  <div id="general-container">
    <!--<app-nav></app-nav>-->
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
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success" target="_blank" id="preview-button" @click="preview()">Vista previa</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-warning" @click="save($v)" id="submit">Guardar y salir</button>
                  <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error" v-on:click="exit()">Cancelar</button>
                </div>

                <div style="display: none;" id="alert-error" class="alert alert-danger" role="alert">
                  <strong><i class="glyphicon glyphicon-exclamation-sign"></i> Error</strong>
                  <p>Error</p>
                </div>
                <div style="display: none;" id="alert-success" class="alert alert-success" role="alert">
                  <strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong>
                  <p>La posición se almaceno correctamente.</p>
                </div>

              </div>
            </div>
          </div>
        </div><!-- create buttons bar end -->
      </div>

      <div id="create-form-container" class="general-container">
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
                  <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                    <textarea class="mdl-textfield__input" type="text" rows= "2" id="info05" name='description' v-model='description'></textarea>
                    <label class="mdl-textfield__label" for="info05" v-if="description_empty">Descripción</label>
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                </div>


                <div class="col-xs-offset-2 col-xs-8">
                  <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                    <textarea class="mdl-textfield__input" type="text" rows= "2" id="info06" v-model='work_team_description' name='work_team_description'></textarea>
                    <label class="mdl-textfield__label" for="info06" v-if="work_team_description_empty">Descripción  del equipo de trabajo</label>
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                </div>
                <div class="col-xs-offset-2 col-xs-8">
                  <div class="mdl-textfield mdl-textfield--floating-label mdl-js-textfield">
                    <textarea class="mdl-textfield__input" type="text" rows= "2" id="info07" v-model='candidate_characteristics' name='candidate_characteristics'></textarea>
                    <label class="mdl-textfield__label" for="info07" v-if="candidate_characteristics_empty">Características que estas buscando en un empleado</label>
                    <span class="mdl-textfield__error">Error message</span>
                  </div>
                </div>

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
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#abilities" aria-expanded="false" aria-controls="collapseOne" class="collapsed">
                <div class="row">
                  <div class="col-xs-offset-2 col-xs-8">
                    <div class="form-title">Habilidades y experiencia
                      <i class="material-icons collapse-icon">keyboard_arrow_down</i>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div id="abilities" class="panel-collapse collapse create-form-container" role="tabpanel" aria-labelledby="headingTwo">
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
                  <div class="row-action-btn remove-btn" @click="remove_skill(index)">
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
<script>
  import Toolbar from './Toolbar'
  import AppNav from './AppNav'
  import Multiselect from 'vue-multiselect'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'
  import { required } from 'vuelidate/lib/validators'
  import Datepicker from 'vuejs-datepicker'

  export default {
    components: {
      AppNav,
      Multiselect,
      VueGoogleAutocomplete,
      Toolbar,
      Datepicker
    },
    data: function () {
      return {
        google_api_plugin: null,
        id: null,
        name: '',
        new_department: '',
        department_list: [],
        skills_list: [],
        department: '',
        skills_info: '',
        skills: '',
        departments: [],
        department_update: '',
        position_type_id: '',
        city: [],
        description: '',
        description_empty: true,
        work_team_description: '',
        work_team_description_empty: true,
        candidate_characteristics: '',
        candidate_characteristics_empty: true,
        questions: '',
        preformulated_questions: '',
        expiration_date: '',
        disabled: {
          to: new Date()
        },
        is_valid_expiration_date: false,

        position_id: this.$route.params.position_id,
        position: {},
        filters_education_level: [],
        filters_experience_years: [],
        filters_technical_skill: [],
        filters_business_skill: [],
        filters: [],
        education_level: '',
        experience_years_min: '',
        experience_years_max: '',
        technical_skill: '',
        business_skill: '',
        value: '',
        type: 'education_level',
        importance: -1,
        radioValue: 1,
        valid: true,
        valid_asign: false,
        bootstrap_min_js: null,
        scrollmagic: null
      }
    },
    validations: {
      name: {
        required
      }
    },
    methods: {
      isLoggedIn () {
        return isLoggedIn()
      },
      data () {
        return {
          showCollapse: true
        }
      },
      preview () {
        window.location.href = '/position-preview/' + this.id
      },
      exit () {
        window.location.href = '/positions'
      },
      onChange () {
      },
      remove_city (index) {
        this.city.splice(index, 1)
      },
      remove_department (index) {
        this.new_departments.splice(index, 1)
      },
      add_department (newTag) {
        if (this.department === '') {
          this.department = []
        }
        const tag = {
          name: newTag,
          id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.department_list.push(tag)
        this.department = tag
      },
      add_skills () {
        this.skills = this.skills_info.name
        var existingSkill = false
        for (var i = 0; i < this.filters_business_skill.length; i++) {
          if (this.filters_business_skill[i]['value'] === this.skills) {
            existingSkill = true
            break
          }
        }
        if (this.skills !== undefined && !existingSkill && this.filters_business_skill.length < 6) {
          this.filters_business_skill.push({
            importance: -1,
            position_id: this.id,
            type_filter: 'business_skill',
            value: this.skills
          })
          this.business_skill = ''
        } else {
          if (!(this.skills !== undefined)) {
            this.show_error('Seleccione una habilidad primero.')
            this.show_error_skills('Seleccione una habilidad primero.')
          }
          if (existingSkill) {
            this.show_error('La habilidad ' + this.skills + ' ya esta en la lista de habilidades.')
            this.show_error_skills('La habilidad ' + this.skills + ' ya esta en la lista de habilidades.')
          }
          if (this.filters_business_skill.length >= 6) {
            this.show_error('No puede agregar mas habilidades')
            this.show_error_skills('No puede agregar mas habilidades')
          }
        }
      },
      remove_skill (index) {
        this.filters_business_skill.splice(index, 1)
      },
      getAddressData: function (addressData, placeResultData) {
        addressData.position_city = ''
        if (addressData.locality !== undefined) {
          addressData.position_city += addressData.locality + ', '
        }
        if (addressData.administrative_area_level_1 !== undefined) {
          addressData.position_city += addressData.administrative_area_level_1 + ', '
        }

        addressData.position_city += addressData.country
        if (addressData.position_city !== '' && addressData.position_city !== null) {
          this.city = [addressData.position_city]
        }
        document.getElementById('cities').value = null
      },
      save (v) {
        this.hide_alerts()
        if (this.id !== undefined && this.id !== null) {
          this.put(v)
        } else {
          this.post(v)
        }
      },
      get_departments () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/departments/' + localStorage['company_id'])
        .then((response) => {
          this.department_list = response.data.data.departments
        })
        .catch(error => {
          console.log(error)
        })
      },
      get_skills () {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/skills')
        .then((response) => {
          this.skills_list = response.data.data.skills
        })
      },
      valid_form (v) {
        return !v.$error && this.is_valid_expiration_date && this.valid
      },
      put (v) {
        if (this.name === ' ') { this.name = '' }
        v.$touch()
        this.is_valid_expiration_date = this.validate_expiration_date()
        if (this.valid_form(v)) {
          this.show_waiting()
          document.getElementById('submit').disabled = true
          this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill)
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.put('/position/' + this.id, {
            'name': this.name,
            'company_id': localStorage['company_id'],
            'department': this.department.name,
            'description': this.description,
            'city': this.city,
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'expiration_date': this.expiration_date,
            'filters': JSON.stringify(this.filters)
          })
          .then(response => {
            this.show_success()
          })
          .catch(error => {
            console.log(error.response)
            document.getElementById('submit').disabled = false
            this.show_error()
          })
        } else {
          if (this.expiration_date === '') {
            document.getElementById('date').style.color = 'red'
          }
          if (this.name === '') {
            this.name = ' '
            document.getElementById('name_label').parentElement.classList.add('is-invalid')
          }
          this.show_error('Por favor diligencie todos los campos requeridos (*)')
          if (!this.valid_years(document.getElementById('info04').value) && this.valid_asign) {
            this.show_error('Digite un valor valido de años entre 0 y 50')
          }
        }
      },
      post (v) {
        if (this.name === ' ') { this.name = '' }
        v.$touch()
        this.is_valid_expiration_date = this.validate_expiration_date()
        if (this.valid_form(v)) {
          this.show_waiting()
          document.getElementById('submit').disabled = true
          this.departments = []
          for (var item in this.department) {
            this.departments.push(this.department[item].name)
          }
          this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill)
          this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
          this.axios.post('/position', {
            'company_id': localStorage['company_id'],
            'name': this.name,
            'description': this.description,
            'department': JSON.stringify([this.department.name]),
            'city': JSON.stringify(this.city),
            'work_team_description': this.work_team_description,
            'candidate_characteristics': this.candidate_characteristics,
            'expiration_date': this.expiration_date,
            'filters': JSON.stringify(this.filters)
          })
          .then(response => {
            this.show_success()
          })
          .catch(error => {
            console.log(error.response)
            document.getElementById('submit').disabled = false
            this.show_error(error.response)
          })
        } else {
          if (this.expiration_date === '') {
            document.getElementById('date').style.color = 'red'
          }
          if (this.name === '') {
            this.name = ' '
            document.getElementById('name_label').parentElement.classList.add('is-invalid')
          }
          this.show_error('Por favor diligencie todos los campos requeridos (*)')
          if (!this.valid_years(document.getElementById('info04').value) && this.valid_asign) {
            this.show_error('Digite un valor valido de años entre 0 y 50')
          }
        }
      },
      show_error_skills (msg) {
        document.getElementById('alert-error-skills').style.display = 'block'
        document.getElementById('alert-error-skills').innerHTML = msg
      },
      show_error (msg) {
        this.restoreSaveButton()
        document.getElementById('alert-error').style.display = 'block'
        document.getElementById('alert-error').innerHTML = msg
      },
      show_waiting () {
        document.getElementById('submit').innerHTML = 'Guardando...'
        document.getElementById('submit').style.color = 'white'
      },
      restoreSaveButton () {
        document.getElementById('submit').innerHTML = 'Guardar y salir'
        document.getElementById('create-form-container').style.paddingTop = '70px'
      },
      show_success () {
        this.restoreSaveButton()
        document.getElementById('alert-success').style.display = 'block'
        setTimeout(function () {
          window.location.href = '/positions'
        }, 500)
      },
      hide_alerts () {
        document.getElementById('create-form-container').style.paddingTop = '0px'
        document.getElementById('alert-error').style.display = 'none'
        document.getElementById('alert-success').style.display = 'none'
      },
      validate_expiration_date () {
        if (this.expiration_date === '') {
          document.getElementById('expiration_date').parentElement.parentElement.parentElement.className = 'form-group has-error'
          return false
        } else {
          document.getElementById('expiration_date').parentElement.parentElement.parentElement.className = 'form-group'
          return true
        }
      },
      set_value () {
        switch (this.type) {
          case 'education_level':
            this.value = this.education_level
            break
          case 'experience_years':
            this.value = this.experience_years_min
            break
          case 'technical_skill':
            this.value = this.technical_skill
            break
          case 'business_skill':
            this.value = this.business_skill
            break
        }
        this.post()
      },
      get_type (type) {
        switch (type) {
          case 'education_level':
            return 'Nivel Educativo'
          case 'experience_years':
            return 'Experiencia en años'
          case 'technical_skill':
            return 'Habilidad Ténica'
          case 'business_skill':
            return 'Habilidad de Negocios'
        }
      },
      get_importance (importance) {
        switch (importance) {
          case 0:
            return 'Baja'
          case 1:
            return 'Media'
          case 2:
            return 'Alta'
        }
      },
      get_filters (iid) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.query.id + '/filter')
        .then((response) => {
          for (var item in response.data.data.filters) {
            switch (response.data.data.filters[item].type_filter) {
              case 'education_level':
                this.filters_education_level.push(response.data.data.filters[item])
                break
              case 'experience_years':
                this.filters_experience_years.push(response.data.data.filters[item])
                break
              case 'technical_skill':
                this.filters_technical_skill.push(response.data.data.filters[item])
                break
              case 'business_skill':
                this.filters_business_skill.push(response.data.data.filters[item])
                break
            }
          }
        })
        .catch(error => { console.log(error.response) })
      },
      add_technical_skill () {
        this.filters_technical_skill.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'technical_skill',
          value: this.technical_skill
        })
        this.technical_skill = ''
      },
      add_business_skill () {
        this.filters_business_skill.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'business_skill',
          value: this.business_skill
        })
        this.business_skill = ''
      },
      add_education_level () {
        this.filters_education_level.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'education_level',
          value: this.education_level
        })
        this.education_level = ''
      },
      add_experience_years () {
        if (this.valid_years(document.getElementById('info04').value)) {
          this.filters_experience_years.push({
            importance: -1,
            position_id: this.id,
            type_filter: 'experience_years',
            value: this.experience_years_min
          })
          this.experience_years = ''
          this.hide_alerts()
        } else {
          document.getElementById('years_label').parentElement.classList.add('is-invalid')
          this.show_error('Digite un valor valido de años entre 0 y 50')
        }
      },
      valid_years (y) {
        return (y >= 0 && y <= 50) && y !== ''
      },
      set_experience_years (item, event) {
        var yrs = event.target.parentElement.parentElement.getElementsByTagName('input')[0].value
        item.value = yrs
        this.valid = false
        this.valid_asign = true
        if (this.valid_years(yrs)) {
          this.valid = !this.valid
          this.valid_asign = !this.valid_asign
        }
      },
      scroll_magic () {
        var controller = new this.$scrollmagic.Controller()
        new this.$scrollmagic.Scene({ triggerElement: '#create-form-container', triggerHook: 0, offset: 0 })
        .setClassToggle('#create-buttons-bar', 'magic-scroll') // add .addIndicators() to check trigger position
        .addTo(controller)
      }
    },
    mounted () {
      this.get_departments()
      this.get_skills()
      this.scroll_magic()
      if (this.$route.query.id !== undefined) {
        if (document.getElementById('cities_table') !== null) {
          document.getElementById('cities_table').style.display = 'none'
        }
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
        this.axios.get('/position/' + this.$route.query.id)
        .then((response) => {
          this.id = response.data.data.position.id
          document.getElementById('name_label').parentElement.classList.add('is-focused')
          this.name = response.data.data.position.name
          this.department = { name: response.data.data.position.department_name, id: Math.floor((Math.random() * 10000000)) }
          this.city = [response.data.data.position.city]
          this.description = response.data.data.position.description
          if (this.description !== '') {
            this.description_empty = false
          }
          this.work_team_description = response.data.data.position.work_team_description
          if (this.work_team_description !== '') {
            this.work_team_description_empty = false
          }
          this.candidate_characteristics = response.data.data.position.candidate_characteristics
          if (this.candidate_characteristics !== '') {
            this.candidate_characteristics_empty = false
          }
          this.expiration_date = response.data.data.position.expiration_date.substring(0, 10)
        })
        .catch(error => { console.log(error.response) })
      } else {
        document.getElementById('preview-button').style.display = 'none'
      }
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${getIdToken()}[${getAccessToken()}`
      this.axios.get('/position/' + this.id)
      .then((response) => {
        this.position = response.data.data.position
      })
      .catch(error => { console.log(error.response) })
      this.get_filters(this.$route.query.id)
    },
    created: function () {
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
</style>
