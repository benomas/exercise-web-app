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
      />
    </q-field>
    <q-field
      class="col-md-12 col-lg-2"
      :error="cvErr(errors,'active','boolean')"
      :error-label="cvErr(errors,'active')"
    >
      <cv-q-toggle v-model="row.active" label="Activo" :left-label="true" />
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
      />
    </q-field>
    <div class="col-lg-12 h-50px">
    </div>
    <div class="col-lg-12">
      <cv-quasar-buttons :cv-ready="ready" @cv-cancel="cancelAction()" @cv-submit="setService()">
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
      /*
      let validateOver = this.action.type;
      this.$v[validateOver].$touch()
      if (this.$v[validateOver].$error) {
        this.errors = this.$v[validateOver].$error
        return false
      }
      */
      return true;
    }
  },
}
</script>