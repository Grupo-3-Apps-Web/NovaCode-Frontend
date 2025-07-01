<script>
import {FilterMatchMode} from '@primevue/core/api';
import {Card as PvCard} from "primevue";

export default {
  name: "data-manager",
  components: {PvCard},
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
  },
  emits: ['new-item-requested', 'edit-item-requested', 'delete-item-requested', 'delete-selected-items-requested'],
  data() {
    return {
      selectedItems: [],
      filters: null
    }
  },
  methods: {
    initFilters() {
      this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
    },
    newItem() {
      this.$emit('new-item-requested');
    },
    editItem(item) {
      this.$emit('edit-item-requested', item);
    },
  },
  created() {
    this.initFilters();
  },

}
</script>

<template>
  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
    </template>
  </pv-toolbar>
  <pv-card>
    <template #footer="slotProps">
      <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)"/>
    </template>
  </pv-card>
</template>

<style scoped>

</style>