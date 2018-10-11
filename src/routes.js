//路由
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'
//二级路由
import Contact from './components/about/Contact'
import Delinery from './components/about/Delinery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'
//三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'


//路由配置
export const routes = [{
	path: '/',
	name: "homeLink",
	components: { //router-view复用
		default: Home,
		'orderingGuide': OrderingGuide,
		'delivery': Delinery,
		'history': History,
	}
}, {
	path: '/menu',
	name: "menuLink",
	component: Menu
}, {
	path: '/admin',
	name: "adminLink",
	component: Admin,
}, {
	path: '/about',
	name: "aboutLink",
	redirect: '/about/contact',
	component: About,
	children: [{
		path: '/about/contact',
		name: "contactLink",
		component: Contact,
		redirect: '/phone',
		children: [{
			path: '/phone',
			name: 'phoneNum',
			component: Phone
		}, {
			path: '/personname',
			name: 'personName',
			component: PersonName
		}]
	}, {
		path: '/about/delinery',
		name: "delineryLink",
		component: Delinery,
	}, {
		path: '/about/history',
		name: "historyLink",
		component: History,
	}, {
		path: '/about/orderingGuide',
		name: "orderGuideLink",
		component: OrderingGuide,
	}, ]
}, {
	path: '/login',
	name: "loginLink",
	component: Login
}, {
	path: '/register',
	name: "registerLink",
	component: Register
}, {
	path: '*',
	redirect: '/'
}]