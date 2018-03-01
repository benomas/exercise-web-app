<template>
    <div class="vertical-bottom absolute-bottom cv-button-container">
      <q-btn 
        v-if="cBackLabel"
        icon="reply" 
        color="negative" 
        small 
        class="float-left on-left" 
        v-on:click="$emit('cv-back')">
        {{cBackLabel}}
      </q-btn>
      <q-btn 
        v-if="cNextLabel"
        icon="edit" 
        color="positive" 
        small 
        class="float-right on-right" 
        v-on:click="$emit('cv-next')" 
        :disabled="!ready">
        {{cNextLabel}}
      </q-btn>
    </div>
</template>
<script>
import {QIcon,QBtn} from 'quasar'
export default {
    components: {
      QBtn,
      QIcon,
    },
    data (){
      return {
        ready:null
      }
    },
    props:[
      "cvReady",
      "cvAction",
    ],
    computed:{
      cReady:function(){
        return this.cvReady || null;
      },
      cAction:function(){
        return this.cvAction || null;
      },
      cBackLabel:function(){
        if(this.cAction)
          return this.cAction.backLabel || null
        return "Cancelar"
      },
      cNextLabel:function(){
        if(this.cAction)
          return this.cAction.nextLabel || null
        return "Guardar"
      },
    },
    created:function(){
    	this.ready=this.cvReady
    }
}
</script>
<style lang="scss">
  .cv-button-container{ 
    padding: 20px;
  }
</style>
