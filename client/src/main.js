// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import { VueSpinners } from '@saeris/vue-spinners'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

sync(store, router)

Vue.use(VueSpinners)
Vue.use(VuejsDialog)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
