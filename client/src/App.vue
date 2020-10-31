<template>
    <v-layout id="app">
      <v-container>
          <v-app>
            <page-header></page-header>
              <v-content>
                <v-container fluid>
                  <v-row class="content">
                    <clip-loader class="spinner" :size=20 color="#3F51B5" sizeUnit="px" v-if="isLoading"></clip-loader>
                                <vue-custom-scrollbar class="scroll-area" :settings="settings">
                    <router-view class="fill" :key="$route.path" v-if="!isLoading"></router-view>
                                </vue-custom-scrollbar>
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
    this.$store.dispatch('fetchEntries').then(() => {
      this.isLoading = false
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
  padding-right: 15px;
}
.scroll-area {
  position: relative;
  margin: auto;
  height: calc(100vh - 160px);
  width: 100%;
  padding: 10px;
}
::-webkit-scrollbar {
  width: 0px;
}
.container {
    max-width: 100% !important;
    padding-right: 0px !important;
}
.content {
  padding: 0px 12% !important;
}
@media screen and (max-width: 960px) {
  .content {
    padding: 0px 4% !important;
  }
}
.spinner {
  margin: 5% auto;
}
* {
  font-family: "Ubuntu";
}
.dialog .dg-btn--ok {
  color: red;
  border: 1px solid red;
}
.dialog .dg-btn--cancel {
  background: #3F51B5;
  border: 1px solid #3F51B5;
}
</style>
