<template>
  <cv-base-crud
    v-if="resource && action"
    :cv-resource="resource" 
    :cv-action="action"
  > 
		<div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <cv-error-wraper :cv-error="errors.first_name">
            <label for="message-text" class="control-label">Nombre:</label>
            <input type="text" class="form-control" id="first_name" name="first_name" autocomplete="off" v-model="row.first_name">
        </cv-error-wraper>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <cv-error-wraper :cv-error="errors.last_name">
            <label for="message-text" class="control-label">Apellido:</label>
            <input type="text" class="form-control" id="last_name" name="last_name" autocomplete="off" v-model="row.last_name">
        </cv-error-wraper>
      </div>
	    </div>
	    <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <cv-error-wraper :cv-error="errors.username">
              <label for="recipient-name" class="control-label">Nombre de usuario:</label>
              <input type="text" class="form-control" id="username" name="username" v-model="row.username">
          </cv-error-wraper>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <cv-error-wraper :cv-error="errors.email">
              <label for="recipient-name" class="control-label">Correo Electrónico:</label>
              <input type="text" class="form-control" id="email" name="email" v-model="row.email">
          </cv-error-wraper>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            
          <cv-error-wraper :cv-error="errors.password">
              <label for="recipient-name" class="control-label">Password:</label>
              <input type="password" class="form-control" id="password" name="password" set-empty v-model="row.password">
          </cv-error-wraper>
        </div>
	    </div>
        <cv-error-wraper :cv-error="errors.roles">
	        <label for="message-text" class="control-label">Roles:</label>
	        <div 
	        	v-if="(cRoles && cRoles.length) || (cRelatedRoles  && cRelatedRoles.length)"
	       	>
		        <cv-relationator 
		        	:cv-source="roles" 
		        	:cv-related="cRelatedRoles"
		        	:cv-label-property="'name'" 
		        	:cv-related-identifier="'roles'"
		        	@related-changed="checkRelated"
		        >
		        </cv-relationator>
		    </div>
	    </cv-error-wraper>
        <cv-error-wraper :cv-error="errors.active">
	        <label for="message-text" class="control-label">Activo:</label>
	        Si:<input type="radio" name="active" value="1" v-model="row.active">
	        No:<input type="radio" name="active" value="0" v-model="row.active">
	    </cv-error-wraper>
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
  data:function(){
    return {
      params:null,
      roles:null,
      relatedRoles:[],
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
    this.row={}
    this.cvParams = new this.CvParametrizer({
      selectQuery  :["id","name"],
      orderBy      :"id",
      ascending    :1,
    })
    this.ready=false
    this.services.roles.index(
      (response)=>{ this.roles = response.data.data; this.ready=true },
      (response)=>{ this.roles=[]; this.ready=true },
      null,
      null,
      this.cvParams.getSerialized()
    )
  }
}
</script>