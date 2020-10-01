<template>
    <v-layout id="app">
      <v-container>
          <v-app>
            <page-header></page-header>
            <vue-custom-scrollbar class="scroll-area" :settings="settings">
              <v-content id="vcontent">
                <v-container fluid>
                  <v-row class="content">
                    <clip-loader class="spinner" :size=20 color="#3F51B5" sizeUnit="px" v-if="isLoading"></clip-loader>
                    <router-view class="fill" :key="$route.path" v-if="!isLoading"></router-view>
                  </v-row>
                </v-container>
              </v-content>
            </vue-custom-scrollbar>
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
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  padding: 50px 0px 0px 0px;
  height: calc(100vh - 60px);
}
::-webkit-scrollbar {
  width: 0px;
}
@media screen and (min-width: 960px) {
  #vcontent {
    padding: 0px 0px 36px 256px !important;
  }
}
.container {
    max-width: 100% !important;
    padding-right: 0px !important;
}
.content {
  padding: 0px 12% !important;
  width: 99%;
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
