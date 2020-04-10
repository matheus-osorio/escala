import Vue from 'vue'
import App from './App.vue'
import '@/plugins/echarts'

//css imports
import './css/bootstrap.min.css'
import './css/all.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
