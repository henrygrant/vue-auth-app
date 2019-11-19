import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(Vuetify)
const vuetifyOptions = {}

sync(store, router)

new Vue({
  render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: { App },
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')
