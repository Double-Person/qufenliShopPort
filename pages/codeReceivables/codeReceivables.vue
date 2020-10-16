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
					<tki-qrcode ref="qrcode" cid="tki-qrcode-canvas" :val="codeVal" :size="size" unit="upx" background="#000000"
					 foreground="#ffffff" pdground="#ffffff" icon="../../static/images/codeImg.jpg" :iconSize='40' :lv="3" :onval="true"
					 :loadMake="true" :usingComponents="true" :showLoading="true" loadingText="二维码生成中" @result="qrR" />
				</view>
				<view class="codeReceivables-content-box-text">
					<text @tap="setMoney">设置金额</text><text style="color: #979797;">|</text>
					<text @tap="saveImg">保存收款码</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	// 生成二维码
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				// 生成二维码
				// codeVal:'https://yflh.hkzhtech.com/qufl/#/pages/setMoney/setMoney',
				codeVal: "./setMoney/setMoney",
				size: 410,
				BacimgUrl: ''
			};
		},
		components: {
			commonHeader,
			tkiQrcode
		},
		// /api/merchant/qrCode   get 请求  参数： shop_id  商家id    money 金额
		methods: {
			// 保存收款码
			saveImg() {
				// uni.downloadFile({
				// 	url:'http://a0.att.hudong.com/78/52/01200000123847134434529793168.jpg',
				// 	success: (res) => {
				// 		if (res.statusCode === 200) {
				// 			uni.saveImageToPhotosAlbum({
				// 				filePath: res.tempFilePath,
				// 				success: function() {
				// 					uni.showToast({
				// 						title: "保存成功",
				// 						icon: "none"
				// 					});
				// 				},
				// 				fail: function() {
				// 					uni.showToast({
				// 						title: "保存失败，请稍后重试",
				// 						icon: "none"
				// 					});
				// 				}
				// 			});
				// 		}
				// 	}
				// })
				// this.qrR()
				this._saveCode() 
			},
			// 设置金额
			setMoney() {
				uni.navigateTo({
					url: "../setMoney/setMoney"
				})
			},
			qrR(e) {
				this.BacimgUrl = e;
			},
			_saveCode() {
				let imgUrl = this.BacimgUrl;
				if (imgUrl != "") {
					uni.saveImageToPhotosAlbum({
						filePath: imgUrl,
						success: function() {
							uni.showToast({
								title: '二维码保存成功',
								icon: 'success',
								duration: 2000
							});
						}
					});
				}
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
