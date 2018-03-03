// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
 require(`quasar/dist/quasar.ie`)
 require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'

import CvGlobDep from 'crudvuel-tools/src/CvGlobDep';
import CvEnv from 'crudvuel/customs/CvEnv';
import CvPassport from 'crudvuel/customs/network/CvPassport';
import CvComunicator from 'crudvuel/customs/network/CvComunicator';

import Router from './Router'
import store from './store'
//import CrudvuelTools from 'crudvuel-tools' //loaded from npm as external dependency
import CrudvuelTools from 'crudvuel-tools/src/CrudvuelTools' //loaded from npm as external dependency
import GeneralServices from './services/general'
import users from './resource-definitions/users'
import roles from './resource-definitions/roles'
import permissions from './resource-definitions/permissions'
import exlists from './resource-definitions/exLists'
import exItems from './resource-definitions/exItems'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(CrudvuelTools)

var router    = new Router();
var cvGlobDep = new CvGlobDep()
cvGlobDep.add(CvEnv,"CvEnv",new CvEnv())
cvGlobDep.add(CvPassport,"CvPassport",new CvPassport(cvGlobDep.globals))
cvGlobDep.add(CvComunicator,"CvComunicator",new CvComunicator(router,cvGlobDep.globals))
let generalServices = new GeneralServices(cvGlobDep.globals);

var resources={
  "users":users(cvGlobDep.globals),
  "roles":roles(cvGlobDep.globals),
  "permissions":permissions(cvGlobDep.globals),
  "exlists":exlists(cvGlobDep.globals),
  "exItems":exItems(cvGlobDep.globals),
}

resources.exlists.addChild(resources.exItems);
router.setResources(resources);
router.loadVueRouter();
router.linkServices(cvGlobDep.globals.cvComunicator)
router.loadPassportRules(cvGlobDep.globals.cvPassport)

//include methods that then will be available in every component
Vue.mixin({
  data:function(){
    return {
      cvGlobDep,
      services:cvGlobDep.globals.cvComunicator.resources,
      resources:resources,
      isMobile:typeof this.$q.platform.is.mobile!=="undefined" && this.$q.platform.is.mobile
    }
  },
  methods: {
  },
});

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'
import 'assets/styles.scss'
//console.log(router.VueRouter.options.routes[0].children[14].children)
Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router:router.VueRouter,
    render: h => h(require('./App').default)
  })
})
