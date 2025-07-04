<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      username: "",
      password: "",
    };
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password);
      this.authenticationStore.signUp(signUpRequest, this.$router);
    }
  }
}
</script>

<template>
  <div>
    <h3>Sign Up</h3>
  </div>
  <p class="p-fluid mb-5">Please enter the required information to sign in.</p>
  <div>
    <form @submit.prevent="onSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <pv-input-text id="username" placeholder="Username" v-model="username" :class="{'p-invalid': !username}"/>
            <small v-if="!username" class="p-invalid pl-3">Username is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <pv-password id="password" placeholder="Password" v-model="password" :class="{'p-invalid': !password}"
                promptLabel="Input your password"
                weakLabel="Too simple"
                mediumLabel="Acceptable"
                strongLabel="Strong"/>
            <small v-if="!password" class="p-invalid pl-3">Password is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-button type="submit">Sign Up</pv-button>
        </div>
        <div class="mt-5">
          Already have an account?
          <router-link to="/sign-in">Sign In</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>