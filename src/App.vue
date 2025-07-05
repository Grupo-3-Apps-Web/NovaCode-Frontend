<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";
import {useAuthenticationStore} from "./iam/services/authentication.store.js";
export default {
  name: 'App',
  components: {FooterContent, LanguageSwitcher},
  data() {
    return {
      drawer: false,
      items: [
        {label: 'option.dashboard',       to: '/dashboard'},
        {label: 'option.publications',       to: '/publications'},
        {label: 'option.navigation',       to: '/navigation'},
        {label: 'option.dashboard',       to: '/dashboard'},
      ],
      authenticationStore: useAuthenticationStore()
    }
  },
  computed: {
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    currentUsername() {
      return this.authenticationStore.currentUsername;
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    onSignOut() {
      this.authenticationStore.signOut(this.$router);
    }
  }
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <h3>Automovil-Unite</h3>
      </template>
      <template #center>
        <div class="flex-column">
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ $t(item.label) }}</router-link>
          </pv-button>
        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>
  <footer>
    <footer-content/>
  </footer>
</template>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
}

header {
  width: 100%;
  margin-bottom: 1rem;
}

main {
  width: 100%;
}

</style>
