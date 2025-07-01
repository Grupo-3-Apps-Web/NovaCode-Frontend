<script>
import {Button as PvButton, Card as PvCard, SelectButton as PvSelectButton} from "primevue";
import {Review} from "../model/review.entity.js";

export default{
  name: "review-item",
  components: {PvButton, PvSelectButton, PvCard},
  props: {
    review: {
      type: Review,
      required: true,
    }
  }
}
</script>

<template>
  <pv-card class="review-card">
    <template #title>
      {{review.score}}
    </template>
    <template #content>
      <p>{{ review.comment}}</p>
    </template>
  </pv-card>
</template>

<style scoped>
</style>