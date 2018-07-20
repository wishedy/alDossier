import '~polyfill'
import Vue from 'vue'
import Meta from 'vue-meta';
import App from './app.vue'
import Router from "vue-router";
import routerConfig from "./router/router.config.js";
const router  = new Router(routerConfig);
Vue.use(Router);
Vue.use(Meta)

const app = new Vue({
    router,
    ...App
})

app.$mount('#app')
