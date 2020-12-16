<template>
	<view class="bindAlipay">
		<!-- header -->
		<commonHeader headerTitl="绑定支付宝" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 内容 -->
		<view class="bindAlipay-content">
			<view class="bindAlipay-content-item">
				<text>姓名</text>
				<input type="text" v-model="name" placeholder-style="color:#999;fontSize:28rpx;" placeholder="请输入姓名，实名不一致将导致提现失败" />
			</view>
			<view class="bindAlipay-content-item">
				<text>支付宝账号</text>
				<input type="text" v-model="wxNum" placeholder-style="color:#999;fontSize:28rpx;" placeholder="请输入支付宝账号" />
			</view>
			<view class="bindAlipay-content-item">
				<text>手机号</text>
				<input type="text" v-model="phone" maxlength="11" placeholder-style="color:#999;fontSize:28rpx;" placeholder="请输入手机号" />
			</view>
			<view class="bindAlipay-content-item">
				<text>验证码</text>
				<view>
					<input type="text" v-model="code" placeholder-style="color:#999;fontSize:28rpx;" placeholder="请填写验证码" />
					<button class="testCode" :class="selectCode?'selectCode':''" :disabled="disabled" @tap="getCode">{{codeText}}</button>
				</view>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="submit-btn" @tap="goBack">
			提交
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	import {
		sendCode,
		aliAccount
	} from '@/common/apis.js';
	export default {
		data() {
			return {
				selectCode: false,
				disabled: false,
				codeText: "获取验证码",
				name: '',
				wxNum: '',
				phone: '',
				code: ''
			};
		},
		components: {
			commonHeader
		},
		methods: {
			goBack() {
				if (!this.name) {
					uni.showToast({
						title: '请输入姓名！',
						icon: 'none'
					})
					return false
				}
				if (!this.wxNum) {
					uni.showToast({
						title: '请输入微信账号！',
						icon: 'none'
					})
					return false
				}
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号码！',
						icon: 'none'
					})
					return false
				}
				if (!this.code) {
					uni.showToast({
						title: '请输入验证码！',
						icon: 'none'
					})
					return false
				}
				let obj = {
					NAME: this.name, 
					ZFB: this.wxNum,
					CELLPHONE: this.phone,
					code: this.code,
					SHOP_ID: uni.getStorageSync('shopId')
				}
				aliAccount(obj).then(res => {
					console.log(res)
					if(res.returnMsg.status == '00') {
						uni.showToast({
							title: '绑定成功',
							icon: 'none'
						})
					}else if(res.returnMsg.status == '01') {
						uni.showToast({
							title: '验证码为空',
							icon: 'none'
						})
					}else if(res.returnMsg.status == '02') {
						uni.showToast({
							title: '验证码不正确',
							icon: 'none'
						})
					}else if(res.returnMsg.status == '03') {
						uni.showToast({
							title: '验证码超时',
							icon: 'none'
						})
					}else if(res.returnMsg.status == '04') {
						uni.showToast({
							title: '未实名认证',
							icon: 'none'
						})
					}else if(res.returnMsg.status == '05') {
						uni.showToast({
							title: '真实姓名不一致',
							icon: 'none'
						})
					}else if(res.returnMsg.status == '06') {
						uni.showToast({
							title: '手机号错误',
							icon: 'none'
						})
					}else{
						return uni.showToast({
							title: '绑定失败',
							icon: 'none'
						})
					}
				})
				// #ifdef H5
				let canBack = true;
				const pages = getCurrentPages();
				// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回  
				if (pages.length > 1) {
					uni.navigateBack(1)
					return;
				}
				// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载  
				let a = this.$router.go(-1)
				// router.go失败之后则重定向到首页  
				if (a == undefined) {
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}
				return;
				// #endif  
				uni.navigateTo({
					url: "/pages/myCard/myCard"
				})
			},
			getCode() {
				if (this.phone.length !== 11) {
					uni.showToast({
						title: '请输入11位手机号码！',
						icon: 'none'
					})
					return false
				}
				// 发送验证码
				sendCode({
					MOBILE: this.phone
				}).then(res => {
					if (res.returnMsg.status == '00') {
						uni.showToast({
							title: '发送成功！',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '发送失败！',
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: '发送失败！',
						icon: 'none'
					})
				})
			},
		}
	}
</script>

<style lang="less">
	.bindAlipay {
		min-height: 97%;
		background: #f7f7f7;
		padding-top: 120rpx;
		color: #333;
		font-size: 30rpx;
		/* #ifdef APP-PLUS */
		padding-top: 160rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 160rpx;

		/* #endif */
		.bindAlipay-content {
			background: #fff;
			padding-left: 30rpx;

			.bindAlipay-content-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #e0e0e0;
				height: 90rpx;
				align-items: center;

				text {
					width: 200rpx;
				}

				input {
					width: 250rpx;
				}

				view {
					display: flex;

					input {
						width: 200rpx;
					}

					.testCode {
						font-size: 30rpx;
						color: #FF5904;
						padding: 10rpx 25rpx;
						background: #f1f1f1;
						border-radius: 40rpx;
						margin-right: 30rpx;
						opacity: 0.5;
					}

					/deep/ uni-button {
						line-height: 1em;
					}

					/deep/ button {
						line-height: 1em;
					}
				}
			}

			.bindAlipay-content-item:first-child {
				input {
					flex: 1;
				}
			}

			uni-button {
				line-height: 1em;
				padding: 0;
			}
		}

		.submit-btn {
			width: 95%;
			background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
			height: 88rpx;
			border-radius: 10rpx;
			color: #fff;
			font-size: 40rpx;
			margin: 150rpx auto 90rpx;
			text-align: center;
			line-height: 88rpx;
			box-shadow: 0 10rpx 20rpx #FF9960;
		}
	}
</style>
