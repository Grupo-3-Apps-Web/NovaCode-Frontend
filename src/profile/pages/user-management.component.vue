<script>

import {User} from "../model/user.entity.js";
import {UserService} from "../services/user.services.js";

import DataManager from "../../shared/components/data-manager.component.vue";

import {Column as PvColumn} from "primevue";


export default {
  name: "user-management",
  components: {PvColumn, DataManager},

  data() {
    return {
      title: {singular: "User", plural: "Users"},
      users: [],
      user: new User({}),
      selectedUsers: [],
      userService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    };
  },
  methods: {

    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },

  },

  created() {
    this.userService = new UserService();
    this.userService.getAll().then(response => {
      this.users = response.data.map(user => new User(user));
      this.filteredUsers = this.users;
    }).catch(error => console.error(error));
  }
}
</script>


<template>
  <div>
    <!-- Lista de usuarios -->
    <div v-for="user in users" :key="user.id" class="user-card">
      <img :src="user.imageProfile" alt="User Photo" class="user-photo"/>
      <div class="user-info">
        <p><strong>Full Name:</strong> {{ user.fullName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Address:</strong> {{ user.address }}</p>
        <p><strong>Birthday:</strong> {{ user.birthday }}</p>
        <p><strong>DNI:</strong> {{ user.dni }}</p>
      </div>
    </div>
    <book-vehicles />
  </div>

</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.user-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info p {
  margin: 5px 0;
}

</style>