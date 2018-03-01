<template>
  <!-- Configure "view" prop for QLayout L,l,F,f|H,h|R,r,H,h - L,l|P,p|R,r - L,l,F,f|F,f|R,r,F,f -->
  <q-layout 
    ref="layout"
    view="HHr LpR fff"
  >
    <q-toolbar slot="header">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Prototipo
      </q-toolbar-title>    
      <q-btn flat>
        <q-icon name="account_box" />
      </q-btn>
    </q-toolbar>

    <!-- Left Side Panel-->
    <div slot="left">
      <div v-for="(resourceName, resourcePosition) in menuResources" >   
        <q-collapsible 
          indent v-bind:label="resources[resourceName].rowsLabel" 
          closed v-bind:icon="resources[resourceName].icon"> 
          <q-side-link  
            v-if="resources[resourceName].actions.index"  
            v-bind:to="'/'+(resources[resourceName].actions.index.path || resources[resourceName].name)" >
            <span>
              <q-icon 
                v-bind:name="resources[resourceName].actions.index.icon || 'list'" />
                {{resources[resourceName].actions.index.label || resources[resourceName].listLabel}}
            </span>
          </q-side-link>  
        </q-collapsible>
      </div>
    </div>

    <transition name="component-fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>

    <q-toolbar slot="footer">
      <q-toolbar-title>
        Footer
      </q-toolbar-title>
    </q-toolbar>
    <!-- Footer
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
    -->
    <q-modal
      @open="notify('open')"
      @escape-key="notify('escape-key')"
      @close="notify('close')"
    >
      ...
    </q-modal>
  </q-layout>
</template>

<script>

import {
  QBtn,
  QIcon,
  QModal,
  QItemMain,
  QItemSide,
  QLayout,
  QSideLink,
  QToolbar,
  QToolbarTitle,
  QCollapsible ,
} from 'quasar'

export default {
  name:"skeleton",
  components: {
  QModal,
    QCollapsible ,
    QBtn,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QIcon,
    QItemMain,
    QItemSide,
    QSideLink,
  },
  data () {
    return {
      menuResources:[
        "users",
        "roles",
        "permissions",
        "exlists",
      ]
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss">
.q-collapsible-sub-item .relative-position{
  cursor:pointer !important;
  &:hover{
    background-color:#CCCCCC;
  }
}
</style>
