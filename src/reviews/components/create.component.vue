<script>
import {FloatLabel as PvFloatLabel, InputText as PvInputText} from "primevue";

export default {
  name: "create",
  components: {PvFloatLabel, PvInputText},
  props: {
    entity: null,
    visible: Boolean(),
    edit: Boolean(),
    entityName: '',
    size: 'default',
  },
  emits: ['cancel-action-requested', 'save-action-requested'],
  data(){
    return {
      submitted: false
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel-action-requested');
    },
    onSave() {
      this.$emit('save-action-requested', this.entity)
    },
    getHeaderTitle() {
      return `${this.edit ? 'Edit' : 'New'} ${this.entityName}`;
    },
    getSubmitLabel() {
      return this.edit ? 'Update' : 'Create';
    }
  }
}
</script>

<template>
  <pv-dialog v-bind:visible="visible" :modal="true" class="p-fluid" :header="entityName" entity-name="Review">
    <template #header>
      <div>{{ getHeaderTitle() }}</div>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <div class="flex justify-content-end">
        <pv-button type="button" :label="getSubmitLabel()" class="p-button-text" icon="pi pi-check" @click="onSave"/>
        <pv-button type="button" label="Cancel" severity="secondary" class="p-button-text" icon="pi pi-times" @click="onCancel"/>
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>