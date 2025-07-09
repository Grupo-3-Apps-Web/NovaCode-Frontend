<script>
import { User } from "../model/user.entity.js";
import { UserService } from "../services/user.services.js";

import DataManager from "../../shared/components/data-manager.component.vue";
import CreateAndEditUser from "../components/create-and-edit-user.component.vue";

export default {
  name: "user-management",
  components: {
    DataManager,
    CreateAndEditUser,
  },
  data() {
    return {
      title: { singular: "User", plural: "Users" },
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
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.users.findIndex(user => user.id === id);
    },
    onNewUser() {
      this.user = new User({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditUser(item) {
      this.user = new User(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteUser(item) {
      this.user = { ...item };
      this.deleteUser();
    },
    onDeleteSelectedUsers(selectedItems) {
      this.selectedUsers = selectedItems;
      this.deleteSelectedUsers();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.user.fullName.trim()) {
        if (item.id) {
          this.updateUser();
        } else {
          this.createUser();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createUser() {
      this.userService.create(this.user).then(() => {
        this.notifySuccessfulAction("User Created");
        this.refreshUserList();
      }).catch(error => console.error("Error creating user:", error));
    },
    updateUser() {
      this.userService.update(this.user.id, this.user).then(response => {
        const index = this.findIndexById(this.user.id);
        this.users[index] = new User(response.data);
        this.notifySuccessfulAction("User Updated");
      }).catch(error => console.error("Error updating user:", error));
    },
    deleteUser() {
      this.userService.delete(this.user.id).then(() => {
        const index = this.findIndexById(this.user.id);
        this.users.splice(index, 1);
        this.notifySuccessfulAction("User Deleted");
      }).catch(error => console.error("Error deleting user:", error));
    },
    deleteSelectedUsers() {
      this.selectedUsers.forEach(user => {
        this.userService.delete(user.id).then(() => {
          this.users = this.users.filter(u => u.id !== user.id);
        });
      });
      this.notifySuccessfulAction("Users Deleted");
    },
    refreshUserList() {
      this.userService.getAll().then(response => {
        this.users = response.data.map(user => new User(user));
      }).catch(error => console.error("Error loading users:", error));
    }
  },
  created() {
    this.userService = new UserService();
    this.refreshUserList();
  }
};
</script>

<template>
  <div class="w-full">
    <data-manager
        :title="title"
        :items="users"
        @new-item-requested="onNewUser"
        @edit-item-requested="onEditUser($event)"
        @delete-item-requested="onDeleteUser($event)"
        @delete-selected-items-requested="onDeleteSelectedUsers($event)"
    >
      <template #custom-columns>
        <div class="cards-container">
          <div v-for="user in users" :key="user.id" class="card">
            <img :src="user.imageProfile" alt="User Image" class="card-image" />
            <div class="card-content">
              <h3>{{ user.fullName }}</h3>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Phone:</strong> {{ user.phone }}</p>
              <p><strong>Address:</strong> {{ user.address }}</p>
              <p><strong>Birthday:</strong> {{ user.birthday }}</p>
              <p><strong>DNI:</strong> {{ user.dni }}</p>
            </div>
            <div class="card-actions">
              <button class="edit-button" @click="onEditUser(user)">
                <i class="pi pi-pencil"></i> Edit
              </button>
              <button class="delete-button" @click="onDeleteUser(user)">
                <i class="pi pi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </template>
    </data-manager>

    <create-and-edit-user
        :edit="isEdit"
        :item="user"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"
    />
  </div>
</template>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-content {
  padding: 0.5rem 1rem;
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

.edit-button {
  color: #4caf50;
}

.delete-button {
  color: #f44336;
}
</style>
