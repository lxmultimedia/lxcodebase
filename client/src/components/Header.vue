<template>
  <header>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <app-navigation></app-navigation>
  </v-navigation-drawer>

  <v-app-bar
    app
    color="indigo"
    dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title class="home" @click="navigateTo({ 'name': 'root' })">LX Codebase</v-toolbar-title>
    <v-spacer />
    <v-btn
    text dark
    :to = "{ name: 'browse' }">
      Browse
    </v-btn>
    <v-btn v-if="this.$store.state.isUserLoggedIn"
    text dark
    :to = "{ name: 'new' }">
      Add Listing
    </v-btn>
    <v-btn text dark
    v-if="!$store.state.isUserLoggedIn"
    :to = "{ name: 'login' }">
      Login
    </v-btn>
    <v-btn text dark
    v-if="!$store.state.isUserLoggedIn"
    :to = "{ name: 'register' }">
      Sign Up
    </v-btn>
    <v-btn text dark
    v-if="$store.state.isUserLoggedIn"
    @click="logout">
      Log Out
    </v-btn>
  </v-app-bar>
  </header>
</template>

<script>
import router from '../router'
import appNavigation from '@/components/Navigation.vue'
export default {
  components: {
    appNavigation
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    navigateTo (route) {
      router.push(route)
    },
    logout () {
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setExpires', null)
      this.$store.dispatch('setToken', null).then(() => {
        this.$router.push({
          name: 'root'
        })
      })
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
