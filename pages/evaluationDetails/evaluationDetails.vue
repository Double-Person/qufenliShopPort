<template>
	<view class="evaluationDetails">
		<!-- header -->
		<commonHeader headerTitl="评价详情" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 内容 -->
		<view class="content-details">
			<view>
				<!-- <view class="content">
					<view class="title">
						{{info.NAME || '发布人'}}
					</view>
					<view class="date">{{info.CREATETIME}}</view>
					<view class="text">
						{{info.CONTENT}}
					</view>
					<view class="img">
						<image :src="info.IMGS"></image>
					</view>
				</view>
				<view class="shopReply">
					<view class="item">
						<text>商家回复:</text>
						<view>
							{{info.REPLY}}
						</view>
					</view>
				</view>  -->
				<view class="btn">
					<input type="text" :value="value" placeholder="商家回复..." @blur="inputTetx"/>
					<text @tap="sendText">发表</text>
				</view>
			</view>
		</view>
	
		<view class="comment">
			<view v-for="(item,index) in info" :key="index" class="comment-item">
				<!-- <text class="name">  {{ item.USID ? itemInfo.USERNAME : '商家回复' }}:</text> --> <!-- {{item.USID || '商家回复'}} -->
				<text class="name">  {{ item.USID }}:</text>  <!-- {{item.USID || '商家回复'}} -->
				<text class="comment-content">{{ item.REPLY }} </text>
			</view>
		</view>
	</view>
</template>

<script>
	import commonHeader from"@/components/common-header/common-header";
	import { getShopEvaluateDetail, getShopComment } from '@/common/apis.js'
	
	export default {
		name: 'EvaluationDetails',
		components:{
			commonHeader
		},
		data () {
			return {
				id: null,
				goods_id: null,
				itemInfo: {},
				info: {},
				value:''
			};
		},
		onLoad (options) {  // item.EVALUATE_ID, item.GOODS_ID
			this.itemInfo = JSON.parse(options.info)
			console.log(this.itemInfo)
			this.getInitDetail()
		},
		methods:{
			async getInitDetail () {
				const { returnMsg, msgType } = await getShopEvaluateDetail({ evaluate_id: this.itemInfo.EVALUATE_ID })
				msgType == 0 && (this.info = returnMsg)
			},
			// 获取用户输入内容
			inputTetx(e){
				this.value = e.detail.value;
			},
			// 回复
			async sendText(){
				if(this.value){
					//    itemInfo 
					let obj = {
						shop_id: uni.getStorageSync('shopId'),
						evaluate_id: this.itemInfo.EVALUATE_ID,
						reply: this.value,
						goods_id: this.itemInfo.GOODS_ID
					}
					const { returnMsg, msgType } = await getShopComment(obj)
					if(msgType == 0){
						this.getInitDetail();
						this.value = '';
						uni.showToast({
							title:'回复成功！'
						})
						uni.navigateTo({
							url:'../evaluateManage/evaluateManage'
						})
					}
				}else{
					uni.showToast({
						title:'请先输入内容！',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.comment{
		padding: 15rpx 50rpx;
		.comment-item{
			margin-bottom: 30rpx;
			.name{
				font-weight: bold;
				margin-right: 15rpx;
			}
			.comment-content{
				
			}
		}
	}
	
	.evaluationDetails{
		padding: 100rpx 0;
		/* #ifdef APP-PLUS */
		padding-top: 140rpx;
		/* #endif */
		background: #f7f7f7;
		font-size: 30rpx;
		color: #333;
		height: 100%;
		.content-details{
			.content{
				padding: 30rpx;
				background: #fff;
				.title{
					font-weight: bold;
				}
				.date{
					color: #666;
					font-size: 24rpx;
					margin: 10rpx 0;
				}
				.text{
					
				}
				.img{
					display: flex;
					justify-content: space-around;
					padding-top: 30rpx;
					image{
						width:200rpx;
						height:169rpx;
						border-radius: 20rpx;
					}
				}
			}
			.shopReply{
				padding-left: 30rpx;
				.item{
					border-bottom: 1rpx solid #D8D8D8;
					padding: 30rpx 0;
					color: #666;
					font-size: 28rpx;
					display: flex;
					text{
						font-weight: bold;
						color: #333;
						width: 140rpx;
					}
					view{
						padding-right: 30rpx;
						margin-left: 10rpx;
					}
				}
			}
			.btn{
				display: flex;
				align-items: center;
				height: 100rpx;
				background: #fff;
				position: fixed;
				bottom: 0;
				width: 100%;
				input{
					height: 70rpx;
					flex: 1;
					background: #EEEFF1;
					margin: 0 30rpx;
					border-radius: 35rpx;
					text-indent: 30rpx;
				}
				text{
					width: 100rpx;
					
				}
			}
		}
	}
</style>
