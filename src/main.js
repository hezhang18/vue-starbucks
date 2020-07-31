// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import $ from 'jquery'
import Meta from 'vue-meta'
import VueLazyload from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(VueInfiniteScroll)
Vue.use(VueLazyload, {
    loading: '/static/loading-svg/loading-bubbles.svg'
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
