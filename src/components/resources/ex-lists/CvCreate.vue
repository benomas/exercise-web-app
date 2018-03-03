<template>
	<cv-base-crud
    v-if="resource && action"
    :cv-resource="resource" 
    :cv-action="action"
  > 
    <q-field
      class="col-sm-9 col-md-10"
      :error="cvErr(errors,'title','boolean')"
      :error-label="cvErr(errors,'title')"
    >
      <q-input 
        float-label="Titulo"
        suffix="" 
        v-model.trim="row.title"
        clearable
        :readonly="cDisableFields"
        @keydown.enter="setService()"
      />
    </q-field>
    <q-field
      class="col-sm-3 col-md-2"
      :error="cvErr(errors,'active','boolean')"
      :error-label="cvErr(errors,'active')"
    >
      <cv-q-toggle 
        v-model="row.active" 
        label="Activo" 
        :left-label="true" 
        :readonly="cDisableFields"
      />
    </q-field>
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