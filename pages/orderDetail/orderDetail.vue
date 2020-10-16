<template>
	<view class="oraderDetails">
		<commonHeader headerTitl="订单详情" xingHide=true lingHide=true fenxiangHide=true>></commonHeader>
		<!-- 内容开始 -->
		<view class="oraderDetails-content" v-for="(item,index) in orderList.orderDetailList">
			<view class="oraderDetails-content-message">
				<view class="right">
					<view class="right-title">
						<view>
							订单编号：{{item.ORDERSUMMARY_ID}}
						</view>
						<view>
						退款中
						</view>
					</view>
				</view>
			</view>
			<view class="oraderDetails-content-content" v-for="(v,i) in orderList.orderGoodList">
				<view class="goodImg">
					<!-- v.IMG -->
					<image :src="'../../static/images/goods.jpg'" mode=""></image>
				</view>
				<view class="left">
					<!-- <image :src="item.goodsImg" mode=""></image> -->
					<view>
						<text class="left-title">
							商品名：{{v.NAME}}
						</text>
						<view class="left-price">
							单价：￥{{v.PRICE}}
						</view>
						<view class="left-date">
							下单时间：{{item.CREATETIME}}
						</view>
					</view>
				</view>
				<view class="right">
					X{{v.COUTNS}}
				</view>
			</view>
			<view class="oraderDetails-content-total">
				<view>
					共计5件商品
					<text>合计 ￥<text>100元</text></text>
				</view>
			</view>


			<view class="delivery">
				<view class="mydelivery">
					配送信息
				</view>
				<view class="oraderDetails-content-code">
					收货人：<text>{{item.USERNAME}}</text>
				</view>
				<view class="oraderDetails-content-pay">
					收货人电话：<text>{{item.PHONE}}</text>
				</view>
				<view class="oraderDetails-content-shop">
					收货人地址：<text>{{item.AREA}}{{item.ADDRESS}}</text>
				</view>
				<view class="oraderDetails-content-shop">
			    备注：<text>{{item.REMARKS}}</text>
				</view>
			</view>
			<view class="OrderInfo">
				<view class="MyOrderInfo">
					订单信息
				</view>
				<view class="oraderDetails-content-code">
					订单编号<text>{{item.ORDERNO}}</text>
				</view>
				<view class="oraderDetails-content-pay">
					付款方式：<text>{{item.PAYTYPEY=='0'&&'微信' || item.PAYTYPEY=='1'&&'支付宝' ||item.PAYTYPEY=='2'&&'余额支付'|| item.PAYTYPEY=='3'&&'银行卡'}}</text>
				</view>
				<view class="oraderDetails-content-code">
					下单时间：<text>{{item.CREATETIME}}</text>
				</view>
				<view class="oraderDetails-content-code" v-show="refund">
					退款原因：<text>{{item.REFUNDCAUSE}}</text>
				</view>
			</view>
		</view>
		<!-- 内容结束 -->
	
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header"
	export default {
		data() {
			return {
				ORDERSUMMARY_ID: '',
				orderList: [],
				refund:false
			}
		},
		components: {
			commonHeader
		},
		onShow() {
			this.getOrder()
		},
		methods: {
			getOrder() {
				uni.request({
					url: "https://yflh.hkzhtech.com/qufl/api/merchant/ordersummarydetail",
					method: 'GET',
					data: {
						ORDERSUMMARY_ID: this.ORDERSUMMARY_ID
					},
					success: (data) => {
						console.log(data.data)
						this.orderList = data.data
					},
					fail: (err) => {

					}
				})
			}
		},
		onLoad(options) {
			this.ORDERSUMMARY_ID = options.shopid
			if(options.topIndex=="退款中"||options.topIndex=="退款成功"){
				this.refund=true
			}else{
				this.refund=false
			}
			
		}
	}
</script>


<style lang="less">
	.oraderDetails {
		min-height: 100%;
		background: #f6f7f8;
		padding: 120rpx 0;
		/* #ifdef APP-PLUS */
		padding-top: 160rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 160rpx;

		/* #endif */
		.oraderDetails-content {
			width: 90%;
			margin: auto;
			padding: 0 20rpx;
			border-radius: 20rpx;
			font-size: 30rpx;
			color: #333;

			.oraderDetails-content-message {
				display: flex;
				padding: 20rpx 20rpx;
				align-items: center;
				border-bottom: 1px solid #e0e0e0;
				background: #fff;

				.left {
					width: 66rpx;
					height: 66rpx;
					background: linear-gradient(143deg, rgba(255, 119, 43, 1) 0%, rgba(255, 91, 52, 1) 100%);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					border-radius: 50%;
					margin-right: 20rpx;

					text {
						font-size: 40rpx;
					}
				}

				.right {
					flex: 1;

					.right-title {
						display: flex;
						justify-content: space-between;

						view {
							font-size: 32rpx;
							font-weight: bold;
						}

						text {
							color: #666;
						}
					}

					.right-address {
						margin-top: 20rpx;
						line-height: 42rpx;
					}
				}
			}

			.oraderDetails-content-content {
				display: flex;
				padding: 30rpx 20rpx;
				justify-content: space-between;
				background: #fff;

				.goodImg {
					width: 180rpx;
					height: 152rpx;
					border-radius: 10rpx;
					overflow: hidden;

					// border: 1rpx solid red;
					image {
						width: 100%;
						height: 100%;
					}
				}

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

			.oraderDetails-content-total {
				display: flex;
				justify-content: flex-end;
				padding: 20rpx 20rpx;
				background: #fff;

				view {
					>text {
						margin-left: 40rpx;
						color: #666;

						text {
							color: #FF5904;
						}
					}
				}
			}

			.oraderDetails-content-cause {
				padding: 30rpx 0;
			}

			.oraderDetails-content-code,
			.oraderDetails-content-pay,
			.oraderDetails-content-shop {
				padding: 20rpx 0;

				text {
					margin-left: 30rpx;
					color: #666;
				}
			}

			// .oraderDetails-content-shop {
			// 	text {
			// 		color: #0E88FF;
			// 	}
			// }

			.oraderDetails-content-btn {
				display: flex;
				justify-content: flex-end;
				padding: 30rpx 0;

				text {
					padding: 10rpx 40rpx;
					border: 1px solid #999;
					color: #999;
					font-size: 24rpx;
					border-radius: 40rpx;
				}
			}
		}

		.delivery,
		.OrderInfo {
			background: #fff;
			padding: 30rpx 20rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
		}

		.mydelivery,
		.MyOrderInfo {
			border-bottom: 2rpx solid #e0e0e0;
			padding-bottom: 10rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>
