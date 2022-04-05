import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:81/'


//process.env.VUE_APP_BASE_URL
Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios
  }
})
