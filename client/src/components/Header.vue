<template>
  <div>
    <v-toolbar fixed dark>
      <v-toolbar-title class="mr-4">
        <span
        class='home'
        @click="navigateTo({'name': 'root'})">
          LX CodeBase
        </span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat dark>
          Browse
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark
        @click="navigateTo({ 'name': 'login' })">
          Login
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat dark
        @click="navigateTo({ 'name': 'register' })">
          Sign Up
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import router from '../router'
export default {
  methods: {
    navigateTo (route) {
      router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: orange;
}
</style>
