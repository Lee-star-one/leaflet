import Vue from 'vue'
import App from './App.vue'
import router from './router'
import utils from './utils'

Vue.prototype.$utils=utils
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
