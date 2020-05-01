<template>
  <vue-custom-scrollbar class="scroll-area"  :settings="settings">
    <v-layout id="app">
      <v-container>
          <v-app>
            <page-header></page-header>
            <v-content>
              <v-container fluid>
                <v-row>
                  <clip-loader class="spinner" :size=20 color="#3F51B5" sizeUnit="px" v-if="isLoading"></clip-loader>
                  <router-view class="fill" :key="$route.path" v-if="!isLoading"></router-view>
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
    isLoading: false,
    drawer: null,
    settings: {
      maxScrollbarLength: null
    }
  }),
  mounted () {
    this.isLoading = true
    this.$store.dispatch('fetchCategories').then(() => {
      this.$store.dispatch('fetchEntries').then(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 0)
      })
    })
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
.spinner {
  margin: 5% auto;
}
</style>
