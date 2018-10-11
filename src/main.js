import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {
	routes
} from './routes'
import axios from 'axios'
//引入vuex
import {
	store
} from './store/store.js'


Vue.use(VueRouter)
//配置axios的默认根路径
axios.defaults.baseURL = 'https://wd2323984238ivjjvi.wilddogio.com/'
//配置Vue原型(在任何组件中都可以正常使用axios)
Vue.prototype.http = axios



const router = new VueRouter({
	routes,
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		// return {x: 0,y: 100}
		// return {selector: '.btn'}
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
})

new Vue({
	store: store,
	router,
	el: '#app',
	render: h => h(App)
})