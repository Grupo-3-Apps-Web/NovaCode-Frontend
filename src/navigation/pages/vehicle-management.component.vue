<script>

import {Vehicle} from "../model/vehicle.entity.js";


import {VehicleService} from "../services/vehicle.services.js";


import DataManager from "../../shared/components/data-manager.component.vue";


import VehicleItemCreateAndEditDialog from "../components/vehicle-item-create-and-edit.component.vue"


export default {
  name: "category-management",
  components: {VehicleItemCreateAndEditDialog, DataManager},

  data() {
    return {
      title: {singular: "Vehicle", plural: "Vehicles"},
      categories: [],
      category: new Vehicle({}),
      selectedCategories: [],
      categoryService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      searchBrand: '',  // Variable para el campo de búsqueda
      filteredCategories: []  // Lista filtrada de vehículos
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.categories.findIndex(vehicle => vehicle.id === id);
    },

    onNewItem() {
      this.category = new Vehicle({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onEditItem(item) {
      this.category = new Vehicle(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },

    onDeleteItem(item) {
      this.category = {...item};
      this.deleteCategory();
    },

    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems;
      this.deleteSelectedCategories();
    },

    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },

    onSaveRequested(item) {
      this.submitted = true;
      if (this.category.name.trim()) {
        if (item.id) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },

    createCategory() {
      this.categoryService.create(this.category).then(response => {
        let category = new Vehicle(response.data);
        this.categories.push(category);
        this.notifySuccessfulAction("Category Created");
      }).catch(error => console.error(error));
    },

    updateCategory() {
      this.categoryService.update(this.category.id, this.category).then(response => {
        let index = this.findIndexById(this.category.id);
        this.categories[index] = new Vehicle(response.data);
        this.notifySuccessfulAction("Category Updated");
      }).catch(error => console.error(error));
    },

    deleteCategory() {
      this.categoryService.delete(this.category.id).then(() => {
        let index = this.findIndexById(this.category.id);
        this.categories.splice(index, 1);
        this.notifySuccessfulAction("Category Deleted");
      }).catch(error => console.error(error));
    },

    deleteSelectedCategories() {
      this.selectedCategories.forEach((category) => {
        this.categoryService.delete(category.id).then(() => {
          this.categories = this.categories.filter((t) => t.id !== this.category.id);
        });
      });
      this.notifySuccessfulAction("Categories Deleted");
    },


    onSearch() {
      if (this.searchBrand.trim() === '') {
        this.filteredCategories = this.categories;
      } else {
        this.filteredCategories = this.categories.filter(vehicle =>
            vehicle.brand.toLowerCase().includes(this.searchBrand.toLowerCase())
        );
      }
    }
  },

  created() {
    this.categoryService = new VehicleService();
    this.categoryService.getAll().then(response => {
      this.categories = response.data.map(category => new Vehicle(category));
      this.filteredCategories = this.categories;  // Inicializamos la lista filtrada con todos los vehículos
    }).catch(error => console.error(error));
  }
}
</script>


<template>
  <h1 >Available {{ title.plural }}</h1>
  <div class="w-full">

    <div class="search-container" style="margin-bottom: 20px;">
      <input
          type="text"
          v-model="searchBrand"
          placeholder="Buscar por marca..."
          class="search-input"
          @input="onSearch"
          style="padding: 10px; width: 100%; max-width: 300px; border-radius: 5px; border: 1px solid #ccc;"
      />
    </div>


    <data-manager :title="title"
                  :items="filteredCategories"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">

      <template #custom-columns>

        <pv-column :sortable="true" field="image" header="Vehiculo" style="min-width: 24rem; text-align: center;">
          <template #body="slotProps">
            <div style="font-weight: bold; font-size: 1.2rem;">
              Model: {{ slotProps.data.model }}
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <img :src="slotProps.data.image" alt="Vehicle Image" style="width: 300px; height: auto;"/>
              <div>
                <div>Year: {{ slotProps.data.year }}</div>
                <div>Description: {{ slotProps.data.description }}</div>
                <div>Rating: {{ slotProps.data.rating }}</div>
              </div>
            </div>
          </template>
        </pv-column>

        <pv-column :sortable="true" field="brand" header="Brand" style="min-width: 24rem"/>
        <pv-column :sortable="true" field="price" header="Price" style="min-width: 24rem"/>
      </template>

    </data-manager>

    <vehicle-item-create-and-edit-dialog
        :edit="isEdit"
        :item="category"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>
h1{
  text-align: center;
}

</style>