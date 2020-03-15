<template>
  <v-layout column>
    <v-container>
      <v-toolbar dark>
        Login
      </v-toolbar>
      <div class="white elevation-2">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            type="email"
            name="email"
            v-model = "email"
            placeholder="email" />
          <br>
          <v-text-field
            type="password"
            name="password"
            v-model = "password"
            placeholder="password" />
          <br>
          <div class="error" v-html="error"></div>
          <v-btn
            dark
            class="blue"
            @click="login">
            Login
          </v-btn>
          </div>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
  }
</style>
