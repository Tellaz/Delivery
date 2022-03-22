import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { BootstrapVue, IconsPlugin } from './plugins/bootstrap'
import 'dotenv/config'



import { library } from '@fortawesome/fontawesome-svg-core'
import { faShuttleSpace, faUser, faBurger, faCirclePlus, faScrewdriverWrench, faScrewdriver, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShuttleSpace, faUser, faBurger, faCirclePlus, faScrewdriverWrench, faScrewdriver, faCircleExclamation)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  BootstrapVue,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
