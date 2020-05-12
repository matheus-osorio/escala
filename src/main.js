import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import '@/plugins/echarts'

//css imports
import './css/bootstrap.min.css'
import './css/all.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
