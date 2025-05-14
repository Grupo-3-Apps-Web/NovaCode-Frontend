<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "create-and-edit-publications",
  components: { CreateAndEdit },
  props: {
    item: null,
    visible: false
  },
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
};
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Publication"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="model">Car Model</label>
            <pv-input-text id="model" v-model="item.model" :class="{ 'p-invalid': submitted && !item.model }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="brand">Car Brand</label>
            <pv-input-text id="brand" v-model="item.brand" :class="{ 'p-invalid': submitted && !item.brand }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="year">Release Year</label>
            <pv-input-text id="year" v-model="item.year" :class="{ 'p-invalid': submitted && !item.year }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="description">Short Description</label>
            <pv-input-text id="description" v-model="item.description" :class="{ 'p-invalid': submitted && !item.description }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="image">Car Link Image</label>
            <pv-input-text id="image" v-model="item.image" :class="{ 'p-invalid': submitted && !item.image }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="price">Rent Price (per day)</label>
            <pv-input-text id="price" v-model="item.price" :class="{ 'p-invalid': submitted && !item.price }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="publishedDate">Published Date</label>
            <pv-input-text id="publishedDate" v-model="item.publishedDate" :class="{ 'p-invalid': submitted && !item.publishedDate }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>