<script> 
import {QCheckbox} from 'quasar'
export default {
  extends: QCheckbox,
  props: {
    value: {
      type: [Boolean,Number, Array],
      required: true
    },
    val: {}
  },
}
</script>