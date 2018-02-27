<script> 
import {QToggle} from 'quasar'
export default {
  extends: QToggle,
  props: {
    value: {
      type: [Boolean,Number, Array],
      required: true
    },
    val: {}
  },
}
</script>