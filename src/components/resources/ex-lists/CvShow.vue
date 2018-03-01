<template>
	<cv-base-crud
    v-if="resource && action"
    :cv-resource="resource" 
    :cv-action="action"
  > 
    <q-field
      class="col-md-6 col-lg-5"
      :error="cvErr(errors,'name','boolean')"
      :error-label="cvErr(errors,'name')"
    >
      <q-input 
        float-label="Nombre"
        suffix="" 
        v-model.trim="row.name"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-6 col-lg-5"
      :error="cvErr(errors,'slug','boolean')"
      :error-label="cvErr(errors,'slug')"
    >
      <q-input 
        float-label="Slug"
        suffix="" 
        v-model.trim="row.slug"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-12 col-lg-2"
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
    <q-field
      class="col-lg-12"
      :error="cvErr(errors,'description','boolean')"
      :error-label="cvErr(errors,'description')"
    >
      <q-input 
        float-label="Descripción"
        suffix="" 
        v-model="row.description"
        type="textarea"
        :max-height="100"
        :min-rows="7"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <div class="col-lg-12 h-50px">
    </div>
    <div class="col-lg-12">
      <cv-quasar-buttons :cv-ready="ready" @cv-back="cancelAction()" @cv-next="setService()" :cv-action="action">
      </cv-quasar-buttons>
    </div>
    <div class="col-lg-12">
      <router-view>
      </router-view>
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