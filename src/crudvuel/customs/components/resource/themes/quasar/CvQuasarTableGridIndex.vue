<template>
  <div 
    class="row action-container" 
  >
    <div class="col-lg-12 action-label">
      <label>
        {{action.label}}
      </label>
      <hr>
    </div>
    <!-- cv-grid-customization-->
    <div class="col-lg-12">
      <cv-grid 
        cv-tag="div"
        :cv-service="action.getService"
        :cv-top-paginate="true"
        :cv-bottom-paginate="true"
        :cv-pages-per-view="9"
        @initial-mutation="ready=false;"
        :ref="gridRef"
      >
        <table class="q-table bordered horizontal-separator striped-even loose" slot="cv-grid-data" style="width: 100%;" >
          <cv-ths cv-tag="thead">
            <tr slot="cv-ths-slot" cv-role="cv-header-config">
              <slot name="headers-slot" :grid-data="mainGridData">
              </slot>
              <th  class="t-center t-middle">
                Acciones
                <q-btn 
                  v-if="validateAction('create')"
                  icon="add_circle_outline" 
                  @click="$router.push(actionPath('create'))"
                  color="primary"
                  push
                  small
                  :title="resorceAction('create').label"
                ></q-btn> 
                <slot name="extra-actions-header-slot" :grid-data="mainGridData">
                </slot> 
              </th>
            </tr>
          </cv-ths>
          <tbody v-if="mainGridData" >
            <tr v-for="gridRow in mainGridData.rows">
              <slot name="properties-slot" :slot-row="gridRow">
              </slot>
              <td  v-if="typeof gridRow.active!=='undefined'" class="t-center t-middle">
                <q-icon 
                  v-if="gridRow.active" 
                  class="active-icon"
                  name="fa-check" 
                  color="positive"
                  @click="deactivateRow(gridRow)"
                  :title="resorceAction('deactivate').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                />
                <q-icon 
                  v-if="!gridRow.active" 
                  class="active-icon"
                  name="fa-times-circle" 
                  color="negative" 
                  @click="activateRow(gridRow)"
                  :title="resorceAction('activate').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                />
              </td>
              <td class="t-center t-middle">
                <q-btn 
                  v-if="validateAction('edit')"
                  icon="edit" 
                  @click="$router.push(actionPath('edit',gridRow))"
                  color="positive"
                  push
                  small
                  :title="resorceAction('edit').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                ></q-btn>    
                <q-btn 
                  v-if="validateAction('delete')"
                  icon="delete" 
                  @click="deleteRow(gridRow)"
                  color="negative"
                  push
                  small
                  :title="resorceAction('create').label"
                  v-cv-in-progress="isSynchronizing(gridRow)"
                  :disabled="isSynchronizing(gridRow)"
                >
                </q-btn>
                <slot name="extra-actions-slot" :slot-row="gridRow">
                </slot> 
              </td>
            </tr>
          </tbody>
        </table>
      </cv-grid>
    </div>
  </div>
</template>
<script> 
import {
  Dialog,
  QBtn,
  QIcon,
  Toast,
} from 'quasar'
import CvIndex from 'crudvuel/customs/components/resource/CvIndex.vue'
export default {
  extends: CvIndex,
  components: {
    QIcon,
    QBtn,
  },
  methods: {
    activateRow:function(gridRow){
      if(!this.validateAction('activate'))
        return false;
      if(this.isSynchronizing(gridRow))
        return false;
      this.toSync(gridRow)
      let resorceAction = this.resorceAction("activate");
      resorceAction.setService(
        gridRow[this.rowKey],
        (response)=>{
          this.synchronized(gridRow);
          this.mainGridData.refresh();
          this.collectSuccessMessages(resorceAction.getSetSuccessMessage()+this.actionKeyMessage(gridRow))
        },
        (response)=>{
          this.synchronized(gridRow);
          this.collectErrorMessages(resorceAction.getSetErrorMessage()+this.actionKeyMessage(gridRow))
        }
      )
    },
    deactivateRow:function(gridRow){
      if(!this.validateAction('deactivate'))
        return false;
      if(this.isSynchronizing(gridRow))
        return false;
      this.toSync(gridRow)
      let resorceAction = this.resorceAction("deactivate");
      resorceAction.setService(
        gridRow[this.rowKey],
        (response)=>{
          this.synchronized(gridRow);
          this.mainGridData.refresh();
          this.collectSuccessMessages(resorceAction.getSetSuccessMessage()+this.actionKeyMessage(gridRow))
        },
        (response)=>{
          this.synchronized(gridRow);
          this.collectErrorMessages(resorceAction.getSetErrorMessage()+this.actionKeyMessage(gridRow))
        }
      )
    },
    deleteRow(gridRow) {
      let resorceAction = this.resorceAction("delete");
      this.toSync(gridRow)
      Dialog.create({
        title: resorceAction.label,
        message: 'Esta acción es irreversible, deseas continuar!!!',
        buttons: [
          {
            label: 'Continuar',
            handler:()=>{
              resorceAction.setService(
                gridRow[this.rowKey],
                (response)=>{
                  this.synchronized(gridRow);
                  this.mainGridData.refresh();
                  this.collectSuccessMessages(resorceAction.getSetSuccessMessage()+this.actionKeyMessage(gridRow))
                },
                (response)=>{
                  this.synchronized(gridRow);
                  this.collectErrorMessages(resorceAction.getSetErrorMessage()+this.actionKeyMessage(gridRow))
                }
              )
            }
          },
          {
            label: 'Cancelar',
            handler:()=>{
              this.synchronized(gridRow);
              this.collectCancelMessages(resorceAction.getSetCancelMessage()+this.actionKeyMessage(gridRow))
            }
          }
        ]
      })
    },
    successNotification:function(){
      if(this.successNotificationMessages){
        Toast.create.positive(this.successNotificationMessages)
        this.successNotificationMessages=null;
      }
    },
    errorNotification:function(){
      if(this.errorNotificationMessages){
        Toast.create.negative(this.errorNotificationMessages)
        this.errorNotificationMessages=null;
      }
    },
    cancelNotification:function(){
      if(this.cancelNotificationMessages){
        Toast.create.warning(this.cancelNotificationMessages)
        this.cancelNotificationMessages=null;
      }
    }
  },
  created:function(){
    // console.log("Is mobile " + this.isMobile)
  }
}
</script>
<style lang="scss">
  .in-progress-cursor{
    cursor: progress !important;
    &:disabled{
      cursor: progress !important;
    }
  }
  td,th{
    & button.q-btn{
      padding:7px 0px 7px 10px !important;
    }
  } 
  th .q-icon{
    font-weight :bold;
    font-size   :20px;
    cursor      :pointer !important;
  }
</style>