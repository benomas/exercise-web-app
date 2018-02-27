<template>
  <div class="row cv-relator-container">
    <div
      class="col-sm-6 col-xs-12 related-items"
    >
      <div class="t-center">{{relatedLabel}}</div>
      <ul class="list-group">
        <li 
            class="list-group-item"
            v-for="(row, rowKey) in related"
            v-on:click="removeRelated(rowKey,row)"
        >
          <q-icon name="clear" class="f-right"/>
          {{row[labelProperty]}}
        </li>
      </ul>
    </div>
    <div
      class="col-sm-6 col-xs-12 source-items"
    >
      <div class="t-center">{{sourceLabel}}</div>
      <ul class="list-group">
        <li 
            class="list-group-item"
            v-for="(row, rowKey) in source"
            v-on:click="addRelated(rowKey,row)"
        >
          <q-icon name="add" class="f-left"/>
          {{row[labelProperty]}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script> 
import CvRelationator from 'crudvuel-tools/src/components/input-components/CvRelationator.vue';
import {QIcon} from 'quasar'
export default {
  extends: CvRelationator,
  components:{
    QIcon
  }
}
</script>
<style lang="scss">
  .cv-relator-container{
    & ul{
      margin-top: 0;
      margin: 0;
      padding: 0;
      list-style-type: none;
      & .q-icon{
          margin-left:5px;
          margin-right:5px;
          font-weight: bold;
          cursor:pointer;
      }
      min-height: 250px;
      max-height: 500px;
      overflow-y: auto;
    }
  	& .list-group{
  		margin-bottom: 20px;
		  padding-left: 0;
      &-item{
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #d3e0e9;
        &:first-child {
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
        }
      }
  	}
  }
</style>
