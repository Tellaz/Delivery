import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://dicolanchonete-env.eba-chqnnnii.sa-east-1.elasticbeanstalk.com'


//process.env.VUE_APP_BASE_URL
Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios
  }
})
