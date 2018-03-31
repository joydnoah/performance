webpackJsonp([1],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = login;
/* harmony export (immutable) */ __webpack_exports__["c"] = logout;
/* harmony export (immutable) */ __webpack_exports__["a"] = requireAuth;
/* harmony export (immutable) */ __webpack_exports__["f"] = getIdToken;
/* harmony export (immutable) */ __webpack_exports__["g"] = getAccessToken;
/* harmony export (immutable) */ __webpack_exports__["e"] = getUserInfo;
/* harmony export (immutable) */ __webpack_exports__["h"] = getParameterByName;
/* harmony export (immutable) */ __webpack_exports__["i"] = setAccessToken;
/* harmony export (immutable) */ __webpack_exports__["j"] = setIdToken;
/* harmony export (immutable) */ __webpack_exports__["d"] = isLoggedIn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jwt_decode__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_auth0_js__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_router__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_auth0_lock__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_auth0_lock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_auth0_lock__);






var ID_TOKEN_KEY = 'id_token';
var ACCESS_TOKEN_KEY = 'access_token';

var CLIENT_ID = "undefined";
var CLIENT_DOMAIN = "undefined";
var AUTH0_CALLBACK_REDIRECT = "undefined";
var SCOPE = "full_access";
var AUDIENCE = "undefined";

var auth = new __WEBPACK_IMPORTED_MODULE_3_auth0_js___default.a.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: AUTH0_CALLBACK_REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

var router = new __WEBPACK_IMPORTED_MODULE_4_vue_router__["a" /* default */]({
  mode: 'history'
});

function logout() {
  clearIdToken();
  clearAccessToken();
  localStorage.removeItem('user_info');
  localStorage.removeItem('company_id');
  router.go('/');
}

function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getUserInfo() {
  return localStorage.getItem('user_info');
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
function setAccessToken() {
  var accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
function setIdToken() {
  var idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function isLoggedIn() {
  var idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  var token = __WEBPACK_IMPORTED_MODULE_1_jwt_decode___default()(encodedToken);
  if (!token.exp) {
    return null;
  }

  var date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  var expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/loading.9509900.gif";

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(518)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(485),
  /* template */
  __webpack_require__(588),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-63f0722e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Position__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Position___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Position__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_PositionPreview__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_PositionPreview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_PositionPreview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_PositionApply__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_PositionApply___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_PositionApply__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_EmailTemplates__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_EmailTemplates___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_EmailTemplates__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Positions__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Positions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_Positions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_SocialPosition__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_SocialPosition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_SocialPosition__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_TwitterCallback__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_TwitterCallback___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_TwitterCallback__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_LinkedInCallback__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_LinkedInCallback___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_LinkedInCallback__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_Applicants__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_Applicants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_Applicants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Applicant__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Applicant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_Applicant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_Callback__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_Callback___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_Callback__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_VerifyEmail__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_VerifyEmail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_VerifyEmail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_CreateCompany__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_CreateCompany___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_CreateCompany__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_CompanyJobs__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_CompanyJobs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_CompanyJobs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_Company__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_Company___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_Company__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_Dashboard__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_Dashboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_Dashboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__utils_auth__ = __webpack_require__(10);





















__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home___default.a
  }, {
    path: '/position',
    name: 'Position',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_3__components_Position___default.a
  }, {
    path: '/positions',
    name: 'Positions',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_7__components_Positions___default.a
  }, {
    path: '/position-preview/:id',
    name: 'PositionPreview',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_4__components_PositionPreview___default.a
  }, {
    path: '/position-apply/:id',
    name: 'PositionApply',
    component: __WEBPACK_IMPORTED_MODULE_5__components_PositionApply___default.a
  }, {
    path: '/social-position/:position_id',
    name: 'SocialPosition',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_8__components_SocialPosition___default.a
  }, {
    path: '/twitter-callback',
    name: 'TwitterCallback',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_9__components_TwitterCallback___default.a
  }, {
    path: '/linkedin-callback',
    name: 'LinkedInCallback',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_10__components_LinkedInCallback___default.a
  }, {
    path: '/email-templates/:position_id',
    name: 'EmailTemplates',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_6__components_EmailTemplates___default.a
  }, {
    path: '/applicants/:position_id',
    name: 'Applicants',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_11__components_Applicants___default.a
  }, {
    path: '/applicant/:position_id/:id/:applications_id',
    name: 'Applicant',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_12__components_Applicant___default.a
  }, {
    path: '/callback',
    name: 'Callback',
    component: __WEBPACK_IMPORTED_MODULE_13__components_Callback___default.a
  }, {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: __WEBPACK_IMPORTED_MODULE_14__components_VerifyEmail___default.a
  }, {
    path: '/create-company',
    name: 'CreateCompany',
    component: __WEBPACK_IMPORTED_MODULE_15__components_CreateCompany___default.a
  }, {
    path: '/company-jobs',
    name: 'CompanyJobs',
    beforeEnter: __WEBPACK_IMPORTED_MODULE_19__utils_auth__["a" /* requireAuth */],
    component: __WEBPACK_IMPORTED_MODULE_16__components_CompanyJobs___default.a
  }, {
    path: '/:uri',
    name: 'Company',
    component: __WEBPACK_IMPORTED_MODULE_17__components_Company___default.a
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: __WEBPACK_IMPORTED_MODULE_18__components_Dashboard___default.a
  }]
}));

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 220:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(532)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(472),
  /* template */
  __webpack_require__(598),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(511)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(473),
  /* template */
  __webpack_require__(580),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3653b1d4",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uiv__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uiv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_uiv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_axios__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_clipboard2__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_clipboard2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_vue_clipboard2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_multiselect__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vue_multiselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vue_froala_wysiwyg__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vue_froala_wysiwyg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_vue_froala_wysiwyg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_facebook_signin_button__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_facebook_signin_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_vue_facebook_signin_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_js_modal__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_js_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_vue_js_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_vue_head__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_vue_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_vue_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_vue_router__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ks_vue_scrollmagic__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ks_vue_scrollmagic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_ks_vue_scrollmagic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_quill_dist_quill_core_css__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_quill_dist_quill_core_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_quill_dist_quill_core_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_quill_dist_quill_snow_css__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_quill_dist_quill_snow_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_quill_dist_quill_snow_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_quill_dist_quill_bubble_css__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_quill_dist_quill_bubble_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_quill_dist_quill_bubble_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_vue_quill_editor__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_vue_quill_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_vue_quill_editor__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

__webpack_require__(220);

// Require Froala Editor js file.
__webpack_require__(221);

// Require Froala Editor css files.
__webpack_require__(215);
__webpack_require__(214);
__webpack_require__(216);





















__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_uiv__);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_6_vuelidate___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_9_vue_froala_wysiwyg___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_7_vue_clipboard2___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_5_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_2_axios___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].component(__WEBPACK_IMPORTED_MODULE_8_vue_multiselect___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_10_vue_facebook_signin_button___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_11_vue_js_modal___default.a, { dialog: true });
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_13_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_12_vue_head___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_18_vue_quill_editor___default.a, { theme: 'snow', placeholder: 'Digite su texto aqui...' });
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_14_ks_vue_scrollmagic___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].axios.defaults.baseURL = "undefined";
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8';

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueGoogleAutocomplete',

  props: {
    id: {
      type: String,
      required: true
    },

    classname: String,

    placeholder: {
      type: String,
      default: 'Start typing'
    },

    types: {
      type: String,
      default: 'address'
    },

    country: {
      type: [String, Array],
      default: null
    },

    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },

  data: function data() {
    return {
      /**
       * The Autocomplete object.
       *
       * @type {Autocomplete}
       * @link https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
       */
      autocomplete: null,

      /**
       * Autocomplete input text
       * @type {String}
       */
      autocompleteText: ''
    };
  },

  mounted: function mounted() {
    var _this = this;

    var options = {};

    if (this.types) {
      options.types = [this.types];
    }

    if (this.country) {
      options.componentRestrictions = {
        country: this.country
      };
    }

    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.id), options);

    this.autocomplete.addListener('place_changed', function () {

      var place = _this.autocomplete.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        _this.$emit('no-results-found', place);
        return;
      }

      var addressComponents = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      var returnData = {};

      if (place.address_components !== undefined) {
        // Get each component of the address from the place details
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];

          if (addressComponents[addressType]) {
            var val = place.address_components[i][addressComponents[addressType]];
            returnData[addressType] = val;
          }
        }

        returnData['latitude'] = place.geometry.location.lat();
        returnData['longitude'] = place.geometry.location.lng();

        // return returnData object and PlaceResult object
        _this.$emit('placechanged', returnData, place, _this.id);
      }
    });
  },

  methods: {
    /**
     * When the input gets focus
     */
    onFocus: function onFocus() {
      this.geolocate();
      this.$emit('focus');
    },


    /**
     * When the input loses focus
     */
    onBlur: function onBlur() {
      this.$emit('blur');
    },


    /**
     * When the input got changed
     */
    onChange: function onChange() {
      this.$emit('change', this.autocompleteText);
    },


    /**
     * When a key gets pressed
     * @param  {Event} event A keypress event
     */
    onKeyPress: function onKeyPress(event) {
      this.$emit('keypress', event);
    },


    /**
     * Clear the input
     */
    clear: function clear() {
      this.autocompleteText = '';
    },


    /**
     * Focus the input
     */
    focus: function focus() {
      this.$refs.autocomplete.focus();
    },


    /**
     * Blur the input
     */
    blur: function blur() {
      this.$refs.autocomplete.blur();
    },


    /**
     * Update the value of the input
     * @param  {String} value
     */
    update: function update(value) {
      this.autocompleteText = value;
    },


    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    geolocate: function geolocate() {
      var _this2 = this;

      if (this.enableGeolocation) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            _this2.autocomplete.setBounds(circle.getBounds());
          });
        }
      }
    }
  }
});

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app-nav',
  data: function data() {
    return {
      user_info: {
        picture: '',
        name: ''
      }
    };
  },
  methods: {
    handleLogin: function handleLogin() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["b" /* login */])();
    },
    handleLogout: function handleLogout() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["c" /* logout */])();
      window.location.href = '/';
    },
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["d" /* isLoggedIn */])();
    },
    getUserInfo: function getUserInfo() {
      this.user_info = JSON.parse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["e" /* getUserInfo */])());
    }
  },
  mounted: function mounted() {
    if (this.isLoggedIn()) {
      this.getUserInfo();
    }
  }
});

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Toolbar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Toolbar: __WEBPACK_IMPORTED_MODULE_1__Toolbar___default.a,
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav___default.a
  },
  data: function data() {
    return {
      applicant_id: this.$route.params.position_id,
      id: this.$route.params.id,
      first_name: '',
      last_name: '',
      email: '',
      phone_code: '',
      phone_number: '',
      linkedin_user: '',
      twitter_user: '',
      created_at: '',
      documents: [],
      bucket: "undefined",
      page: 1,
      numPages: 0,
      rotate: 0,
      src: '',
      parse: null,
      score: null,
      score_status: 'No parseado',
      status: '',
      skills_list: [],
      degree: []
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["d" /* isLoggedIn */])();
    },
    buildPdfUrl: function buildPdfUrl(id, extension) {
      return 'https://' + this.bucket + '.s3.amazonaws.com/' + id;
    },
    buildDocUrl: function buildDocUrl(id, extension) {
      var wordUrl = 'https://view.officeapps.live.com/op/view.aspx?src=';
      var file = 'https%3A%2F%2F' + this.bucket + '.s3.amazonaws.com%2F' + id;
      return wordUrl + file;
    },
    show: function show(item) {
      var extension = item.original_name.split('.').slice(-1)[0];
      if (extension === 'pdf') {
        this.src = this.buildPdfUrl(item.id, extension);
      } else {
        this.src = this.buildDocUrl(item.id, extension);
      }
      this.$modal.show('show-pdf');
    },
    hide: function hide() {
      this.$modal.hide('show-pdf');
    },
    go_back: function go_back() {
      history.go(-1);
    },
    get_applicants_status: function get_applicants_status(status) {
      if (status === 'approved') {
        return 'Aprobado';
      } else if (status === 'in_process' || status === null) {
        return 'En Proceso';
      } else if (status === 'rejection') {
        return 'Rechazado';
      } else if (status === 'scheduled_call') {
        return 'Invitación a LLamada';
      } else if (status === 'scheduled_interview') {
        return 'Invitación a Entrevista';
      }
    },
    set_status_application: function set_status_application(status) {
      var _this = this;

      var defaultButtonMessage = document.getElementById('button_' + status).innerHTML;
      this.changeButtonMessage('button_' + status, 'Enviando...');
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/application/' + this.id + '/' + status).then(function (response) {
        _this.get_status();
        _this.changeButtonMessage('button_' + status, defaultButtonMessage);
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_parser_status: function get_parser_status() {
      var _this2 = this;

      this.axios.get('/parse/' + this.documents[0].id).then(function (response) {
        if (response.data.data.parse[1] !== null) {
          _this2.score_status = 'Parseado';
          _this2.skills_list = response.data.data.skills_list;
          _this2.degree = response.data.data.education_history;
          _this2.get_score();
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    change_compatibility: function change_compatibility(score) {
      if (score < 40.0) {
        document.getElementById('compatibility-text').innerHTML = 'Compatibilidad baja';
        document.getElementById('compatibility').classList.add('is-low');
      }
      if (score >= 40.0 && score < 70.0) {
        document.getElementById('compatibility-text').innerHTML = 'Compatibilidad media';
        document.getElementById('compatibility').classList.add('is-medium');
      }
      if (score >= 70.0) {
        document.getElementById('compatibility-text').innerHTML = 'Compatibilidad alta';
        document.getElementById('compatibility').classList.add('is-high');
      }
    },
    get_score: function get_score() {
      var _this3 = this;

      this.axios.get('/score/' + this.documents[0].id).then(function (response) {
        _this3.score = response.data.data.score[2];
        if (_this3.score === null) {
          _this3.score_status = 'Esperando para calificar';
        } else {
          _this3.score_status = 'Calificado';
          _this3.change_compatibility(_this3.score);
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    changeButtonMessage: function changeButtonMessage(buttonId, message) {
      var buttonElement = document.getElementById(buttonId);
      buttonElement.disabled = !document.getElementById(buttonId).disabled;
      buttonElement.innerHTML = message;
      // The following code is to remove the additional span created when the button is clicked, if removed after click the button would look brigther.
      if (buttonElement.childNodes[1] !== undefined) {
        buttonElement.removeChild(buttonElement.childNodes[1]);
      }
    },
    get_status: function get_status() {
      var _this4 = this;

      this.axios.get('/applications/' + this.$route.params.applications_id).then(function (response) {
        for (var i = 0; i < response.data.data.applicants.length; i++) {
          if (response.data.data.applicants[i].id === _this4.id) {
            _this4.status = _this4.get_applicants_status(response.data.data.applicants[i].status_application);
          }
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    this.get_status();
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/applicant/' + this.applicant_id).then(function (response) {
      _this5.first_name = response.data.data.applicant.first_name;
      _this5.last_name = response.data.data.applicant.last_name;
      _this5.email = response.data.data.applicant.email;
      _this5.phone_code = response.data.data.applicant.phone_code;
      _this5.phone_number = response.data.data.applicant.phone_number;
      _this5.linkedin_user = response.data.data.applicant.linkedin_user;
      _this5.twitter_user = response.data.data.applicant.twitter_user;
      _this5.created_at = response.data.data.applicant.created_at;
    }).catch(function (error) {
      console.log(error.response);
    });
    this.axios.get('/applicant/documents/' + this.applicant_id).then(function (response) {
      _this5.documents = response.data.data.documents;
      _this5.get_parser_status();
    }).catch(function (error) {
      console.log(error.response);
    });

    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
  }
});

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LayoutHeader__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LayoutHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__LayoutHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Toolbar: __WEBPACK_IMPORTED_MODULE_0__Toolbar___default.a,
    LayoutHeader: __WEBPACK_IMPORTED_MODULE_1__LayoutHeader___default.a
  },
  data: function data() {
    return {
      applicants: {},
      position: {},
      bootstrap_min_js: null,
      list: { 'first_name': true, 'created_at': true, 'status_application': true },
      actual_order_attribute: { atrribute: 'created_at', asc_desc: 'false' }
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["d" /* isLoggedIn */])();
    },
    changeOrder: function changeOrder(id) {
      this.get_applicants(id);
      this.list[id] = !this.list[id];
    },
    getDocuments: function getDocuments(id) {
      var _this = this;

      this.axios.get('/applicant/documents/' + id).then(function (response) {
        _this.getParserStatus(response.data.data.documents[0].id, id);
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    getParserStatus: function getParserStatus(documentId, id) {
      var _this2 = this;

      this.axios.get('/parse/' + documentId).then(function (response) {
        if (response.data.data.parse[1] !== null) {
          _this2.getScore(documentId, id);
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    getScore: function getScore(documentId, id) {
      var _this3 = this;

      this.axios.get('/score/' + documentId).then(function (response) {
        var score = response.data.data.score[2];
        if (score === null) {
          document.getElementById('label-' + id).innerHTML = 'Esperando para calificar';
        } else {
          _this3.updateCompatibility(score, id);
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    changeCompatibilityValue: function changeCompatibilityValue(id, value) {
      document.getElementById('id-' + id).classList.add('is-' + value);
      document.getElementById('label-' + id).innerHTML = 'Compatibilidad ' + value.replace('low', 'baja').replace('medium', 'media').replace('high', 'alta');
    },
    updateCompatibility: function updateCompatibility(score, id) {
      if (document.getElementById('label-' + id) !== null) {
        document.getElementById('id-' + id).className = 'row-compatibility';
        if (score < 40.0) {
          this.changeCompatibilityValue(id, 'low');
        }
        if (score >= 40.0 && score < 70.0) {
          this.changeCompatibilityValue(id, 'medium');
        }
        if (score >= 70.0) {
          this.changeCompatibilityValue(id, 'high');
        }
      }
    },
    make_visible: function make_visible() {
      return this.applicants.length > 0;
    },
    go_to: function go_to(positionId, id) {
      window.location.href = '/applicant/' + positionId + '/' + id + '/' + this.$route.params.position_id;
    },
    get_applicants: function get_applicants(order) {
      var _this4 = this;

      this.actual_order_attribute.attribute = order;
      this.actual_order_attribute.asc_desc = this.list[order];
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/applications/' + this.$route.params.position_id, {
        params: {
          'order_by': order,
          'asc_or_desc': this.list[order]
        }
      }).then(function (response) {
        _this4.applicants = response.data.data.applicants;
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_applicants_status: function get_applicants_status(status) {
      if (status === 'approved') {
        return 'Aprobado';
      } else if (status === 'in_process' || status === null) {
        return 'En Proceso';
      } else if (status === 'rejection') {
        return 'Rechazado';
      } else if (status === 'scheduled_call') {
        return 'Invitación a LLamada';
      } else if (status === 'scheduled_interview') {
        return 'Invitación a Entrevista';
      }
    },
    set_status_application: function set_status_application(id, status) {
      var _this5 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/application/' + id + '/' + status).then(function (response) {
        _this5.get_applicants(_this5.actual_order_attribute.attribute, _this5.actual_order_attribute.asc_desc);
      }).catch(function (error) {
        console.log(error.response);
      });
    }
  },
  mounted: function mounted() {
    var _this6 = this;

    this.get_applicants('created_at');

    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/position/' + this.$route.params.position_id).then(function (response) {
      _this6.position = response.data.data.position;
    }).catch(function (error) {
      console.log(error.response);
    });

    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
  }
});

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'application-form',
  components: {},
  props: ['position', 'status'],
  data: function data() {
    return {
      applicant_id: 0,
      first_name: '',
      last_name: '',
      email: '',
      phone_code: '0',
      phone_number: '',
      linkedin_user: '',
      twitter_user: '',
      curriculum_vitae: '',
      presentation_letter: '',
      form_data: null,
      valid_file_type_curriculum: true,
      valid_file_size_curriculum: true,
      valid_file_type_presentation_letter: true,
      valid_file_size_presentation_letter: true,
      required_file: false,
      meta_tag: ''
    };
  },
  validations: {
    first_name: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"]
    },
    last_name: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"]
    },
    email: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      email: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["email"]
    }
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["d" /* isLoggedIn */])();
    },
    validateFileType: function validateFileType(fileType) {
      var pdf = fileType === 'application/pdf';
      var doc = fileType === 'application/msword';
      var docx = fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      return pdf || doc || docx;
    },
    set_files: function set_files(type, event) {
      var validSize = event.target.files[0]['size'] <= 7000000;
      var validType = this.validateFileType(event.target.files[0]['type']);
      switch (type) {
        case 'curriculum_vitae':
          this.valid_file_type_curriculum = validType;
          this.valid_file_size_curriculum = validSize;
          this.curriculum_vitae = event.target.files[0];
          this.required_file = true;
          break;

        case 'presentation_letter':
          this.valid_file_type_presentation_letter = validType;
          this.valid_file_size_presentation_letter = validSize;
          this.presentation_letter = event.target.files[0];
          break;
      }
    },
    validate_file: function validate_file(validType, validSize, errorId) {
      var validation = validSize && validType;
      if (!validation) {
        var msg = 'Solo se pueden adjuntar archivos';
        if (!validSize) {
          msg = msg + ' menores a 7MB ';
        }
        if (!validType) {
          msg = msg + ' en formato PDF. ';
        }
        document.getElementById('alert-error' + errorId).style.display = 'block';
        document.getElementById('alert-error' + errorId).innerHTML = msg;
      }
      return validation;
    },
    validate_form: function validate_form(validCurriculum, validLetter) {
      var msg = '';
      var validation = validCurriculum && validLetter && this.required_file;
      if (!this.required_file) {
        msg = msg + '<div> Es necesario anexar un Curriculum Vitae. </div>';
      }
      if (!validation) {
        document.getElementById('alert-error').style.display = 'block';
        document.getElementById('alert-error').innerHTML = msg;
      }
      return validation;
    },
    post: function post(v) {
      document.getElementsByClassName('alert')[5].style.display = 'none';
      v.$touch();
      var validCurriculum = this.validate_file(this.valid_file_type_curriculum, this.valid_file_size_curriculum, '1');
      var validLetter = this.validate_file(this.valid_file_type_presentation_letter, this.valid_file_size_presentation_letter, '2');
      if (this.validate_form(validCurriculum, validLetter)) {
        if (this.applicant_id === 0) {
          if (!v.$error) {
            this.save();
          }
        } else {
          this.save();
        }
      }
    },
    save: function save() {
      document.getElementsByTagName('button')[1].disabled = true;
      document.getElementsByTagName('button')[1].innerHTML = 'Procesando, por favor espere...';
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.form_data = new FormData();
      this.form_data.append('curriculum_vitae', this.curriculum_vitae);
      this.form_data.append('presentation_letter', this.presentation_letter);
      this.form_data.append('applicant_id', this.applicant_id);
      this.form_data.append('position_id', this.position);
      this.form_data.append('first_name', this.first_name);
      this.form_data.append('last_name', this.last_name);
      this.form_data.append('email', this.email);
      this.form_data.append('phone_code', this.phone_code);
      this.form_data.append('phone_number', this.phone_number);
      this.form_data.append('linkedin_user', this.linkedin_user);
      this.form_data.append('twitter_user', this.twitter_user);

      this.axios.post('/application', this.form_data).then(function (response) {
        document.getElementsByClassName('form')[0].style.display = 'none';
        document.getElementsByClassName('form')[1].style.display = 'none';
        document.getElementsByClassName('form')[2].style.display = 'none';
        document.getElementsByClassName('form')[3].style.display = 'none';
        document.getElementsByClassName('alert')[2].style.display = 'none';
        document.getElementsByClassName('alert')[0].style.display = 'block';
        document.getElementsByTagName('button')[1].innerHTML = 'Enviar Solicitud';
        document.getElementsByTagName('button')[1].disabled = false;
      }).catch(function (error) {
        // TODO: identify how to avoid setting a console.log to prevent error ...
        console.log(error.response);
        document.getElementById('alert-error').innerHTML = 'There was an unexpected error saving the application, please contact technology@cotopaxi.io';
        document.getElementsByClassName('alert')[5].style.display = 'block';
        document.getElementsByTagName('button')[1].innerHTML = 'Enviar Solicitud';
        document.getElementsByTagName('button')[1].disabled = false;
      });
    }
  },
  watch: {
    status: function status() {
      if (this.status !== 'publish') {
        document.getElementsByClassName('form')[0].style.display = 'none';
        document.getElementsByClassName('form')[1].style.display = 'none';
        document.getElementsByClassName('form')[2].style.display = 'none';
        document.getElementsByClassName('alert')[1].style.display = 'block';
      } else {
        document.getElementsByClassName('form')[0].style.display = 'block';
        document.getElementsByClassName('form')[1].style.display = 'block';
        document.getElementsByClassName('form')[2].style.display = 'block';
        document.getElementsByClassName('form')[3].style.display = 'block';
        document.getElementsByClassName('alert')[1].style.display = 'none';
      }
    }
  },
  mounted: function mounted() {
    if (this.status !== 'publish') {
      document.getElementsByClassName('form')[0].style.display = 'none';
      document.getElementsByClassName('form')[1].style.display = 'none';
      document.getElementsByClassName('form')[2].style.display = 'none';
      document.getElementsByClassName('alert')[1].style.display = 'block';
    }
  }
});

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);

//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'callback',
  data: function data() {
    return {
      interval: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["h" /* getParameterByName */])('error_description') === 'Please verify your email before logging in.') {
      window.location.href = '/verify-email';
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["i" /* setAccessToken */])();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["j" /* setIdToken */])();
      var instance = __WEBPACK_IMPORTED_MODULE_2_axios___default.a.create({
        headers: { 'Authorization': 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["g" /* getAccessToken */])() }
      });
      instance.get("undefined").then(function (response) {
        localStorage.setItem('user_info', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()({ user_id: response.data.user_id, picture: response.data.picture, name: response.data.name, nickname: response.data.nickname, email: response.data.email }));
        _this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["g" /* getAccessToken */])();
        _this.axios.get('/user/' + JSON.parse(localStorage['user_info']).user_id).then(function (response) {
          if (response.data.data.user === '[]') {
            window.location.href = '/create-company';
          } else {
            localStorage.setItem('company_id', JSON.parse(response.data.data.user)[0].company_id);
            window.location.href = '/positions';
          }
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
      });
      this.$nextTick(function () {});
    }
  }
});

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      id: this.$route.params.company_id,
      company: {},
      positions: [],
      department_list: [{ 'id': 0, 'name': 'Todos' }],
      department_to_filter: '0'
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["d" /* isLoggedIn */])();
    },
    exit: function exit() {},
    test_position: function test_position(position) {
      for (var i = 0; i < this.positions.length; i++) {
        if (this.positions[i].department_name === position.name) {
          return true;
        }
      }
    },
    get_positions: function get_positions() {
      var _this = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/company/' + this.$route.params.uri + '/positions').then(function (response) {
        for (var item in response.data.data.positions) {
          if (response.data.data.positions[item].status_type === 'publish') {
            _this.positions.push(response.data.data.positions[item]);
          }
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_departments: function get_departments() {
      var _this2 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/departments/' + this.company.id).then(function (response) {
        _this2.department_list = response.data.data.departments;
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_company: function get_company() {
      var _this3 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/company/uri/' + this.$route.params.uri).then(function (response) {
        _this3.company = response.data.data.company;
        _this3.get_departments();
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    filter_department: function filter_department() {
      if (this.department_to_filter === '0') {
        for (var i = 0; i < document.getElementsByClassName('department-container').length; i++) {
          document.getElementsByClassName('department-container')[i].style.display = 'block';
        }
      } else {
        for (var j = 0; j < document.getElementsByClassName('department-container').length; j++) {
          document.getElementsByClassName('department-container')[j].style.display = 'none';
        }
        document.getElementById('department-' + this.department_to_filter).style.display = 'block';
      }
    }
  },
  mounted: function mounted() {
    this.get_company();
    this.get_positions();
  }
});

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav___default.a
  },
  data: function data() {
    return {
      description: '',
      work_with_us: '',
      uri: '',
      server: "undefined"
    };
  },
  validations: {
    uri: {
      required: __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__["required"]
    }
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["d" /* isLoggedIn */])();
    },
    exit: function exit() {
      window.location.href = '/positions';
    },
    confirmCopiedCompanyLink: function confirmCopiedCompanyLink() {
      document.getElementById('copy_link').style.display = 'block';
    },
    update_company: function update_company(v) {
      document.getElementsByClassName('alert-danger')[0].style.display = 'none';
      document.getElementsByClassName('alert-danger')[1].style.display = 'none';
      document.getElementsByClassName('alert-success')[0].style.display = 'none';
      v.$touch();
      if (!v.$error) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["g" /* getAccessToken */])();
        this.axios.put('/company/' + localStorage['company_id'], {
          'description': this.description,
          'work_with_us': this.work_with_us,
          'uri': this.uri
        }).then(function (response) {
          console.log(response);
          document.getElementsByClassName('alert-success')[0].style.display = 'block';
        }).catch(function (error) {
          console.log(error);
          document.getElementsByClassName('alert-danger')[1].style.display = 'block';
        });
      } else {
        document.getElementsByClassName('alert-danger')[0].style.display = 'block';
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/company/' + localStorage['company_id']).then(function (response) {
      _this.description = response.data.data.company.description;
      _this.work_with_us = response.data.data.company.work_with_us;
      _this.uri = response.data.data.company.uri;
    }).catch(function (error) {
      console.log(error.response);
    });
  }
});

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav___default.a
  },
  data: function data() {
    return {
      number_employees: '',
      industry: '',
      company_role: '',
      name: '',
      user_id: ''
    };
  },
  validations: {
    number_employees: {
      required: __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__["required"]
    },
    industry: {
      required: __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__["required"]
    },
    company_role: {
      required: __WEBPACK_IMPORTED_MODULE_2_vuelidate_lib_validators__["required"]
    }
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["d" /* isLoggedIn */])();
    },
    getUserInfo: function getUserInfo() {
      this.user_info = JSON.parse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["e" /* getUserInfo */])());
      this.user_id = this.user_info.user_id;
    },
    create_company: function create_company(v) {
      var _this = this;

      document.getElementsByClassName('alert-danger')[0].style.display = 'none';
      document.getElementsByClassName('alert-danger')[1].style.display = 'none';
      v.$touch();
      if (!v.$error) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_auth__["g" /* getAccessToken */])();
        this.axios.post('/companies', {
          'number_employees': this.number_employees,
          'industry': this.industry
        }).then(function (response) {
          localStorage.setItem('company_id', response.data.data.company_id);
          _this.axios.post('/users', {
            'company_role': _this.company_role,
            'company_id': response.data.data.company_id,
            'user_id': _this.user_id
          }).then(function (response) {
            window.location.href = '/positions';
          }).catch(function (error) {
            console.log(error);
            document.getElementsByClassName('alert-danger')[1].style.display = 'block';
          });
        }).catch(function (error) {
          console.log(error);
          document.getElementsByClassName('alert-danger')[1].style.display = 'block';
        });
      } else {
        document.getElementsByClassName('alert-danger')[0].style.display = 'block';
      }
    }
  },
  mounted: function mounted() {
    this.getUserInfo();
  }
});

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav__);
//
//
//
//
//
//
//
//
//


// import { getAccessToken, getIdToken, isLoggedIn } from '../../utils/auth'

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav___default.a
  },
  data: function data() {
    return {};
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      // return isLoggedIn()
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uiv__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uiv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uiv__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Alert: __WEBPACK_IMPORTED_MODULE_1_uiv__["Alert"]
  },
  props: ['position_id', 'status_prop', 'type_prop'],
  name: 'email-control-template',
  data: function data() {
    return {
      email_templates: [],
      status: {
        from_address: '',
        subject: '',
        body: '',
        id: 0,
        automatic_send: true,
        check_box_id: '',
        subject_id: '',
        email_id: '',
        save_button_id: ''
      }
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["d" /* isLoggedIn */])();
    },
    go_back: function go_back() {
      window.location.href = '/positions';
    },
    save: function save() {
      if (this.status.id === 0) {
        this.post();
      } else {
        this.put();
      }
    },
    changeTemplateStatus: function changeTemplateStatus() {
      var _this = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.axios.put('/email_template/' + this.status.id, {
        'automatic_send': !this.status.automatic_send
      }).catch(function (error) {
        console.log(error);
        _this.status.automatic_send = !_this.status.automatic_send;
      });
    },
    changeSaveButtonMessage: function changeSaveButtonMessage(message) {
      document.getElementById(this.save_button_id).innerHTML = message;
    },
    post: function post() {
      var _this2 = this;

      this.changeSaveButtonMessage('Guardando...');
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/email_template', {
        'position_id': this.position_id,
        'from_address': this.status.from_address,
        'type': this.type_prop,
        'subject': this.status.subject,
        'body': this.status.body,
        'automatic_send': this.status.automatic_send
      }).then(function (response) {
        document.getElementById('tempalteSaved').style.display = 'block';
        _this2.changeSaveButtonMessage('Guardar');
      }).catch(function (error) {
        console.log(error);
      });
    },
    put: function put() {
      var _this3 = this;

      this.changeSaveButtonMessage('Guardando...');
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
      this.axios.put('/email_template/' + this.status.id, {
        'from_address': this.status.from_address,
        'subject': this.status.subject,
        'body': this.status.body,
        'automatic_send': this.status.automatic_send
      }).then(function (response) {
        document.getElementById('tempalteSaved').style.display = 'block';
        _this3.changeSaveButtonMessage('Guardar');
      }).catch(function (error) {
        console.log(error);
      });
    },
    make_dirty: function make_dirty() {
      document.getElementById(this.subject_id).parentElement.classList.add('is-dirty');
      document.getElementById(this.email_id).parentElement.classList.add('is-dirty');
    }
  },
  watch: {
    status_prop: function status_prop() {
      this.status = this.status_prop;
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    this.check_box_id = 'checkbox-' + this.type_prop;
    this.subject_id = 'subject-' + this.type_prop;
    this.email_id = 'email-' + this.type_prop;
    this.save_button_id = 'button-' + this.type_prop;
    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
    this.axios.get('/email_template', { params: { 'position_id': this.position_id } }).then(function (response) {
      _this4.email_templates = response.data.data.email_templates;
      for (var item in _this4.email_templates) {
        if (_this4.email_templates[item].type_template === _this4.type_prop) {
          _this4.status = _this4.email_templates[item];
        }
      }
      // TODO: Email and subject values are being overlaped with their lables.
      // TODO: Find out why 'setTimeout(() => { this.make_dirty() }, 0)' solves the problem
      // TODO: While 'this.make_dirty()' does not solve it.
      setTimeout(function () {
        _this4.make_dirty();
      }, 0);
    }).catch(function (error) {
      console.log(error.response);
    });
  }
});

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EmailControlTemplate__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EmailControlTemplate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__EmailControlTemplate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uiv__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uiv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_uiv__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Toolbar: __WEBPACK_IMPORTED_MODULE_0__Toolbar___default.a,
    EmailControlTemplate: __WEBPACK_IMPORTED_MODULE_1__EmailControlTemplate___default.a,
    Tabs: __WEBPACK_IMPORTED_MODULE_3_uiv__["Tabs"]
  },
  data: function data() {
    return {
      position_id: this.$route.params.position_id,
      position: {},
      bootstrap_min_js: null,
      config: {
        placeholderText: 'Edita tu contenido aquí!',
        events: {
          'froalaEditor.initialized': function froalaEditorInitialized() {}
        }
      }
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["d" /* isLoggedIn */])();
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/position/' + this.position_id).then(function (response) {
      _this.position = response.data.data.position;
    }).catch(function (error) {
      console.log(error.response);
    });
  }
});

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav___default.a
  }
});

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'layout-header',
  props: ['title'],
  data: function data() {
    return {};
  },
  methods: {},
  mounted: function mounted() {}
});

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'linkedIn-callback',
  data: function data() {
    return {};
  },
  methods: {},
  mounted: function mounted() {
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
    this.axios.post('/social-network-connection/' + window.localStorage['company_id'], {
      'access_token': this.$route.query.code,
      'access_token_secret': '0',
      'provider': 'linkedin',
      'page_id': 'No Aplica',
      'oauth_token': '0',
      'oauth_verifier': '0'
    }).then(function (response) {
      window.location.href = window.localStorage['position_url_social_return'];
    }).catch(function (error) {
      console.log(error);
      window.location.href = window.localStorage['position_url_social_return'];
    });
  }
});

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Toolbar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AppNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_multiselect__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_multiselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_google_autocomplete__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_google_autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_google_autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate_lib_validators__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vuejs_datepicker__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_vuejs_datepicker__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_2__AppNav___default.a,
    Multiselect: __WEBPACK_IMPORTED_MODULE_3_vue_multiselect___default.a,
    VueGoogleAutocomplete: __WEBPACK_IMPORTED_MODULE_4_vue_google_autocomplete___default.a,
    Toolbar: __WEBPACK_IMPORTED_MODULE_1__Toolbar___default.a,
    Datepicker: __WEBPACK_IMPORTED_MODULE_7_vuejs_datepicker___default.a
  },
  data: function data() {
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
      scrollmagic: null,
      successSave: '<strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong><p>La posición se almaceno correctamente.</p>',
      successPublish: '<strong><i class="glyphicon glyphicon-ok"></i> Proceso Finalizado.</strong><p>La posición ha sido publicada correctamente.</p>'
    };
  },
  validations: {
    name: {
      required: __WEBPACK_IMPORTED_MODULE_6_vuelidate_lib_validators__["required"]
    }
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["d" /* isLoggedIn */])();
    },
    data: function data() {
      return {
        showCollapse: true
      };
    },
    preview: function preview(v) {
      this.save(v);
      window.location.href = '/position-preview/' + this.id;
    },
    exit: function exit() {
      window.location.href = '/positions';
    },
    onChange: function onChange() {},
    remove_city: function remove_city(index) {
      this.city.splice(index, 1);
    },
    remove_department: function remove_department(index) {
      this.new_departments.splice(index, 1);
    },
    add_department: function add_department(newTag) {
      if (this.department === '') {
        this.department = [];
      }
      var tag = {
        name: newTag,
        id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.department_list.push(tag);
      this.department = tag;
    },
    add_skills: function add_skills() {
      this.skills = this.skills_info.name;
      var existingSkill = false;
      for (var i = 0; i < this.filters_business_skill.length; i++) {
        if (this.filters_business_skill[i]['value'] === this.skills) {
          existingSkill = true;
          break;
        }
      }
      if (this.skills !== undefined && !existingSkill && this.filters_business_skill.length < 6) {
        this.filters_business_skill.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'business_skill',
          value: this.skills
        });
        this.business_skill = '';
      } else {
        if (!(this.skills !== undefined)) {
          this.show_error('Seleccione una habilidad primero.');
          this.show_error_skills('Seleccione una habilidad primero.');
        }
        if (existingSkill) {
          this.show_error('La habilidad ' + this.skills + ' ya esta en la lista de habilidades.');
          this.show_error_skills('La habilidad ' + this.skills + ' ya esta en la lista de habilidades.');
        }
        if (this.filters_business_skill.length >= 6) {
          this.show_error('No puede agregar mas habilidades');
          this.show_error_skills('No puede agregar mas habilidades');
        }
      }
    },
    remove_skill: function remove_skill(index) {
      this.filters_business_skill.splice(index, 1);
    },

    getAddressData: function getAddressData(addressData, placeResultData) {
      addressData.position_city = '';
      if (addressData.locality !== undefined) {
        addressData.position_city += addressData.locality + ', ';
      }
      if (addressData.administrative_area_level_1 !== undefined) {
        addressData.position_city += addressData.administrative_area_level_1 + ', ';
      }

      addressData.position_city += addressData.country;
      if (addressData.position_city !== '' && addressData.position_city !== null) {
        this.city = [addressData.position_city];
      }
      document.getElementById('cities').value = null;
    },
    save: function save(v) {
      this.hide_alerts();
      if (this.id !== undefined && this.id !== null) {
        this.put(v);
      } else {
        this.post(v);
      }
    },
    get_departments: function get_departments() {
      var _this = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/departments/' + localStorage['company_id']).then(function (response) {
        _this.department_list = response.data.data.departments;
      }).catch(function (error) {
        console.log(error);
      });
    },
    get_skills: function get_skills() {
      var _this2 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/skills').then(function (response) {
        _this2.skills_list = response.data.data.skills;
      });
    },
    valid_form: function valid_form(v) {
      return !v.$error && this.is_valid_expiration_date && this.valid;
    },
    put: function put(v) {
      var _this3 = this;

      if (this.name === ' ') {
        this.name = '';
      }
      v.$touch();
      this.is_valid_expiration_date = this.validate_expiration_date();
      if (this.valid_form(v)) {
        this.show_waiting('submit', 'Guardando...');
        document.getElementById('submit').disabled = true;
        this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill);
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
        this.axios.put('/position/' + this.id, {
          'name': this.name,
          'company_id': localStorage['company_id'],
          'department': this.department.name,
          'description': this.description,
          'city': this.city,
          'work_team_description': this.work_team_description,
          'candidate_characteristics': this.candidate_characteristics,
          'expiration_date': this.expiration_date,
          'filters': __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.filters)
        }).then(function (response) {
          _this3.show_success('submit', 'Guardar', _this3.successSave);
        }).catch(function (error) {
          console.log(error.response);
          document.getElementById('submit').disabled = false;
          _this3.show_error();
        });
      } else {
        if (this.expiration_date === '') {
          document.getElementById('date').style.color = 'red';
        }
        if (this.name === '') {
          this.name = ' ';
          document.getElementById('name_label').parentElement.classList.add('is-invalid');
        }
        this.show_error('Por favor diligencie todos los campos requeridos (*)');
        if (!this.valid_years(document.getElementById('info04').value) && this.valid_asign) {
          this.show_error('Digite un valor valido de años entre 0 y 50');
        }
      }
    },
    set_status_position: function set_status_position(status) {
      var _this4 = this;

      this.show_waiting(status, 'Publicando...');
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/position/' + this.id + '/' + status).then(function (response) {
        _this4.show_success(status, 'Publicar', _this4.successPublish);
      }).catch(function (error) {
        _this4.publish_problem = true;
        console.log(error);
      });
    },
    post: function post(v) {
      var _this5 = this;

      if (this.name === ' ') {
        this.name = '';
      }
      v.$touch();
      this.is_valid_expiration_date = this.validate_expiration_date();
      if (this.valid_form(v)) {
        this.show_waiting('submit', 'Guardando...');
        document.getElementById('submit').disabled = true;
        this.departments = [];
        for (var item in this.department) {
          this.departments.push(this.department[item].name);
        }
        this.filters = this.filters_education_level.concat(this.filters_experience_years).concat(this.filters_business_skill).concat(this.filters_technical_skill);
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
        this.axios.post('/position', {
          'company_id': localStorage['company_id'],
          'name': this.name,
          'description': this.description,
          'department': __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()([this.department.name]),
          'city': __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.city),
          'work_team_description': this.work_team_description,
          'candidate_characteristics': this.candidate_characteristics,
          'expiration_date': this.expiration_date,
          'filters': __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.filters)
        }).then(function (response) {
          _this5.show_success('submit', 'Guardar', _this5.successSave);
        }).catch(function (error) {
          console.log(error.response);
          document.getElementById('submit').disabled = false;
          _this5.show_error(error.response);
        });
      } else {
        if (this.expiration_date === '') {
          document.getElementById('date').style.color = 'red';
        }
        if (this.name === '') {
          this.name = ' ';
          document.getElementById('name_label').parentElement.classList.add('is-invalid');
        }
        this.show_error('Por favor diligencie todos los campos requeridos (*)');
        if (!this.valid_years(document.getElementById('info04').value) && this.valid_asign) {
          this.show_error('Digite un valor valido de años entre 0 y 50');
        }
      }
    },
    show_error_skills: function show_error_skills(msg) {
      document.getElementById('alert-error-skills').style.display = 'block';
      document.getElementById('alert-error-skills').innerHTML = msg;
    },
    show_error: function show_error(msg) {
      this.restoreSaveButton();
      document.getElementById('alert-error').style.display = 'block';
      document.getElementById('alert-error').innerHTML = msg;
    },
    show_waiting: function show_waiting(id, msg) {
      document.getElementById(id).innerHTML = msg;
      document.getElementById(id).style.color = 'white';
    },
    restoreButton: function restoreButton(id, msg) {
      document.getElementById(id).innerHTML = msg;
      document.getElementById('create-form-container').style.paddingTop = '70px';
    },
    show_success: function show_success(id, buttonMessage, alertMessage) {
      this.restoreButton(id, buttonMessage);
      document.getElementById('alert-success').style.display = 'block';
      document.getElementById('alert-success').innerHTML = alertMessage;
      setTimeout(function () {
        window.location.href = '/positions';
      }, 500);
    },
    hide_alerts: function hide_alerts() {
      document.getElementById('create-form-container').style.paddingTop = '0px';
      document.getElementById('alert-error').style.display = 'none';
      document.getElementById('alert-success').style.display = 'none';
    },
    validate_expiration_date: function validate_expiration_date() {
      if (this.expiration_date === '') {
        document.getElementById('expiration_date').parentElement.parentElement.parentElement.className = 'form-group has-error';
        return false;
      } else {
        document.getElementById('expiration_date').parentElement.parentElement.parentElement.className = 'form-group';
        return true;
      }
    },
    set_value: function set_value() {
      switch (this.type) {
        case 'education_level':
          this.value = this.education_level;
          break;
        case 'experience_years':
          this.value = this.experience_years_min;
          break;
        case 'technical_skill':
          this.value = this.technical_skill;
          break;
        case 'business_skill':
          this.value = this.business_skill;
          break;
      }
      this.post();
    },
    get_type: function get_type(type) {
      switch (type) {
        case 'education_level':
          return 'Nivel Educativo';
        case 'experience_years':
          return 'Experiencia en años';
        case 'technical_skill':
          return 'Habilidad Ténica';
        case 'business_skill':
          return 'Habilidad de Negocios';
      }
    },
    get_importance: function get_importance(importance) {
      switch (importance) {
        case 0:
          return 'Baja';
        case 1:
          return 'Media';
        case 2:
          return 'Alta';
      }
    },
    get_filters: function get_filters(iid) {
      var _this6 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/position/' + this.$route.query.id + '/filter').then(function (response) {
        for (var item in response.data.data.filters) {
          switch (response.data.data.filters[item].type_filter) {
            case 'education_level':
              _this6.filters_education_level.push(response.data.data.filters[item]);
              break;
            case 'experience_years':
              _this6.filters_experience_years.push(response.data.data.filters[item]);
              break;
            case 'technical_skill':
              _this6.filters_technical_skill.push(response.data.data.filters[item]);
              break;
            case 'business_skill':
              _this6.filters_business_skill.push(response.data.data.filters[item]);
              break;
          }
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    add_technical_skill: function add_technical_skill() {
      this.filters_technical_skill.push({
        importance: -1,
        position_id: this.id,
        type_filter: 'technical_skill',
        value: this.technical_skill
      });
      this.technical_skill = '';
    },
    add_business_skill: function add_business_skill() {
      this.filters_business_skill.push({
        importance: -1,
        position_id: this.id,
        type_filter: 'business_skill',
        value: this.business_skill
      });
      this.business_skill = '';
    },
    add_education_level: function add_education_level() {
      this.filters_education_level.push({
        importance: -1,
        position_id: this.id,
        type_filter: 'education_level',
        value: this.education_level
      });
      this.education_level = '';
    },
    add_experience_years: function add_experience_years() {
      if (this.valid_years(document.getElementById('info04').value)) {
        this.filters_experience_years.push({
          importance: -1,
          position_id: this.id,
          type_filter: 'experience_years',
          value: this.experience_years_min
        });
        this.experience_years = '';
        this.hide_alerts();
      } else {
        document.getElementById('years_label').parentElement.classList.add('is-invalid');
        this.show_error('Digite un valor valido de años entre 0 y 50');
      }
    },
    valid_years: function valid_years(y) {
      return y >= 0 && y <= 50 && y !== '';
    },
    set_experience_years: function set_experience_years(item, event) {
      var yrs = event.target.parentElement.parentElement.getElementsByTagName('input')[0].value;
      item.value = yrs;
      this.valid = false;
      this.valid_asign = true;
      if (this.valid_years(yrs)) {
        this.valid = !this.valid;
        this.valid_asign = !this.valid_asign;
      }
    },
    setupLockButtonsBar: function setupLockButtonsBar() {
      var controller = new this.$scrollmagic.Controller();
      new this.$scrollmagic.Scene({ triggerElement: '#create-form-container', triggerHook: 0, offset: 0 }).setClassToggle('#create-buttons-bar', 'magic-scroll') // add .addIndicators() to check trigger position
      .addTo(controller);
    }
  },
  mounted: function mounted() {
    var _this7 = this;

    this.get_departments();
    this.get_skills();
    this.setupLockButtonsBar();
    if (this.$route.query.id !== undefined) {
      if (document.getElementById('cities_table') !== null) {
        document.getElementById('cities_table').style.display = 'none';
      }
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/position/' + this.$route.query.id).then(function (response) {
        _this7.id = response.data.data.position.id;
        document.getElementById('name_label').parentElement.classList.add('is-focused');
        _this7.name = response.data.data.position.name;
        _this7.department = { name: response.data.data.position.department_name, id: Math.floor(Math.random() * 10000000) };
        _this7.city = [response.data.data.position.city];
        _this7.description = response.data.data.position.description;
        if (_this7.description !== '') {
          _this7.description_empty = false;
        }
        _this7.work_team_description = response.data.data.position.work_team_description;
        if (_this7.work_team_description !== '') {
          _this7.work_team_description_empty = false;
        }
        _this7.candidate_characteristics = response.data.data.position.candidate_characteristics;
        if (_this7.candidate_characteristics !== '') {
          _this7.candidate_characteristics_empty = false;
        }
        _this7.expiration_date = response.data.data.position.expiration_date.substring(0, 10);
      }).catch(function (error) {
        console.log(error.response);
      });
    } else {
      document.getElementById('preview-button').style.display = 'none';
      document.getElementById('publish').style.display = 'none';
    }
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/position/' + this.id).then(function (response) {
      _this7.position = response.data.data.position;
    }).catch(function (error) {
      console.log(error.response);
    });
    this.get_filters(this.$route.query.id);
  },

  created: function created() {
    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
  }
});

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ApplicationForm__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ApplicationForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ApplicationForm__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ApplicationForm: __WEBPACK_IMPORTED_MODULE_0__ApplicationForm___default.a
  },
  data: function data() {
    return {
      id: '',
      name: '',
      department_id: '',
      position_type_id: '',
      city: '',
      description: '',
      work_team_description: '',
      candidate_characteristics: '',
      questions: '',
      preformulated_questions: '',
      publication_date: '',
      expiration_date: '',
      status_type: '',
      url_position: window.location.href
    };
  },
  head: {
    meta: [{ property: 'fb:app_id', content: '123456789' }, { property: 'og:title', content: 'Content Title' },
    // with shorthand
    { p: 'og:image', c: 'https://example.com/image.jpg' }]
  },
  methods: {
    exit: function exit() {
      window.location.href = '/positions';
    },
    isEmpty: function isEmpty(str) {
      return !!str;
    },
    setDescriptionContent: function setDescriptionContent() {
      document.getElementById('description_id').innerHTML = this.description;
      document.getElementById('work_team_description_id').innerHTML = this.work_team_description;
      document.getElementById('candidate_characteristics_id').innerHTML = this.candidate_characteristics;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.axios.get('/position/' + this.$route.params.id).then(function (response) {
      _this.id = response.data.data.position.id;
      _this.name = response.data.data.position.name;
      _this.department_id = response.data.data.position.department_id;
      _this.description = response.data.data.position.description;
      _this.city = response.data.data.position.city;
      _this.work_team_description = response.data.data.position.work_team_description;
      _this.candidate_characteristics = response.data.data.position.candidate_characteristics;
      _this.status_type = response.data.data.position.status_type;
      _this.setDescriptionContent();
    }).catch(function (error) {
      console.log(error.response);
    });
  }
  /*
  beforeCreate: function () {
    var metaTags = [
      ['property', 'og:title', 'Cotopaxi'],
      ['property', 'og:site_name', 'Cotopaxi'],
      ['property', 'og:description', 'contenido 3'],
      ['property', 'og:description', 'contenido 3'],
      ['property', 'og:image', 'http://placeme.life/images/opimage.jpg'],
      ['property', 'og:url', document.URL],
      ['property', 'og:type', 'website'],
      ['name', 'twitter:card', 'summary'],
      ['name', 'twitter:site', '@user'],
      ['name', 'twitter:creator', '@soyelhijo'],
      ['name', 'twitter:title', 'contenido 4'],
      ['name', 'twitter:image', 'http://placeme.life/images/opimage.jpg']
    ]
    for (var i = 0; i < metaTags.length; i++) {
      this.meta_tag = document.createElement('meta')
      this.meta_tag.setAttribute(metaTags[i][0], metaTags[i][1])
      this.meta_tag.setAttribute('content', metaTags[i][2])
      document.head.appendChild(this.meta_tag)
    }
  }
  */

});

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      id: '',
      name: '',
      department_id: '',
      position_type_id: '',
      city: '',
      description: '',
      work_team_description: '',
      candidate_characteristics: '',
      questions: '',
      preformulated_questions: '',
      publication_date: '',
      expiration_date: ''
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["d" /* isLoggedIn */])();
    },
    go_back: function go_back() {
      window.history.back();
    },
    exit: function exit() {
      window.location.href = '/positions';
    },
    isEmpty: function isEmpty(str) {
      return !!str;
    },
    setDescriptionContent: function setDescriptionContent() {
      document.getElementById('description_id').innerHTML = this.description;
      document.getElementById('work_team_description_id').innerHTML = this.work_team_description;
      document.getElementById('candidate_characteristics_id').innerHTML = this.candidate_characteristics;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/position/' + this.$route.params.id).then(function (response) {
      _this.id = response.data.data.position.id;
      _this.name = response.data.data.position.name;
      _this.department_id = response.data.data.position.department_id;
      _this.description = response.data.data.position.description;
      _this.city = response.data.data.position.city;
      _this.work_team_description = response.data.data.position.work_team_description;
      _this.candidate_characteristics = response.data.data.position.candidate_characteristics;
      _this.expiration_date = response.data.data.position.expiration_date.substring(0, 10);
      _this.setDescriptionContent();
    }).catch(function (error) {
      console.log(error.response);
    });
  }
});

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LayoutHeader__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LayoutHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__LayoutHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_auth__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uiv__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uiv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_uiv__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Toolbar: __WEBPACK_IMPORTED_MODULE_0__Toolbar___default.a,
    LayoutHeader: __WEBPACK_IMPORTED_MODULE_1__LayoutHeader___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_3_uiv__["Tooltip"],
    Dropdown: __WEBPACK_IMPORTED_MODULE_3_uiv__["Dropdown"]
  },
  data: function data() {
    return {
      positions: {},
      publish_problem: false,
      company_id: localStorage['company_id'],
      company: {},
      copyn: false,
      bootstrap_min_js: null,
      list: { 'position_number': true, 'name': true, 'city': true, 'created_at': true, 'publication_date': true, 'status': true }
    };
  },
  methods: {
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["d" /* isLoggedIn */])();
    },
    change_order: function change_order(id) {
      this.get_positions(id, this.list[id]);
      this.list[id] = !this.list[id];
    },
    copy_now: function copy_now() {
      this.copyn = true;
    },
    go_to: function go_to(url) {
      window.location.href = url;
    },
    make_visible: function make_visible() {
      return this.positions.length > 0;
    },
    visible_tittle: function visible_tittle(id) {
      return this.list[id];
    },
    get_positions: function get_positions(order, inc) {
      var _this = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/position', { params: { 'company_id': localStorage['company_id'], 'order_by': order, 'asc_or_desc': inc } }).then(function (response) {
        _this.positions = response.data.data.positions;
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_status: function get_status(status) {
      if (status === 'publish') {
        return 'Publicado';
      } else if (status === 'unpublished' || status === null) {
        return 'Sin Publicar';
      } else if (status === 'closed') {
        return 'Cerrada';
      }
    },
    copy_to_clipboard: function copy_to_clipboard(text) {
      if (this.copyn) {
        document.getElementById('copy_link').style.display = 'block';
        this.copyn = false;
      }
      return window.location.href.substr(0, window.location.href.length - 1) + '-apply/' + text;
    },
    set_status_position: function set_status_position(id, status) {
      var _this2 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/position/' + id + '/' + status).then(function (response) {
        _this2.get_positions('created_at', true);
      }).catch(function (error) {
        _this2.publish_problem = true;
        console.log(error);
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.get_positions('created_at', true);

    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/company/' + this.company_id).then(function (response) {
      _this3.company = response.data.data.company;
    }).catch(function (error) {
      console.log(error.response);
    });

    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
  }
});

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Toolbar__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Toolbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Toolbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_facebook_signin_button__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_facebook_signin_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_facebook_signin_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_auth__ = __webpack_require__(10);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Toolbar: __WEBPACK_IMPORTED_MODULE_1__Toolbar___default.a,
    FBSignInButton: __WEBPACK_IMPORTED_MODULE_2_vue_facebook_signin_button___default.a
  },
  data: function data() {
    return {
      script_html: '',
      facebook_plugin: null,
      fbSignInParams: {
        scope: 'email, public_profile, manage_pages, publish_actions, publish_pages',
        return_scopes: true
      },
      facebook_auth_response: {},
      pages: [],
      social_network_connections: [],
      twitter_status: 'not_connected',
      facebook_status: 'not_connected',
      linkedin_status: 'not_connected',
      position: {},
      text_post: '',
      text_post_link: '',
      text_post_facebook: '',
      text_post_linkedin: '',
      text_post_twitter: '',
      counter_characters_facebook: 0,
      counter_characters_linkedin: 0,
      counter_characters_twitter: 0,
      connecting_twitter: false,
      connecting_facebook: false,
      connecting_linkedin: false
    };
  },
  methods: {
    onSignInSuccess: function onSignInSuccess(response) {
      var _this = this;

      window.FB.api('/me/accounts', function (dude) {
        _this.pages = dude.data;
      });
    },
    facebook_connect_button_change: function facebook_connect_button_change() {
      this.connecting_facebook = true;
    },
    onSignInError: function onSignInError(error) {
      console.log('La cuenta no ha sido autorizada!', error);
      this.connecting_facebook = false;
    },
    set_token: function set_token(token, id, event) {
      var _this2 = this;

      event.target.innerHTML = 'Vinculando...';
      this.facebook_auth_response.access_token = token;
      this.facebook_auth_response.id = id;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/social-network-connection/' + window.localStorage['company_id'], {
        'access_token': this.facebook_auth_response.access_token,
        'page_id': this.facebook_auth_response.id,
        'provider': 'facebook',
        'access_token_secret': '0',
        'oauth_token': '0',
        'oauth_verifier': '0'
      }).then(function (response) {
        event.target.innerHTML = 'Vincular Página';
        _this2.get_connections();
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    publish: function publish(provider) {
      var buttonId = provider + '-save-button';
      document.getElementById(buttonId).innerHTML = 'Publicando...';
      switch (provider) {
        case 'facebook':
          this.text_post = this.text_post_facebook + ' ' + this.text_post_link;
          break;
        case 'twitter':
          this.text_post = this.text_post_twitter + ' ' + this.text_post_link;
          break;
        case 'linkedin':
          this.text_post = this.text_post_linkedin + ' ' + this.text_post_link;
          break;
      }
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/social-network/' + provider + '/company/' + window.localStorage['company_id'] + '/publish', {
        'text_post': this.text_post
      }).then(function (response) {
        document.getElementById('success-post-' + provider).style.display = 'block';
        setTimeout(function () {
          document.getElementById('success-post-' + provider).style.display = 'none';
        }, 2500);
        document.getElementById(buttonId).innerHTML = 'Publicar';
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    disconnect: function disconnect(provider) {
      document.getElementById(provider + '-disconnect-button').innerHTML = 'Desconectando...';
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["g" /* getAccessToken */])();
      this.axios.delete('/social-network/' + provider + '/company/' + window.localStorage['company_id'] + '/connection', {}).then(function (response) {
        window.location.reload();
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_connections: function get_connections() {
      var _this3 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/social-network-connection/' + localStorage['company_id']).then(function (response) {
        _this3.social_network_connections = response.data.data.social_network_connections;
        for (var index in _this3.social_network_connections) {
          if (_this3.social_network_connections[index].provider === 'facebook') {
            _this3.facebook_status = 'connected';
          } else if (_this3.social_network_connections[index].provider === 'twitter') {
            _this3.twitter_status = 'connected';
          } else if (_this3.social_network_connections[index].provider === 'linkedin') {
            _this3.linkedin_status = 'connected';
          }
        }
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    post_twitter: function post_twitter() {
      this.connecting_twitter = true;
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["g" /* getAccessToken */])();
      this.axios.post('/social-network/twitter/company/' + localStorage['company_id'] + '/connection').then(function (response) {
        window.localStorage.setItem('position_url_social_return', window.location.href);
        window.localStorage.setItem('twitter_request_token', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(response.data.data.request_token));
        window.location.href = response.data.data.url;
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    send_linkedin: function send_linkedin() {
      this.connecting_linkedin = true;
      window.localStorage.setItem('position_url_social_return', window.location.href);
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id=' + "undefined" + '&redirect_uri=' + "undefined" + '&state=f1576406b382b7d1c8c2607f7c563d4f&response_type=code&scope=r_basicprofile w_share';
    },
    get_position: function get_position() {
      var _this4 = this;

      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_auth__["g" /* getAccessToken */])();
      this.axios.get('/position/' + this.$route.params.position_id).then(function (response) {
        _this4.position = response.data.data.position;
        _this4.text_post_link = _this4.position.name + ' - ' + "undefined" + '/position-apply/' + _this4.position.id;
        _this4.get_counter_characters();
      }).catch(function (error) {
        console.log(error.response);
      });
    },
    get_counter_characters: function get_counter_characters(provider) {
      var selectedLabel = '';
      switch (provider) {
        case 'facebook':
          selectedLabel = 'facebook_label';
          this.counter_characters_facebook = this.text_post_facebook.length;
          break;
        case 'twitter':
          selectedLabel = 'twitter_label';
          this.counter_characters_twitter = this.text_post_twitter.length;
          break;
        case 'linkedin':
          selectedLabel = 'linkedin_label';
          this.counter_characters_linkedin = this.text_post_linkedin.length;
          break;
      }
      document.getElementById(selectedLabel).parentElement.classList.add('is-focused');
    }
  },
  created: function created() {
    // TODO: improve embedded string approach
    this.facebook_plugin = document.createElement('script');
    this.facebook_plugin.setAttribute('type', 'text/javascript');
    this.script_html += 'window.fbAsyncInit = function() {\n';
    this.script_html += '  FB.init({\n';
    this.script_html += '    appId      : "' + "undefined" + '",\n';
    this.script_html += '    cookie     : true,  // enable cookies to allow the server to access the session\n';
    this.script_html += '    xfbml      : true,  // parse social plugins on this page\n';
    this.script_html += '    version    : "v2.10" // use graph api version 2.8\n';
    this.script_html += '  });\n';
    this.script_html += '};\n';
    this.script_html += '(function(d, s, id) {\n';
    this.script_html += '  var js, fjs = d.getElementsByTagName(s)[0];\n';
    this.script_html += '  if (d.getElementById(id)) return;\n';
    this.script_html += '  js = d.createElement(s); js.id = id;\n';
    this.script_html += '  js.src = "//connect.facebook.net/en_US/sdk.js";\n';
    this.script_html += '  fjs.parentNode.insertBefore(js, fjs);\n';
    this.script_html += '}(document, "script", "facebook-jssdk"));\n';
    this.facebook_plugin.innerHTML = this.script_html;
    document.body.appendChild(this.facebook_plugin);
    this.bootstrap_min_js = document.createElement('script');
    this.bootstrap_min_js.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    this.bootstrap_min_js.setAttribute('integrity', 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa');
    this.bootstrap_min_js.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(this.bootstrap_min_js);
  },
  mounted: function mounted() {
    this.get_position();
    this.get_connections();
    window.localStorage.removeItem('position_url_social_return');
  }
});

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'toolbar',
  data: function data() {
    return {
      user_info: {
        picture: '',
        name: ''
      },
      company: {}
    };
  },
  methods: {
    handleLogin: function handleLogin() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["b" /* login */])();
    },
    handleLogout: function handleLogout() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["c" /* logout */])();
      window.location.href = '/';
    },
    isLoggedIn: function isLoggedIn() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["d" /* isLoggedIn */])();
    },
    getUserInfo: function getUserInfo() {
      this.user_info = JSON.parse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["e" /* getUserInfo */])());
    },
    go_to: function go_to(url) {
      window.location.href = url;
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.isLoggedIn()) {
      this.getUserInfo();
    }
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
    this.axios.get('/company/' + window.localStorage['company_id']).then(function (response) {
      _this.company = response.data.data.company;
    }).catch(function (error) {
      console.log(error.response);
    });
  }
});

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_auth__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'callback',
  data: function data() {
    return {};
  },
  methods: {},
  mounted: function mounted() {
    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["f" /* getIdToken */])() + '[' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_auth__["g" /* getAccessToken */])();
    this.axios.post('/social-network-connection/' + window.localStorage['company_id'], {
      'access_token': '0',
      'access_token_secret': '0',
      'provider': 'twitter',
      'page_id': 'No Aplica',
      'oauth_token': window.localStorage['twitter_request_token'],
      'oauth_verifier': this.$route.query.oauth_verifier
    }).then(function (response) {
      window.localStorage.removeItem('twitter_request_token');
      window.location.href = window.localStorage['position_url_social_return'];
    }).catch(function (error) {
      console.log(error);
      window.location.href = window.localStorage['position_url_social_return'];
    });
  }
});

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AppNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AppNav__);
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppNav: __WEBPACK_IMPORTED_MODULE_0__AppNav___default.a
  },
  data: function data() {
    return {
      positions: {}
    };
  },
  methods: {},
  mounted: function mounted() {}
});

/***/ }),

/***/ 504:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 505:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 506:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 507:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 508:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 509:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 510:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 511:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 512:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 513:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 514:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 515:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 517:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 518:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 519:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 520:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 521:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 522:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 523:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 524:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 525:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 526:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 527:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 528:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 529:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(515)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(492),
  /* template */
  __webpack_require__(585),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-599f2ed9",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 530:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 531:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 532:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(506)
  __webpack_require__(507)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(474),
  /* template */
  __webpack_require__(577),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1ebd2d60",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(528)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(475),
  /* template */
  __webpack_require__(595),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-86d7c07a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(531)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(476),
  /* template */
  __webpack_require__(597),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c04751dc",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(513)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(477),
  /* template */
  __webpack_require__(582),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3fbecad7",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(517)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(478),
  /* template */
  __webpack_require__(587),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-61d2e24a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(504)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(479),
  /* template */
  __webpack_require__(575),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-081a4a5e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(505)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(480),
  /* template */
  __webpack_require__(576),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1795d882",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(512)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(481),
  /* template */
  __webpack_require__(581),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3b06dff2",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(509)
  __webpack_require__(510)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(482),
  /* template */
  __webpack_require__(579),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-364b424d",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(522)
  __webpack_require__(523)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(483),
  /* template */
  __webpack_require__(591),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-71bb320f",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(516)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(484),
  /* template */
  __webpack_require__(586),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5e07e11e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(514)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(486),
  /* template */
  __webpack_require__(583),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-41ec55d6",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(524)
  __webpack_require__(525)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(487),
  /* template */
  __webpack_require__(592),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-79b39c8a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(527)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(488),
  /* template */
  __webpack_require__(594),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-85ab24ba",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(526)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(489),
  /* template */
  __webpack_require__(593),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7d7eddbd",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(529)
  __webpack_require__(530)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(490),
  /* template */
  __webpack_require__(596),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b568b270",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(519)
  __webpack_require__(520)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(491),
  /* template */
  __webpack_require__(589),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-66cf9e48",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(521)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(493),
  /* template */
  __webpack_require__(590),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-69e2da94",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(508)
}
var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(494),
  /* template */
  __webpack_require__(578),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-288119fe",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(6)(
  /* script */
  __webpack_require__(471),
  /* template */
  __webpack_require__(584),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 575:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('app-nav'), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default",
    attrs: {
      "id": "container-positions"
    }
  }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "form"
  }, [_vm._m(1, false, false), _vm._v(" "), _vm._m(2, false, false), _vm._v(" "), _vm._m(3, false, false), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Danos una descripción corta de tu empresa. (Máximo 200 palabras)")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.description),
      expression: "description"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "10",
      "id": "description",
      "name": "description"
    },
    domProps: {
      "value": (_vm.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.description = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.uri.$error
    }
  }, [_vm._m(4, false, false), _vm._v(" "), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v(_vm._s(_vm.server) + "/")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.uri),
      expression: "uri"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "uri",
      "name": "uri"
    },
    domProps: {
      "value": (_vm.uri)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.uri = $event.target.value
      }, _vm.$v.uri.$touch]
    }
  })]), _vm._v(" "), _c('button', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: (_vm.server + '/' + _vm.uri),
      expression: "server + '/' + uri",
      arg: "copy"
    }],
    on: {
      "click": function($event) {
        _vm.confirmCopiedCompanyLink()
      }
    }
  }, [_vm._v("Copiar enlace")])]), _vm._v(" "), _vm._m(5, false, false), _vm._v(" "), _vm._m(6, false, false), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    attrs: {
      "id": "submit"
    },
    on: {
      "click": function($event) {
        _vm.update_company(_vm.$v)
      }
    }
  }, [_vm._v("Guardar Cambios")]), _vm._v(" "), _c('router-link', {
    staticClass: "btn btn-warning",
    attrs: {
      "to": '/' + _vm.uri,
      "target": "_blank"
    }
  }, [_vm._v("Vista Preliminar")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger",
    on: {
      "click": function($event) {
        _vm.exit()
      }
    }
  }, [_vm._v("Salir sin Guardar")])], 1)])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('h3', [_vm._v("Crea tu página de lista de posiciones de la empresa")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-remove-sign"
  }), _vm._v(" "), _c('strong', [_vm._v("Campos requeridos")]), _vm._v(" "), _c('p', [_vm._v("Antes de continuar por favor verifique la información suministrada.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-remove-sign"
  }), _vm._v(" "), _c('strong', [_vm._v("Oops!")]), _vm._v(" "), _c('p', [_vm._v("Ocurrio un error inesperado, por favor contacte al administrador del sistema.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Carga el logotipo de tu empresa")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "file"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', [_vm._v("Enlace de página de empresa "), _c('span', {
    staticClass: "required-span"
  }, [_vm._v("*")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-success",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-success",
      "role": "alert"
    }
  }, [_c('strong', [_c('i', {
    staticClass: "glyphicon glyphicon-ok"
  }), _vm._v(" Proceso Finalizado.")]), _vm._v(" "), _c('p', [_vm._v("La empresa se actualizó correctamente.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-success",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "copy_link",
      "role": "alert"
    }
  }, [_c('strong', [_c('i', {
    staticClass: "glyphicon glyphicon-exclamation-sign"
  }), _vm._v(" Link Copiado")]), _vm._v(" "), _c('p')])
}]}

/***/ }),

/***/ 576:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('app-nav'), _vm._v(" "), _c('div', {
    staticClass: "panel panel-default",
    attrs: {
      "id": "container-positions"
    }
  }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "form"
  }, [_vm._m(1, false, false), _vm._v(" "), _vm._m(2, false, false), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.number_employees.$error
    }
  }, [_vm._m(3, false, false), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.number_employees),
      expression: "number_employees"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "number_employees",
      "name": "number_employees"
    },
    on: {
      "input": _vm.$v.number_employees.$touch,
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.number_employees = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccionar")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "1-50"
    }
  }, [_vm._v("1-50")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "51-150"
    }
  }, [_vm._v("51-150")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "151-500"
    }
  }, [_vm._v("151-500")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Más de 500"
    }
  }, [_vm._v("Más de 500")])])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.industry.$error
    }
  }, [_vm._m(4, false, false), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.industry),
      expression: "industry"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "industry",
      "name": "industry"
    },
    on: {
      "input": _vm.$v.industry.$touch,
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.industry = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccionar")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Banca o Finanzas"
    }
  }, [_vm._v("Banca o Finanzas")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Manufactura"
    }
  }, [_vm._v("Manufactura")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Agricultura"
    }
  }, [_vm._v("Agricultura")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Servicios"
    }
  }, [_vm._v("Servicios")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Importación y Exportación"
    }
  }, [_vm._v("Importación y Exportación")])])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.company_role.$error
    }
  }, [_vm._m(5, false, false), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.company_role),
      expression: "company_role"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "company_role",
      "name": "company_role"
    },
    on: {
      "input": _vm.$v.company_role.$touch,
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.company_role = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccionar")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Gerente de RRHH"
    }
  }, [_vm._v("Gerente de RRHH")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Especialista de RRHH"
    }
  }, [_vm._v("Especialista de RRHH")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Entrevistador"
    }
  }, [_vm._v("Entrevistador")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Otro"
    }
  }, [_vm._v("Otro")])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }],
    staticClass: "form-group"
  }, [_c('label', [_vm._v("¿Cuál es el nombre de tu empresa?")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.name),
      expression: "name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "name",
      "name": "name"
    },
    domProps: {
      "value": (_vm.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    on: {
      "click": function($event) {
        _vm.create_company(_vm.$v)
      }
    }
  }, [_vm._v("Continuar")])])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('h3', [_vm._v("Ahora cuéntanos un poco sobre tu empresa")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-remove-sign"
  }), _vm._v(" "), _c('strong', [_vm._v("Campos requeridos")]), _vm._v(" "), _c('p', [_vm._v("Antes de continuar por favor verifique la información suministrada.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-remove-sign"
  }), _vm._v(" "), _c('strong', [_vm._v("Oops!")]), _vm._v(" "), _c('p', [_vm._v("Ocurrio un error inesperado, por favor contacte al administrador del sistema.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', [_vm._v("¿Cuantos empledos tiene su empresa? "), _c('span', {
    staticClass: "required-span"
  }, [_vm._v("*")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', [_vm._v("¿En que industria se desempeña tu empresa? "), _c('span', {
    staticClass: "required-span"
  }, [_vm._v("*")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', [_vm._v("¿Cuál es tu rol dentro de la empresa? "), _c('span', {
    staticClass: "required-span"
  }, [_vm._v("*")])])
}]}

/***/ }),

/***/ 577:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('modal', {
    attrs: {
      "scrollable": false,
      "adaptive": true,
      "width": "60%",
      "height": "100%",
      "name": "show-pdf"
    }
  }, [_c('div', {
    attrs: {
      "slot": "top-right"
    },
    slot: "top-right"
  }, [_c('button', {
    staticClass: "close-button",
    staticStyle: {
      "padding-right": "20px"
    },
    on: {
      "click": function($event) {
        _vm.$modal.hide('show-pdf')
      }
    }
  }, [_vm._v("\n        ❌\n      ")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "100%"
    }
  }, [_c('iframe', {
    staticStyle: {
      "width": "100%",
      "height": "100%"
    },
    attrs: {
      "src": _vm.src,
      "frameborder": "0"
    }
  })])]), _vm._v(" "), _c('toolbar'), _vm._v(" "), _c('div', {
    staticClass: "body-container"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "applicant-modal-header-container"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-1 col-xs-4"
  }, [_vm._m(1, false, false), _vm._v(" "), _c('p', {
    staticClass: "header-name"
  }, [_vm._v("\n              " + _vm._s(_vm.first_name) + " " + _vm._s(_vm.last_name) + "\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    staticClass: "header-info"
  }, [_vm._v("Status:")]), _vm._v(" "), _c('p', {
    staticClass: "header-info"
  }, [_vm._v(_vm._s(_vm.status))])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    staticClass: "header-info"
  }, [_vm._v("Score Status:")]), _vm._v(" "), _c('p', {
    staticClass: "header-info"
  }, [_vm._v(_vm._s(_vm.score_status))])]), _vm._v(" "), _vm._m(2, false, false)])])]), _vm._v(" "), _c('div', {
    staticClass: "applicant-modal-buttons"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "buttons-container"
  }, [_c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success",
    attrs: {
      "id": "button_scheduled_call"
    },
    on: {
      "click": function($event) {
        _vm.set_status_application('scheduled_call')
      }
    }
  }, [_vm._v("Invitar a entrevista telefonica")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success",
    attrs: {
      "id": "button_scheduled_interview"
    },
    on: {
      "click": function($event) {
        _vm.set_status_application('scheduled_interview')
      }
    }
  }, [_vm._v("Invitar a entrevista presencial")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success",
    attrs: {
      "id": "button_approved"
    },
    on: {
      "click": function($event) {
        _vm.set_status_application('approved')
      }
    }
  }, [_vm._v("Marcar como contratado")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error",
    attrs: {
      "id": "button_rejection"
    },
    on: {
      "click": function($event) {
        _vm.set_status_application('rejection')
      }
    }
  }, [_vm._v("Rechazar candidato")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "applicant-modal-content"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(3, false, false), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "content-item"
  }, [_vm._v("e-Mail: " + _vm._s(_vm.email))]), _vm._v(" "), _c('div', {
    staticClass: "content-item"
  }, [_vm._v("Teléfono: " + _vm._s(_vm.phone_number))])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "content-item"
  }, [_vm._v("Usuario Linkedin: " + _vm._s(_vm.linkedin_user))]), _vm._v(" "), _c('div', {
    staticClass: "content-item"
  }, [_vm._v("Usuario Twitter: " + _vm._s(_vm.twitter_user))])]), _vm._v(" "), _vm._m(4, false, false)])])]), _vm._v(" "), (false) ? _c('div', {
    staticClass: "applicant-modal-content"
  }, [_vm._m(5, false, false)]) : _vm._e(), _vm._v(" "), (_vm.skills_list.length > 0) ? _c('div', {
    staticClass: "applicant-modal-content"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(6, false, false), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, _vm._l((_vm.skills_list), function(items) {
    return _c('div', {
      staticClass: "content-tag"
    }, [_vm._v(_vm._s(items[1]))])
  })), _vm._v(" "), _vm._m(7, false, false)])])]) : _vm._e(), _vm._v(" "), (_vm.degree.length > 0) ? _c('div', {
    staticClass: "applicant-modal-content"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(8, false, false), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, _vm._l((_vm.degree), function(items) {
    return _c('div', [(items.Degree !== undefined) ? _c('div', {
      staticClass: "content-item"
    }, [_vm._v("Nivel: " + _vm._s(items.Degree["@degreeType"]))]) : _vm._e(), _vm._v(" "), (items.School !== undefined) ? _c('div', {
      staticClass: "content-item"
    }, [_vm._v("Lugar: " + _vm._s(items.School.SchoolName))]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "content-item"
    }, [_vm._v(_vm._s(items.Degree.Comments))])])
  })), _vm._v(" "), _vm._m(9, false, false)])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "applicant-modal-download"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_vm._m(10, false, false), _vm._v(" "), _vm._l((_vm.documents), function(item) {
    return _c('div', {
      staticClass: "row"
    }, [_c('div', {
      staticClass: "col-xs-offset-2 col-xs-4",
      staticStyle: {
        "padding-top": "30px"
      }
    }, [_c('div', {
      staticClass: "content-item"
    }, [_vm._v(_vm._s(item.original_name))])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-4",
      staticStyle: {
        "padding-top": "30px"
      }
    }, [_c('div', {
      staticClass: "content-item"
    }, [_vm._v(_vm._s(item.type_file == 'presentation_letter' ? 'Carta de presentación' : 'Curriculum Vitae'))])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2",
      staticStyle: {
        "padding-top": "30px"
      }
    }, [_c('button', {
      staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent download-button",
      on: {
        "click": function($event) {
          _vm.show(item)
        }
      }
    }, [_vm._v("Ver")])])])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "pdf-viewer"
  })])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section-header"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('h1', {
    staticClass: "header-title wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v("Detalle del aplicante")])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header-bookmark is-active"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("thumb_up")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-2"
  }, [_c('div', {
    staticClass: "header-compatibility",
    attrs: {
      "id": "compatibility"
    }
  }, [_c('p', {
    attrs: {
      "id": "compatibility-text"
    }
  }, [_vm._v("Esperando a ser calificado")]), _vm._v(" "), _c('div', {
    staticClass: "compatibility-container"
  }, [_c('div', {
    staticClass: "compatibility-level"
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-title"
  }, [_vm._v("Datos Personales")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-separator"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-title"
  }, [_vm._v("Description")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "content-text"
  }, [_vm._v("The customers are athletes who do not yet have large commercial contracts - these are aspiring and young dedicated and focussed individuals, many of whom have Tokyo 2020 in mind. The other side of the market is brands, who are looking to get involved in the lives of the athletes, and are looking to reach the fans and followers of these athletes.")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-separator"
  })])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-title"
  }, [_vm._v("Habilidades")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-separator"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-title"
  }, [_vm._v("Educación")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "content-separator"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-1 col-xs-8"
  }, [_c('div', {
    staticClass: "download-title"
  }, [_vm._v("Documentos")])])])
}]}

/***/ }),

/***/ 578:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('app-nav'), _vm._v(" "), _c('div', {
    staticClass: "alert alert-info",
    attrs: {
      "id": "verify-div",
      "role": "alert"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-envelope"
  }), _vm._v("\n    Verifica tu e-mail. "), _c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("Regresar")])], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 579:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "email-template-content"
  }, [_c('div', {
    staticClass: "template-header"
  }, [_c('div', {
    staticClass: "template-title-container"
  }, [_c('div', {
    staticClass: "template-title"
  }, [_vm._v("Plantilla para invitar candidato a llamada")]), _vm._v(" "), _c('div', {
    staticClass: "switch-container"
  }, [_c('span', {
    staticClass: "switch-message"
  }, [_vm._v("Activar plantilla")]), _vm._v(" "), _c('div', {
    staticClass: "switch-content"
  }, [_c('div', {
    staticClass: "onoffswitch"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.status.automatic_send),
      expression: "status.automatic_send"
    }],
    staticClass: "onoffswitch-checkbox",
    attrs: {
      "id": _vm.check_box_id,
      "type": "checkbox",
      "name": "switchitem1"
    },
    domProps: {
      "checked": Array.isArray(_vm.status.automatic_send) ? _vm._i(_vm.status.automatic_send, null) > -1 : (_vm.status.automatic_send)
    },
    on: {
      "click": function($event) {
        _vm.changeTemplateStatus()
      },
      "change": function($event) {
        var $$a = _vm.status.automatic_send,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.status.automatic_send = $$a.concat([$$v]))
          } else {
            $$i > -1 && (_vm.status.automatic_send = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.$set(_vm.status, "automatic_send", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "onoffswitch-label",
    attrs: {
      "for": _vm.check_box_id
    }
  }, [_vm._m(0, false, false)])])])])]), _vm._v(" "), _vm._m(1, false, false)]), _vm._v(" "), _c('div', {
    staticClass: "separator"
  }), _vm._v(" "), _c('div', {
    staticClass: "template-body is-active"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty"
  }, [_c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "for": _vm.email_id
    }
  }, [_vm._v("Correo del remitente")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.status.from_address),
      expression: "status.from_address"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "id": _vm.email_id,
      "name": _vm.email_id,
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.status.from_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.status, "from_address", $event.target.value)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    staticClass: "separator"
  }), _vm._v(" "), _vm._m(2, false, false), _vm._v(" "), _c('div', {
    staticClass: "separator"
  }), _vm._v(" "), _c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-dirty"
  }, [_c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "for": _vm.subject_id
    }
  }, [_vm._v("Asunto")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.status.subject),
      expression: "status.subject"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "id": _vm.subject_id,
      "name": _vm.subject_id,
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.status.subject)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.status, "subject", $event.target.value)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Cuerpo del mensaje: ")]), _vm._v(" "), _c('quill-editor', {
    ref: "myQuillEditor",
    attrs: {
      "options": {
        placeholder: ''
      }
    },
    model: {
      value: (_vm.status.body),
      callback: function($$v) {
        _vm.$set(_vm.status, "body", $$v)
      },
      expression: "status.body"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "separator"
  }), _vm._v(" "), _c('div', {
    staticClass: "form-btn-container"
  }, [_c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm",
    attrs: {
      "id": _vm.save_button_id
    },
    on: {
      "click": function($event) {
        _vm.save()
      }
    }
  }, [_vm._v("Guardar")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-confirm",
    on: {
      "click": function($event) {
        _vm.go_back()
      }
    }
  }, [_vm._v("Salir sin guardar")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "onoffswitch-inner"
  }, [_c('span', {
    staticClass: "onoffswitch-active"
  }, [_c('span', {
    staticClass: "onoffswitch-switch transition-mdl-elements"
  }, [_vm._v("SI")])]), _vm._v(" "), _c('span', {
    staticClass: "onoffswitch-inactive"
  }, [_c('span', {
    staticClass: "onoffswitch-switch transition-mdl-elements"
  }, [_vm._v("NO")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "template-instructions-container"
  }, [_c('div', {
    staticClass: "instructions-title"
  }, [_vm._v("Instrucciones")]), _vm._v(" "), _c('div', {
    staticClass: "instructions-message"
  }, [_vm._v("Este correo electrónico será enviado automaticamente a los candidatos que apruebes en el proceso de entrevistas de esta posición")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "template-explanation-container"
  }, [_c('div', {
    staticClass: "explanation-title"
  }, [_vm._v("Elementos automáticos")]), _vm._v(" "), _c('div', {
    staticClass: "explanation-text"
  }, [_vm._v("\n          Inserta estos elementos en el correo y nosotros los personalizaremos automáticamente.\n          "), _c('br'), _c('br'), _vm._v(" "), _c('strong', [_vm._v("[*NOMBRE*]")]), _vm._v(" = Primer nombre del candidato\n          "), _c('br'), _c('br'), _vm._v(" "), _c('strong', [_vm._v("[*NOMBRE COMPLETO*]")]), _vm._v(" = Nombre completo del candidato\n          "), _c('br'), _c('br'), _vm._v(" "), _c('strong', [_vm._v("[*POSICION*]")]), _vm._v(" = Nombre de la posición\n        ")])])
}]}

/***/ }),

/***/ 580:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "navbar navbar-inverse"
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "navbar-header"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('router-link', {
    staticClass: "navbar-brand",
    attrs: {
      "to": "/positions"
    },
    on: {
      "click": function($event) {
        _vm.redirect()
      }
    }
  }, [_vm._v("Cotopaxi-io")])], 1), _vm._v(" "), _c('div', {
    staticClass: "collapse navbar-collapse"
  }, [_c('ul', {
    staticClass: "nav navbar-nav"
  }, [_c('li', [_c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isLoggedIn()),
      expression: "!isLoggedIn()"
    }],
    staticClass: "btn btn-default navbar-btn",
    on: {
      "click": function($event) {
        _vm.handleLogin()
      }
    }
  }, [_vm._v("Ingresar")])])]), _vm._v(" "), _c('ul', {
    staticClass: "nav navbar-nav navbar-right"
  }, [_c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    attrs: {
      "id": "li-profile"
    }
  }, [_c('img', {
    staticClass: "img-circle",
    attrs: {
      "id": "img-profile",
      "src": _vm.user_info.picture
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_info.name))])]), _vm._v(" "), _c('li', [_c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    staticClass: "btn btn-default navbar-btn",
    on: {
      "click": function($event) {
        _vm.handleLogout()
      }
    }
  }, [_vm._v(" Cerrar Sesión")])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "navbar-toggle collapsed",
    attrs: {
      "type": "button",
      "data-toggle": "collapse",
      "data-target": "#bs-example-navbar-collapse-1",
      "aria-expanded": "false"
    }
  }, [_c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Toggle navigation")]), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  })])
}]}

/***/ }),

/***/ 581:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('app-nav'), _vm._v(" "), _c('div', {
    attrs: {
      "id": "container-dashboard"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0, false, false)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('div', {
    staticClass: "panel panel-default",
    attrs: {
      "id": "loading"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    attrs: {
      "id": "loading-container"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(123)
    }
  }), _vm._v("\n        Procesando por favor espere...\n      ")])])])])
}]}

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0, false, false)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('div', {
    staticClass: "panel panel-default",
    attrs: {
      "id": "loading"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    attrs: {
      "id": "loading-container"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(123)
    }
  }), _vm._v("\n        Procesando por favor espere...\n      ")])])])])
}]}

/***/ }),

/***/ 584:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.autocompleteText),
      expression: "autocompleteText"
    }],
    ref: "autocomplete",
    class: _vm.classname,
    attrs: {
      "type": "text",
      "id": _vm.id,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": (_vm.autocompleteText)
    },
    on: {
      "focus": function($event) {
        _vm.onFocus()
      },
      "blur": function($event) {
        _vm.onBlur()
      },
      "change": _vm.onChange,
      "keypress": _vm.onKeyPress,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.autocompleteText = $event.target.value
      }
    }
  })
},staticRenderFns: []}

/***/ }),

/***/ 585:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "topbar wow fadeIn",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_c('div', {
    staticClass: "topbar-container general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "left-side"
  }, [_c('div', {
    staticClass: "logo"
  }, [_c('a', {
    attrs: {
      "href": "/positions"
    }
  }, [_c('img', {
    attrs: {
      "src": '/static/html_layout/images/company-logo.svg'
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "right-side"
  }, [_c('div', {
    staticClass: "main-nav"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    staticClass: "nav-item",
    on: {
      "click": function($event) {
        _vm.go_to('/positions')
      }
    }
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("dashboard")]), _vm._v("Panel de Ofertas\n            ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    staticClass: "nav-item",
    on: {
      "click": function($event) {
        _vm.go_to('/company-jobs')
      }
    }
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("dashboard")]), _vm._v("Página Empresa\n            ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isLoggedIn()),
      expression: "!isLoggedIn()"
    }],
    staticClass: "nav-item",
    on: {
      "click": function($event) {
        _vm.handleLogin()
      }
    }
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("account_circle")]), _vm._v("Login\n            ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    staticClass: "nav-item",
    on: {
      "click": function($event) {
        _vm.go_to('/position')
      }
    }
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("note_add")]), _vm._v("Crear Posición\n            ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    staticClass: "nav-item item-nav-dropdown"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("account_circle")]), _vm._v(_vm._s(_vm.user_info.name) + "\n              "), _c('i', {
    staticClass: "material-icons icon-row"
  }, [_vm._v("keyboard_arrow_down")]), _vm._v(" "), _c('div', {
    staticClass: "dropdown-nav-container"
  }, [_c('div', {
    staticClass: "dropdown-nav arrow-right"
  }, [_c('span', {
    staticClass: "dropdown-list-title"
  }, [_vm._v("Opciones de usuario")]), _vm._v(" "), _c('ul', {
    staticClass: "dropdown-list"
  }, [_c('li', [_c('a', {
    on: {
      "click": function($event) {
        _vm.go_to('/' + _vm.company.uri)
      }
    }
  }, [_vm._v("Informacion empresarial")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.handleLogout()
      }
    }
  }, [_vm._v("Cerrar sesión")])])])])])])])])])])])])
},staticRenderFns: []}

/***/ }),

/***/ 586:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('app-nav'), _vm._v(" "), _vm._m(0, false, false)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home-title"
  }, [_c('h3', [_vm._v("\n    ¡Cotopaxi te ayuda a reclutar!\n    La manera mas rapida de contratar ejecutivos y empleados.\n    ")]), _vm._v(" "), _c('p', [_vm._v("\n      Con Cotopaxi ahorra tiempo publicando y manejando solicitudes de empleo a tu empresa.\n    ")])])
}]}

/***/ }),

/***/ 587:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('div', {
    attrs: {
      "id": "container-preview"
    }
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body position-panel"
  }, [_c('p', [_vm._v("\n          " + _vm._s(_vm.company.description) + "\n        ")]), _vm._v(" "), _c('h3', [_vm._v(" Pocisiones abiertas actualmente:")]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label'), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.department_to_filter),
      expression: "department_to_filter"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "departments-list"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.department_to_filter = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.filter_department]
    }
  }, [_c('option', {
    attrs: {
      "value": "0"
    }
  }, [_vm._v("\n              Todos\n            ")]), _vm._v(" "), _vm._l((_vm.department_list), function(item) {
    return _c('option', {
      domProps: {
        "value": item.id
      }
    }, [_c('div', [_vm._v(" " + _vm._s(item.name) + " ")])])
  })], 2), _vm._v(" "), _vm._l((_vm.department_list), function(item) {
    return _c('div', {
      staticClass: "department-container",
      attrs: {
        "id": 'department-' + item.id
      }
    }, [(_vm.test_position(item)) ? _c('div', [_c('h4', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _vm._l((_vm.positions), function(item_position) {
      return _c('div', [(item_position.department_name === item.name) ? _c('div', [_c('a', {
        attrs: {
          "href": '/position-apply/' + item_position.id
        }
      }, [_vm._v(_vm._s(item_position.name) + " - " + _vm._s(item_position.city))])]) : _vm._e()])
    })], 2) : _vm._e()])
  })], 2)])])])])
},staticRenderFns: []}

/***/ }),

/***/ 588:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section-header"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('h1', {
    staticClass: "header-title wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v(_vm._s(_vm.title))])])])])])
},staticRenderFns: []}

/***/ }),

/***/ 589:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('toolbar'), _vm._v(" "), _vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "create-form"
  }, [_vm._m(1, false, false), _vm._v(" "), _c('div', {
    staticClass: "collapse-group",
    attrs: {
      "role": "tablist",
      "aria-multiselectable": "true"
    }
  }, [_vm._m(2, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse create-form-container",
    attrs: {
      "id": "twitter",
      "role": "tabpanel",
      "aria-labelledby": "headingOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "social-connection-container"
  }, [(_vm.twitter_status !== 'connected') ? _c('div', {
    staticClass: "connection-content is-active"
  }, [(!_vm.connecting_twitter) ? _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-twitter ",
    on: {
      "click": function($event) {
        _vm.post_twitter()
      }
    }
  }, [_c('span', {
    staticClass: "btn-social-icon"
  }), _vm._v("Conectar a Twitter")]) : _vm._e(), _vm._v(" "), (_vm.connecting_twitter) ? _c('div', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-twitter "
  }, [_c('span', {
    staticClass: "btn-social-icon"
  }), _vm._v("Conectando...")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.twitter_status === 'connected') ? _c('div', {
    staticClass: "connected-content is-active"
  }, [_c('div', {
    staticClass: "connected-message"
  }, [_vm._v("Esta cuenta se encuentra activa")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-logout",
    attrs: {
      "id": "twitter-disconnect-button"
    },
    on: {
      "click": function($event) {
        _vm.disconnect('twitter')
      }
    }
  }, [_vm._v("Desconectar")])]) : _vm._e()])])]), _vm._v(" "), (_vm.twitter_status === 'connected') ? _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "social-form-container is-active"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-textfield--floating-label mdl-js-textfield"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.text_post_twitter),
      expression: "text_post_twitter"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "rows": "3",
      "id": "socialtext01"
    },
    domProps: {
      "value": (_vm.text_post_twitter)
    },
    on: {
      "keyup": function($event) {
        _vm.get_counter_characters('twitter')
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.text_post_twitter = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "id": "twitter_label",
      "for": "socialtext01"
    }
  }, [_vm._v("Texto para la publicación")]), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "counter_characters"
    }
  }, [_vm._v(_vm._s(_vm.counter_characters_twitter))]), _vm._v(" "), _vm._m(3, false, false), _vm._v(" "), _c('div', {
    staticClass: "alert alert-info",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "success-post-twitter"
    }
  }, [_vm._v("La publicación se ha realizado correctamente!")]), _vm._v(" "), _c('div', {
    staticClass: "form-btn-container"
  }, [_c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-publish",
    attrs: {
      "id": "twitter-save-button"
    },
    on: {
      "click": function($event) {
        _vm.publish('twitter')
      }
    }
  }, [_vm._v("Publicar")])])])])]) : _vm._e()])]), _vm._v(" "), _vm._m(4, false, false), _vm._v(" "), _c('div', {
    staticClass: "collapse-group",
    attrs: {
      "role": "tablist",
      "aria-multiselectable": "true"
    }
  }, [_vm._m(5, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse create-form-container",
    attrs: {
      "id": "facebook",
      "role": "tabpanel",
      "aria-labelledby": "headingTwo"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "social-connection-container"
  }, [(_vm.pages.length <= 0 && _vm.facebook_status !== 'connected' && !_vm.connecting_facebook) ? _c('div', {
    staticClass: "connection-content is-active",
    on: {
      "click": function($event) {
        _vm.facebook_connect_button_change()
      }
    }
  }, [_c('fb-signin-button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-facebook ",
    attrs: {
      "id": "facebook-button",
      "params": _vm.fbSignInParams
    },
    on: {
      "success": _vm.onSignInSuccess,
      "error": _vm.onSignInError
    }
  }, [_c('span', {
    staticClass: "btn-social-icon"
  }), _vm._v("Conectar a Facebook\n                ")])], 1) : _vm._e(), _vm._v(" "), (_vm.pages.length <= 0 && _vm.facebook_status !== 'connected' && _vm.connecting_facebook) ? _c('div', {
    staticClass: "connection-content is-active"
  }, [_c('fb-signin-button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-facebook ",
    attrs: {
      "id": "facebook-button",
      "params": _vm.fbSignInParams
    },
    on: {
      "success": _vm.onSignInSuccess,
      "error": _vm.onSignInError
    }
  }, [_c('span', {
    staticClass: "btn-social-icon"
  }), _vm._v("Conectando...\n                ")])], 1) : _vm._e(), _vm._v(" "), (_vm.pages.length > 0 && _vm.facebook_status !== 'connected') ? _c('div', {
    staticClass: "social-table-content is-active"
  }, [_c('table', {
    staticClass: "mdl-data-table mdl-js-data-table social-table"
  }, [_c('caption', [_vm._v("\n                    Listado de paginas relacionadas con la cuenta actual\n                  ")]), _vm._v(" "), _vm._m(6, false, false), _vm._v(" "), _c('tbody', _vm._l((_vm.pages), function(item) {
    return _c('tr', [_c('td', {
      staticClass: "mdl-data-table__cell--non-numeric"
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('td', {
      staticClass: "mdl-data-table__cell--non-numeric cell-category"
    }, [_vm._v(_vm._s(item.category))]), _vm._v(" "), _c('td', [_c('button', {
      staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social",
      on: {
        "click": function($event) {
          _vm.set_token(item.access_token, item.id, $event)
        }
      }
    }, [_vm._v("Vincular Página")])])])
  }))])]) : _vm._e(), _vm._v(" "), (_vm.facebook_status === 'connected') ? _c('div', {
    staticClass: "connected-content is-active"
  }, [_c('div', {
    staticClass: "connected-content is-active",
    attrs: {
      "id": "facebook-connected"
    }
  }, [_c('div', {
    staticClass: "connected-message"
  }, [_vm._v("Esta cuenta se encuentra activa")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-logout",
    attrs: {
      "id": "facebook-disconnect-button"
    },
    on: {
      "click": function($event) {
        _vm.disconnect('facebook')
      }
    }
  }, [_vm._v("Desconectar")])])]) : _vm._e()])])]), _vm._v(" "), (_vm.facebook_status === 'connected') ? _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "social-form-container is-active"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-textfield--floating-label mdl-js-textfield"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.text_post_facebook),
      expression: "text_post_facebook"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "rows": "3",
      "id": "socialtext02"
    },
    domProps: {
      "value": (_vm.text_post_facebook)
    },
    on: {
      "keyup": function($event) {
        _vm.get_counter_characters('facebook')
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.text_post_facebook = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "id": "facebook_label"
    }
  }, [_vm._v("Texto para la publicación")]), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "counter_characters"
    }
  }, [_vm._v(_vm._s(_vm.counter_characters_facebook))]), _vm._v(" "), _vm._m(7, false, false), _vm._v(" "), _c('div', {
    staticClass: "alert alert-info",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "success-post-facebook"
    }
  }, [_vm._v("La publicación se ha realizado correctamente!")]), _vm._v(" "), _c('div', {
    staticClass: "form-btn-container"
  }, [_c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-publish",
    attrs: {
      "id": "facebook-save-button"
    },
    on: {
      "click": function($event) {
        _vm.publish('facebook')
      }
    }
  }, [_vm._v("Publicar")])])])])]) : _vm._e()])]), _vm._v(" "), _vm._m(8, false, false), _vm._v(" "), _c('div', {
    staticClass: "collapse-group",
    attrs: {
      "role": "tablist",
      "aria-multiselectable": "true"
    }
  }, [_vm._m(9, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse create-form-container",
    attrs: {
      "id": "linkedin",
      "role": "tabpanel",
      "aria-labelledby": "headingThree"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "social-connection-container"
  }, [(_vm.linkedin_status !== 'connected') ? _c('div', {
    staticClass: "connection-content is-active"
  }, [(!_vm.connecting_linkedin) ? _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-linkedin ",
    on: {
      "click": function($event) {
        _vm.send_linkedin()
      }
    }
  }, [_c('span', {
    staticClass: "btn-social-icon"
  }), _vm._v("Conectar a LinkedIn")]) : _vm._e(), _vm._v(" "), (_vm.connecting_linkedin) ? _c('div', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social btn-linkedin "
  }, [_c('span', {
    staticClass: "btn-social-icon"
  }), _vm._v("Conectando...")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.linkedin_status === 'connected') ? _c('div', {
    staticClass: "connected-content is-active"
  }, [_c('div', {
    staticClass: "connected-message"
  }, [_vm._v("Esta cuenta se encuentra activa")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-logout",
    attrs: {
      "id": "linkedin-disconnect-button"
    },
    on: {
      "click": function($event) {
        _vm.disconnect('linkedin')
      }
    }
  }, [_vm._v("Desconectar")])]) : _vm._e()])])]), _vm._v(" "), (_vm.linkedin_status === 'connected') ? _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "social-form-container is-active"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-textfield--floating-label mdl-js-textfield"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.text_post_linkedin),
      expression: "text_post_linkedin"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "rows": "3",
      "id": "socialtext03"
    },
    domProps: {
      "value": (_vm.text_post_linkedin)
    },
    on: {
      "keyup": function($event) {
        _vm.get_counter_characters('linkedin')
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.text_post_linkedin = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "id": "linkedin_label",
      "for": "socialtext03"
    }
  }, [_vm._v("Texto para la publicación")]), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "counter_characters"
    }
  }, [_vm._v(_vm._s(_vm.counter_characters_linkedin))]), _vm._v(" "), _vm._m(10, false, false), _vm._v(" "), _c('div', {
    staticClass: "alert alert-info",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "success-post-linkedin"
    }
  }, [_vm._v("La publicación se ha realizado correctamente!")]), _vm._v(" "), _c('div', {
    staticClass: "form-btn-container"
  }, [_c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-social-publish",
    attrs: {
      "id": "linkedin-save-button"
    },
    on: {
      "click": function($event) {
        _vm.publish('linkedin')
      }
    }
  }, [_vm._v("Publicar")])])])])]) : _vm._e()])]), _vm._v(" "), _vm._m(11, false, false), _vm._v(" "), _vm._m(12, false, false), _vm._v(" "), _vm._m(13, false, false)])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "section-header"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('h1', {
    staticClass: "header-title wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v("Redes sociales")])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "role": "tab",
      "id": "headingOne"
    }
  }, [_c('a', {
    staticClass: "collapsed",
    attrs: {
      "role": "button",
      "data-toggle": "collapse",
      "data-parent": "#accordion",
      "href": "#twitter",
      "aria-expanded": "false",
      "aria-controls": "collapseOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-title"
  }, [_vm._v("Publicar en Twitter\n                "), _c('i', {
    staticClass: "material-icons collapse-icon"
  }, [_vm._v("keyboard_arrow_down")])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-note-message"
  }, [_c('strong', [_vm._v("Nota: ")]), _vm._v("\n                El nombre y enlace de la posición se agregara automaticamente al final del texto\n              ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "role": "tab",
      "id": "headingTwo"
    }
  }, [_c('a', {
    staticClass: "collapsed",
    attrs: {
      "role": "button",
      "data-toggle": "collapse",
      "data-parent": "#accordion",
      "href": "#facebook",
      "aria-expanded": "false",
      "aria-controls": "collapseOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-title"
  }, [_vm._v("Publicar en Facebook\n                "), _c('i', {
    staticClass: "material-icons collapse-icon"
  }, [_vm._v("keyboard_arrow_down")])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {
    staticClass: "mdl-data-table__cell--non-numeric"
  }, [_vm._v("Página")]), _vm._v(" "), _c('th', {
    staticClass: "mdl-data-table__cell--non-numeric"
  }, [_vm._v("Categoría")]), _vm._v(" "), _c('th')])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-note-message"
  }, [_c('strong', [_vm._v("Nota: ")]), _vm._v("\n                El nombre y enlace de la posición se agregara automaticamente al final del texto\n              ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "role": "tab",
      "id": "headingThree"
    }
  }, [_c('a', {
    staticClass: "collapsed",
    attrs: {
      "role": "button",
      "data-toggle": "collapse",
      "data-parent": "#accordion",
      "href": "#linkedin",
      "aria-expanded": "false",
      "aria-controls": "collapseOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-title"
  }, [_vm._v("Publicar en LinkedIn\n                "), _c('i', {
    staticClass: "material-icons collapse-icon"
  }, [_vm._v("keyboard_arrow_down")])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-note-message"
  }, [_c('strong', [_vm._v("Nota: ")]), _vm._v("\n                El nombre y enlace de la posición se agregara automaticamente al final del texto\n              ")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row bottom-row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "row-info"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticStyle: {
      "padding-top": "30px"
    }
  }, [_c('a', {
    staticClass: "btn btn-warning",
    attrs: {
      "href": "/positions"
    }
  }, [_vm._v("Regresar")])])])])
}]}

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0, false, false)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('div', {
    staticClass: "panel panel-default",
    attrs: {
      "id": "loading"
    }
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    attrs: {
      "id": "loading-container"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(123)
    }
  }), _vm._v("\n        Procesando por favor espere...\n      ")])])])])
}]}

/***/ }),

/***/ 591:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('toolbar'), _vm._v(" "), _c('div', {
    staticClass: "section-header"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('h1', {
    staticClass: "header-title wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v("Correos electrónicos automatizados")]), _vm._v(" "), _c('span', {
    staticClass: "header-title-message wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v("Posición " + _vm._s(_vm.position.name))])])])])]), _vm._v(" "), _c('div', {
    staticClass: "mdl-tabs mdl-js-tabs mdl-js-ripple-effect"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "mdl-tabs__panel is-active",
    attrs: {
      "id": "regards-template"
    }
  }, [_c('email-control-template', {
    attrs: {
      "position_id": _vm.position_id,
      "type_prop": 'in_process'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "mdl-tabs__panel",
    attrs: {
      "id": "reject-template"
    }
  }, [_c('email-control-template', {
    attrs: {
      "position_id": _vm.position_id,
      "type_prop": 'reject'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "mdl-tabs__panel",
    attrs: {
      "id": "call-template"
    }
  }, [_c('email-control-template', {
    attrs: {
      "position_id": _vm.position_id,
      "type_prop": 'scheduled_call'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "mdl-tabs__panel",
    attrs: {
      "id": "interview-template"
    }
  }, [_c('email-control-template', {
    attrs: {
      "position_id": _vm.position_id,
      "type_prop": 'scheduled_interview'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "mdl-tabs__panel",
    attrs: {
      "id": "approved-template"
    }
  }, [_c('email-control-template', {
    attrs: {
      "position_id": _vm.position_id,
      "type_prop": 'approved'
    }
  })], 1)])]), _vm._v(" "), _vm._m(1, false, false)])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "email-tabs-container"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "mdl-tabs__tab-bar"
  }, [_c('a', {
    staticClass: "mdl-tabs__tab is-active",
    attrs: {
      "href": "#regards-template"
    }
  }, [_vm._v("Agradecer solicitud")]), _vm._v(" "), _c('a', {
    staticClass: "mdl-tabs__tab",
    attrs: {
      "href": "#reject-template"
    }
  }, [_vm._v("Rechazar candidato")]), _vm._v(" "), _c('a', {
    staticClass: "mdl-tabs__tab",
    attrs: {
      "href": "#call-template"
    }
  }, [_vm._v("Invitar candidato a llamada")]), _vm._v(" "), _c('a', {
    staticClass: "mdl-tabs__tab",
    attrs: {
      "href": "#interview-template"
    }
  }, [_vm._v("Invitar candidato a entrevista")]), _vm._v(" "), _c('a', {
    staticClass: "mdl-tabs__tab",
    attrs: {
      "href": "#approved-template"
    }
  }, [_vm._v("Contratado")])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-success",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "tempalteSaved",
      "role": "alert"
    }
  }, [_c('strong', [_c('i', {
    staticClass: "glyphicon glyphicon-exclamation-sign"
  }), _vm._v(" Plantilla Guardada")]), _vm._v(" "), _c('p')])
}]}

/***/ }),

/***/ 592:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('toolbar'), _vm._v(" "), _c('div', {
    staticClass: "body-container"
  }, [_c('div', {
    staticClass: "section-header"
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [(_vm.id === null) ? _c('h1', {
    staticClass: "header-title wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v("Crear nueva posición")]) : _vm._e(), _vm._v(" "), (_vm.id !== null) ? _c('h1', {
    staticClass: "header-title wow fadeInLeft",
    attrs: {
      "data-wow-delay": "0.4s",
      "data-wow-duration": "1.2s"
    }
  }, [_vm._v("Editar posición")]) : _vm._e()])])])]), _vm._v(" "), _c('div', {
    staticClass: "create-buttons-bar-container"
  }, [_c('div', {
    staticClass: "create-buttons-bar",
    attrs: {
      "id": "create-buttons-bar"
    }
  }, [_c('div', {
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-1 col-xs-10"
  }, [_c('div', {
    staticClass: "buttons-container"
  }, [_c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-success",
    attrs: {
      "target": "_blank",
      "id": "preview-button"
    },
    on: {
      "click": function($event) {
        _vm.preview(_vm.$v)
      }
    }
  }, [_vm._v("Vista previa")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-warning",
    attrs: {
      "id": "submit"
    },
    on: {
      "click": function($event) {
        _vm.save(_vm.$v)
      }
    }
  }, [_vm._v("Guardar")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-warning",
    attrs: {
      "id": "publish"
    },
    on: {
      "click": function($event) {
        _vm.set_status_position('publish')
      }
    }
  }, [_vm._v("Publicar")]), _vm._v(" "), _c('button', {
    staticClass: "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent btn-action is-error",
    on: {
      "click": function($event) {
        _vm.exit()
      }
    }
  }, [_vm._v("Cancelar y salir")])]), _vm._v(" "), _vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "alert alert-success",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-success",
      "role": "alert"
    }
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "general-container",
    attrs: {
      "id": "create-form-container"
    }
  }, [_c('div', {
    staticClass: "create-form"
  }, [_c('div', {
    staticClass: "collapse-group",
    attrs: {
      "role": "tablist",
      "aria-multiselectable": "true"
    }
  }, [_vm._m(1, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse in",
    attrs: {
      "id": "general-info",
      "role": "tabpanel",
      "aria-labelledby": "headingOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-4"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label",
    class: {
      'has-error': _vm.$v.name.$error
    }
  }, [_c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "id": "name_label",
      "for": "name"
    }
  }, [_vm._v("Nombre de la posición *")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.name),
      expression: "name"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "id": "name",
      "name": "name"
    },
    domProps: {
      "value": (_vm.name)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.name = $event.target.value
      }, _vm.$v.name.$touch]
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Este campo no puede estar en blanco")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-4"
  }, [_c('div', {
    staticClass: "mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label"
  }, [_c('multiselect', {
    attrs: {
      "id": "department_create",
      "options": _vm.department_list,
      "tag-placeholder": "Agregar departamento",
      "placeholder": "Buscar o agregar departamento",
      "label": "name",
      "multiple": false,
      "hide-selected": true,
      "track-by": "name",
      "taggable": true
    },
    on: {
      "input": _vm.onChange,
      "tag": _vm.add_department
    },
    model: {
      value: (_vm.department),
      callback: function($$v) {
        _vm.department = $$v
      },
      expression: "department"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-4"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
  }, [_c('vue-google-autocomplete', {
    staticClass: "mdl-textfield__input",
    attrs: {
      "id": "cities",
      "name": "cities",
      "placeholder": "Buscar Lugar de trabajo",
      "type": "text",
      "types": "geocode"
    },
    on: {
      "placechanged": _vm.getAddressData
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
  }, [(_vm.city.length > 0 && _vm.city[0] !== '' && _vm.city[0] !== null) ? _c('div', [_c('table', {
    staticClass: "table",
    attrs: {
      "id": "cities_table"
    }
  }, [_vm._m(2, false, false), _vm._v(" "), _c('tbody', _vm._l((_vm.city), function(item, index) {
    return _c('tr', [(item !== '' && item !== null) ? _c('td', [_vm._v(_vm._s(item))]) : _vm._e(), _vm._v(" "), _c('td', [(item !== '' && item !== null) ? _c('button', {
      staticClass: "btn btn-danger btn-xs",
      on: {
        "click": function($event) {
          _vm.remove_city(index)
        }
      }
    }, [_c('i', {
      staticClass: "glyphicon glyphicon-remove"
    })]) : _vm._e()])])
  }))])]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('label', [_vm._v("Descripción")]), _vm._v(" "), _c('quill-editor', {
    ref: "myQuillEditor",
    attrs: {
      "options": {
        placeholder: 'Descripción...'
      }
    },
    model: {
      value: (_vm.description),
      callback: function($$v) {
        _vm.description = $$v
      },
      expression: "description"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-offset-2 col-xs-4"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-textfield--floating-label mdl-js-textfield"
  }, [_c('div', {
    attrs: {
      "id": "date"
    }
  }, [_vm._v("Fecha de caducidad de la oferta *")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "required": "",
      "id": "expiration_date",
      "name": "expiration_date",
      "disabled": _vm.disabled,
      "language": "es",
      "format": "dd/MM/yyyy",
      "input-class": "form-control form__input"
    },
    model: {
      value: (_vm.expiration_date),
      callback: function($$v) {
        _vm.expiration_date = $$v
      },
      expression: "expiration_date"
    }
  })], 1)])])])]), _vm._v(" "), _vm._m(3, false, false), _vm._v(" "), _c('div', {
    staticClass: "collapse-group",
    attrs: {
      "role": "tablist",
      "aria-multiselectable": "true"
    }
  }, [_vm._m(4, false, false), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse in",
    attrs: {
      "id": "abilities",
      "role": "tabpanel",
      "aria-labelledby": "headingTwo"
    }
  }, [_c('div', {
    staticClass: "row abilities"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-4"
  }, [_c('table', {
    staticClass: "table table-striped"
  }, [_c('tbody', [(_vm.filters_education_level.length === 0) ? _c('div', {
    staticClass: "mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.education_level),
      expression: "education_level"
    }],
    staticClass: "mdl-selectfield__select",
    attrs: {
      "id": "abilitiesaux"
    },
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.education_level = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, function($event) {
        _vm.add_education_level()
      }]
    }
  }, [_c('option', {
    attrs: {
      "value": "",
      "disabled": "",
      "selected": "",
      "hidden": ""
    }
  }, [_vm._v("Grado academico...")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "bachiller"
    }
  }, [_vm._v("Bachiller")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "tecnico"
    }
  }, [_vm._v("Técnico")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "licenciatura"
    }
  }, [_vm._v("Universitario")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "postgrado"
    }
  }, [_vm._v("Post-grado")])]), _vm._v(" "), _c('label', {
    staticClass: "mdl-selectfield__label",
    attrs: {
      "for": "abilitiesaux"
    }
  })]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filters_education_level), function(item) {
    return _c('div', {
      staticClass: "mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.value),
        expression: "item.value"
      }],
      staticClass: "mdl-selectfield__select",
      attrs: {
        "id": "abilitiesaux"
      },
      on: {
        "change": function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.$set(item, "value", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
        }
      }
    }, [_c('option', {
      attrs: {
        "value": "bachiller"
      }
    }, [_vm._v("Bachiller")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "tecnico"
      }
    }, [_vm._v("Técnico")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "licenciatura"
      }
    }, [_vm._v("Universitario")]), _vm._v(" "), _c('option', {
      attrs: {
        "value": "postgrado"
      }
    }, [_vm._v("Post-grado")])]), _vm._v(" "), _c('label', {
      staticClass: "mdl-selectfield__label",
      attrs: {
        "for": "abilitiesaux"
      }
    })])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-3"
  }, [_c('span', {
    staticClass: "static-label"
  }, [_vm._v("Nivel te importancia")]), _vm._v(" "), _vm._l((_vm.filters_education_level), function(item) {
    return _c('div', {
      staticClass: "check-level-container"
    }, [_c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "0",
        "autocomplete": "off",
        "id": "check-level-10",
        "name": "check-level-04"
      },
      domProps: {
        "checked": _vm._q(item.importance, "0")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "0")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 0 ? 'active' : ''
      },
      attrs: {
        "for": "check-level-10"
      }
    }, [_vm._v(" Baja ")])]), _vm._v(" "), _c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "1",
        "autocomplete": "off",
        "id": "check-level-11",
        "name": "check-level-04"
      },
      domProps: {
        "checked": _vm._q(item.importance, "1")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "1")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 1 ? 'active' : ''
      },
      attrs: {
        "for": "check-level-11"
      }
    }, [_vm._v(" Media ")])]), _vm._v(" "), _c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "2",
        "autocomplete": "off",
        "id": "check-level-12",
        "name": "check-level-04"
      },
      domProps: {
        "checked": _vm._q(item.importance, "2")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "2")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 2 ? 'active' : ''
      },
      attrs: {
        "for": "check-level-12"
      }
    }, [_vm._v(" Alta ")])])])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "row abilities"
  }, [(_vm.filters_experience_years.length === 0) ? _c('div', {
    staticClass: "col-xs-offset-2 col-xs-4"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
  }, [_c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "id": "years_label",
      "for": "abilities05"
    }
  }, [_vm._v("Años de experiencia minimos")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.experience_years_min),
      expression: "experience_years_min"
    }],
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "id": "info04",
      "name": "abilities05"
    },
    domProps: {
      "value": (_vm.experience_years_min)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.experience_years_min = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Digite un numero valido de años de experiencia minimos")])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filters_experience_years), function(item) {
    return _c('div', {
      staticClass: "col-xs-offset-2 col-xs-4"
    }, [_c('div', {
      staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
    }, [_c('input', {
      staticClass: "mdl-textfield__input",
      attrs: {
        "type": "text",
        "id": "info04",
        "name": "abilities04"
      },
      domProps: {
        "value": item.value.split('-')[0]
      },
      on: {
        "change": function($event) {
          _vm.set_experience_years(item, $event)
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "mdl-textfield__error"
    }, [_vm._v("Error message")])])])
  }), _vm._v(" "), (_vm.filters_experience_years.length === 0) ? _c('div', {
    staticClass: "col-xs-3"
  }, [_c('div', {
    staticClass: "check-level-container"
  }, [_c('div', {
    staticClass: "check-level-item"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": function($event) {
        _vm.add_experience_years()
      }
    }
  }, [_vm._v("Incluir")])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "col-xs-3"
  }, _vm._l((_vm.filters_experience_years), function(item) {
    return _c('div', {
      staticClass: "check-level-container"
    }, [_c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "0",
        "autocomplete": "off",
        "id": "check-level-30",
        "name": "check-level-03"
      },
      domProps: {
        "checked": _vm._q(item.importance, "0")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "0")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 0 ? 'active' : ''
      },
      attrs: {
        "for": "check-level-30"
      }
    }, [_vm._v(" Baja ")])]), _vm._v(" "), _c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "1",
        "autocomplete": "off",
        "id": "check-level-31",
        "name": "check-level-03"
      },
      domProps: {
        "checked": _vm._q(item.importance, "1")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "1")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 1 ? 'active' : ''
      },
      attrs: {
        "for": "check-level-31"
      }
    }, [_vm._v(" Media ")])]), _vm._v(" "), _c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "2",
        "autocomplete": "off",
        "id": "check-level-32",
        "name": "check-level-03"
      },
      domProps: {
        "checked": _vm._q(item.importance, "2")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "2")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 2 ? 'active' : ''
      },
      attrs: {
        "for": "check-level-32"
      }
    }, [_vm._v(" Alta ")])])])
  }))], 2), _vm._v(" "), _vm._m(5, false, false), _vm._v(" "), _c('div', {
    staticClass: "row abilities"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-6"
  }, [_c('div', {
    staticClass: "mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label"
  }, [_c('multiselect', {
    attrs: {
      "id": "skills_select",
      "options": _vm.skills_list,
      "tag-placeholder": "Agregar habilidades",
      "placeholder": "Buscar o agregar habilidades",
      "label": "name",
      "multiple": false,
      "hide-selected": true,
      "track-by": "name",
      "taggable": false
    },
    on: {
      "tag": function($event) {}
    },
    model: {
      value: (_vm.skills_info),
      callback: function($$v) {
        _vm.skills_info = $$v
      },
      expression: "skills_info"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-4"
  }, [_c('div', {
    staticClass: "mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label"
  }, [_c('button', {
    staticClass: "btn btn-default",
    on: {
      "click": function($event) {
        _vm.add_skills()
      }
    }
  }, [_vm._v("Incluir")])])])]), _vm._v(" "), _vm._m(6, false, false), _vm._v(" "), _vm._l((_vm.filters_business_skill), function(item, index) {
    return _c('div', {
      staticClass: "row abilities"
    }, [_c('div', {
      staticClass: "col-xs-offset-2 col-xs-4"
    }, [_c('div', {
      staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
    }, [_c('label', {
      staticClass: "form-control",
      attrs: {
        "type": "text"
      }
    }, [_vm._v(_vm._s(item.value))])])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-3"
    }, [_c('div', {
      staticClass: "check-level-container"
    }, [_c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "0",
        "autocomplete": "off",
        "id": 'business_skill' + index + '1',
        "name": 'business_skill' + index + '1'
      },
      domProps: {
        "checked": _vm._q(item.importance, "0")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "0")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 0 ? 'active' : ''
      },
      attrs: {
        "for": 'business_skill' + index + '1'
      }
    }, [_vm._v(" Baja ")])]), _vm._v(" "), _c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "1",
        "autocomplete": "off",
        "id": 'business_skill' + index + '2',
        "name": 'business_skill' + index + '2'
      },
      domProps: {
        "checked": _vm._q(item.importance, "1")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "1")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 1 ? 'active' : ''
      },
      attrs: {
        "for": 'business_skill' + index + '2'
      }
    }, [_vm._v(" Media ")])]), _vm._v(" "), _c('div', {
      staticClass: "check-level-item"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.importance),
        expression: "item.importance"
      }],
      staticClass: "check-level",
      attrs: {
        "type": "radio",
        "value": "2",
        "autocomplete": "off",
        "id": 'business_skill' + index + '3',
        "name": 'business_skill' + index + '3'
      },
      domProps: {
        "checked": _vm._q(item.importance, "2")
      },
      on: {
        "change": function($event) {
          _vm.$set(item, "importance", "2")
        }
      }
    }), _vm._v(" "), _c('label', {
      class: {
        'active': parseInt(item.importance) === 2 ? 'active' : ''
      },
      attrs: {
        "for": 'business_skill' + index + '3'
      }
    }, [_vm._v(" Alta ")])])]), _vm._v(" "), _c('div', {
      staticClass: "row-action-btn remove-btn",
      on: {
        "click": function($event) {
          _vm.remove_skill(index)
        }
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("cancel")]), _vm._v(" "), _c('span', [_vm._v("Eliminar")])])])])
  })], 2)]), _vm._v(" "), _vm._m(7, false, false), _vm._v(" "), (false) ? _c('div', {
    staticClass: "collapse-group",
    attrs: {
      "role": "tablist",
      "aria-multiselectable": "true"
    }
  }, [_vm._m(8, false, false), _vm._v(" "), _vm._m(9, false, false)]) : _vm._e(), _vm._v(" "), _vm._m(10, false, false)])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-error",
      "role": "alert"
    }
  }, [_c('strong', [_c('i', {
    staticClass: "glyphicon glyphicon-exclamation-sign"
  }), _vm._v(" Error")]), _vm._v(" "), _c('p', [_vm._v("Error")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "role": "tab",
      "id": "headingOne"
    }
  }, [_c('a', {
    attrs: {
      "role": "button",
      "data-toggle": "collapse",
      "data-parent": "#accordion",
      "href": "#general-info",
      "aria-expanded": "false",
      "aria-controls": "collapseOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-title"
  }, [_vm._v("Información general\n                    "), _c('i', {
    staticClass: "material-icons collapse-icon"
  }, [_vm._v("keyboard_arrow_down")])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("\n                            Lugar de trabajo\n                          ")]), _vm._v(" "), _c('th', [_vm._v("\n                            Eliminar\n                          ")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "role": "tab",
      "id": "headingTwo"
    }
  }, [_c('a', {
    attrs: {
      "role": "button",
      "data-toggle": "collapse",
      "data-parent": "#accordion",
      "href": "#abilities",
      "aria-expanded": "false",
      "aria-controls": "collapseOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-title"
  }, [_vm._v("Habilidades y experiencia\n                    "), _c('i', {
    staticClass: "material-icons collapse-icon"
  }, [_vm._v("keyboard_arrow_down")])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-7"
  }, [_c('div', {
    staticClass: "separator"
  }), _vm._v(" "), _c('br')])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-offset-2 col-xs-7"
  }, [_c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-error-skills",
      "role": "alert"
    }
  }, [_c('strong', [_c('i', {
    staticClass: "glyphicon glyphicon-exclamation-sign"
  }), _vm._v(" Error")]), _vm._v(" "), _c('p', [_vm._v("Error")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "role": "tab",
      "id": "headingThree"
    }
  }, [_c('a', {
    staticClass: "collapsed",
    attrs: {
      "role": "button",
      "data-toggle": "collapse",
      "data-parent": "#accordion",
      "href": "#questions",
      "aria-expanded": "false",
      "aria-controls": "collapseOne"
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-title"
  }, [_vm._v("Preguntas personalizadas\n                    "), _c('i', {
    staticClass: "material-icons collapse-icon"
  }, [_vm._v("keyboard_arrow_down")])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-collapse collapse create-form-container",
    attrs: {
      "id": "questions",
      "role": "tabpanel",
      "aria-labelledby": "headingThree"
    }
  }, [_c('div', {
    staticClass: "row questions"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-6"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
  }, [_c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "for": "questions01"
    }
  }, [_vm._v("Pregunta 01")]), _vm._v(" "), _c('input', {
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "id": "questions01",
      "name": "questions01"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    staticClass: "row-action-btn remove-btn"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("cancel")]), _vm._v(" "), _c('span', [_vm._v("Eliminar")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row questions"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-6"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
  }, [_c('label', {
    staticClass: "mdl-textfield__label",
    attrs: {
      "for": "questions02"
    }
  }, [_vm._v("Pregunta 02")]), _vm._v(" "), _c('input', {
    staticClass: "mdl-textfield__input",
    attrs: {
      "type": "text",
      "id": "questions02",
      "name": "questions02"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    staticClass: "row-action-btn remove-btn"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("cancel")]), _vm._v(" "), _c('span', [_vm._v("Eliminar")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "add-ability-btn"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("add_circle")]), _vm._v(" "), _c('span', [_vm._v("Agregar pregunta")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "form-subtitle"
  }, [_vm._v("Preguntas preformuladas\n                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "row questions"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-6"
  }, [_c('div', {
    staticClass: "mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label"
  }, [_c('select', {
    staticClass: "mdl-selectfield__select",
    attrs: {
      "id": "questions03"
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "option1"
    }
  }, [_vm._v("Option 1")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "option2"
    }
  }, [_vm._v("Option 2")])]), _vm._v(" "), _c('label', {
    staticClass: "mdl-selectfield__label",
    attrs: {
      "for": "questions03"
    }
  }, [_vm._v("Seleccione tipo de pregunta")]), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__error"
  }, [_vm._v("Error message")])]), _vm._v(" "), _c('div', {
    staticClass: "row-action-btn add-btn"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("add_circle")]), _vm._v(" "), _c('span', [_vm._v("Agregar pregunta")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row questions"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-6"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label read-only"
  }, [_c('label', {
    staticClass: "mdl-textfield__label"
  }, [_vm._v("Pregunta 01")]), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__input"
  }, [_vm._v("Pregunta 01")])]), _vm._v(" "), _c('div', {
    staticClass: "row-action-btn remove-btn"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("cancel")]), _vm._v(" "), _c('span', [_vm._v("Eliminar")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row questions"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-6"
  }, [_c('div', {
    staticClass: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label read-only"
  }, [_c('label', {
    staticClass: "mdl-textfield__label"
  }, [_vm._v("Pregunta 01")]), _vm._v(" "), _c('span', {
    staticClass: "mdl-textfield__input"
  }, [_vm._v("Pregunta 01")])]), _vm._v(" "), _c('div', {
    staticClass: "row-action-btn remove-btn"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("cancel")]), _vm._v(" "), _c('span', [_vm._v("Eliminar")])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-offset-2 col-xs-8"
  }, [_c('div', {
    staticClass: "separator"
  })])])
}]}

/***/ }),

/***/ 593:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('div', {
    attrs: {
      "id": "container-preview"
    }
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body position-panel"
  }, [_c('h3', [_vm._v(_vm._s(_vm.name) + " - " + _vm._s(_vm.city))]), _vm._v(" "), _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty(_vm.description)),
      expression: "isEmpty( description )"
    }]
  }, [_vm._v("Descripción de la posición")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "description_id"
    }
  }), _vm._v(" "), _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty(_vm.candidate_characteristics)),
      expression: "isEmpty( candidate_characteristics )"
    }]
  }, [_vm._v("Características que estamos buscando en un empleado")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "candidate_characteristics_id"
    }
  }), _vm._v(" "), _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty(_vm.work_team_description)),
      expression: "isEmpty( work_team_description )"
    }]
  }, [_vm._v("Informacion adicional sobre la posición")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "work_team_description_id"
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "btn btn-warning",
    on: {
      "click": function($event) {
        _vm.go_back()
      }
    }
  }, [_vm._v("Regresar")])])])])])
},staticRenderFns: []}

/***/ }),

/***/ 594:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('div', {
    attrs: {
      "id": "container-preview"
    }
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body position-panel"
  }, [_c('tooltip', {
    attrs: {
      "text": "Copiar enlace"
    }
  }, [_c('button', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: (_vm.url_position),
      expression: "url_position",
      arg: "copy"
    }],
    staticClass: "btn btn-primary btn-xs",
    attrs: {
      "id": "copy-link"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-link"
  })])]), _vm._v(" "), _c('h3', [_vm._v(_vm._s(_vm.name) + " - " + _vm._s(_vm.city))]), _vm._v(" "), _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty(_vm.description)),
      expression: "isEmpty( description )"
    }]
  }, [_vm._v("Descripción de la posición")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "description_id"
    }
  }), _vm._v(" "), _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty(_vm.candidate_characteristics)),
      expression: "isEmpty( candidate_characteristics )"
    }]
  }, [_vm._v("Características que estamos buscando en un empleado")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "candidate_characteristics_id"
    }
  }), _vm._v(" "), _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isEmpty(_vm.work_team_description)),
      expression: "isEmpty( work_team_description )"
    }]
  }, [_vm._v("Informacion adicional sobre la posición")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "work_team_description_id"
    }
  }), _vm._v(" "), _c('application-form', {
    attrs: {
      "position": _vm.id,
      "status": _vm.status_type
    }
  })], 1)])])])
},staticRenderFns: []}

/***/ }),

/***/ 595:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('toolbar'), _vm._v(" "), _c('div', {
    staticClass: "body-container"
  }, [_c('layout-header', {
    attrs: {
      "title": _vm.position.name
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.make_visible()),
      expression: "!make_visible()"
    }],
    staticClass: "general-container"
  }, [_vm._v("\n        No hay candidatos para esta oferta\n      ")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.make_visible()),
      expression: "make_visible()"
    }],
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "result-status-container"
  }, [_c('div', {
    staticClass: "results-status-number"
  }, [_vm._v(_vm._s(_vm.applicants.length) + " de " + _vm._s(_vm.applicants.length))]), _vm._v(" "), _c('div', {
    staticClass: "results-status-message"
  }, [_vm._v("Candidatos activos que concuerdan con tus requisitos mínimos")])])])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.make_visible()),
      expression: "make_visible()"
    }],
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "offer-header-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
    staticClass: "col-xs-3"
  }, [_c('p', {
    staticClass: "header-title",
    attrs: {
      "id": "first_name"
    },
    on: {
      "click": function($event) {
        _vm.changeOrder($event.target.id)
      }
    }
  }, [_vm._v("\n                Nombre\n              ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    staticClass: "header-title",
    attrs: {
      "id": "created_at"
    },
    on: {
      "click": function($event) {
        _vm.changeOrder($event.target.id)
      }
    }
  }, [_vm._v("\n                Fecha de solicitud\n              ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    staticClass: "header-title",
    attrs: {
      "id": "status_application"
    },
    on: {
      "click": function($event) {
        _vm.changeOrder($event.target.id)
      }
    }
  }, [_vm._v("\n                Status\n              ")])]), _vm._v(" "), _vm._m(1, false, false), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  })])]), _vm._v(" "), _vm._l((_vm.applicants), function(item) {
    return _c('div', {
      staticClass: "applicant-row-container"
    }, [_c('div', {
      staticClass: "row top-row"
    }, [_vm._m(2, true, false), _vm._v(" "), _c('div', {
      staticClass: "col-xs-3"
    }, [_c('a', {
      staticClass: "row-info row-name-link",
      on: {
        "click": function($event) {
          _vm.go_to(item.applicant_id, item.id)
        }
      }
    }, [_vm._v("\n                " + _vm._s(item.applicant_first_name) + " " + _vm._s(item.applicant_last_name) + "\n              ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n                " + _vm._s(item.created_at.substring(0, 10)) + "\n              ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n                " + _vm._s(_vm.get_applicants_status(item.status_application)) + "\n              ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('div', {
      staticClass: "row-compatibility",
      attrs: {
        "id": 'id-' + item.applicant_id
      }
    }, [_c('p', {
      attrs: {
        "id": 'label-' + item.applicant_id
      }
    }, [_vm._v("Sin Parsear")]), _vm._v(" "), _c('div', {
      staticClass: "compatibility-container"
    }, [_c('div', {
      staticClass: "compatibility-level"
    }, [_vm._v(_vm._s(_vm.getDocuments(item.applicant_id)))])])])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('div', {
      staticClass: "dropdown actions-dropdown"
    }, [_vm._m(3, true, false), _vm._v(" "), _c('ul', {
      staticClass: "dropdown-menu",
      attrs: {
        "aria-labelledby": "dLabel"
      }
    }, [_c('li', {
      on: {
        "click": function($event) {
          _vm.go_to(item.applicant_id, item.id)
        }
      }
    }, [_vm._v("Ver detalle")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.set_status_application(item.id, 'scheduled_call')
        }
      }
    }, [_vm._v("Invitar a entrevista telefonica")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.set_status_application(item.id, 'scheduled_interview')
        }
      }
    }, [_vm._v("Invitar a entrevista presencial")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.set_status_application(item.id, 'approved')
        }
      }
    }, [_vm._v("Marcar como contratado")]), _vm._v(" "), _c('li', {
      staticClass: "is-negative",
      on: {
        "click": function($event) {
          _vm.set_status_application(item.id, 'rejection')
        }
      }
    }, [_vm._v("Rechazar candidato")])])])])]), _vm._v(" "), _vm._m(4, true, false)])
  }), _vm._v(" "), _c('a', {
    staticClass: "btn btn-warning",
    attrs: {
      "href": "/positions"
    }
  }, [_vm._v("Regresar")])], 2)], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    staticClass: "header-title"
  }, [_vm._v("\n                Favoritos\n              ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    staticClass: "header-title"
  }, [_vm._v("\n                Compatibilidad\n              ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-1"
  }, [_c('div', {
    staticClass: "row-bookmark is-active"
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("thumb_up")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    attrs: {
      "id": "dLabel",
      "type": "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }, [_vm._v("\n                  Acciones\n                  "), _c('i', {
    staticClass: "material-icons"
  }, [_vm._v("keyboard_arrow_down")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "row bottom-row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "row-info"
  })])])
}]}

/***/ }),

/***/ 596:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "general-container"
    }
  }, [_c('toolbar'), _vm._v(" "), _c('div', {
    staticClass: "body-container"
  }, [_c('layout-header', {
    attrs: {
      "title": "Panel de ofertas laborales"
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.make_visible()),
      expression: "!make_visible()"
    }],
    staticClass: "general-container"
  }, [_vm._m(0, false, false)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.make_visible()),
      expression: "!make_visible()"
    }],
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "right-side"
  }, [_c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isLoggedIn()),
      expression: "isLoggedIn()"
    }],
    staticClass: "btn btn-success",
    on: {
      "click": function($event) {
        _vm.go_to('/position')
      }
    }
  }, [_c('i', {
    staticClass: "material-icons"
  }, [_vm._v("note_add")]), _vm._v("Crear posición\n        ")])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.make_visible()),
      expression: "make_visible()"
    }],
    staticClass: "general-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "result-status-container"
  }, [_c('div', {
    staticClass: "results-status-number"
  }, [_vm._v(_vm._s(_vm.positions.length))]), _vm._v(" "), _c('div', {
    staticClass: "results-status-message"
  }, [_vm._v("Ofertas laborales actualmente abiertas")])])])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.make_visible()),
      expression: "make_visible()"
    }],
    staticClass: "general-container"
  }, [_vm._m(1, false, false), _vm._v(" "), _c('div', {
    staticClass: "offer-header-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible_tittle('position_number')),
      expression: "visible_tittle('position_number')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "position_number"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              ID▼\n            ")]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.visible_tittle('position_number')),
      expression: "!visible_tittle('position_number')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "position_number"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              ID▲\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible_tittle('name')),
      expression: "visible_tittle('name')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "name"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Posición▼\n            ")]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.visible_tittle('name')),
      expression: "!visible_tittle('name')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "name"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Posición▲\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible_tittle('city')),
      expression: "visible_tittle('city')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "city"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Ubicación▼\n            ")]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.visible_tittle('city')),
      expression: "!visible_tittle('city')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "city"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Ubicación▲\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible_tittle('created_at')),
      expression: "visible_tittle('created_at')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "created_at"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Fecha de creación▼\n            ")]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.visible_tittle('created_at')),
      expression: "!visible_tittle('created_at')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "created_at"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Fecha de creación▲\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible_tittle('publication_date')),
      expression: "visible_tittle('publication_date')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "publication_date"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Fecha de publicación▼\n            ")]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.visible_tittle('publication_date')),
      expression: "!visible_tittle('publication_date')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "publication_date"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Fecha de publicación▲\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible_tittle('status')),
      expression: "visible_tittle('status')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "status"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Estatus de solicitud▼\n            ")]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.visible_tittle('status')),
      expression: "!visible_tittle('status')"
    }],
    staticClass: "header-title",
    attrs: {
      "id": "status"
    },
    on: {
      "click": function($event) {
        _vm.change_order($event.target.id)
      }
    }
  }, [_vm._v("\n              Estatus de solicitud▲\n            ")])]), _vm._v(" "), _vm._m(2, false, false), _vm._v(" "), _vm._m(3, false, false), _vm._v(" "), _c('div', {
    staticClass: "col-xs-2"
  })])]), _vm._v(" "), _vm._l((_vm.positions), function(item) {
    return _c('div', {
      staticClass: "offer-row-container"
    }, [_c('div', {
      staticClass: "row"
    }, [_c('div', {
      staticClass: "col-xs-1"
    }, [_c('p', {
      staticClass: "row-info row-title"
    }, [_vm._v("\n              " + _vm._s(item.position_number) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('a', {
      staticClass: "row-info row-title-link",
      attrs: {
        "href": 'applicants/' + item.id
      }
    }, [_vm._v("\n              " + _vm._s(item.name) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n              " + _vm._s(item.city) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-1"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n              " + _vm._s(item.created_at.substring(0, 10)) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-1"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n              " + _vm._s(item.status_type !== "publish" ? "Sin Publicar" : item.publication_date_str.substring(0, 16)) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-1"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n              " + _vm._s(_vm.get_status(item.status_type)) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-1"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n              " + _vm._s(item.applicants_number) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-1"
    }, [_c('p', {
      staticClass: "row-info row-text"
    }, [_vm._v("\n              " + _vm._s(item.applicants_number) + "\n            ")])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-2"
    }, [_c('div', {
      staticClass: "dropdown actions-dropdown"
    }, [_vm._m(4, true, false), _vm._v(" "), _c('ul', {
      staticClass: "dropdown-menu",
      attrs: {
        "aria-labelledby": "dLabel"
      }
    }, [_c('li', {
      on: {
        "click": function($event) {
          _vm.go_to('/position?id=' + item.id)
        }
      }
    }, [_vm._v("Editar y Publicar Posición")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.go_to('/position-preview/' + item.id)
        }
      }
    }, [_vm._v("Vista Previa")]), _vm._v(" "), _c('li', {
      directives: [{
        name: "clipboard",
        rawName: "v-clipboard:copy",
        value: (_vm.copy_to_clipboard(item.id)),
        expression: "copy_to_clipboard(item.id)",
        arg: "copy"
      }],
      on: {
        "click": function($event) {
          _vm.copy_now()
        }
      }
    }, [_vm._v("Copiar Enlace de Posición")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.go_to('/applicants/' + item.id)
        }
      }
    }, [_vm._v("Ver Candidatos")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.go_to('/email-templates/' + item.id)
        }
      }
    }, [_vm._v("Editar Plantilla de Correos a Candidatos")]), _vm._v(" "), _c('li', {
      on: {
        "click": function($event) {
          _vm.go_to('/social-position/' + item.id)
        }
      }
    }, [_vm._v("Publicar en Redes Sociales")]), _vm._v(" "), _c('li', {
      staticClass: "is-negative",
      on: {
        "click": function($event) {
          _vm.set_status_position(item.id, 'closed')
        }
      }
    }, [_vm._v("Cerrar Posición")])])])])])])
  })], 2), _vm._v(" "), _c('modal', {
    attrs: {
      "footer": false,
      "title": "Estado de Posición"
    },
    model: {
      value: (_vm.publish_problem),
      callback: function($$v) {
        _vm.publish_problem = $$v
      },
      expression: "publish_problem"
    }
  }, [_c('p', [_vm._v("No se puede publicar la posición ya que la fecha de vencimiento es menor a la fecha actual.")])])], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "result-status-container"
  }, [_c('div', {
    staticClass: "results-status-message"
  }, [_vm._v("Crea una nueva oferta laboral")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-success",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "copy_link",
      "role": "alert"
    }
  }, [_c('strong', [_c('i', {
    staticClass: "glyphicon glyphicon-exclamation-sign"
  }), _vm._v(" Link Copiado")]), _vm._v(" "), _c('p')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    staticClass: "header-title"
  }, [_vm._v("\n              Solicitudes recibidas▼\n            ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-xs-1"
  }, [_c('p', {
    staticClass: "header-title"
  }, [_vm._v("\n              Candidatos activos▼\n            ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    attrs: {
      "id": "dLabel",
      "type": "button",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }
  }, [_vm._v("\n                Acciones\n                "), _c('i', {
    staticClass: "material-icons"
  }, [_vm._v("keyboard_arrow_down")])])
}]}

/***/ }),

/***/ 597:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._v("Enviar solicitud a esta posición")]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_vm._m(0, false, false), _vm._v(" "), _vm._m(1, false, false), _vm._v(" "), _vm._m(2, false, false), _vm._v(" "), _c('div', {
    staticClass: "form form-horizontal"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.email.$error
    }
  }, [_c('label', {
    staticClass: "col-sm-2 control-label"
  }, [_vm._v("Correo Electrónico *")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "email"
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }, _vm.$v.email.$touch]
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.first_name.$error
    }
  }, [_c('label', {
    staticClass: "col-sm-2 control-label"
  }, [_vm._v("Nombre *")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.first_name),
      expression: "first_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "first_name"
    },
    domProps: {
      "value": (_vm.first_name)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.first_name = $event.target.value
      }, _vm.$v.first_name.$touch]
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.$v.last_name.$error
    }
  }, [_c('label', {
    staticClass: "col-sm-2 control-label"
  }, [_vm._v("Apellido *")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.last_name),
      expression: "last_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "last_name"
    },
    domProps: {
      "value": (_vm.last_name)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.last_name = $event.target.value
      }, _vm.$v.last_name.$touch]
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-sm-2 control-label"
  }, [_vm._v("Teléfono")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phone_number),
      expression: "phone_number"
    }],
    staticClass: "form-control",
    attrs: {
      "placeholder": "Ie. +1 541 754 3010",
      "type": "text",
      "id": "phone_number"
    },
    domProps: {
      "value": (_vm.phone_number)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phone_number = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('legend')]), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "exampleInputEmail1"
    }
  }, [_vm._v("Perfil de LinkedIn (opcional)")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.linkedin_user),
      expression: "linkedin_user"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "linkedin_user"
    },
    domProps: {
      "value": (_vm.linkedin_user)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.linkedin_user = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "exampleInputEmail1"
    }
  }, [_vm._v("Usuario de Twitter (opcional)")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.twitter_user),
      expression: "twitter_user"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "twitter_user"
    },
    domProps: {
      "value": (_vm.twitter_user)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.twitter_user = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form form-horizontal"
  }, [_c('legend', [_vm._v("Los archivos que se adjunten deben ser PDF con maximo 7mb")]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-sm-2 control-label"
  }, [_vm._v("Curriculum Vitae")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "file",
      "id": "name"
    },
    on: {
      "change": function($event) {
        _vm.set_files('curriculum_vitae', $event)
      }
    }
  })])]), _vm._v(" "), _vm._m(3, false, false), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "col-sm-2 control-label"
  }, [_vm._v("Carta de presentación")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "file",
      "id": "name"
    },
    on: {
      "change": function($event) {
        _vm.set_files('presentation_letter', $event)
      }
    }
  })])]), _vm._v(" "), _vm._m(4, false, false)]), _vm._v(" "), _c('div', {
    staticClass: "form",
    staticStyle: {
      "display": "none"
    }
  }, [_c('legend'), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    on: {
      "click": function($event) {
        _vm.post(_vm.$v)
      }
    }
  }, [_vm._v("Enviar Solicitud")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br')]), _vm._v(" "), _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-error"
    }
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-success",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-ok"
  }), _vm._v(" "), _c('strong', [_vm._v("Proceso finalizado")]), _vm._v(" "), _c('p', [_vm._v("Se ha enviado tu solicitud de aplicante para la posición actual.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-warning",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-ok"
  }), _vm._v(" "), _c('strong', [_vm._v("Formulario no disponible")]), _vm._v(" "), _c('p', [_vm._v("No es posible aplicar a la posición actual.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-info",
    staticStyle: {
      "display": "none"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-ok"
  }), _vm._v(" "), _c('strong', [_vm._v("Candidato Existente!")]), _vm._v(" "), _c('p', [_vm._v("Existe un candidato registrado con ese correo")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-error1"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-ok"
  }), _vm._v(" "), _c('strong', [_vm._v("Ops!")]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "error_message"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert alert-danger",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "alert-error2"
    }
  }, [_c('i', {
    staticClass: "glyphicon glyphicon-ok"
  }), _vm._v(" "), _c('strong', [_vm._v("Ops!")]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "error_message"
    }
  })])
}]}

/***/ }),

/***/ 598:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ })

},[470]);
//# sourceMappingURL=app.01369d6cc81437f6d9ac.js.map