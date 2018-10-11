//改变属性的状态
export var setMenuItems = (state, data) => {
	state.menuItems = data
}
//将匹配到的对象在menuItems数组中删除
export var removeMenuItems = (state, data) => {
	state.menuItems.forEach((item, index) => {
		if (item == data) {
			state.menuItems.splice(index, 1)
		}
	})
}
//将新添加的pizza push到pushToMenu中
export var pushToMenu = (state, data) => {
	state.menuItems.push(data)
}
//更改用户状态信息
export var userStatus = (state, user) => {
	if (user) {
		state.currentUser = user
		state.isLogin = true
	} else {
		state.currentUser = null
		state.isLogin = false
	}
}