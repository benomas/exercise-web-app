<template>
  <cv-base-crud
    v-if="resource && action && row && roles && relatedRoles"
    :cv-resource="resource" 
    :cv-action="action"
  > 
    <q-field
      class="col-md-4 col-lg-4"
      :error="cvErr(errors,'first_name','boolean')"
      :error-label="cvErr(errors,'first_name')"
    >
      <q-input 
        float-label="Nombre:"
        suffix="" 
        v-model.trim="row.first_name"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-4 col-lg-4"
      :error="cvErr(errors,'last_name','boolean')"
      :error-label="cvErr(errors,'last_name')"
    >
      <q-input 
        float-label="Apellido:"
        suffix="" 
        v-model.trim="row.last_name"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-4 col-lg-4"
      :error="cvErr(errors,'username','boolean')"
      :error-label="cvErr(errors,'username')"
    >
      <q-input 
        float-label="Nombre de usuario:"
        suffix="" 
        v-model.trim="row.username"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-4 col-lg-4"
      :error="cvErr(errors,'email','boolean')"
      :error-label="cvErr(errors,'email')"
    >
      <q-input 
        float-label="Correo Electrónico:"
        suffix="" 
        v-model.trim="row.email"
        clearable
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-4 col-lg-4"
      :error="cvErr(errors,'password','boolean')"
      :error-label="cvErr(errors,'password')"
    >
      <q-input 
        float-label="Password:"
        suffix="" 
        v-model.trim="row.password"
        clearable
        type="password"
        :readonly="cDisableFields"
      />
    </q-field>
    <q-field
      class="col-md-12 col-lg-4"
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
      :error="cvErr(errors,'roles','boolean')"
      :error-label="cvErr(errors,'roles')"
    >
      <label for="message-text" class="control-label">Roles:</label>
      <div 
        v-if="ready && cRoles && cRelatedRoles"
      >
        <cv-quasar-relationator 
          :cv-source="cRoles" 
          :cv-related="cRelatedRoles"
          :cv-label-property="'name'" 
          :cv-related-identifier="'roles'"
          @related-changed="checkRelated"
        >
        </cv-quasar-relationator>
      </div>
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
import CvQuasarRelationator from 'crudvuel/customs/components/resource/themes/quasar/CvQuasarRelationator.vue';
export default {
  extends: CvQuasarBaseCrud,
  components:{
    CvQuasarRelationator
  },
  data:function(){
    return {
      cvParams:null,
      roles:null,
      relatedRoles:null,
    }
  }, 
  computed:{
    cRoles:function(){
        return this.roles || []
    },
    cRelatedRoles:function(){
        return this.relatedRoles || []
    },
  },
  methods:{
    getSuccess:function(response){
      this.row          = response.data.data || response.data;
      this.relatedRoles = this.row.roles;
      this.ready=true;
      if(this.cShowGetMessages)
        this.collectSuccessMessages(this.action.getGetSuccessMessage())
    },
    checkRelated:function(data){
      if(data.cRelatedIdentifier==="roles")
        this.relatedRolesChanged(data)
    },
    relatedRolesChanged:function(data){
      this.source = data.source
      this.row.roles=[]
      for(let i=0; i<data.related.length; i++)
        this.row.roles.push(data.related[i].id)
    }
  },
  created:function(){
    this.cvParams = new this.CvParametrizer({
      selectQuery  :["id","name"],
      orderBy      :"id",
      ascending    :1,
    })
    this.ready=false
    this.services.roles.index(
      (response)=>{ this.roles = response.data.data || response.data; this.ready=true },
      (response)=>{ this.roles=[]; this.ready=true },
      null,
      null,
      this.cvParams.getSerialized()
    )
  }
}
</script>