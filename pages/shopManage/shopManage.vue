<template>
	<view class="shopManage">
		<commonHeader headerTitl="店铺管理" xingHide=true lingHide=true fenxiangHide=true></commonHeader>
		<!-- 验证密码蒙层 -->
		<!-- 		<view class="shopManage-testPwd" :class="hideBox?'hideBox':''">
			<view class="shopManage-testPwd-title">
				请输入登录密码
			</view>
			<testCode @isPwdStata="inputPwdStata" :focusStata='focusStata'></testCode>
		</view> -->
		<!-- 内容 -->
		<view class="shopManage-content">
			<view class="shopManage-content-item">
				<text>店铺名称</text>
				<input type="text" v-model="shopInfo.SHOP_NAME" placeholder-style="textAlign:right;fontSize:28rpx;" placeholder="请输入店铺名称" />
			</view>
			<view class="shopManage-content-item">
				<text>店铺地址</text>
				<input type="text" v-model="(shopInfo.CITY || '') + shopInfo.AREA + shopInfo.FULLADD" placeholder-style="textAlign:right;fontSize:28rpx;" placeholder="请输入店铺地址" />
			</view>
			<view class="shopManage-content-item">
				<text>上传店铺背景图</text>
			</view>
		</view>
		<!-- 上传背景图 -->
		<view class="shopManage-backgroungImg">
			<view class="item" @tap="uploadBackgroundImg">
				<view class="item-top" :class="imgHide?'':'imgHide'">
					<image src="/static/images/uploadImg.png" mode=""></image>
					<view class="">
						上传店铺背景图
					</view>
					<text>注：请上传jpg/png格式图片</text>
				</view>
				<view class="item-img" :class="imgHide?'imgHide':''">
					<image :src="baseImgUrl + shopInfo.BGIMG" mode=""></image>
				</view>
			</view>
		</view>
		<view class="shopManage-content">
			<view class="shopManage-content-item">
				<text>店铺联系电话</text>
				<input type="text" v-model="shopInfo.PHONE" placeholder-style="textAlign:right;fontSize:28rpx;" placeholder="请输入联系电话" />
			</view>
			<view class="shopManage-content-item">
				<text>添加客服</text>
				<input type="text" v-model="shopInfo.WX" placeholder-style="textAlign:right;fontSize:28rpx;" placeholder="请输入您的微信号" />
			</view>
			<view class="shopManage-content-item dpgg">
				<text>店铺公告</text>
			</view>
		</view>
		<view class="shopManage-notice">
			<textarea v-model="shopInfo.NOTICE" placeholder-style="fontSize:24rpx;color:#999" placeholder="请输入店铺公告 （写够15字，才是好同志~）" />
			</view>
		
		<view class="submit-btn" @tap="submit">
			提交
		</view>
		<view class="shopManage-content">
			<view class="shopManage-content-item" @tap="goSetPwd(1)">
				<text>修改登录密码</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="shopManage-content-item" @tap="goSetPwd(2)">
				<text>修改交易密码</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="shopManage-content-item" @tap="goSetPwd(3)">
				<text>提现账户绑定</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="shopManage-content-item dpgg" @tap="goSetPwd(4)">
				<text>忘记密码</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<!-- 退出登录 -->
		<view class="submit-btn" @tap="outLogin">
			退出登录
		</view>
		<!-- tabbar -->
		<tabbar active="5"></tabbar>
	</view>
</template>

<script>
	import commonHeader from "@/components/common-header/common-header";
	import tabbar from "@/components/common-tabbar/common-tabbar";
	// import testCode from '@/components/testCode/testCode';
	import { getShopData , shopEdit, uploadsFile, baseUrl, baseImgUrl } from '@/common/apis.js'
	import { uploadFileUrl } from '@/common/request.js'
	export default {
		data() {
			return {
				baseImgUrl: baseImgUrl,
				// 显示隐藏密码框
				hideBox:false,
				focusStata:false,
				imgHide:true,
				imgUrl:'',
				shopInfo: {}
			};
		},
		components: {
			commonHeader,
			tabbar,
			// testCode
		},
		onLoad () {
			this.getShopInfo()
		},
		methods: {
			// 获取商户信息
			async getShopInfo () {
				const id = uni.getStorageSync('shopId')
				const { returnMsg, msgType } = await getShopData({ shop_id: id })
				msgType === 0 && (this.shopInfo = returnMsg)
				
				if(this.shopInfo.BGIMG) {
					this.imgUrl = this.shopInfo.BGIMG
					this.imgHide = false;
				}
				console.log(this.shopInfo)
			},
			// 前往设置密码
			goSetPwd(index){
				if(index===1){
					uni.navigateTo({
						url:"../loginPassword/loginPassword"
					})
				}
				if(index===2){
					uni.navigateTo({
						url:"../transactionPassword/transactionPassword"
					})
				}
				if(index===3){
					uni.navigateTo({
						url:"../myCard/myCard"
					})
				}
				if(index===4){
					uni.navigateTo({
						url:"../passwordback/passwordback"
					})
				}
			},
			// 上传背景图
			uploadBackgroundImg(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:  (res)=> {
						console.log(res)
						this.imgUrl = res.tempFilePaths[0];
						this.imgHide = false;
						
					const tempFilePaths = res.tempFilePaths;
					        uni.uploadFile({
					            url: baseUrl + '/uploadFile/file', //仅为示例，非真实的接口地址
					            filePath: tempFilePaths[0],
					            name: 'file',
					            formData: {
					                file: 'test'
					            },
					            success: (uploadFileRes) => {
									// 	let url = (JSON.parse(uploadFileRes.data).data).split('/usr/local/tomcat8.5/apache-tomcat-8.5.47/webapps/qufl');
									// this.shopInfo.BGIMG = baseUrl + url[1]
									this.shopInfo.BGIMG = (JSON.parse(uploadFileRes.data).data)
									this.imgUrl = this.shopInfo.BGIMG;
									console.log(this.shopInfo.BGIMG)
									
					            }
					        });
						
						}
					}
				);
			},
			// 店铺名称
			// getShopname(e){
			// 	this.shopName = e.detail.value;
			// },
			// 店铺地址
			// getShopadd(e){
			// 	this.shopAddress = e.detail.value;
			// 	// 地址转换为经纬度
			// 	uni.request({
			// 		method:'GET',
			// 		url:'http://restapi.amap.com/v3/geocode/geo?key=60ca6302ddbfc1545c05fed7e8fff834&s=rsv3&city=35&address='+e.detail.value,
			// 		success:(res)=>{
			// 			var arr = res.data.geocodes[0].location.split(',');
			// 			this.longitude = arr[0];
			// 			this.latitude = arr[1];
			// 			console.log(this.longitude,this.latitude)
			// 		}
			// 	})
			// },
			// 店铺电话
			// getShopPhone(e){
			// 	this.shopPhone = e.detail.value;
			// },
			// 店铺微信
			// getShopWeixin(e){
			// 	this.shopWeixin = e.detail.value;
			// },
			// 店铺文字
			// getShopText(e){
			// 	this.shopText = e.detail.value;
			// },
			// 提交
			submit(){
				console.log()
				let {SHOP_NAME, CITY, AREA, LATITUDE, LONGITUDE, NOTICE, PHONE, BGIMG ,WX} = this.shopInfo
				const params = {
					shop_id:uni.getStorageSync('shopId'),
					shop_name:SHOP_NAME,
					city:CITY,
					area:AREA,
					fulladd:CITY,
					laittude:LATITUDE,
					longitude:LONGITUDE,
					bgimg:BGIMG,
					phone:PHONE,
					wx:WX,
					notice:NOTICE
				}
				shopEdit(params).then((res) => {
					if(res.msgType === 0){
						uni.showToast({
						    title: '编辑成功',
						    duration: 1000
						});
					}
				
				})
			},
			// 密码输入状态
			inputPwdStata(e){
				if(e){
					this.hideBox = true
				}
			},
			// 退出登录
			outLogin(){
				uni.setStorage({
					key:'saveStata',
					data:false,
					success:()=>{
						uni.setStorage({
							key:"outLogin",
							data:true
						})
						uni.reLaunch({
							url:"../login/login"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.shopManage {
		min-height: 100%;
		position: relative;
		color: #333;
		background: #f7f7f7;
		padding-top: 100rpx;
		/* #ifdef APP-PLUS */
		padding-top: 140rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 140rpx;
		/* #endif */
		padding-bottom: 120rpx;

		// 蒙层
		.hideBox{display: none;}
		.shopManage-testPwd {
			position: fixed;
			height: 100%;
			width: 100%;
			z-index: 9999;
			top: 0;
			background: #fff;

			.shopManage-testPwd-title {
				margin-top: 300rpx;
				text-align: center;
				font-size: 40rpx;
				font-weight: bold;
				margin-bottom: 100rpx;
			}
		}
	
		// 内容
		.shopManage-content{
			padding: 0 30rpx;
			background: #fff;
			.shopManage-content-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				font-size: 30rpx;
				border-bottom: 1px solid #e0e0e0;
				input{
					width: 300rpx;
					text-align: right;
				}
			}
			// .shopManage-content-item:nth-child(4){
			// 	border-bottom: 0;
			// }
			.dpgg{
				border-bottom: 0;
			}
		}
		.shopManage-backgroungImg{
			
			background: #f7f7f7;
			width: 100%;
			.item{
				border: 20rpx solid #fff;
				border-radius: 10rpx;
				width: 500rpx;
				height: 300rpx;
				margin: 30rpx auto 30rpx;
				font-size: 24rpx;
				text-align: center;
				.imgHide{
					display: none !important;
				}
				.item-top{
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					image{width: 160rpx;height: 160rpx;}
					view{margin-bottom: 10rpx;}
					text{color: #999;}
				}
				.item-img{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.shopManage-notice{
			padding: 30rpx;
			background: #f7f7f7;
			textarea{
				background: #fff;
				width: 95%;
				height: 280rpx;
				border-radius: 20rpx;
				padding: 20rpx;
				margin: auto;
			}
		}
		.submit-btn{
			width: 95%;
			background:linear-gradient(243deg,rgba(255,153,96,1) 0%,rgba(255,90,44,1) 100%);
			height: 88rpx;
			border-radius: 10rpx;
			color: #fff;
			font-size: 40rpx;
			margin: 50rpx auto 50rpx;
			text-align: center;
			line-height: 88rpx;
			box-shadow: 0 10rpx 20rpx #FF9960;
		}
	}
</style>
