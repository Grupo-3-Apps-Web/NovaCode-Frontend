<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "create-and-edit-user",
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
  <create-and-edit :entity="item" :visible="visible" entity-name="User"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="fullName">Full Name</label>
            <pv-input-text id="fullName" v-model="item.fullName" :class="{ 'p-invalid': submitted && !item.fullName }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="email">Email</label>
            <pv-input-text id="email" v-model="item.email" :class="{ 'p-invalid': submitted && !item.email }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="phone">Phone</label>
            <pv-input-text id="phone" v-model="item.phone" :class="{ 'p-invalid': submitted && !item.phone }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="address">Address</label>
            <pv-input-text id="address" v-model="item.address" :class="{ 'p-invalid': submitted && !item.address }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="birthday">Birthday</label>
            <pv-input-text id="birthday" v-model="item.birthday" :class="{ 'p-invalid': submitted && !item.birthday }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="dni">DNI</label>
            <pv-input-text id="dni" v-model="item.dni" :class="{ 'p-invalid': submitted && !item.dni }"/>
          </pv-float-label>

          <pv-float-label>
            <label for="imageProfile">Profile Image URL</label>
            <pv-input-text id="imageProfile" v-model="item.imageProfile" :class="{ 'p-invalid': submitted && !item.imageProfile }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

</style>
