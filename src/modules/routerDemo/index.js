import '~polyfill'
import Vue from 'vue'
import Meta from 'vue-meta'
import App from './app.vue'
import Router from "vue-router";
Vue.use(Meta);
import routerConfig from "./router/router.config";
const router  = new Router(routerConfig);
Vue.use(Router);
const app = new Vue({
    router,
    ...App
})

app.$mount('#app')
