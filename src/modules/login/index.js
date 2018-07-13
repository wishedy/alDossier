import '~polyfill'
import Vue from 'vue'
import Meta from 'vue-meta';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(Meta)

const app = new Vue({
    ...App
})

app.$mount('#app')
