<template>
  <v-layout fluid column>
    <v-container>
      <v-toolbar dark>
        Register
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
            class="cyan"
            @click="register">
            Register
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
    async register () {
      try {
        await AuthenticationService.register({
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
