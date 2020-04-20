<template>
  <vue-custom-scrollbar class="scroll-area"  :settings="settings">
    <v-layout id="app">
      <v-container>
          <v-app>
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
  </vue-custom-scrollbar>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
  name: 'App',
  components: {
    PageHeader,
    vueCustomScrollbar
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    settings: {
      maxScrollbarLength: null
    }
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
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: calc(100vh);
}
::-webkit-scrollbar {
  width: 0px;
}
.container {
    max-width: 90% !important;
}
</style>
