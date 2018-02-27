<template>
	<cv-base-crud
    v-if="resource && action"
    :cv-resource="resource" 
    :cv-action="action"
  > 
    <q-field
      class="col-md-6 col-lg-4"
      :error="errors.name || false"
      :error-label="errors.name"
    >
      <q-input 
        float-label="Nombre"
        suffix="" 
        v-model.trim="row.name"
        clearable
      />
    </q-field>
    <q-field
      class="col-md-6 col-lg-4"
      :error="errors.slug || false"
      :error-label="errors.slug"
    >
      <q-input 
        float-label="Slug"
        suffix="" 
        v-model.trim="row.slug"
        clearable
      />
    </q-field>
    <q-field
      class="col-md-12 col-lg-4"
      :error="errors.active || false"
      :error-label="errors.active"
    >
      <cv-q-toggle v-model="row.active" label="Activo" :left-label="true" />
    </q-field>
    <q-field
      class="col-lg-12"
      :error="errors.description || false"
      :error-label="errors.description"
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