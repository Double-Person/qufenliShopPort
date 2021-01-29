<template>
	<view class="warp">
		<!-- header -->
		<commonHeader headerTitl="提现" isShowHistory xingHide=true lingHide=true fenxiangHide=true></commonHeader>

		<view class="content">
			<view class="fl-center-between user-info">

				<view class="user-ava">
					<image :src="baseImgUrl + shopInfo.BGIMG" mode=""></image>
				</view>
				<view class="fl-center-between info-icon">
					<view class="user">
						<view class="name">
							{{shopInfo.SHOP_NAME}}
						</view>
						<view class="phone">
							{{computedPhone(shopInfo.PHONE)}}
						</view>
					</view>
					<view class="icon" @click="userInfolick">
						<image class="img" src="/static/images/more.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="money">
				<image class="img" src="/static/images/money.png" mode=""></image>
				<view class="mask top-mask">
					￥ {{shopInfo.BALANCE || 0}}
					<!-- {{item.zbalance}} -->
				</view>
				<view class="mask bottom-mask">
					￥ {{ shopInfo.BALANCE || 0}}
					<!-- {{item.kbalance}} -->
				</view>
			</view>

			<view class="fl-center-between withdrawal-amount">
				<text class="symbol">¥</text>
				<input type="number" class="input" v-model.number="money" placeholder="输入提现金额" />
				<text class="all" @click="balanceAll()">全部</text>
			</view>
			<view class="fl-center-between from" v-if="bindList.Wx || bindList.Ali">
				<view class="bank">
					<view class="info-text from-item">
						提现到
					</view>
					<view class="info-text">
						<text>{{ cardNum == '' && '请选择' || cardNum == bindList.Ali && '支付宝' || cardNum == 'wx' && '微信' }}</text>
					</view>
				</view>
				<view class="icon">
					<image class="img" src="/static/images/more.png" mode=""></image>
				</view>

			</view>
			<view class="" class="change-card-list">
				<view class="list">
					<view class="fl-center-between item" @click="changeCardId('wx', 'wechat')" v-if="bindList.Wx">
						<view>微信 <text style="margin-left: 30rpx;"></text></view>
						<icon type="success_no_circle" size="20" v-if="cardNum == bindList.Wx" />
					</view>
					<view class="fl-center-between item" @click="changeCardId(bindList.Ali, 'ali')" v-if="bindList.Ali && bindList.Ali!= 'null'">
						<view>支付宝 <text style="margin-left: 30rpx;">{{bindList.Ali}}</text></view>
						<icon type="success_no_circle" size="20" v-if="cardNum == bindList.Ali" />
					</view>
				</view>
			</view>



			<view class="tips">
				<view>注意：满一元可以提现，按协议收取手续费 </view>
				<view>
					预计2个工作日内到账，请注意查收
				</view>
			</view>
			<view class="btn" @click="getWithdrawal"> 提现 </view>
		</view>


		<uni-popup ref="popup" type="dialog">
			<view class="dialog">
				<input type="password" v-model="TRADRPASS" placeholder="请输入交易密码"/>
				<view class="bottom">
					<view class="is-agree" @click="checkTradrPass(false)">取消</view>
					
					<view class="is-agree" @click="checkTradrPass(true)">确定</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	// header
	import commonHeader from "@/components/common-header/common-header";
	import {
		withdrawal,
		backCardInfo,
		wxtx,
		alitx,
		baseImgUrl
	} from "@/common/apis.js";
	export default {
		components: {
			commonHeader,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				disabel: false, // tixian
				TRADRPASS: '',
				type: '',
				baseImgUrl: baseImgUrl,
				userInfo: {},
				list: [],
				bindList: {},
				money: null,
				cardNum: '', // 卡号
				kbalance: 0, // uni.setStorageSync('kbalance')
				openid: '' //ofTYkxBM2Jh0KluonnXzNpLLxYuA'
			};
		},
		onLoad(opt) {
			// this.getBackCardInfo()
			this.shopInfo = uni.getStorageSync('shopInfo');
			// this.kbalance = uni.getStorageSync('kbalance');
			this.kbalance = this.shopInfo.BALANCE

			if (opt.bindList) {
				this.bindList = JSON.parse(opt.bindList)
				this.bindList.Wx = 'wx'
			}


		},
		methods: {
			//  转银行卡账号 和手机号
			computedPhone(phone = '') {
				let phoneStr = phone.toString();
				if (phoneStr.length < 11) {
					return phone
				}
				return phone.substring(0, 5) + '***' + phone.substring(phoneStr.length - 3, phoneStr.length)
			},
			// 选择提现的卡
			changeCardId(card, type) {
				
				this.type = type;
				this.cardNum = card
				// #ifdef APP-PLUS
				if(type == 'wechat' && this.openid =='') {
					this.getOpenIdByWchat();
				}
				// #endif

			},
		
			userInfolick() {
				uni.navigateTo({
					url: '/pages/shopManage/shopManage'
				})
			},
			// 全部体现
			balanceAll() {
				this.money = this.kbalance
			},

			// 提现
			getWithdrawal() {
				if (this.kbalance <= 0) {
					return uni.showToast({
						title: '暂无可提现金额',
						icon: 'none'
					})
				}
				

				this.money = Number(Number(this.money).toFixed(2))
				if (this.money < 1) {
					// this.money = null
					return uni.showToast({ title: '提现金额必须大于1元', icon: 'none' })
				}

				if (!this.cardNum) {
					return uni.showToast({ title: '请选择提现位置', icon: 'none' })
				}
				if (!this.openid) {
					if (this.type == 'wechat') {
						uni.showToast({ title: '请授权登录', icon: 'none' })
						this.getOpenIdByWchat()
						return false
					}
				}
				
				// 判断交易密码
				this.$refs.popup.open()
				
				

			},
			checkTradrPass(boo) {
				if(!boo) {
					this.$refs.popup.close();
					return false;
				}
				
					
				let PAYPASS = uni.getStorageSync('shopPAYPASS');
				if(PAYPASS != this.TRADRPASS) {
					this.TRADRPASS = '';
					return uni.showToast({
						title:"密码错误",
						icon: 'none'
					})
				}
				
				if(this.disabel) {
					return false;
				}
				this.disabel = true;
			
				let shopId = uni.getStorageSync('shopId');
				let obj = {
					id: shopId, // 参数userinfo_id  用户id
					types: 1, // 0用户、1商家
					TYPES: 1, // 0用户、1商家
					money: Number(this.money), // amount  金额  
					openid: this.openid
				}
				// 微信提现
				if (this.type == 'wechat') {
					this.weChatWithdrawal(obj)
				} else if (this.type == 'ali') {
					this.aliWithdrawal(obj)
				}
			},
			// 微信提现
			weChatWithdrawal(obj) {
				wxtx(obj).then(res => {
					if (res.msgType == 0) {
						uni.showToast({
							title: '提现成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.errMsg,
							icon: 'none'
						})
					}
				}).finally(() => {
					this.disabel = false;
					this.$refs.popup.close();
				})
			},

			// 支付宝提现
			aliWithdrawal(obj) {
				obj.openid = '';
				obj.zfb = this.cardNum;
				
				alitx(obj).then(res => {
					if (res.msgType == 0) {
						uni.showToast({
							title: '提现成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.returnMsg || '提现失败',
							icon: 'none'
						})
					}

					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/personal/personal'
						})
					}, 1000)
				}).finally(() => {
					this.disabel = false;
					this.$refs.popup.close();
				})
			},
			// 获取微信openId
			getOpenIdByWchat() {
				const that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => { 
								// "openId": "oRrdQt7RgF5r0dq8WReEMqNJRpf4",  hx
								//ofTYkxBM2Jh0KluonnXzNpLLxYuA'
								that.openid = infoRes.userInfo.openId;
								
							}
						});
					}
				});
			}

		}
	}
</script>

<style lang="less" scoped>
	.dialog{
		width: 500rpx;
		background: #fff;
		border-radius: 10rpx;
		padding: 50rpx;
		input{
			height: 50rpx;
			margin: 0 auto;
			background: #eee;
		}
		.bottom{
			display: flex;
			justify-content: space-around;
			margin-top: 50rpx;
			.is-agree{
				border-radius: 10rpx;
				border: 2rpx solid #999;
				padding: 5rpx 15rpx;
			}
		}
	}
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
			width: 100rpx;
			height: 100rpx;

			border-radius: 50%;
			border: none;
			overflow: hidden;

			image {
				width: 100rpx;
				height: 100rpx;
				object-fit: cover;
			}
		}

		.info-icon {

			width: 100%;
			margin-left: 20rpx;

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
