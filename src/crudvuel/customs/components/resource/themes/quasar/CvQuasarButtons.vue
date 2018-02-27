<template>
    <div class="vertical-bottom absolute-bottom cv-button-container">
      <q-btn icon="edit" color="negative" small class="float-left on-left" v-on:click="$emit('cv-cancel')">
        Cancelar
      </q-btn>
      <q-btn icon="edit" color="positive" small class="float-right on-right" v-on:click="$emit('cv-submit')" :disabled="!ready">
        Guardar
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
    ],
    computed:{
      cReady:function(){
        return this.cvReady || null;
      }
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
