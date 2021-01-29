<template>
	<view class="todayOrder">
		<!-- header -->
		<commonHeader headerTitl="累计订单"></commonHeader>
		<!-- 日期 -->
		<view class="todayOrder-date">
			<!-- 日期选择 -->
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<text class="iconfont icon-zuishao"></text>
		</view>
		<!-- 主要内容 -->
		<view class="todayOrder-content">
			<view class="commonStyle">
				<view class="item" v-for="item in orderList" :key="item.id">
					<view class="item-title">
						<view class="left">
							<image :src="item.FACEICON?(baseImgUrl + item.FACEICON):'/static/images/cartLOGO.png'" mode=""></image>
							<text>{{item.ORDERNO}}</text>
						</view>
						<view class="right">
							{{item.STATE==0&&'未付款'||item.STATE==1&&'已付款'||item.STATE==2&&'退款中'||item.STATE==3&&'退款成功'||item.STATE==4&&'已完成'}}
						</view>
					</view>

					<view v-for="(good,indey) in item.ordergoods" :key="indey">
						<view class="item-content">
							<view class="left">
								<image :src="baseImgUrl + good.IMG" mode=""></image>
								<view>
									<text class="left-title">
										{{good.NAME}}
									</text>

									<view class="left-price">
										单价：￥{{good.PRICE}}
									</view>
								</view>
							</view>
							<view class="right">
								X{{good.COUTNS}}
							</view>
						</view>
					</view>


					<view class="item-code">
						订单编号：<text>{{item.ORDERNO}}</text>
					</view>
					<view class="item-code">
						下单时间：{{item.CREATETIME}}
					</view>
					<view class="item-pay">
						付款方式：<text>{{item.PAYTYPEY==0 && '微信支付'||item.PAYTYPEY==1 && '支付宝支付'||item.PAYTYPEY==3 && '银行卡支付'||item.PAYTYPEY==2 && '余额支付'}}</text>
					</view>
					<view class="item-stock">
						收货地址：<text>{{item.ADDRESS}}</text>
					</view>
					<view class="item-total">
						<text></text>
						<view>
							共计{{item.counts}}件商品
							<text>合计 ￥<text>{{item.PAYABLE}}</text></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示内容 -->
		<view class="mybalance-tips" style="color: #666;textAlign: center;" :class="tipsState?'tipsState':''">
			暂无信息哟！
		</view>
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	// tabbar
	import tabbar from "@/components/common-tabbar/common-tabbar";
	import {
		orderTotal,
		baseImgUrl
	} from '@/common/apis.js';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				baseImgUrl: baseImgUrl,
				// 日期选择
				date: currentDate,
				// 订单内容
				orderList: [

				],
				// 提示信息
				tipsState: true
			};
		},
		methods: {
			// 日期选择
			bindDateChange: function(e) {
				console.log(e.detail.value)
				var arr = e.detail.value.split('-');
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				orderTotal({
					shop_id: uni.getStorageSync('shopId'),
					data: e.detail.value
				}).then((res) => {
					this.orderList = res.returnMsg.type_order
				}).catch(err => {
					uni.showToast({
						title: '网络出错啦!',
						icon: 'none'
					})
				}).finally(() => uni.hideLoading())
				this.date = `${arr[0]}-${arr[1]}-${arr[2]}`;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					// year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		components: {
			commonHeader,
			tabbar
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		mounted() {
			uni.getStorage({
				key: 'shopId',
				success: (res) => {
					uni.showLoading({ title: '加载中', mask: true })
					orderTotal({ shop_id: res.data, data: '' }).then(res => {
						this.orderList = res.returnMsg.type_order
					}).catch(err => {
						uni.showToast({ title: '网络出错啦!', icon: 'none' })
					}).finally(() => uni.hideLoading())
				}
			})
		}
	}
</script>

<style lang="less">
	.todayOrder {
		min-height: 100%;
		background: #f7f7f7;
		padding-top: 180rpx;
		/* #ifdef APP-PLUS */
		padding-top: 220rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 220rpx;
		/* #endif */
		padding-bottom: 120rpx;

		// 日期选择
		.todayOrder-date {
			height: 100rpx;
			background: #f8f6f9;
			padding-left: 30rpx;
			line-height: 100rpx;
			font-size: 36rpx;
			display: flex;
			position: fixed;
			top: 90rpx;
			/* #ifdef APP-PLUS */
			top: 130rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			top: 130rpx;
			/* #endif */
			width: 100%;
			z-index: 100;

			text {
				font-size: 20rpx;
				color: #999;
				margin-left: 15rpx;
			}
		}

		// 主要内容
		.commonStyle {
			width: 95%;
			margin: auto;
			font-size: 30rpx;

			.item {
				background: #fff;
				margin-top: 20rpx;
				border-radius: 20rpx;
				padding: 0 20rpx 0rpx 20rpx;

				.item-title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 0;
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
						font-size: 30rpx;
						color: #999;
					}
				}

				.item-content {
					display: flex;
					padding: 30rpx 0;
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

				.item-code,
				.item-pay,
				.item-stock {
					padding: 30rpx 0;

					text {
						color: #666;
						margin-left: 30rpx;
					}
				}

				.item-stock {
					border-bottom: 1px solid #e0e0e0;
				}

				.item-total {
					display: flex;
					justify-content: space-between;
					padding: 30rpx 0;

					view {
						>text {
							color: #666;
							margin-left: 40rpx;

							text {
								color: #FF5904;
							}
						}
					}
				}
			}
		}

		.tipsState {
			display: none;
		}
	}
</style>
