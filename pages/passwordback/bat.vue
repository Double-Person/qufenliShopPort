<template>
	<view class="myOrder">
		<!-- header -->
		<commonHeader headerTitl="订单管理" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 验证密码蒙层 -->
<!-- 		<view class="shopManage-testPwd" :class="hideBox?'hideBox':''">
			<view class="shopManage-testPwd-title">
				请输入登录密码
			</view>
			<testCode @isPwdStata="inputPwdStata" :focusStata='focusStata'></testCode>
		</view> -->
		<!-- tab切换 -->
		<view class="myOrder-title">
			<text v-for="(item, $index) in classify" :key="$index" :class="{ active: $index === classifyIndex }" @tap="changeTitle($index)">{{ item.label }}</text>
			<!-- <text :class="active===1?'active':''" @tap="changeTitle(1)">已付款</text>
			<text :class="active===2?'active':''" @tap="changeTitle(2)">未付款</text>
			<text :class="active===3?'active':''" @tap="changeTitle(3)">退款/售后</text> -->
		</view>
		<view class="myOrder-content">
			<!-- 已付款 -->
			<view class="commonStyle">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view class="item-title">
						<view class="left">
							<image :src="item.imgUrl" mode=""></image>
							<text>{{item.title}}</text>
						</view>
						<view class="right">
							{{item.phone}}
						</view>
					</view>
					<view class="address">
						{{item.address}}
					</view>
					<view class="item-content">
						<view class="left">
							<image :src="item.goodsUrl" mode=""></image>
							<view>
								<text class="left-title">
									{{item.name}}
								</text>
								<view class="left-date">
									下单时间：{{item.date}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.num}}
						</view>
					</view>
					<view class="item-content">
						<view class="left">
							<image :src="item.goodsUrl" mode=""></image>
							<view>
								<text class="left-title">
									{{item.name}}
								</text>
								<view class="left-date">
									下单时间：{{item.date}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.num}}
						</view>
					</view>
					<view class="item-code">
						订单编号：<text>{{item.orderCode}}</text>
					</view>
					<view class="item-pay">
						付款方式：<text>{{item.pay}}</text>
					</view>
					<view class="item-beizhu">
						备注：<text>{{item.beizhu}}</text>
					</view>
					<view class="item-total">
						<text></text>
						<view>
							共{{item.num}}件商品总金额
							<text>￥{{item.num*item.price}}</text>
						</view>
					</view>
					<view class="item-btn">
						<text @tap="changeStata(item)" :class="item.orderSata?'btnStata':''">{{item.orderSata?'已配货':'配货'}}</text>
					</view>
				</view>
			</view>
			<!-- 未付款 -->
			<!-- <view class="commonStyle" :class="active===2?'show':''">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view class="item-title">
						<view class="left">
							<image :src="item.imgUrl" mode=""></image>
							<text>{{item.title}}</text>
						</view>
						<view class="right">
						</view>
					</view>
					<view class="address">
						{{item.address}}
					</view>
					<view class="item-content">
						<view class="left">
							<image :src="item.goodsUrl" mode=""></image>
							<view>
								<text class="left-title">
									{{item.name}}
								</text>
								<view class="left-date">
									下单时间：{{item.date}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.num}}
						</view>
					</view>
					<view url="../oraderDetails/oraderDetails" class="item-content">
						<view class="left">
							<image :src="item.goodsUrl" mode=""></image>
							<view>
								<text class="left-title">
									{{item.name}}
								</text>
								<view class="left-date">
									下单时间：{{item.date}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.num}}
						</view>
					</view>
					<view class="item-beizhu">
						备注：<text>{{item.beizhu}}</text>
					</view>
					<view class="item-total">
						<text></text>
						<view>
							共{{item.num}}件商品总金额
							<text>￥{{item.num*item.price}}</text>
						</view>
					</view>
				</view>
			</view> -->
			<!-- 退款售后 -->
			<!-- <view class="commonStyle" :class="active===3?'show':''">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view class="item-title">
						<view class="left">
							<image :src="item.imgUrl" mode=""></image>
							<text>{{item.title}}</text>
						</view>
						<view class="right">
							{{item.phone}}
						</view>
					</view>
					<view class="address">
						{{item.address}}
					</view>
					<view url="../oraderDetails/oraderDetails" class="item-content">
						<view class="left">
							<image :src="item.goodsUrl" mode=""></image>
							<view>
								<text class="left-title">
									{{item.name}}
								</text>
								<view class="left-date">
									下单时间：{{item.date}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.num}}
						</view>
					</view>
					<view url="../oraderDetails/oraderDetails" class="item-content">
						<view class="left">
							<image :src="item.goodsUrl" mode=""></image>
							<view>
								<text class="left-title">
									{{item.name}}
								</text>
								<view class="left-date">
									下单时间：{{item.date}}
								</view>
								<view class="left-price">
									单价：￥{{item.price}}
								</view>
							</view>
						</view>
						<view class="right">
							X{{item.num}}
						</view>
					</view>
					<view class="item-code">
						订单编号：<text>{{item.orderCode}}</text>
					</view>
					<view class="item-pay">
						付款方式：<text>{{item.pay}}</text>
					</view>
					<view class="item-beizhu">
						退款原因：<text>{{item.beizhu}}</text>
					</view>
					<view class="item-total">
						<text></text>
						<view>
							共{{item.num}}件商品总金额
							<text>￥{{item.num*item.price}}</text>
						</view>
					</view>
					<view class="item-btn">
						<text>不同意退款</text>
						<text>审核通过同意退款</text>
					</view>
				</view>
			</view> -->
		</view>
		<!-- tabbar -->
		<tabbar active="3"></tabbar>
	</view>
</template>
<script>
	import commonHeader from"@/components/common-header/common-header";
	import tabbar from"@/components/common-tabbar/common-tabbar";
	// import testCode from '@/components/testCode/testCode';
	import { orderList } from '@/common/apis.js'
	export default {
		data() {
			return {
				active:1,
				orderList:[
					{id:"01",imgUrl:"../../static/images/cartLOGO.png",address:"四川省成都市武侯区",title:"油条豆浆先生","phone":"13366667777",goodsUrl:"../../static/images/content01.png",
					name:"意大利黑胡椒面",num:1,date:"2019-11-12 08:11",address:"四川省成都市武侯区",price:"99.99",orderCode:"88080080880","pay":"微信支付","beizhu":"哈哈哈哈哈哈哈哈哈","orderSata":false}
				],
				// 显示隐藏密码框
				hideBox:false,
				focusStata:false,
				// 0未付款、1已付款、2退款中、3退款成功、4已完成
				classify: [
					{ value: 0, label: '未付款' },
					{ value: 1, label: '已付款' },
					{ value: 2, label: '退款中' },
					{ value: 3, label: '退款成功' },
					{ value: 4, label: '已完成' }
				],
				classifyIndex: 0
			};
		},
		onShow () {
			this.getOrder()
		},
		methods:{
			// 获取商品列表
			async getOrder () {
				const params = {
					shop_id: uni.getStorageSync('shopId'),
					type: this.classify[this.classifyIndex].value
				}
				const { returnMsg, msgType } = await orderList(params)
				console.log(returnMsg)
				msgType == 0 && (this.orderList = returnMsg)
			},
			changeTitle(index){
				tnhis.classifyIndex = index
			},
			// 配货状态
			changeStata(item){
				console.log(item)
				if(!item.orderSata){
					item.orderSata = true;
				}
			},
			// 密码输入状态
			inputPwdStata(e){
				console.log(e)
				if(e){
					this.hideBox = true
				}
			}
		},
		components:{
			commonHeader,
			tabbar,
			// testCode
		},
		onLoad() {
			// 判断输入密码是否超时
			// uni.getStorage({
			// 	key:'isPwd',
			// 	success:(res)=>{
			// 		if(res.data){
			// 			this.hideBox = true;
			// 		}else{
			// 			this.focusStata = true;
			// 		}
			// 	}
			// })
		}
	}
</script>

<style lang="less">
	.myOrder{
		min-height: 100%;
		background: #f6f7f8;
		padding: 210rpx 0;
		color: #333;
		/* #ifdef APP-PLUS */
		padding-top: 250rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 250rpx;
		/* #endif */
		.myOrder-title{
			font-size: 32rpx;
			display: flex;
			justify-content: space-around;
			background: #fff;
			border-bottom: 1px solid #e0e0e0;
			position: fixed;
			top: 90rpx;
			/* #ifdef APP-PLUS */
			top: 130rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: 130rpx;
			/* #endif */
			width: 100%;
			z-index: 9999;
			text{
				padding:35rpx 0;
			}
			.active{
				border-bottom: 8rpx solid #FF5904;
				font-weight: bold;
			}
		}
		.myOrder-content{
			.show{
				display: block;
			}
			>view{
				display: none;
				
			}
			.commonStyle{
				width: 95%;
				margin: auto;
				font-size: 30rpx;
				.item{
					background: #fff;
					margin-top: 20rpx;
					border-radius: 20rpx;
					padding: 0 20rpx 0 20rpx;
					.item-title{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0 0 0;
						.left{
							font-size: 32rpx;
							font-weight: bold;
							display: flex;
							align-items: center;
							image{
								width: 50rpx;
								height: 50rpx;
								border-radius: 50%;
								margin-right: 20rpx;
							}
						}
						.right{
							font-size: 38rpx;
							color: #333;
						}
					}
					.address{
						text-indent: 2.5em;
						color: #999;
						font-size: 26rpx;
						padding: 20rpx 0;
						border-bottom: 1px solid #e0e0e0;
					}
					.item-content{
						display: flex;
						padding-top: 30rpx;
						justify-content: space-between;
						.left{
							display: flex;
							image{
								width: 180rpx;
								height: 152rpx;
								border-radius: 20rpx;
								margin-right: 20rpx;
							}
							>view{
								.left-title{
									font-size: 32rpx;
								}
								view{
									font-size: 28rpx;
									color: #666;
									margin-top: 10rpx;
								}
							}
						}
						.right{
							font-size: 28rpx;
							color: #666;
						}
					}
					.item-content:last-of-type{
						border-bottom: 1px solid #e8e8e8;
						padding-bottom: 30rpx;
					}
					.item-code,.item-pay,.item-beizhu{
						padding: 30rpx 0;
						text{
							color: #666;
							margin-left: 30rpx;
						}
					}
					.item-beizhu{
						text{color: #999;}
					}
					.item-total{
						display: flex;
						justify-content: space-between;
						padding: 30rpx 0;
						
						view{
							color: #666;
							>text{
								margin-left: 20rpx;
								color: #FF5904;
								font-size: 40rpx;
							}
						}
					}
					.item-btn{
						display: flex;
						justify-content: flex-end;
						padding-bottom: 50rpx;
						text{
							padding: 7rpx 20rpx;
							font-size: 26rpx;
							border-radius: 30rpx;
						}
						text:first-child{
							color: #999;
							border: 1px solid #999;
						}
						
						text:last-child{
							margin-left: 40rpx;
							color: #FF5904;
							border: 1px solid #FF5904;
						}
						
						.btnStata{
							color: #999 !important;
							border: 1px solid #999 !important;
						}
					}
				}
			}
		}
		// 蒙层
		.hideBox{display: none;}
		.shopManage-testPwd {
			position: fixed;
			height: 100%;
			width: 100%;
			z-index: 9999;
			top: 0;
			background: #fff;
		
			.shopManage-testPwd-title {
				margin-top: 300rpx;
				text-align: center;
				font-size: 40rpx;
				font-weight: bold;
				margin-bottom: 100rpx;
			}
		}
	}
</style>
