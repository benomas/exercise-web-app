<script> 
import CvBaseCrud from 'crudvuel/customs/components/resource/CvBaseCrud.vue'
import CvQuasarButtons from './CvQuasarButtons.vue'
//Fix for strict data type on native QToggle
import CvQToggle from './CvQToggle.vue'
import {QIcon,QField,QInput,QBtn,Toast} from 'quasar'
export default {
  extends: CvBaseCrud,
  components: {
    CvBaseCrud,
    CvQuasarButtons,
    QBtn,
    QField,
    QIcon,
    QInput,
    CvQToggle,
  },
  methods: {
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
    if(this.rowKeyValue)
      this.getService()
  }
}
</script>