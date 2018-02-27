<template>
  <cv-quasar-table-grid-index 
    v-if="resource && action"
    :cv-resource="resource" 
    :cv-action="action"
    :cv-exclude-actions="[]"
  >
    <!-- cv-grid-customization-->
    <template v-if="1" slot="headers-slot" slot-scope="props">
        <!-- cv-grid-customization-->
       <th cv-key="id" class="cv-orderable cv-filterable cv-selectable   t-left t-middle  w-15" >
          Id
          <cv-ord-icon :cv-data="props.gridData" cv-key="id">
            <q-icon slot="orderable-icon" name="swap_vert" color="secondary"/>
            <q-icon slot="ascending-icon" name="arrow_downward"  color="primary"/>
            <q-icon slot="descending-icon" name="arrow_upward"  color="positive"/>
          </cv-ord-icon>
        </th>
        <th cv-key="first_name" class="cv-orderable cv-filterable cv-selectable  t-left t-middle w-25" >
          Nombre de usuario
          <cv-ord-icon :cv-data="props.gridData" cv-key="first_name">
            <q-icon slot="orderable-icon" name="swap_vert" color="secondary"/>
            <q-icon slot="ascending-icon" name="arrow_downward"  color="primary"/>
            <q-icon slot="descending-icon" name="arrow_upward"  color="positive"/>
          </cv-ord-icon>
        </th>
        <th cv-key="email" class="cv-orderable cv-filterable cv-selectable  t-left t-middle w-25" >
          Correo electronico
          <cv-ord-icon :cv-data="props.gridData" cv-key="email">
            <q-icon slot="orderable-icon" name="swap_vert" color="secondary"/>
            <q-icon slot="ascending-icon" name="arrow_downward"  color="primary"/>
            <q-icon slot="descending-icon" name="arrow_upward"  color="positive"/>
          </cv-ord-icon>
        </th>
        <th cv-key="active" class="cv-orderable cv-filterable cv-selectable  t-left t-middle w-15" >
          Activo
          <cv-ord-icon :cv-data="props.gridData" cv-key="active">
            <q-icon slot="orderable-icon" name="swap_vert" color="secondary"/>
            <q-icon slot="ascending-icon" name="arrow_downward"  color="primary"/>
            <q-icon slot="descending-icon" name="arrow_upward"  color="positive"/>
          </cv-ord-icon>
        </th>
        <th cv-key="last_name" class="cv-filterable cv-selectable" hidden>
        </th>
    </template>
    <!-- cv-grid-extra-headers-->
    <template v-if="1" slot="extra-actions-header-slot" slot-scope="props">
    </template>
    <!-- cv-grid-data-cells-->
    <template v-if="1" slot="properties-slot" slot-scope="props">
      <td>
        {{props.slotRow.id}}
      </td>
      <td>
        {{props.slotRow.first_name}} 
        {{props.slotRow.last_name}}
      </td>
      <td>
        {{props.slotRow.email}}
      </td>
    </template>
    <!-- cv-grid-extra-actions-->
    <template v-if="1" slot="extra-actions-slot" slot-scope="props">
    </template>
  </cv-quasar-table-grid-index>
</template>
<script>
import CvIndex from 'crudvuel/customs/components/resource/CvIndex.vue';
import CvQuasarTableGridIndex from 'crudvuel/customs/components/resource/themes/quasar/CvQuasarTableGridIndex.vue';
import {QIcon} from 'quasar'
export default {
  extends: CvIndex,
  components: {CvQuasarTableGridIndex,QIcon}
}
</script>