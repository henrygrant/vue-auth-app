import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import moment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(moment)

const vuetifyOptions = {
  icons: {
    iconfont: 'mdiSvg'
  }
}

sync(store, router)

new Vue({
  render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: { App },
  vuetify: new Vuetify(vuetifyOptions)
}).$mount('#app')
