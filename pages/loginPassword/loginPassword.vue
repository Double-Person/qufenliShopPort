<template>
	<view class="loginPassword">
		<!-- header -->
		<commonHeader headerTitl="修改密码" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<view class="tips">
			请输入登录密码
		</view>
		<input type="password" v-model="form.loginpass" placeholder-style="color:#333" value="" placeholder="请输入原密码" />
		<input type="password" v-model="form.nloginpass" placeholder-style="color:#333" value="" placeholder="请输入新密码" />
		<input type="password" v-model="form.newloginpass" placeholder-style="color:#333" value="" placeholder="请再次输入新密码" />
		<view class="submit" @tap="submit">
			确认修改
		</view>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header"
	import {
		changeLoginPwd
	} from '@/common/apis.js'
	export default {
		data() {
			return {
				form: {
					phone: '',
					loginpass: '',
					nloginpass: '',
					newloginpass: ''
				}
			}
		},
		components: {
			commonHeader
		},
		mounted() {},
		methods: {
			async submit() {
				const info = await uni.getStorageSync('user');
				const params = {
					...this.form
				}
				let { loginpass, nloginpass, newloginpass } = this.form;
				if(loginpass.trim() === '') {
					return uni.showToast({ title: '原密码不能为空', icon: 'none' })
				}
				if(nloginpass.trim() === '') {
					return uni.showToast({ title: '新密码不能为空', icon: 'none' })
				}
				if(newloginpass.trim() === '') {
					return uni.showToast({ title: '确认新密码不能为空', icon: 'none' })
				}
				if(newloginpass.trim() != nloginpass.trim()) {
					return uni.showToast({ title: '两次新密码不一致', icon: 'none' })
				}

				params.phone = JSON.parse(info).phone;

				const res = await changeLoginPwd(params)

				if (res.returnMsg === '修改成功') {
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					setTimeout(() => {
						// 	uni.reLaunch({
						// 		url: "/pages/index/index"
						// 	})
					}, 1000)

				} else {
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					})
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
