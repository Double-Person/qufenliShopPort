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
			<text v-for="(item, $index) in classify" :key="$index" :class="{ active: $index === classifyIndex }" @tap="changeTitle($index, item.label)">{{ item.label }}</text>
			<!-- <text :class="active===1?'active':''" @tap="changeTitle(1)">已付款</text>
			<text :class="active===2?'active':''" @tap="changeTitle(2)">未付款</text>
			<text :class="active===3?'active':''" @tap="changeTitle(3)">退款/售后</text> -->
		</view>
		<view class="myOrder-content" style="display: block;">
			<!-- 已付款 -->
			<view class="commonStyle" v-if="orderList && orderList.length">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view @tap="getDetail(item)">
						<view class="item-title">
							<view class="left">
								<!-- item.head -->
								<image :src="item.head ? item.head : '../../static/images/goods.jpg'" mode=""></image>
								<text>{{item.ordersummary_id}}</text>
							</view>
						</view>

						<view class="item-content" v-for="(goods, $goods) in item.goodlist">
							<view class="left">
								<!-- goods.img -->
								<image :src="'../../static/images/goods.jpg'" mode=""></image>
								<view>

									<view class="left-date">
										商品名称：{{goods.NAME}}
									</view>
									<view class="left-date">
										下单时间：{{item.ordertime}}
									</view>
									<view class="left-price">
										单价：￥{{goods.PRICE}}
									</view>
								</view>
							</view>
							<view class="right">
								X{{goods.COUTNS}}
							</view>
						</view>
						<view class="item-code">
							订单编号：<text>{{item.ordersummary_id}}</text>
						</view>
						<view class="item-pay">
							付款方式：<text>{{getPayType(item.pay)}}</text>
						</view>
						<view class="item-pay">
							用户名：<text>{{ item.username }}</text>
						</view>
						<view class="item-pay">
							电话：<text>{{ item.phone }}</text>
						</view>
						<view class="item-pay">
							地址：<text>{{ item.add }}</text>
						</view>


						<view class="item-beizhu">
							备注：<text>{{item.remarks}}</text>
						</view>
						<view class="item-beizhu" v-show="hideBox">
							退款原因：<text>{{item.beizhu}}</text>
						</view>
						<view class="item-total">
							<text></text>
							<view>
								共{{item.number}}件商品 总金额
								<text class="shopMoney">￥{{item.money}}</text>
							</view>
						</view>
						


					</view>
					<view class="item-btn" v-show="classifyIndex == 1" @click="confirmDelivery(item.ordersummary_id)">
						<text>确认发货</text>
					</view>
					<view class="item-btn" v-show="hideBox">
						<text @click="rejectRefund(item.ordersummary_id)">不同意退款</text>
						<text @click="refund(item.ordersummary_id)">审核通过同意退款</text>
					</view>
					<!-- <view class="item-btn">
						<text @tap="changeStata(item)" :class="item.orderSata?'btnStata':''">{{item.orderSata?'已配货':'配货'}}</text>
					</view> -->
				</view>
			</view>
			<view v-else style="font-size: 14px; padding: 50px; text-align: center;">暂无数据</view>
	
		</view>
		<!-- tabbar -->
		<!-- <tabbar active="3"></tabbar> -->
	</view>
</template>
<script>
	import commonHeader from "@/components/common-header/common-header";
	import tabbar from "@/components/common-tabbar/common-tabbar";
	// import testCode from '@/components/testCode/testCode';
	import {
		orderList,
		getRefund,
		orderAffirm,
		orderRepeal,
		take
	} from '@/common/apis.js'
	export default {
		data() {
			return {
				active: 1,
				orderList: [],
				// 显示隐藏密码框
				hideBox: false,
				focusStata: false,
				// 0未付款、1已付款、2退款中、3退款成功、4已完成
				classify: [{
						value: 0,
						label: '未付款'
					},
					{
						value: 1,
						label: '已付款'
					},
					{
						value: 2,
						label: '退款中'
					},
					{
						value: 3,
						label: '退款成功'
					},
					{
						value: 4,
						label: '已完成'
					}
				],
				classifyIndex: 1,
				topIndex: "已付款"
			};
		},
		onShow() {
			this.getOrder()
		},
		methods: {
			// take  ORDERSUMMARY_ID
			 confirmDelivery(ORDERSUMMARY_ID) {
				 take({ORDERSUMMARY_ID}).then(async res => {
					console.log(res)
					await uni.showToast({
						title: res.errMsg,
						icon: 'none'
					})
					await this.getOrder()
				})
			},
			getDetail(item) {
				uni.navigateTo({
					url: "../orderDetail/orderDetail?shopid=" + item.ordersummary_id + "&topIndex=" + this.topIndex
				})
			},
			// 获取商品列表
			async getOrder() {
				const params = {
					shop_id: uni.getStorageSync('shopId'),
					type: this.classify[this.classifyIndex].value
				}
				uni.showLoading({ title: '加载中' })
				const {
					returnMsg,
					msgType
				} = await orderList(params)
				// msgType == 0 && (this.orderList = returnMsg)
				console.log(returnMsg)
				if (msgType == 0) {
					this.orderList = returnMsg
				} else {
					this.orderList = []
				}
				uni.hideLoading()
			},
			// 同意退款
			refund(pamars) {
				orderAffirm({
					ORDERSUMMARY_ID: pamars,
					STATE: '3'
				}).then(res => {
					console.log(res)
					if (res.msgType === 0) {
						uni.showToast({
							title: res.errMsg,
							icon: 'none'
						})
					}
				})
				this.getOrder()
			},
			rejectRefund(id) {
				orderRepeal({
					ORDERSUMMARY_ID: id
				}).then(res => {
					console.log(res)
					this.active = 2
					this.classifyIndex = 2
					uni.showToast({
						title: res.errMsg,
						duration: 2000,
						icon: 'none'
					})
					this.getOrder()
				})
			},
			changeTitle(index, item) {
				this.topIndex = item
				if (index === 2) {
					this.hideBox = true
				} else {
					this.hideBox = false
				}
				this.classifyIndex = index
				this.getOrder()
			},
			// 配货状态
			changeStata(item) {
				console.log(item)
				if (!item.orderSata) {
					item.orderSata = true;
				}
			},
			// 密码输入状态
			inputPwdStata(e) {
				console.log(e)
				if (e) {
					this.hideBox = true
				}
			},
			getPayType(index) {
				const array = ['微信', '支付宝', '余额支付', '银行卡']
				return array[Number(index)]
			}
		},
		components: {
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
	.delivery {
		color: #FF5904;
		border: 1px solid #FF5904;
		width: 15%;
		padding: 5rpx 15rpx;
		border-radius: 30rpx;
		text-align: center;
		margin: 0 0 50rpx 80%;
	}

	.myOrder {
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
		.myOrder-title {
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

			text {
				padding: 35rpx 0;
			}

			.active {
				border-bottom: 8rpx solid #FF5904;
				font-weight: bold;
			}
		}

		.myOrder-content {
			.show {
				display: block;
			}

			// >view{
			// 	display: none;

			// }
			.commonStyle {
				width: 95%;
				margin: auto;
				font-size: 30rpx;

				.item {
					background: #fff;
					margin-top: 20rpx;
					border-radius: 20rpx;
					padding: 0 20rpx 0 20rpx;

					.item-title {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0 30rpx 0;
						border-bottom: 1px solid #e0e0e0;


						.left {
							font-size: 32rpx;
							font-weight: bold;
							display: flex;
							align-items: center;

							image {
								width: 50rpx;
								height: 50rpx;
								border-radius: 50%;
								margin-right: 20rpx;
							}
						}

						.right {
							font-size: 38rpx;
							color: #333;
						}
					}

					.item-content {
						display: flex;
						padding-top: 30rpx;
						justify-content: space-between;

						.left {
							display: flex;

							image {
								width: 180rpx;
								height: 152rpx;
								border-radius: 20rpx;
								margin-right: 20rpx;
							}

							>view {
								.left-title {
									font-size: 32rpx;
								}

								view {
									font-size: 28rpx;
									color: #666;
									margin-top: 10rpx;
								}
							}
						}

						.right {
							font-size: 28rpx;
							color: #666;
						}
					}

					.item-content:last-of-type {
						border-bottom: 1px solid #e8e8e8;
						padding-bottom: 30rpx;
					}

					.item-code,
					.item-pay,
					.item-beizhu {
						padding: 20rpx 0 10rpx 0;

						text {
							color: #666;
							margin-left: 30rpx;
						}
					}

					.item-beizhu {
						text {
							color: #999;
						}
					}

					.item-total {
						display: flex;
						justify-content: space-between;
						padding: 30rpx 0;

						view {
							color: #666;

							>text {
								margin-left: 20rpx;
								color: #FF5904;
								font-size: 40rpx;
							}
						}
					}

					.item-btn {
						display: flex;
						justify-content: flex-end;
						padding-bottom: 50rpx;

						text {
							padding: 7rpx 20rpx;
							font-size: 26rpx;
							border-radius: 30rpx;
						}

						text:first-child {
							color: #999;
							border: 1px solid #999;
						}

						text:last-child {
							margin-left: 40rpx;
							color: #FF5904;
							border: 1px solid #FF5904;
						}

						.btnStata {
							color: #999 !important;
							border: 1px solid #999 !important;
						}
					}
				}
			}
		}

		// 蒙层
		.hideBox {
			display: none;
		}

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
