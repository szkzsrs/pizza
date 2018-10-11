//应用mutations，做一些异步处理
export var setUser = ({
	commit
}, user) => {
	commit("userStatus", user)
}