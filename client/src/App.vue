<template>
  <v-layout id="app">
    <v-container>
      <v-app id="inspire">
        <page-header></page-header>
        <v-content>
          <v-container fluid>
            <v-row>
              <router-view class="fill" :key="$route.path"></router-view>
            </v-row>
          </v-container>
        </v-content>
        <v-footer color="indigo" app>
          <span class="white--text">&copy; 2020 - www.lxmedia.tk</span>
        </v-footer>
      </v-app>
    </v-container>
  </v-layout>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  mounted () {
    this.$store.dispatch('fetchEntries')
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: left;
  margin-top: 0px;
}
.fill {
  width: 100%;
}
</style>
