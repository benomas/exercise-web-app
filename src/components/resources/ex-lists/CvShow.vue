<template>
	<cv-base-crud
	    v-if="resource && action"
	    :cv-resource="resource" 
	    :cv-action="action"
	  > 
    <q-field
      class="col-sm-9 col-md-10"
      label="Titulo"
    >
      {{row.title}}
    </q-field>
    <q-field
      class="col-sm-3 col-md-2"
      label="Activo"
    >
    <q-icon 
      v-if="row.active" 
      class="active-icon"
      name="fa-check" 
      color="positive"
      :title="resorceAction('deactivate').label"
    />
    <q-icon 
      v-if="!row.active" 
      class="active-icon"
      name="fa-times-circle" 
      color="negative" 
      :title="resorceAction('activate').label"
    />
    </q-field>
    <div class="col-lg-12 h-50px">
    </div>
    <div class="col-lg-12" v-if="row && row.id">
      <router-view :ex-list-id="row.id">
      </router-view>
    </div>
    <div class="col-lg-12 h-50px">
    </div>
    <div class="col-lg-12">
      <cv-quasar-buttons :cv-ready="ready" @cv-back="cancelAction()" @cv-next="setService()" :cv-action="action">
      </cv-quasar-buttons>
    </div>
	</cv-base-crud>
</template>
<script>
import CvQuasarBaseCrud from 'crudvuel/customs/components/resource/themes/quasar/CvQuasarBaseCrud.vue';
export default {
  extends: CvQuasarBaseCrud,
  created:function(){
    this.ready="true"
    this.row={active:true}
  },
  mounted:function(){
  },
  methods:{
    validator:function(){
      return true;
    }
  },
}
</script>