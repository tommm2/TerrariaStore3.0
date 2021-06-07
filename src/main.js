import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import Loading from 'vue-loading-overlay'
import 'swiper/css/swiper.css'
import 'bootstrap'
import 'vue-loading-overlay/dist/vue-loading.css'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import currencyFitler from './filters/currency'
import dateFilter from './filters/date'
import './bus'

axios.defaults.withCredentials = true
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.use(VueI18n)

Vue.component('Loading', Loading)
Vue.filter('currency', currencyFitler)
Vue.filter('date', dateFilter)

const i18n = new VueI18n({
  locale: 'zhTW'
})

Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((res) => {
      if (res.data.success) {
        next()
      } else {
        next(false)
      }
    })
  } else {
    next()
  }
})
