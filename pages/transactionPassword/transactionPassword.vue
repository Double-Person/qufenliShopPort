<template>
	<view class="loginPassword">
		<!-- header -->
		<commonHeader headerTitl="修改交易密码" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<view class="tips">
			请输入交易密码
		</view>
		<input type="password" placeholder-style="color:#333" v-if="isSet" v-model="form.paypass" placeholder="请输入原密码" />
		<input type="password" placeholder-style="color:#333" v-model="form.npaypass" placeholder="请输入新密码" />
		<input type="password" placeholder-style="color:#333" v-model="form.newpaypass" placeholder="请再次输入新密码" />
		<view class="submit" @tap="submit">
			确认修改
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header"
	import {
		changeDealPwd,
		shoppwdInfo
	} from '@/common/apis.js'

	export default {
		components: {
			commonHeader
		},
		data() {
			return {
				isSet: false,
				form: {
					phone: '',
					paypass: '',
					npaypass: '',
					newpaypass: ''
				}
			};
		},

		onLoad() {
			this._shoppwdInfo()
		},

		methods: {
			async _shoppwdInfo() {
				let shop_id = uni.getStorageSync('shopId');
				let {
					returnMsg
				} = await shoppwdInfo({
					shop_id
				});
				if (returnMsg == "已经设置交易密码")
					this.isSet = true
				else
					this.isSet = false
			},
			async submit() {
				if(this.isSet == true && this.form.paypass == '') {
					 uni.showToast({
					 	title: '请输入原密码！',
					 	icon: 'none'
					 })
					 return false
				}
				if (this.form.npaypass == '' || this.form.newpaypass == '') {
					uni.showToast({
						title: '请输入新密码！',
						icon: 'none'
					})
					return false
				}
				if (this.form.npaypass != this.form.newpaypass) {
					uni.showToast({
						title: '兩次新密码不一致！',
						icon: 'none'
					})
					return false
				}
				const info = uni.getStorageSync('user')
				const params = {
					...this.form
				}
				// #ifdef H5
				params.phone = JSON.parse(info).phone
				// #endif
				// #ifndef H5
				params.phone = info.phone
				// #endif
				const res = await changeDealPwd(params)
				console.log(res)
				uni.showToast({
					title: res.errMsg,
					icon: 'none'
				})
				
				if (returnMsg === '修改成功') {
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="less">
	.loginPassword {
		color: #333;
		background: #f6f7f8;
		height: 100%;
		padding-top: 90rpx;
		/* #ifdef APP-PLUS */
		padding-top: 130rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 130rpx;

		/* #endif */
		.tips {
			padding: 40rpx 0 40rpx 30rpx;
			font-size: 41rpx;
		}

		input {
			height: 90rpx;
			background: #fff;
			text-indent: 30rpx;
			border-bottom: 1px solid #e0e0e0;
		}

		.submit {
			height: 88rpx;
			line-height: 88rpx;
			width: 95%;
			margin: 150rpx auto 0;
			border-radius: 10rpx;
			text-align: center;
			color: #fff;
			background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
			box-shadow: 0px 10rpx 6px #FF9960;
		}
	}
</style>
