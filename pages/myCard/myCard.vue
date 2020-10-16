<template>
	<view class="myCard">
		<!-- header -->
		<commonHeader headerTitl="绑定" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 内容开始 -->
		<view class="myCard-content">
			<view class="myCard-content-title">
				卡包
			</view>
			<view class="kabao">
				<!-- 微信 -->
				<view class="myCard-content-item">
					<view class="left">
						<text class="iconfont icon-weixin" style="color: #34C117;"></text>
						<view class="text">
							<text>微信</text>
							<view>
								<!-- {{info.Wx}} -->
							</view>
						</view>
					</view>
					<view class="right" @tap="goBindWeixin">
						{{info && info.Wx? '已绑定' : '去绑定'}}
					</view>
				</view>
				<!-- 支付宝 -->
				<view class="myCard-content-item">
					<view class="left">
						<text class="iconfont icon-zhifubao" style="color: #00AAEE;"></text>
						<view class="text">
							<text>支付宝</text>
							<view>
								<!-- {{info.Ali}} -->
							</view>
						</view>
					</view>
					<view class="right" @tap="goBindAlipay">
						
						{{info &&info.Ali? '已绑定' : '去绑定'}}
					</view>
				</view>
				<!-- 招商银行卡 -->
				<view class="myCard-content-item">
					<view class="left">
						<text class="iconfont icon-bangdingshezhiyinxingqiabangding" style="color: #FF9707;"></text>
						<view class="text">
							<text>招商银行卡</text>
							<view>
								<!-- 哈哈哈哈哈 -->
							</view>
						</view>
					</view>
					<view class="right"  @tap="goBindBankCard">
						
						{{info &&info.Card ? '已绑定' : '去绑定'}}
					</view>
				</view>
			</view>
		</view>
		<!-- 内容结束 -->
		<!-- tabbar -->
		<tabbar></tabbar>
	</view>
</template>

<script>
	// header
	
	import commonHeader from "@/components/common-header/common-header";
	import tabbar from "@/components/common-tabbar/common-tabbar";
	import {
		shopBank
	} from '@/common/apis.js';
	export default {
		data() {
			return {
				info:{
					
				},
				redpackgeList:[
					{id:"01",price:8,title:"5元剪发券",date:"2019-12-31"},
					{id:"02",price:10,title:"5元剪发券",date:"2019-12-31"},
					{id:"03",price:5,title:"5元剪发券",date:"2019-12-31"},
					{id:"04",price:99,title:"5元剪发券",date:"2019-12-31"}
				]
			};
		},
		components:{
			commonHeader,
			tabbar
		},
		created() {
			this.checkBind()
		},
		methods:{
			// 前往绑定支付宝
			goBindAlipay(){
				// let info = this.info && this.info.Ali || ''
				uni.navigateTo({
					url:"../bindAlipay/bindAlipay"
				})
			},
			checkBind() {
				uni.getStorage({
				    key: 'shopId',
				    success:  (res)=> {
						shopBank({shop_id: res.data}).then(res => {
							console.log(res)
							this.info = res.returnMsg
						})
				    }
				});
				
			},
			// 前往绑定微信
			goBindWeixin(){
				// let info = this.info && this.info.Wx || ''
				uni.navigateTo({
					url:"../bindWeixin/bindWeixin"
				})
			},
			// 前往绑定银行卡
			goBindBankCard(){
							
				let info = this.info && this.info.Card || ''
				if(info) {
					uni.navigateTo({
						url:"../bindBankCard/bindBankCard?info=" + JSON.stringify(info)
					})
				}else{
					uni.navigateTo({
						url:"../bindBankCard/bindBankCard"
					})
				}
				
			}
		}
	}
</script>

<style lang="less">
	.myCard{
		background: #f7f7f7;
		min-height: 100%;
		color: #333;
		padding-bottom: 100rpx;
		.myCard-content{
			.myCard-content-title{
				/* #ifdef APP-PLUS */
				margin-top: 40rpx;
				/* #endif */
				/* #ifdef MP-WEIXIN */
				margin-top: 40rpx;
				/* #endif */
				height: 300rpx;
				background:linear-gradient(117deg,rgba(255,90,43,1) 0%,rgba(255,89,52,1) 36%,rgba(255,156,31,1) 100%);
				line-height: 300rpx;
				font-size: 44rpx;
				color: #fff;
				padding-left: 30rpx;
			}
			.kabao{
				margin-top: -90rpx;
			}
			.myCard-content-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				border-radius: 20rpx;
				height: 184rpx;
				background: #fff;
				width: 86%;
				margin: 0 auto 20rpx;
				box-shadow: 0 4rpx 20rpx #999;
				.left{
					display: flex;
					.iconfont{
						font-size: 120rpx;
						margin-right: 40rpx;
						margin-left: 10rpx;
					}
					.text{
						font-size: 28rpx;
						margin-top: 20rpx;
						text{
							font-size: 32rpx;
							font-weight: bold;
						}
						view{
							margin-top: 10rpx;
						}
					}
				}
				.right{
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
</style>
