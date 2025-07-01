<script lang="ts">
import Create from "../../reviews/components/create.component.vue";

/**
 * @component
 * @description A specialized dialog component for creating and editing Category entities.
 * This component wraps the generic create-and-edit component and adds category-specific
 * UI elements and validation.
 */
export default {
  name: "review-item-create-dialog",
  components: {Create},
  props: {
    item: null,
    visible: false
  },
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false
    }
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
}
</script>

<template>
  <create :entity="item" :visible="visible" entity-name="Review"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="score">Score</label>
            <pv-input-text id="score" v-model="item.score" :class="{ 'p-invalid': submitted && !item.score }"/>
          </pv-float-label>
          <pv-float-label>
            <label for="comment">Comment</label>
            <pv-input-text id="comment" v-model="item.comment" :class="{ 'p-invalid': submitted && !item.comment }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create>

</template>

<style scoped>

</style>