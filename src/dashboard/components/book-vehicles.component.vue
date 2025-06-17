<script>
import {Book} from "../model/book.entity.js";
import {BookService} from "../services/book.services.js";

import DataManagerComponent from "../../shared/components/data-manager.component.vue";
import {Column as PvColumn} from "primevue";

export default {
  name: "book-vehicles",
  components:{  DataManagerComponent,PvColumn},
  data(){
    return {
      title: {singular: "Book", plural: "Books"},
      books:[],
      book: new Book({}),
      selectedBooks: [],
      bookService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },

  methods:{

  },

  created() {
    this.bookService = new BookService();
    this.bookService.getAll().then(response => {
      this.books = response.data.map(book => new Book(book));
      console.log(this.books);
    }).catch(error => console.error(error));
  },
}
</script>

<template>
  <div class="w-full">
    <data-manager-component :title=title
                            :items="books">
      <template #custom-columns>
        <div class="cards-container">
          <div v-for="book in books" :key="book.id" class="card">
            <h3>{{ book.model }} {{ book.brand }}</h3>
            <p><strong>Year:</strong> {{ book.year }}</p>
            <img :src="book.image" alt="Publication Image" class="card-image" />
            <p><strong>Description:</strong> {{ book.description }}</p>
            <p><strong>Price:</strong> ${{ book.price }}</p>
            <p><strong>Published Date:</strong> {{ book.publishedDate }}</p>

          </div>
        </div>
      </template>
    </data-manager-component>

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
  background-color: #8A9597;
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


</style>