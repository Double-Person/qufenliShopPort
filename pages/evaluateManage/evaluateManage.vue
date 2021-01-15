<template>
	<view class="myEvaluate">
		<!-- header -->
		<commonHeader headerTitl="评价管理"></commonHeader>
		<!-- 内容开始 -->
		<view class="myEvaluate-content">
			<view class="myEvaluate-content-item" v-for="item in myEvaluateList" :key="item.id">
				<view class="title">
					{{item.USERNAME || '发布人'}}
				</view>
				<view class="date">
					{{item.PHONE}}
				</view>
				<view class="content" @tap="goDetails(item)">
					<view class="content-left">
						<image :src="baseImgUrl + item.IMG" mode=""></image>
					</view>
					<view class="content-right">
						<text>下单时间：{{item.CREATETIME}}</text>
						<view>商品id：{{item.GOODS_ID}}</view>
						<view>评分：{{ item.SCORE || 0 }}</view>
						<view>支付方式：{{ (item.PAYTYPEY == 2 && '余额支付') || (item.PAYTYPEY == 0 && '微信支付') || (item.PAYTYPEY == 1 && '支付宝支付') || (item.PAYTYPEY == 3 && '银行卡支付') }}</view>
						<view>收货地址：{{item.ADDRESS}}</view>
					</view>

				</view>
				<view class="btn">
					<text @tap="deleteEvaluate(item.EVALUATE_ID)">删除</text>
					<text @tap="goDetails(item)">回复</text>
				</view>
			</view>
		</view>
		<!-- 内容结束 -->

		<!-- 验证密码蒙层 -->
		<!-- 		<view class="shopManage-testPwd" :class="hideBox?'hideBox':''">
			<view class="shopManage-testPwd-title">
				请输入登录密码
			</view>
			<testCode @isPwdStata="inputPwdStata" :focusStata='focusStata'></testCode>
		</view> -->


		<!-- tabbar -->
		<tabbar active="4"></tabbar>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	import tabbar from "@/components/common-tabbar/common-tabbar";
	import {
		getShopEvaluateList,
		delShopEvaluate,
		baseImgUrl
	} from "@/common/apis.js"
	export default {
		name: 'EvaluateManager',
		components: {
			commonHeader,
			tabbar
		},
		data() {
			return {
				baseImgUrl: baseImgUrl,
				myEvaluateList: [
					// {id:"01",title:"豆浆油条先生",date:"2019-09-01 15:30","goodsUrl":"../../static/images/content01.png",date:"2019-11-11 08:11",text:"这个意大利面真的是撒飒飒太好吃下次还要再来飒飒as一份这个意大利面真的是太好吃下次还要再来一份大厦上师大奥"},
				],
				// 显示隐藏密码框
				hideBox: false,
				focusStata: false,
			};
		},
		onShow() {
			this.getEvalist()
		},
		methods: {
			// 获取评论列表
			async getEvalist() {
				uni.showLoading({
					title: '加载中'
				})
				const {
					returnMsg,
					msgType
				} = await getShopEvaluateList({
					shop_id: uni.getStorageSync('shopId')
				})
				msgType == 0 && (this.myEvaluateList = returnMsg)
				uni.hideLoading()
			},
			// 删除
			async deleteEvaluate(EVALUATE_ID) {
				const { msgType } = await delShopEvaluate({EVALUATE_ID})
				msgType == 0 && this.getEvalist()
				msgType == 0 && uni.showToast({ title: '删除成功！' })
			},
			// 密码输入状态
			inputPwdStata(e) {
				if (e) {
					this.hideBox = true
				}
			},
			// 进入评价详情
			goDetails(item) {
				uni.navigateTo({
					// url: '../evaluationDetails/evaluationDetails?id=' + id + '&gid=' + gid,
					url: '../evaluationDetails/evaluationDetails?info=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="less">
	.myEvaluate {
		min-height: 100%;
		background: #f6f7f8;
		padding: 130rpx 0 120rpx 0;
		/* #ifdef APP-PLUS */
		padding-top: 170rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 170rpx;

		/* #endif */
		.myEvaluate-content {
			.myEvaluate-content-item {
				background: #fff;
				padding: 0 20rpx;
				width: 90%;
				margin: 0 auto 30rpx;
				border-radius: 20rpx;
				color: #333;

				.title {
					padding-top: 30rpx;
					font-weight: bold;
					font-size: 30rpx;
				}

				.date {
					font-size: 24rpx;
					color: #666;
					padding: 20rpx 0;
					border-bottom: 1px solid #e0e0e0;
				}

				.content {
					display: flex;
					padding: 30rpx 0;

					.content-left {
						width: 180rpx;
						height: 152rpx;
						border-radius: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.content-right {
						margin-left: 20rpx;
						flex: 1;
						margin-top: -10rpx;

						text {
							font-size: 28rpx;
							color: #666;
						}

						view {
							margin-top: 10rpx;
							// height: 105rpx;
							width: 461rpx;
							color: #999;
							font-size: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
						}
					}
				}

				.btn {
					display: flex;
					justify-content: flex-end;
					padding-bottom: 20rpx;

					text {
						padding: 9rpx 44rpx;
						color: #FF6504;
						border: 1px solid #FF6504;
						border-radius: 44rpx;
						font-size: 24rpx;
					}

					text:first-child {
						margin-right: 30rpx;
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
