<template>
	<view class="index">
		<view class="index-header">
			<view class="index-header-top">
				<pickerAddress class="index-header-left" @change="setCity">
					<text class="iconfont icon-dingwei"></text>
					<text @click="setCity">{{newCity}}</text>
					<text class="iconfont icon-jiantou-xia"></text>
				</pickerAddress>
				<view class="index-header-title">
					{{shopInfoObj.SHOP_NAME}}
				</view>
				<image src="/static/images/shoukuan.png" mode="" @tap="goCodeReceivables"></image>
			</view>
			<view class="index-header-content">
				<image :src="shopInfoObj.BGIMG ? shopInfoObj.BGIMG : '../../static/images/cartLOGO.png'" mode="" @tap="goMycard"></image>
				<view>
					账户余额
				</view>
				<text @tap="goMycard">{{shopInfoObj.BALANCE}}</text>
			</view>
		</view>
		<view class="index-content">
			<!-- 			<view class="index-content-one">
				<view class="index-content-one-left">
					<text>80000.00</text>
					<view>
						可提现额
					</view>
				</view>
				<text class="index-content-one-right" @tap="goMycard">提现</text>
			</view> -->
			<view class="index-content-item" @tap="goOrderlist(1)">
				<view>
					今日收益
				</view>
				<text>{{shopInfoObj.todayincome}}元</text>
			</view>
			<view class="index-content-item" @tap="goOrderlist(2)">
				<view>
					累计收益
				</view>
				<text>{{shopInfoObj.income}}元</text>
			</view>
			<view class="index-content-item" @tap="goOrderlist(3)">
				<view>
					今日订单
				</view>
				<text>{{shopInfoObj.todayorder}}笔</text>
			</view>
			<view class="index-content-item" @tap="goOrderlist(4)">
				<view>
					累计订单
				</view>
				<text>{{shopInfoObj.order}}笔</text>
			</view>
			<!-- 商家收款 -->
			<view class="submit-btn" @tap="goCodeReceivables">
				商家收款
			</view>
		</view>
		<!-- tabbar -->
		<tabbar active="1"></tabbar>
	</view>
</template>

<script>
	import tabbar from "@/components/common-tabbar/common-tabbar";
	// #ifdef MP-WEIXIN
	// 引入高德地图
	import amapPlugin from '@/components/initMap.js';
	// #endif
	// 城市选择器
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue';

	import {
		orderTotal,
		profitTotal,
		homeInfo,
		shopBank
	} from '@/common/apis.js';
	export default {
		data() {
			return {
				shopInfoObj: {},
				newCity: '',
				todaySy: 100,
				bindList: {}, // 商户绑定的银行卡信息
			}
		},
		mounted() {
			// 获取当前时间
			uni.getStorage({
				key: 'shopId',
				success: (res) => {
					var obj = {
						shop_id: res.data,
						date: this.getTime()
					}
					
					// 商家数据
					homeInfo({
						shop_id: res.data
					}).then(res => {
						
						this.shopInfoObj = res.returnMsg
						console.log(this.shopInfoObj)
						uni.setStorageSync('shopInfo', res.returnMsg)
					})
					// '015915f9770f40b69e35674663f0d001'
					// 判断商家是否绑定银行卡信息  
					shopBank({shop_id: res.data }).then(res => {
						console.log(res)
						// this.info = res.returnMsg
						if(res.msgType == 0) {
							this.bindList = res.returnMsg
						}else {
							uni.showToast({
								title: res.errMsg,
								icon: 'none'
							})
						}
					})
				}
			})
		},
		onLoad() {

			// 判断全局是否有值
			if (getApp().globalData.city.length) {
				console.log(getApp().globalData)
				this.newCity = getApp().globalData.city.join('')
			} else {
				// 定位
				// #ifdef MP-WEIXIN
				amapPlugin.getRegeo({
					success: (data) => {
						getApp().globalData.city = [];
						this.newCity = data[0].regeocodeData.addressComponent.city + data[0].regeocodeData.addressComponent.district;
						getApp().globalData.city.push(data[0].regeocodeData.addressComponent.city, data[0].regeocodeData.addressComponent
							.district)
					},
					fail: (err) => {
						uni.showToast({
							title: "定位失败！手动选择",
							icon: 'none'
						})
					}
				})
				// #endif
				uni.getLocation({
					success: (res) => {
						console.log(res)
						uni.request({
							url: "https://restapi.amap.com/v3/geocode/regeo?parameters",
							method: 'GET',
							data: {
								key: 'f0d8604522a34fea7af419d353f98e8f',
								location: `${res.longitude}, ${res.latitude}`
							},
							success: (data) => {
								getApp().globalData.city = [];
								this.newCity = data.data.regeocode.addressComponent.city + data.data.regeocode.addressComponent.district;
								getApp().globalData.city.push(data.data.regeocode.addressComponent.city, data.data.regeocode.addressComponent
									.district);
								let {province, city, district} = data.data.regeocode.addressComponent
								let addressList = [ province, city, district ]
								uni.setStorageSync('addressList', addressList)
							},
							fail(err) {
								uni.showToast({
									title: "定位失败！手动选择",
									icon: 'none'
								})
							}
						})
					},
					fail(err) {
						uni.showToast({
							title: "定位失败！手动选择",
							icon: 'none'
						})
					}
				})
			}
			this.getPoint()
		},
		methods: {
			// 进入我的卡包
			goMycard() {
				if(Object.keys(this.bindList).length > 0) {
					uni.navigateTo({
						url: "../withdrawal/withdrawal"
					})
				}else{
					uni.navigateTo({
						url: "../myCard/myCard"
					})
				}
				
				// uni.navigateTo({
				// 	url: "../myCard/myCard"
				// })
			},
			//   金纬度转位置
			conversionPoint(res) {
				uni.request({
					url: "https://restapi.amap.com/v3/geocode/regeo?parameters",
					method: 'GET',
					data: {
						key: 'f0d8604522a34fea7af419d353f98e8f',
						location: `${res.longitude}, ${res.latitude}`
					},
					success: (data) => {
						this.newCity = data.data.regeocode.addressComponent.city + data.data.regeocode.addressComponent.district;
					},
					fail(err) {

						uni.showToast({
							title: "定位不成功",
							icon: 'none'
						})
					}
				})
			},

			getPoint() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {

						this.longitude = res.longitude
						this.latitude = res.latitude
						this.conversionPoint(res)
						
					}
				})
			},

			// 手动设置城市
			setCity(data) {
				this.newCity = data.data.slice(1).join('')
				// 存入全局变量
				getApp().globalData.city = data.data.slice(1);
			},
			
			// 前往收款页面
			goCodeReceivables() {
				uni.navigateTo({
					url: "../codeReceivables/codeReceivables"
				})
			},
			// 前往订单页
			goOrderlist(index) {
				if (index === 1) {
					uni.navigateTo({
						url: "../todayProfit/todayProfit"
					})
				}
				if (index === 2) {
					uni.navigateTo({
						url: "../cumulativeProfit/cumulativeProfit"
					})
				}
				if (index === 3) {
					uni.navigateTo({
						url: "../todayOrder/todayOrder"
					})
				}
				if (index === 4) {
					uni.navigateTo({
						url: "../cumulativeOrder/cumulativeOrder"
					})
				}
			},
			// 计算时间
			getTime() {
				var year = new Date().getFullYear(); //取得4位数的年份
				var month = this.addZero(new Date().getMonth() + 1); //取得日期中的月份，其中0表示1月，11表示12月
				var date = this.addZero(new Date().getDate()); //返回日期月份中的天数（1到31）
				var hour = this.addZero(new Date().getHours()); //返回日期中的小时数（0到23）
				var minute = this.addZero(new Date().getMinutes()); //返回日期中的分钟数（0到59）
				var second = this.addZero(new Date().getSeconds()); //返回日期中的秒数（0到59）
				return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
			},
			// 加零函数
			addZero(add) {
				if (add < 10) {
					return '0' + add
				} else {
					return add;
				}
			}
		},
		components: {
			tabbar,
			pickerAddress
		},


	}
</script>

<style lang="less" scoped>
	.index {
		min-height: 100%;
		background: #f7f7f7;
		color: #333;

		.index-header {
			background: url(../../static/images/bg2.jpg) no-repeat;
			background-size: cover;

			.index-header-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 160rpx;
				padding: 0 30rpx;
				/* #ifdef APP-PLUS */
				padding-top: 40rpx;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				padding-top: 40rpx;
				/* #endif */
				position: relative;

				.index-header-left {
					font-size: 30rpx;
					color: #fff;

					text:nth-child(2) {
						margin: 0 5rpx;
					}

					text:last-child {
						font-size: 20rpx;
					}
				}

				.index-header-title {
					font-size: 40rpx;
					margin-left: 200rpx;
					letter-spacing: 5rpx;
					color: #fff;
					position: absolute;
					text-align: center;
					width: 50%;
					text-align: center;
				}

				image {
					width: 45rpx;
					height: 45rpx;
				}
			}

			.index-header-content {
				text-align: center;
				padding-top: 20rpx;
				padding-bottom: 70rpx;
				color: #fff;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				view {
					font-size: 26rpx;
					margin: 5rpx 0;
				}

				text {
					font-size: 38rpx;
				}
			}
		}

		.index-content {
			padding: 20rpx;

			.index-content-one {
				display: flex;
				padding: 30rpx;
				background: #fff;
				border-radius: 20rpx;
				justify-content: space-between;
				align-items: center;
				box-shadow: 0 0 6px 0rpx rgba(0, 0, 0, 0.1);

				.index-content-one-left {
					text {
						font-size: 38rpx;
						color: #FF5A32;
					}

					view {
						font-size: 30rpx;
						font-weight: 500;
						margin-top: 10rpx;
					}
				}

				.index-content-one-right {
					font-size: 24rpx;
					color: #FF5904;
					padding: 8rpx 54rpx;
					background: #ffede6;
					border-radius: 40rpx;
				}
			}

			.index-content-item {
				display: flex;
				letter-spacing: 3rpx;
				justify-content: space-between;
				padding: 30rpx;
				font-size: 30rpx;
				background: #fff;
				margin-top: 20rpx;
				border-radius: 20rpx;
				box-shadow: 0 0 6px 0rpx rgba(0, 0, 0, 0.1);

				text {
					color: #FF5A32;
				}
			}

			.submit-btn {
				width: 98%;
				background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
				height: 88rpx;
				border-radius: 10rpx;
				color: #fff;
				font-size: 40rpx;
				margin: 20rpx auto 30rpx;
				text-align: center;
				line-height: 88rpx;
				box-shadow: 0 10rpx 20rpx #FF9960;
				letter-spacing: 5rpx;
			}
		}
	}
</style>
