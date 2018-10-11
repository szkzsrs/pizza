<template>
<div class="row">
	<!--菜单-->
	<div class="col-xs-12 col-md-8">
		<table class="table">
			<thead class="thead-default">
				<tr>
					<th>尺寸</th>
					<th>价格</th>
					<th>加入</th>
				</tr>
			</thead>
			<tbody v-for="item in getMenuItems" :key="item.name">
				<tr>
					<td><strong>{{item.name}}</strong></td>
				</tr>
				<tr v-for="option in item.options" :key="option.size">
					<td>{{option.size}}</td>
					<td>{{option.price}}</td>
					<td><button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-syccess">+</button></td>
				</tr>
			</tbody>
		</table>
		<!-- {{baskets}} -->
	</div>
	<!--购物车-->
	<div class="col-xs-12 col-md-4">
		<div v-if="baskets.length > 0">
			<table class="table">
				<thead class="thead-default">
					<tr>
						<th>数量</th>
						<th>品种</th>
						<th>价格</th>
					</tr>
				</thead>
				<tbody v-for="item in baskets" :key="item.name">
					<tr>
						<td>
							<button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
							<span>{{item.quantity}}</span>
							<button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
						</td>
						<td>{{item.name}}{{item.size}}</td>
						<td>{{item.price*item.quantity}}</td>
					</tr>
				</tbody>
			</table>
			<p>总价：{{total + "RMB"}}</p>
			<button class="btn btn-success btn-block">提交</button>
		</div>
		<div v-else>
			{{basketText}}
		</div>
	</div>
</div>	
</template>
<script>
// import axios from 'axios'	
	export default{
		data(){
			return{
				baskets:[],
				basketText:"购物车没有任何商品",
				// getMenuItems:{}
			}
		},
		computed:{
			total(){
				var totalCost = 0 //总价
				for(var index in this.baskets){
					var individualItem = this.baskets[index]
					totalCost += individualItem.quantity * individualItem.price
				}
				return totalCost
			},
			getMenuItems(){
				//在vuex中获取数据
				// return this.$store.state.menuItems;
				//通过getters获取数据
				return this.$store.getters.getMenuItems
			}
		},
		created(){
			this.fetchData()
		},
		methods:{
			fetchData(){
				//使用fecth请求
				// fetch("https://wd2323984238ivjjvi.wilddogio.com/menu.json")
				// .then(res => {
				// 	return res.json()
				// })
				// .then(data =>{
				// 	this.getMenuItems = data
				// })
				//使用axios请求
				// axios.get("menu.json")
				// 	 .then(res => this.getMenuItems = res.data)
				
				//使用vue原型的axios
				// this.http.get("menu.json")
				// 		 .then(res => this.getMenuItems = res.data)

				//将请求下来的数据存储到vuex中
				this.http.get("menu.json")
						.then(res => this.$store.commit("setMenuItems",res.data))

			},
			addToBasket(item,option){
				var basket = {
					name:item.name,
					size:option.size,
					price:option.price,
					quantity:1
				}
				//判断购物车重复商品并数量++
				if(this.baskets.length > 0){
					var result = this.baskets.filter((basket) => {
						return (basket.name === item.name && basket.size === option.size)
					})
					if(result != null && result.length > 0){
						result[0].quantity++
					}else{
						this.baskets.push(basket)
					}
				}else{
					this.baskets.push(basket)
				}

				
			},
			decreaseQuantity(item){
				item.quantity--
				if(item.quantity <= 0){
					this.removeFromBasket(item)
				}
			},
			increaseQuantity(item){
				item.quantity++
			},
			removeFromBasket(item){
				this.baskets.splice(this.baskets.indexOf(item),1)
			}
		}
	}
</script>