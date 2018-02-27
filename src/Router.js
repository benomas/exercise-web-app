import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function(){
  this.permitionsObject = [];
  this.resourceRoutes   = [];
  this.resources        = null;
  this.cvPassport       = null;
  this.cvComunicator    = null;
  this.load = (component)=>{
    // '@' is aliased to src/components
    return () => import(`@/${component}.vue`)
  };

  this.setResources=function(resources){
    this.resources = resources;
  }

  this.hasActionPermition = (resource,action)=>{
    if(typeof this.permitionsObject==="undefined")
      return true;

    if(typeof resource==="undefined" || typeof action==="undefined")
      return false;

    return typeof this.permitionsObject[resource]==="undefined" || typeof this.permitionsObject[resource][action]==="undefined" || this.permitionsObject[resource][action];
  };

  this.loadVueRouter=function(globals){ 
    this.VueRouter =  new VueRouter({
      /*
       * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
       * it is only to be used only for websites.
       *
       * If you decide to go with "history" mode, please also open /config/index.js
       * and set "build.publicPath" to something other than an empty string.
       * Example: '/' instead of current ''
       *
       * If switching back to default "hash" mode, don't forget to set the
       * build publicPath back to '' so Cordova builds work again.
       */

      mode: 'hash',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        { 
          path: '/',
          name: 'root',
          component: this.load('Skeleton'),
          children:this.resourceRoutes.concat(
            this.resources["users"].getRoutes(),
            this.resources["roles"].getRoutes(),
            this.resources["permissions"].getRoutes(),
            this.resources["exlists"].getRoutes(),
            this.resources["exItems"].getRoutes(),
          ),
          //children:this.loadresourcesRoutes(),
        },
        { path: '/hello', component: this.load('Hello') },
        { 
          path: '/login', 
          name: 'login',
          component: this.load('Login') 
        },
        { 
          path: '/logout', 
          name: 'logout',
          component: this.load('Login') 
        },

        // Always leave this last one
        { path: '*', component: this.load('Error404') } // Not found
      ]
    });
  }

  this.linkServices=(cvComunicator)=>{
    this.VueRouter.cvComunicator = cvComunicator;
  };

  this.loadPassportRules = (cvPassport)=>{

    if(typeof cvPassport==="undefined" || typeof this.VueRouter==="undefined")
      return false;

    this.VueRouter.cvPassport=cvPassport;

    this.VueRouter.beforeEach((to, from, next)=>{
      if(this.VueRouter.cvPassport.autenticated()){
        if(to.path!=='/login')
          next();
        else
          next('/');
      }
      else{
        if(to.path!=='/login')
          next('/login');
        else
          next();
      }
    });

  };

};
