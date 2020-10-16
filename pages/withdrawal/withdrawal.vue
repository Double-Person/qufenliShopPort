<template>
	<view class="warp">
		<!-- header -->
		<commonHeader headerTitl="提现" isShowHistory xingHide=true lingHide=true fenxiangHide=true></commonHeader>

		<view class="content">
			<view class="fl-center-between user-info">
				<image class="user-ava" :src="userInfo.FACEICON" mode=""></image>
				<view class="fl-center-between info-icon">
					<view class="user">
						<view class="name">
							{{userInfo.USERNAME}}
						</view>
						<view class="phone">
							{{computedPhone(userInfo.PHONE)}}
						</view>
					</view>
					<view class="icon" @click="userInfolick">
						<image class="img" src="../../static/images/more.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="money">
				<image class="img" src="../../static/images/money.png" mode=""></image>
				<view class="mask top-mask">
					￥ {{userInfo.BALANCE}}
					<!-- {{item.zbalance}} -->
				</view>
				<view class="mask bottom-mask">
					￥ {{ kbalance || 0}}
					<!-- {{item.kbalance}} -->
				</view>
			</view>

			<view class="fl-center-between withdrawal-amount">
				<text class="symbol">¥</text>
				<input type="text" class="input" v-model.number="money" placeholder="输入提现金额" />
				<text class="all" @click="balanceAll()">全部</text>
			</view>
			<view class="fl-center-between from" v-if="list.length">
				<view class="bank">
					<view class="info-text from-item">
						提现到
					</view>
					<view class="info-text">
						<!-- 招商银行（8707） -->
						{{list[0].BANK}} ({{ (list[0].CARDNO).length > 4 ? (list[0].CARDNO).slice((list[0].CARDNO).length-4, (list[0].CARDNO).length) : list[0].CARDNO }})
					</view>
				</view>
				<view class="icon" @click="showCardList">
					<image class="img" src="../../static/images/more.png" mode=""></image>
				</view>

			</view>
			<view class="" v-show="isShowChangeCard" class="change-card-list">
				<view class="list" v-for="(item, index) in list">
					<view class="fl-center-between item" @click="changeCardId(item.CARDNO)">
						<view>{{item.BANK}} {{computedPhone(item.CARDNO)}}</view>
						<icon type="success_no_circle" size="20" v-if="cardNum == item.CARDNO" />
					</view>
				</view>
			</view>



			<view class="tips">
				<view>注意：满一元可以提现，提现收取手续费2% </view>
				<view>
					预计2个工作日内到账，请注意查收
				</view>
			</view>
			<view class="btn" @click="getWithdrawal"> 提现 </view>
		</view>


	</view>
</template>

<script>
	// header
	import commonHeader from "@/components/common-header/common-header";
	import {
		withdrawal,
		backCardInfo
	} from "@/common/apis.js";
	export default {
		components: {
			commonHeader,
		},
		data() {
			return {
				userInfo: {},
				isShowChangeCard: false,
				list: [],
				money: null,
				cardNum: '', // 卡号
				kbalance: 0, // uni.setStorageSync('kbalance')
			};
		},
		onLoad() {
			this.getBackCardInfo()
			this.userInfo = uni.getStorageSync('userInfo');
			this.kbalance = uni.getStorageSync('kbalance');

			console.log(this.userInfo)
		},
		methods: {
			//  转银行卡账号 和手机号
			computedPhone(phone) {
				let phoneStr = phone.toString();
				if (phoneStr.length < 11) {
					return phone
				}
				return phone.substring(0, 5) + '***' + phone.substring(phoneStr.length - 3, phoneStr.length)
			},
			// 选择提现的卡
			changeCardId(card) {
				this.cardNum = card
				this.isShowChangeCard = false
			},
			showCardList() {
				this.isShowChangeCard = !this.isShowChangeCard
			},
			userInfolick() {
				uni.navigateTo({
					url: '/pages/personalData/personalData'
				})
			},
			// 全部体现
			balanceAll() {
				this.money = this.kbalance
			},
			//  获取银行卡信息
			getBackCardInfo() {
				let userinfo_id = uni.getStorageSync('USERINFO_ID');
				backCardInfo({
					userinfo_id
				}).then(res => {
					console.log('获取银行卡信息', res.returnMsg)
					this.list = res.returnMsg
					if (res.returnMsg.length > 0) {
						this.cardNum == res.returnMsg[0].card
					}
				})
			},
			// 提现
			getWithdrawal() {
				let userinfo_id = uni.getStorageSync('USERINFO_ID');

				this.money = Number(Number(this.money).toFixed(2))
				if (this.money <= 0) {

					// this.money = null
					uni.showToast({
						duration: 2000,
						title: '请输入正确的提现金额',
						icon: 'none'
					})
					return false;
				}

				if (!this.cardNum) {
					this.cardNum = this.list[0].CARDNO
				}
				console.log(this.list)
				let obj = {
					userinfo_id, // 参数userinfo_id  用户id
					amount: Number(this.money), // amount  金额  
					cardNum: this.cardNum // cardNum卡号  this.cardNum == 
				}
				console.log(obj)
				withdrawal(obj).then(res => {
					console.log(res)
					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/personal/personal'
						})
					})
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 690rpx;
		margin: 0 auto;
	}

	.padding30 {
		padding: 30rpx;
	}

	.fl-center-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.warp {
		background: #F7F7F7;
		height: 100vh;
	}

	.icon {
		.img {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.user-info {
		flex: 1;
		height: 160rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		margin: 100rpx 0 21rpx 0;
		padding: 30rpx;

		.user-ava {
			width: 120rpx;
			height: 100rpx;
			padding-right: 20rpx;
			border-radius: 50%;
			border: none;
		}

		.info-icon {

			width: 100%;

			.user {
				.name {
					height: 42rpx;
					font-size: 30rpx;
					font-weight: 600;
					color: #333333;
					line-height: 42rpx;
				}

				.phone {
					height: 40rpx;
					font-size: 28rpx;
					color: #666666;
					line-height: 40rpx;
				}
			}


		}

	}

	.money {
		width: 690rpx;
		position: relative;

		.img {
			height: 200rpx;
			width: 690rpx;
			vertical-align: middle;
			object-fit: cover;
		}

		.mask {
			position: absolute;
			width: 170rpx;
			height: 95rpx;
			right: 0;
			background: #fff;
			line-height: 92rpx;
			font-size: 28rpx;
			overflow: hidden;

		}

		.top-mask {
			top: 0;
			color: #FF3535;
		}

		.bottom-mask {
			bottom: 0;
			color: #333333;
		}
	}

	.withdrawal-amount {
		margin-top: 20rpx;
		padding: 30rpx;
		background: #fff;

		.symbol {
			width: 30rpx;
			height: 69rpx;
			font-size: 49rpx;
			font-weight: 600;
			color: #333333;
			line-height: 69rpx;

		}

		.input {
			width: 68%;
		}

		.input-placeholder {
			font-size: 29rpx;
			color: #999999;
		}

		.all {
			width: 58rpx;
			font-size: 29rpx;
			color: #1979FF;
			line-height: 41rpx;

		}
	}

	.from {
		height: 130rpx;
		background: #FFFFFF;
		border-top: #D8D8D8 1rpx solid;
		padding: 0 30rpx 27rpx 30rpx;

		.from-item {
			margin: 14rpx 0 15rpx 0;
		}

		.info-text {
			height: 37rpx;
			font-size: 26rpx;
			font-weight: 600;
			color: #333333;
			line-height: 37rpx;
		}
	}

	.change-card-list {
		margin-top: 10rpx;
		background: #fff;

		.item {
			border-bottom: 1rpx solid #eee;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 30rpx;
		}
	}


	.tips {
		margin-top: 21rpx;
		height: 81rpx;
		font-size: 28rpx;
		color: #999999;
		line-height: 40rpx;
		text-align: center;
	}

	.btn {
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: linear-gradient(243deg, #FF9960 0%, #FF5A2C 100%);
		border-radius: 8rpx;
		margin-top: 60rpx;
		font-size: 40rpx;
		color: #FFFFFF;
	}
</style>
