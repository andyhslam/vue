import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'
import store from './store/'
import App from './App.vue'
import axios from 'axios'
import Loading from './components/loading'
import filters from './filters'
require('./assets/css/base.css') //全局引入

Vue.use(VueRouter);
Vue.use(Loading);

//Vue.filter(名字,函数)
//循环遍历所有过滤器
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));

// 关于axios的配置
axios.interceptors.request.use(function(config) {
	// 配置发送请求的信息
	store.dispatch('showLoading');
	return config;
},function(error){
	return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
	// 配置请求回来的信息
	store.dispatch('hideLoading');
	return response;
},function(error) {
	return Promise.reject(error);
});

//把axios对象挂到Vue原型上
Vue.prototype.$http = axios;

const router = new VueRouter({	
	mode: 'history',
	scrollBehavior: () => ({y: 0}),
	routes: routerConfig
});

// const router = new VueRouter(routerConfig);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
