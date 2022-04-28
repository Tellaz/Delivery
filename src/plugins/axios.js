import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:5001'

// 'https://api-dicofood.azurewebsites.net'
//process.env.VUE_APP_BASE_URL
Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios
  }
})
