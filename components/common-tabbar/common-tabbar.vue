<template>
	<view class="common-tabbar">
		<view class="item" @tap="goPage(item.id)" v-for="item in tabList" :key="item.id" :class="active==item.id?'active':''">
			<text class="iconfont" :class="item.icon"></text>
			<view>{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			active:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				tabList:[
					{"id":1,"icon":"icon-dianpu","text":"店铺首页"},
					{"id":2,"icon":"icon-shangpinguanli","text":"商品管理"},
					{"id":3,"icon":"icon-dingdanguanli1","text":"订单管理"},
					{"id":4,"icon":"icon-pingjiaguanli","text":"评价管理"},
					{"id":5,"icon":"icon-dingdanguanli","text":"店铺管理"}
				]
			}
		},
		methods: {
			goPage(index){
				var id = this.active;
				id = index;
				if(id==1){
					uni.reLaunch({
						url:"../../pages/index/index"
					})
				}
				if(id==2){
					uni.reLaunch({
						url:"../../pages/goodsManage/goodsManage"
					})
				}
				if(id==3){
					uni.reLaunch({
						url:"../../pages/orderManage/orderManage"
					})
				}
				if(id==4){
					uni.reLaunch({
						url:"../../pages/evaluateManage/evaluateManage"
					})
				}
				if(id==5){
					uni.reLaunch({
						url:"../../pages/shopManage/shopManage"
					})
				}
			},
		},
	}
</script>

<style lang="less">
	.common-tabbar{
		color: #333;
		height: 100rpx;
		display: flex;
		width: 100%;
		background: #fff;
		position: fixed;
		bottom: 0;
		justify-content: space-around;
		text-align: center;
		align-items: center;
		.active{text{color: #f5671f;}}
		.item{
			text{
				font-size: 48rpx;
			}
			view{
				font-size: 20rpx;
			}
		}
	}
</style>
