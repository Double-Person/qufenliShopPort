<template>
	<view class="codeReceivables">
		<commonHeader headerTitl="二维码收款" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<view class="codeReceivables-content">
			<view class="codeReceivables-content-title">
				<text class="iconfont icon-shouzhimingxicaifuhongbaoyue"></text>
				二维码收款
			</view>
			<view class="codeReceivables-content-box">
				<view class="codeReceivables-content-box-title">
					无需加好友，扫二维码向我付钱
				</view>
				
				<view class="qrimg">					 
					 <!-- background="#000000" foreground="#ffffff" pdground="#ffffff" -->
					 <tki-qrcode 
					 cid="qrcode1" ref="qrcode" :val="JSON.stringify(codeVal)" :size="size" unit="upx" 
					 
					 :icon="icon" :iconSize="40" :lv="3" :onval="true" :loadMake="true" :usingComponents="true" 
					 @result="qrR" />
					
				</view>
				<view class="codeReceivables-content-box-text">
					<text @tap="setMoney">设置金额</text><text style="color: #979797;">|</text>
					<text @tap="_saveCode">保存收款码</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	// 生成二维码
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import { merchantQrCode, baseImgUrl } from "@/common/apis.js"
	export default {
		data() {
			return {
				baseImgUrl: baseImgUrl,
				// 生成二维码
				codeVal: {
					shopId: '',
					money: 0
				},
				BacimgUrl: '',
				size: 410, // 二维码大小
				src: '', // 二维码生成后的图片地址或base64
				icon: ''
			};
		},
		components: {
			commonHeader,
			tkiQrcode
		},
		onLoad(opt) {
			
			this.codeVal.money = opt.money || 0
			this.codeVal.shopId = uni.getStorageSync('shopId');
			const shopInfo =  uni.getStorageSync('shopInfo');
			// this.icon = this.baseImgUrl + shopInfo.BGIMG;
	
			setTimeout(() =>{
				this.$refs.qrcode._makeCode()
			}, 200)
		},
		// /api/merchant/qrCode   get 请求  参数： shop_id  商家id    money 金额
		methods: {
			// 设置金额
			setMoney() {
				uni.navigateTo({
					url: "../setMoney/setMoney"
				})
			},
			qrR(e) {
				this.BacimgUrl = e;
			},
			// 保存收款码
			_saveCode() {
				this.$refs.qrcode._saveCode();
				
			},
		}
	}
</script>

<style lang="less">
	.codeReceivables {
		height: 91%;
		padding: 100rpx 20rpx 0 20rpx;
		background: linear-gradient(114deg, rgba(255, 88, 48, 1) 0%, rgba(255, 132, 0, 1) 100%);
		/* #ifdef APP-PLUS */
		padding-top: 140rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 140rpx;

		/* #endif */
		.codeReceivables-content {
			width: 100%;
			background: #fff;
			margin-top: 30rpx;
			border-radius: 20rpx;
			overflow: hidden;

			.codeReceivables-content-title {
				display: flex;
				height: 90rpx;
				background: #f7f7f7;
				align-items: center;
				font-size: 31rpx;
				color: #FF5904;

				text {
					font-size: 50rpx;
					margin-left: 33rpx;
					margin-right: 20rpx;
				}
			}

			.codeReceivables-content-box {
				text-align: center;
				padding-bottom: 100rpx;

				.codeReceivables-content-box-title {
					color: #666;
					font-size: 30rpx;
					margin: 64rpx 0;
				}

				image {
					width: 410rpx;
					height: 410rpx;
				}

				.codeReceivables-content-box-text {
					width: 410rpx;
					margin: 80rpx auto 0;
					font-size: 28rpx;
					color: #3478AD;
					display: flex;
					justify-content: space-around;
				}
			}
		}
	}
</style>
