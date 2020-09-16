import Vue from 'vue'
import App from './App.vue'
import router from './router'
import utils from './utils'
import '@/assets/style/index.css'
import '@/assets/style/leaflet.css'

Vue.prototype.$utils=utils
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
