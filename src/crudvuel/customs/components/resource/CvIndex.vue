<script>
import CvIndex from 'crudvuel-tools/src/components/resource/CvIndex.vue';
export default {
  extends: CvIndex,
  computed:{
  	cvGridComponentSwitch:function(){
  		return this.isMobile?'CvQuasarFlexiGridIndex':'CvQuasarTableGridIndex'
  	},
    cvGridCellSwitch:function(){
      return this.isMobile?'div':'td'
    },
    cvGridCellClassSwitch:function(){
      return this.isMobile?'col-lg-12':''
    },
    cvGridShowCellLabel:function(){
      return this.isMobile
    }
  }
}
</script>