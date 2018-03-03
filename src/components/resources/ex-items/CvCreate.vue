<template>
  <div 
    class="row action-container" 
  >
    <q-field
      class="col-sm-9 col-md-10"
      :error="cvErr(errors,'value','boolean')"
      :error-label="cvErr(errors,'value')"
    >
      <q-input 
        float-label="Valor"
        suffix="" 
        v-model.trim="row.value"
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
	</div>
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