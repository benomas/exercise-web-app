<template>
  <div
  >
    <cv-grid 
        cv-tag="div"
        :cv-service="action.getService"
        :cv-top-paginate="false"
        :cv-bottom-paginate="true"
        :cv-pages-per-view="9"
        :cv-order-by="'active'"
        :cv-ascending="0"
        @initial-mutation="ready=false;"
        :ref="gridRef"
      >
        <table class="q-table  horizontal-separator striped-even loose" slot="cv-grid-data" style="width: 100%;" >
          <cv-ths cv-tag="thead">
            <tr slot="cv-ths-slot" cv-role="cv-header-config">
              <th cv-key="id" class="cv-filterable cv-selectable" hidden>
              </th>
              <th cv-key="ex_list_id" class="cv-filterable cv-selectable" hidden>
              </th>
              <th cv-key="active" class="cv-orderable cv-filterable cv-selectable  t-center t-middle w-20" >
                Completado
                <cv-ord-icon :cv-data="mainGridData" cv-key="active">
                  <q-icon slot="orderable-icon" name="swap_vert" color="secondary"/>
                  <q-icon slot="ascending-icon" name="arrow_downward"  color="primary"/>
                  <q-icon slot="descending-icon" name="arrow_upward"  color="positive"/>
                </cv-ord-icon>
              </th>
              <th cv-key="value" class="cv-orderable cv-filterable cv-selectable  t-left t-middle w-80" >
                Valor
                <cv-ord-icon :cv-data="mainGridData" cv-key="value">
                  <q-icon slot="orderable-icon" name="swap_vert" color="secondary"/>
                  <q-icon slot="ascending-icon" name="arrow_downward"  color="primary"/>
                  <q-icon slot="descending-icon" name="arrow_upward"  color="positive"/>
                </cv-ord-icon>
              </th>
            </tr>
          </cv-ths>
          <tbody v-if="mainGridData" >
            <tr>
              <td  class="t-center t-middle">
                <cv-q-checkbox v-model="newRow.active" :disable="rowLoading('new')"/>
              </td>
              <td  class="t-center t-middle">
                <q-field
                  :error="cvErr(errors,'value','boolean')"
                  :error-label="cvErr(errors,'value')"
                >
                  <q-input 
                    float-label="Valor"
                    suffix="" 
                    v-model="newRow.value"
                    clearable
                    :readonly="rowLoading('new')"
                    :loading="rowLoading('new')"
                    @keydown.enter="addItem()"
                  />
                </q-field>
              </td>
            </tr>
            <tr v-for="gridRow in mainGridData.rows">
              <td  class="t-center t-middle">
                <q-btn 
                  icon="delete" 
                  @click="deleteItem(gridRow)"
                  color="negative"
                  small
                  :title="'Eliminar item'"
                >
                </q-btn>
                <cv-q-checkbox v-model="gridRow.active"  @input="updateItem(gridRow)" :disable="rowLoading(gridRow.id)"/>
              </td>
              <td  class="t-center t-middle">
                <q-field
                  :error="cvErr(errors,'value','boolean')"
                  :error-label="cvErr(errors,'value')"
                >
                  <q-input 
                    float-label="Valor"
                    suffix="" 
                    v-model="gridRow.value"
                    clearable
                    :readonly="rowLoading(gridRow.id)"
                    :loading="rowLoading(gridRow.id)"
                    @keydown.enter="updateItem(gridRow)"
                  />
                </q-field>
                {{ready}}
              </td>
            </tr>
          </tbody>
        </table>
      </cv-grid>
  </div>
</template>
<script>
import CvIndex from 'crudvuel/customs/components/resource/CvIndex.vue';
import CvQuasarTableGridIndex from 'crudvuel/customs/components/resource/themes/quasar/CvQuasarTableGridIndex.vue';
import CvQCheckbox from 'crudvuel/customs/components/resource/themes/quasar/CvQCheckbox.vue';
import {QIcon,QField,QInput,QBtn,Toast} from 'quasar'
export default {
  extends: CvIndex,
  components: {CvQuasarTableGridIndex,QIcon,QField,QInput,QBtn,Toast,CvQCheckbox},
  data (){
    return {
      newRow:null,
      loadings:{},
    }
  },
  computed:{
    cExListId:function(){
      return this.exListId || null;
    }
  },
  props:[
    "exListId"
  ],
  created:function(){
    this.newRow={active:false,ex_list_id:this.cExListId};
    this.resources.exItems.crudServices.setResourcePrefix("/ex-lists/"+this.cExListId+"/");
  },
  methods:{
    setLoading:function(rowId){
      this.$set(this.loadings,rowId,true);
    },
    setLoaded:function(rowId){
      this.loadings[rowId]=false;
    },
    rowLoading:function(rowId){
      return this.loadings[rowId] || false;
    },
    addItem:function(){
      this.setLoading("new")
      this.resources.exItems.actions.create.setService(
        (response)=>{
          this.mainGridData.refresh();
          this.newRow.value=null;
          this.setLoaded("new")
        },
        (response)=>{
          this.mainGridData.refresh();
          this.setLoaded("new")
        },
        this.newRow
      );
    },
    updateItem:function(row){
      this.setLoading(row.id)
      this.resources.exItems.actions.edit.setService(
        row.id,
        (response)=>{
          this.mainGridData.refresh();
          this.setLoaded(row.id)
        },(response)=>{
          this.mainGridData.refresh();
          this.setLoaded(row.id)
        },row
      );
    },
    deleteItem:function(row){
      this.setLoading(row.id)
      this.resources.exItems.actions.delete.setService(
        row.id,
        (response)=>{
          this.mainGridData.refresh();
          this.setLoaded(row.id)
        },(response)=>{
          this.mainGridData.refresh();
          this.setLoaded(row.id)
        },row
      );
    }
  }
}
</script>
<style lang="scss">
  td,th{
    & button.q-btn{
      padding:7px 0px 7px 10px !important;
      margin-right:20px;
    }
  } 
  th .q-icon{
    font-weight :bold;
    font-size   :20px;
    cursor      :pointer !important;
  }
</style>