<template>
	<view class="evaluationDetails">
		<!-- header -->
		<commonHeader headerTitl="评价详情" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 内容 -->
		<view class="content-details">
			<view>

				<view class="btn">
					<input type="text" :value="value" placeholder="商家回复..." @blur="inputTetx" />
					<text @tap="sendText">发表</text>
				</view>
			</view>
		</view>

		<view class="comment">
			<view v-for="(item,index) in info" :key="index" class="comment-item">
				<!-- <text class="name">  {{ item.USID ? itemInfo.USERNAME : '商家回复' }}:</text> -->
				<!-- {{item.USID || '商家回复'}} -->
				<text class="name"> {{ showName(item.USID) }}:</text> <!-- {{item.USID || '商家回复'}} -->
				<text class="comment-content">{{ showContent(item.REPLY, item.CONTENT ) }} </text>
				<view class="content-img-warp" v-if="item.IMGS">
					<image :src="baseImgUrl + item.IMGS" mode="" @click="previewImage(baseImgUrl + item.IMGS)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	import {
		getShopEvaluateDetail,
		getShopComment,
		baseImgUrl
	} from '@/common/apis.js'

	export default {
		name: 'EvaluationDetails',
		components: {
			commonHeader
		},
		data() {
			return {
				baseImgUrl: baseImgUrl,
				id: null,
				goods_id: null,
				itemInfo: {},
				info: {},
				value: ''
			};
		},
		onLoad(options) { // item.EVALUATE_ID, item.GOODS_ID
			this.itemInfo = JSON.parse(options.info)
			this.getInitDetail()
		},
		methods: {
			previewImage(urls) {
				uni.previewImage({ urls: [urls] });
			},
			showContent(REPLY, CONTENT) {
				if (REPLY) {
					if (REPLY == 'null') return CONTENT || ''
					else return REPLY
				} else {
					return CONTENT || ''
				}

			},
			showName(USID) {
				if (USID) {
					if (USID == 'null') return '用户'
					else return USID
				}
				return '用户'

			},
			async getInitDetail() {
				const {
					returnMsg,
					msgType
				} = await getShopEvaluateDetail({
					evaluate_id: this.itemInfo.EVALUATE_ID
				})
				msgType == 0 && (this.info = returnMsg)
			},
			// 获取用户输入内容
			inputTetx(e) {
				this.value = e.detail.value;
			},
			// 回复
			async sendText() {
				if (this.value) {
					//    itemInfo 
					let obj = {
						shop_id: uni.getStorageSync('shopId'),
						evaluate_id: this.itemInfo.EVALUATE_ID,
						reply: this.value,
						goods_id: this.itemInfo.GOODS_ID
					}
					const {
						returnMsg,
						msgType
					} = await getShopComment(obj)
					if (msgType == 0) {
						this.getInitDetail();
						this.value = '';
						uni.showToast({
							title: '回复成功！'
						})
						this.getInitDetail()
					}
				} else {
					uni.showToast({
						title: '请先输入内容！',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.content-img-warp{
		width: 100%;
		image{
			width: 150rpx;
			height: 150rpx;
			margin-left: 150rpx;
		}
	}
	.comment {
		padding: 15rpx 50rpx;

		.comment-item {
			margin-bottom: 30rpx;

			.name {
				font-weight: bold;
				margin-right: 15rpx;
			}

			.comment-content {
				word-wrap: break-word;
			}
		}
	}

	.evaluationDetails {
		padding: 100rpx 0;
		/* #ifdef APP-PLUS */
		padding-top: 140rpx;
		/* #endif */
		background: #f7f7f7;
		font-size: 30rpx;
		color: #333;
		height: 100%;

		.content-details {
			.content {
				padding: 30rpx;
				background: #fff;

				.title {
					font-weight: bold;
				}

				.date {
					color: #666;
					font-size: 24rpx;
					margin: 10rpx 0;
				}

				.text {}

				.img {
					display: flex;
					justify-content: space-around;
					padding-top: 30rpx;

					image {
						width: 200rpx;
						height: 169rpx;
						border-radius: 20rpx;
					}
				}
			}

			.shopReply {
				padding-left: 30rpx;

				.item {
					border-bottom: 1rpx solid #D8D8D8;
					padding: 30rpx 0;
					color: #666;
					font-size: 28rpx;
					display: flex;

					text {
						font-weight: bold;
						color: #333;
						width: 140rpx;
					}

					view {
						padding-right: 30rpx;
						margin-left: 10rpx;
					}
				}
			}

			.btn {
				display: flex;
				align-items: center;
				height: 100rpx;
				background: #fff;
				position: fixed;
				bottom: 0;
				width: 100%;

				input {
					height: 70rpx;
					flex: 1;
					background: #EEEFF1;
					margin: 0 30rpx;
					border-radius: 35rpx;
					text-indent: 30rpx;
				}

				text {
					width: 100rpx;

				}
			}
		}
	}
</style>
