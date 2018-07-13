import '~polyfill'
import Vue from 'vue'
import Meta from 'vue-meta';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue';
import store from "./store/store.js";
import Router from "vue-router";
import routerConfig from "./router/router.config.js";
const router  = new Router(routerConfig);
Vue.use(Router);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(Meta)

const app = new Vue({
    store,
    router,
    ...App
})

app.$mount('#app')
