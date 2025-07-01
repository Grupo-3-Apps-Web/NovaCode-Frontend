<script>
import ReviewItem from "../components/review-item.component.vue";
import {Review} from "../model/review.entity.js";
import {ReviewService} from "../services/review.service.js";
import {Button as PvButton, Toolbar as PvToolbar} from "primevue";
import Create from "../components/create.component.vue";
import DataManager from "../components/data-manager.component.vue";
import ReviewItemCreateDialog from "../components/review-item-create.component.vue";

export default {
  name: "review-management",
  components: {ReviewItemCreateDialog, DataManager, Create, PvButton, PvToolbar, ReviewItem},
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false,
      item: null,
      visible: false,
      isEdit: false,
      reviews: [],
      reviewService: null,
      createDialogIsVisible: false,
      review: new Review({}),
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    findIndexById(id) {
      return this.reviews.findIndex(review => review.id === id);
    },
    onNewItem() {
      this.review = new Review({});
      this.submitted = false;
      this.createDialogIsVisible = true;
      console.log(this.createDialogIsVisible);
    },
    onEditItem(item) {
      this.review = new Review(item);
      this.isEdit = true;
      this.submitted = false;
      this.createDialogIsVisible = true;
    },
    onCancelRequested() {
      this.createDialogIsVisible = false;
      this.submitted = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.review.comment.trim()) {
        if (item.id) {
          this.updateReview();
        } else {
          this.createNewReview(item);
        }
        this.createDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createNewReview(item) {
      const vehicleId = this.$route.params.id;
      this.reviewService.createReview(vehicleId,item).then(response => {
        let review = new Review(response.data);
        this.reviews.push(review);
        this.notifySuccessfulAction("Review Created");
      }).catch(error => console.error(error));
    },
    updateReview() {
      this.reviewService.update(this.review.id, this.review).then(response => {
        console.log('updateReview');
        let index = this.findIndexById(this.review.id);
        this.reviews[index] = new Review(response.data);
        console.log(this.reviews);
        this.notifySuccessfulAction("Review Updated");
      }).catch(error => console.error(error));
    },
  },
  created(){
    const vehicleId = this.$route.params.id;
    this.reviewService = new ReviewService();
    this.reviewService.getReviewsForVehicleId(vehicleId).then(response => {
      this.reviews = response.data.map(review => new Review(review));
      console.log(this.reviews);
    }).catch(error => console.error(error));
  }
}
</script>

<template>
  <div class="review-container">
    <h1>{{ $t('option.review') }}</h1>
    <pv-toolbar>
      <template #center>
        <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="onNewItem"/>
      </template>
    </pv-toolbar>
    <div class="review-list">
      <div v-if="reviews.length === 0">
        <h1>No hay reseñas</h1>
      </div>
      <pv-card v-else v-for="review in reviews" :key="review.id">
        <template #title>
          {{review.score}}
        </template>
        <template #content>
          <p>{{ review.comment}}</p>
        </template>
        <template #footer>
          <pv-button icon="pi pi-pencil" label="Edit" severity="info" @click="onEditItem(review)"/>
        </template>
      </pv-card>
    </div>
  </div>
  <review-item-create-dialog
      :edit="isEdit"
      :item="review"
      :visible="createDialogIsVisible"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested($event)"/>
</template>

<style scoped>
.review-container{
  text-align: center;
}
.review-list{
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding-top: 15px;
}

</style>