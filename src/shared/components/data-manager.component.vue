<script>

import {FilterMatchMode} from '@primevue/core/api';


export default {
  name: "data-manager",
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
    title:  {type: { singular: '', plural: ''}, required: true},
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: []},
  },
  emits: ['new-item-requested', 'edit-item-requested', 'delete-item-requested', 'delete-selected-items-requested'],

  data() {
    return {

      selectedItems: [],

      /**
       * @description Filter configuration for the data table
       */
      filters: null
    }
  },
  methods: {
    /**
     * Initializes the filter configuration for the data table
     * Sets up a global filter with CONTAINS match mode
     */
    initFilters() {
      this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
    },

    /**
     * Handles the "New" button click and emits the new-item-requested event
     */
    newItem() {
      this.$emit('new-item-requested');
    },

    /**
     * Shows a confirmation dialog for deleting selected items
     * If confirmed, emits the delete-selected-items-requested event with selected items
     */
    confirmDeleteSelected() {
      this.$confirm.require({
        message:      `Are you sure you want to delete the selected ${this.title.plural}?`,
        header:       'Confirmation',
        icon:         'pi pi-exclamation-triangle',
        rejectClass:  'p-button-secondary p-button-outlined',
        rejectLabel:  'Cancel',
        acceptLabel:  'Delete',
        acceptClass:  'p-button-danger',
        accept:       () => this.$emit('delete-selected-items-requested', this.selectedItems),
        reject:       () => {}
      });
    },

    /**
     * Triggers CSV export of the current data table contents
     * Uses the PrimeVue DataTable exportCSV method
     */
    exportToCsv() {
      this.$refs.dt.exportCSV()
    },

    /**
     * Handles the edit button click for an item
     * @param {Object} item - The item to be edited
     */
    editItem(item) {
      this.$emit('edit-item-requested', item);
    },

    /**
     * Shows a confirmation dialog for deleting a single item
     * If confirmed, emits the delete-item-requested event with the item
     * @param {Object} item - The item to be deleted
     */
    confirmDeleteItem(item) {
      this.$confirm.require({
        message:      `Are you sure you want to delete this ${this.title.singular}?`,
        header:       'Confirmation',
        icon:         'pi pi-exclamation-triangle',
        rejectClass:  'p-button-secondary p-button-outlined',
        rejectLabel:  'Cancel',
        acceptLabel:  'Delete',
        acceptClass:  'p-button-danger',
        accept:       () => this.$emit('delete-item-requested', item),
        reject:       () => {}
      });
    },
  },

  /**
   * Lifecycle hook called after the instance is created
   * Initializes the data table filters
   */
  created() {
    this.initFilters();
  },

}
</script>

<template>
  <h3>Manage {{ title.plural }}</h3>

  <!-- Toolbar Section -->
  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" :label="$t('option.new')" severity="success" @click="newItem"/>
      <pv-button :disabled="!selectedItems || !selectedItems.length" icon="pi pi-trash" :label="$t('option.delete')" severity="danger"
                 @click="confirmDeleteSelected"/>
    </template>
    <template #end>
      <pv-button icon="pi pi-download" :label="$t('option.export')" severity="help" @click="exportToCsv($event)"/>
    </template>
  </pv-toolbar>


  <!-- Data Table Section -->
  <pv-data-table
      ref="dt"
      v-model:selection="selectedItems"
      :filters="filters"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[5, 10, 20]"
      :value="items"
      current-page-report-template="Showing {first} to {last} of {totalRecords} ${{title.plural}}"
      data-key="id"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
    <pv-column :exportable="false" selection-mode="multiple" style="width: 3rem"/>
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"/>
    <pv-column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)"/>
        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)"/>
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>