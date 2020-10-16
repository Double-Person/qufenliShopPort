<template>
	<view class="setMoney">
		<commonHeader headerTitl="设置金额" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<view class="setMoney-content">
			<view class="top">
				收款金额
			</view>
			<view class="price">
				<text>￥</text>
				<input @blur="getInput" type="text" value="" auto-focus="true" />
			</view>
			<!-- 			<view class="tips">
				添加收钱备注
			</view> -->
			<view class="submit-btn" @tap="submit">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	import {
		merchantQrCode
	} from '../../common/apis.js'
	export default {
		data() {
			return {
				input: ''
			};
		},
		components: {
			commonHeader
		},
		methods: {
			getInput(e) {
				this.input = e.target.value;
			},
			submit() {

				this.getCode()
				uni.navigateBack(1)
			},
			getCode() {
				let shop_id = ''
				try {
					const value = uni.getStorageSync('shopId');
					if (value) {
						shop_id = value
					}
				} catch (e) {
					console.log(e)
				}
				merchantQrCode({
					shop_id,
					money: this.input
				}).then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="less">
	.setMoney {
		background: #f7f7f7;
		height: 100%;
		padding-top: 130rpx;
		/* #ifdef APP-PLUS */
		padding-top: 170rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 170rpx;
		/* #endif */
		font-size: 30rpx;

		.setMoney-content {
			background: #fff;
			width: 85%;
			margin: auto;
			padding: 30rpx;

			.price {
				padding: 30rpx 0;
				border-bottom: 1px solid #e4e4e4;
				display: flex;
				align-items: center;

				text {
					font-size: 60rpx;
					font-weight: bold;
				}

				input {
					font-size: 60rpx;
					font-weight: bold;
				}
			}

			.tips {
				margin-top: 20rpx;
				color: blue;
			}

			.submit-btn {
				width: 100%;
				background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
				height: 88rpx;
				border-radius: 10rpx;
				color: #fff;
				font-size: 40rpx;
				margin: 50rpx auto 50rpx;
				text-align: center;
				line-height: 88rpx;
				box-shadow: 0 10rpx 20rpx #FF9960;
			}
		}
	}
</style>
