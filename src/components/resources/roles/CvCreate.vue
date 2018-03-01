<template>
  <cv-base-crud
    v-if="resource && action && row && permissions"
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
    <q-field
      class="col-lg-12"
      :error="cvErr(errors,'permissions','boolean')"
      :error-label="cvErr(errors,'permissions')"
    >
      <label for="message-text" class="control-label">Permisos:</label>
      <div 
        v-if="ready && cPermissions && cRelatedPermissions"
      >
        <cv-quasar-relationator 
          :cv-source="permissions" 
          :cv-related="cRelatedPermissions"
          :cv-label-property="'name'" 
          :cv-related-identifier="'permissions'"
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
      cvParams          :null,
      permissions       :null,
      relatedPermissions:null,
    }
  }, 
  computed:{
    cPermissions:function(){
        return this.permissions || []
    },
    cRelatedPermissions:function(){
        return this.relatedPermissions || []
    },
  },
  methods:{
    getSuccess:function(response){
      this.row                = response.data.data || response.data;
      this.relatedPermissions = this.row.permissions;
      this.ready=true;
      if(this.cShowGetMessages)
        this.collectSuccessMessages(this.action.getGetSuccessMessage())
    },
    checkRelated:function(data){
      if(data.cRelatedIdentifier==="permissions")
        this.relatedPermissionsChanged(data)
    },
    relatedPermissionsChanged:function(data){
      this.source = data.source
      this.row.permissions=[]
      for(let i=0; i<data.related.length; i++)
        this.row.permissions.push(data.related[i].id)
    }
  },
  created:function(){
    this.row={active:true}
    this.cvParams = new this.CvParametrizer({
      selectQuery  :["id","name"],
      orderBy      :"id",
      ascending    :1,
    })
    this.ready=false
    this.services.permissions.index(
      (response)=>{ this.permissions = response.data.data || response.data; this.ready=true },
      (response)=>{ this.permissions=[]; this.ready=true },
      null,
      null,
      this.cvParams.getSerialized()
    )
  }
}
</script>