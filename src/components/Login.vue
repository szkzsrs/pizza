<template>
	<div class="row mt-3">
		<div class="col-md-12 col-lg-12">
			<div class="card">
				<div class="card-body">
					<img src="../../src/assets/icon.png" alt="" class="mx-auto d-block">
					<form @submit.prevent="onSubmit">
						<div class="form-group">
							<label for="email">邮箱</label>
							<input type="email" class="form-control" v-model="email">
						</div>
						<div class="form-group">
							<label for="password">密码</label>
							<input type="password" class="form-control" v-model="password">
						</div>
						<button type="submit" class="btn btn-block btn-success">登录</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'	
	export default{
		data(){
			return{
				email:'',
				password:''
			}
		},
		//组件内的守卫，清空登录用户，只要进入了登录页面就清空登录状态
		beforeRouteEnter:(to,from,next) => {
			next(vm => vm.$store.dispatch("setUser",null))
		},
		methods:{
			onSubmit(){
				axios.get('/usersszk.json')
				.then(res =>{
					const data = res.data
					const users = []
					for(var key in data){
						const user = data[key]
						// console.log(user)
						users.push(user)
					}
					//实现过滤
					const result = users.filter((user) =>{  //filter()为es6的数组方法
						return user.email === this.email && user.password === this.password 
					})
					if(result != null && result.length>0){
						this.$store.dispatch("setUser",result[0].email)//使用vuex的action属性
						this.$router.push({name:'homeLink'})
					}else{
						alert('账号或密码错误')
						this.$store.dispatch("setUser",null)
					}
				})
			}
		}
	}
</script>