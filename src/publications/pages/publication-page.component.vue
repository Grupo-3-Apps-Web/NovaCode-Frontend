<script>
import {Publication} from '../model/publication.model.js';
import {PublicationsService} from '../services/publications.service.js';

import DataManagerComponent from "../../shared/components/data-manager.component.vue";
import CreateAndEditPublicationsComponent from "../components/create-and-edit-publications.component.vue";

export default {
  name: "publication-page",
  components:{ CreateAndEditPublicationsComponent, DataManagerComponent},
  data(){
    return {
      title: {singular: "Publication", plural: "Publications"},
      publications:[],
      publication: new Publication({}),
      selectedPublications: [],
      publicationService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },

  methods:{
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

    findIndexById(id) {
      return this.publications.findIndex(publication => publication.id === id);
    },

    onNewPublication() {
      this.publication = new Publication({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },

    onEditPublication(item) {
      this.publication = new Publication(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
      onDeletePublication(item) {
        this.publication = {...item};
        this.deletePublication();
      },
    onDeleteSelectedPublications(selectedItems) {
      this.selectedPublications = selectedItems;
      this.deleteSelectedPublications();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.publication.model.trim()) {
        if (item.id) {
          this.updatePublication();
        } else {
          this.createPublication();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createPublication() {
      this.publicationService.create(this.publication).then(response => {
        this.notifySuccessfulAction("Publication Created");
        this.publicationService.getAll().then(response => {
          this.publications = response.data.map(publication => new Publication(publication));
        }).catch(error => console.error("Error al recargar las publicaciones:", error));
      }).catch(error => console.error("Error al crear la publicación:", error));
    },

    updatePublication() {
      this.publicationService.update(this.publication.id, this.publication).then(response => {
        console.log('updatePublication');
        let index = this.findIndexById(this.publication.id);
        this.publications[index] = new Publication(response.data);
        console.log(this.publications);
        this.notifySuccessfulAction("Publication Updated");
      }).catch(error => console.error(error));
    },

    deletePublication() {
      this.publicationService.delete(this.publication.id).then(() => {
        let index = this.findIndexById(this.publication.id);
        this.publications.splice(index, 1);
        this.notifySuccessfulAction("Publication Deleted");
      }).catch(error => console.error(error));
    },

    deleteSelectedPublications() {
      this.selectedPublications.forEach((publication) => {
        this.publicationService.delete(publication.id).then(() => {
          this.publications = this.publications.filter((t) => t.id !== this.publication.id);
        });
      });
      this.notifySuccessfulAction("Publications Deleted");
    },
  },
  created() {
    this.publicationService = new PublicationsService();
    this.publicationService.getAll().then(response => {
      this.publications = response.data.map(publication => new Publication(publication));
      console.log(this.publications);
    }).catch(error => console.error(error));
  },
}
</script>

<template>
  <div class="w-full">
    <data-manager-component :title=title
                            :items="publications"
                            @new-item-requested="onNewPublication"
                            @edit-item-requested="onEditPublication($event)"
                            @delete-item-requested="onDeletePublication($event)"
                            @delete-selected-items-requested="onDeleteSelectedPublications($event)">
      <template #custom-columns>
        <div class="cards-container">
          <div v-for="publication in publications" :key="publication.id" class="card">
            <h3>{{ publication.model }} {{ publication.brand }}</h3>
            <p><strong>Year:</strong> {{ publication.year }}</p>
            <img :src="publication.image" alt="Publication Image" class="card-image" />
            <p><strong>Description:</strong> {{ publication.description }}</p>
            <p><strong>Price:</strong> ${{ publication.price }}</p>
            <p><strong>Published Date:</strong> {{ publication.publishedDate }}</p>
            <div class="card-actions">
              <button class="edit-button" @click="onEditPublication(publication)">
                <i class="pi pi-pencil"></i> Editar
              </button>
              <button class="delete-button" @click="onDeletePublication(publication)">
                <i class="pi pi-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </template>
    </data-manager-component>
    <create-and-edit-publications-component
        :edit="isEdit"
        :item="publication"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Aumenta el ancho mínimo */
  gap: 1rem;
  padding: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 0.5rem 1rem;
  flex-grow: 1;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
}

button {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button:hover {
  background-color: #f0f0f0;
}

.edit-button {
  color: #4caf50;
}

.delete-button {
  color: #f44336;
}
</style>

