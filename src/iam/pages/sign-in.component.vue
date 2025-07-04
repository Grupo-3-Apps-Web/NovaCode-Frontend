<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.username, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    }
  }
}
</script>

<template>
  <div>
    <h3>Sign In</h3>
  </div>
  <p class="p-fluid mb-5">Please enter the required information to sign in.</p>
  <div>
    <form @submit.prevent="onSignIn">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <pv-input-text id="username" placeholder="Username" v-model="username" :class="{'p-invalid': !username}"/>
            <small v-if="!username" class="p-invalid pl-3">Username is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <pv-password id="password" placeholder="Password" v-model="password" :class="{'p-invalid': !password}" :feedback="false"/>
            <small v-if="!password" class="p-invalid pl-3">Password is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-button type="submit">Sign In</pv-button>
        </div>
        <div class="mt-5">
          Don't have an account?
          <router-link to="/sign-up">Sign Up</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>