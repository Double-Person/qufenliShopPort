<template>
	<view class="addGoods">
		<commonHeader :headerTitl="headeTitle"></commonHeader>
		<view class="addGoods-content">
			<view class="addGoods-content-content">
				<view class="addGoods-content-item" @tap="showDrawer = true">
					<view>商品分类</view>
					<text v-if="this.text">{{this.text}}</text>
					<text v-else class="iconfont icon-youjiantou"></text>
				</view>
				<view class="addGoods-content-item">
					<view>商品名称</view>
					<input type="text" v-model="params.name" placeholder-class="placeholder-class" placeholder="请输入商品名称" />
				</view>
				<view class="addGoods-content-item">
					<view>商品价格</view>
					<input type="text" v-model.number="params.price" placeholder-class="placeholder-class" placeholder="请输入商品价格" />
				</view>
				<view class="addGoods-content-item">
					<view>规格</view>
					<input type="text" v-model="params.norms" placeholder-class="placeholder-class" placeholder="请输入商品规格 例如：10串/份"
					 style="width: 420rpx;" />
				</view>
				<view class="addGoods-content-item">
					<view>添加库存</view>
					<input type="number" v-model="params.stock" placeholder-class="placeholder-class" placeholder="20/份" />
				</view>
				<view class="addGoods-content-describe">
					<view class="title">产品描述</view>
					<view class="text">
						<textarea :maxlength="-1" v-model="params.details" class="text-area" placeholder-class="placeholder-class"
						 placeholder="质量如何，服务是否周到，交通是否便利？（写够15字，才是好同志~）" />
						<!-- <text>加油，还差15个字即可发布！</text> -->
					</view>
				</view>
				<view class="addGoods-content-addimg">
					<view class="title">
						<view>添加商品图片</view>
						<text class="iconfont icon-xiangji"></text>
						 <!-- @tap="uploadImg" -->
					</view>
					<view class="content">
						<view class="content-item" v-for="(item,i) in imgList" :key="i" @click="addItem(i)">
							<!-- :class="item.imgHide ? 'imgHide' : ''" -->
							<view class="item-text" v-if="!item.imgUrl">
								<text class="iconfont icon-tubiaolunkuo-"></text>
								<view>添加图片</view>
							</view>
							<!-- :class="item.imgHide ? '' : 'imgHide'"  @click="addItem(i)" -->
							<view class="item-img" v-if="item.imgUrl" ><image :src="baseImgUrl + item.imgUrl" mode=""></image></view>
						</view>
					</view>
					<view class="btn" v-if="data">
						
						<text @click="setState(0)" v-if="STATES == 1">上架</text>
						<text @click="setState(1)" v-if="STATES == 0">下架</text>
						<text @click="setIndex()">{{ PUSHHP == 1 ? '取消推送' : '推送首页' }}</text>
					</view>
				</view>
			</view>
			<view class="submit-btn" @tap="hideMask = false">保存</view>
		</view>

		<!-- 弹出蒙层 -->
		<view class="addGoods-mask" :class="hideMask ? 'hideMask' : ''">
			<view class="addGoods-mask-item">
				<view class="title">添加商品信息已保存，是否保存当前商品信息？</view>
				<view class="btn">
					<text @tap="hideMask = true">取消</text>
					<text @click="addGoods" >确定</text>
				</view>
			</view>
		</view>
		<!-- 左侧抽屉 -->
		<uni-drawer :visible="showDrawer" @close="showDrawer = false">
			<view class="uni-drawer-title">
				<view class="chify">
					商品分类
				</view>
				<view class="close" @tap="close">
					关闭
				</view>
			</view>
			<view class="uni-drawer-content">
				<view class="item item1" v-for="(item, index) in itemList" :key="index" @tap="amend(item,index)">
					<!-- <input type="text" disabled="true" :value="item.NAME" @click="changeItem(item)" />                  -->
					<span @click="changeItem(item)">{{item.CATEGORY_NAME}}</span>
					<text class="iconfont icon-jian1" @tap="delitem(item.SHOPCATEGORY_ID)"></text>
				</view>
				<view class="item addItem" @tap="addChify">
					<text class="iconfont icon-tianjia"></text>
					添加分类
				</view>
			</view>
			<view class="uni-drawer-input" :class="hideInput ? 'hideInput' : ''">
				<view>
					<input type="text" v-model="categoryName" placeholder="请输入分类名" />
					<input type="text" v-model="num" placeholder="请输入排序序号" />
					<view @tap="addItems" :class="itemShow?'hideInput' : ''">确定</view>
					<view @tap="amendItems" :class="itemShow?'' :'hideInput'">修改</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import commonHeader from '@/components/common-header/common-header';
// 抽屉
import uniDrawer from '@/components/uni-drawer/uni-drawer';
import { addGoodsInfo, editGoodsInfo, addGoodsItem, delGoodsItem, itemListArr, shopState, shopRecommend, uploadImgFile, categoryUpdate, findByShopId, baseUrl, baseImgUrl} from '@/common/apis.js';
export default {
	name: 'AddGoods',
	components: { 
		commonHeader, 
		uniDrawer
	},
	data () {
		return {
			PUSHHP: '',
			STATES: '',
			baseImgUrl: baseImgUrl,
			headeTitle: '添加商品',
			GOODS_ID: '',
			type: '',
			num: null,
			hideMask: true,
			showDrawer: false,
			itemList: [
				// { id: 1, text: '热销1' }
			],
			text:'',
			hideInput: true,
			itemShow:false,
			inputVlue: '',
			imgList:[
				{imgUrl: '',imgHide: false, GOODSIMGS_ID: '' },
				{imgUrl: '',imgHide: false, GOODSIMGS_ID: '' },
				{imgUrl: '',imgHide: false, GOODSIMGS_ID: '' },
				{imgUrl: '',imgHide: false, GOODSIMGS_ID: '' },
				{imgUrl: '',imgHide: false, GOODSIMGS_ID: '' },
				{imgUrl: '',imgHide: false, GOODSIMGS_ID: '' }
			],
			
			shopId: '',
			categoryName: '',
			categoryId: '',
			data: null,
			chifyName:'',
			index:0,
			params: {
				category_id: '',
				name: '',
				price: null,
				norms: '',
				stock: '',
				details: ''
			}
		};
	},
	async onLoad (options) {
		this.shopId = await uni.getStorageSync('shopId');
		// options.item && (this.data = JSON.parse(options.item))
		if (options.item) {
			this.data = JSON.parse(options.item)
			await this._findByShopId(this.data.GOODS_ID)
		}
		if(options.type === 'edit') {
			this.type = 'edit';
			this.headeTitle = '修改商品'
		}else {
			this.type = 'add';
			this.headeTitle = '添加商品'
		}
		await this.getItem()
		// 
	},


	methods: {
		// 添加修改商品
		addGoods() {
			this.hideMask=true
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			// 上传商品  images1
			let img = {}
			this.imgList.forEach((item, index) => {
				img['images' + (index + 1)] = item.imgUrl;
				if(this.type == 'edit') {
					img['goodsimgs_id' + (index + 1)] = item.GOODSIMGS_ID
				}
				
				
			})
			var obj = {
				shop_id: uni.getStorageSync('shopId'),
				category_id: this.params.category_id,
				name: this.params.name,
				price: this.params.price || 0,
				norms: this.params.norms,
				stock: this.params.stock,
				details:this.params.details,
				activity:'优惠',
				...img
			};
	
			
			if(this.type == 'add') {
				addGoodsInfo(obj).then(res => {
					uni.hideLoading()
					if(res.msgType == 0){
						uni.showToast({ title: '添加成功', icon: 'none' })
						setTimeout(() => {
							uni.navigateTo({ url: "../goodsManage/goodsManage" })
						}, 1000)	
					}else{
					uni.showToast({ title: '添加失败', icon: 'none' })
					}
				});
			}
			
		
			if(this.type == 'edit') {
				obj.goods_id = this.GOODS_ID
				// goodsimgs_id1  GOODSIMGS_ID
				uni.request({
					url: baseUrl + '/api/merchantgoods/editGoodsInfo',
					data: obj,
					method:'POST',
					success(res) {
						uni.hideLoading()
						if(res.data.msgType == 0){
							uni.showToast({ title: '修改成功', icon: 'none' })
							setTimeout(() => {
								uni.navigateTo({ url: "../goodsManage/goodsManage" })
							}, 1000)
								
						}else{
							uni.showToast({
								title: res.data.errMsg,
								icon: 'none'
							})
						}
					},
					fail(err) {
						uni.showToast({
							title: '修改失败',
							icon: 'none'
						})
					}
				})
			
			}
		},
		// 查询单个商品详情
		_findByShopId(goods_id) {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			findByShopId({goods_id}).then(res => {
				let {goodInfo: {CATEGORY_ID, NAME, PRICE, DETAILS, NORMS, STOCK, GOODS_ID, STATES, PUSHHP}, imges } = res.returnMsg;
				this.params.category_id =CATEGORY_ID
				this.params.name = NAME
				this.params.price = PRICE
				this.params.details = DETAILS
				this.params.norms = NORMS
				this.params.stock = STOCK
				this.GOODS_ID = GOODS_ID
				this.STATES = STATES;
				this.PUSHHP = PUSHHP
				imges.forEach( (item, index) => {
					this.imgList[index].imgUrl = item.IMG
					this.imgList[index].GOODSIMGS_ID = item.GOODSIMGS_ID	
				} )		
			}).finally(() => uni.hideLoading())
		},
		// 输入内容
		inputValue(e) {
			this.inputVlue = e.detail.value;
		},
		// 获取分类列表
		async getItem () {
			const { returnMsg, msgType } = await itemListArr({ shop_id: this.shopId })
			msgType == 0 && (this.itemList = returnMsg)
			let [CATEGORY_NAME] = this.itemList.filter(item => item.SHOPCATEGORY_ID == this.params.category_id);
			this.text = CATEGORY_NAME && CATEGORY_NAME.CATEGORY_NAME || '';
		},
		// 添加分类
		async addItems () {
			const params = {
				shop_id: this.shopId,
				name: this.categoryName,
				num: this.num
			}
			const { msgType, errMsg } = await addGoodsItem(params)
			uni.showToast({
				title: errMsg,
				icon: 'none'
			})
			msgType == 0 && this.getItem()
			this.hideInput =false;
			this.categoryName = ''
			this.num = null;
		},
		// 修改分类 等待接口
		amendItems () {
			let obj = {
				shop_id: this.shopId,
				name:this.categoryName,
				num: this.num,
				category_id: this.categoryId
			}
			categoryUpdate(obj).then(res => {
				if(res.msgType == 0){
					uni.showToast({
						title: res.errMsg || '提交失败',
						icon: 'none'
					})
					// this.showDrawer =false;
					this.getItem()
				}
				
			})
		},
		// 删除分类
		async delitem(id) {
			const { msgType, errMsg } = await delGoodsItem({ id })
			uni.showToast({
				title: errMsg,
				icon: 'none'
			})
			 
			if(msgType == 0) {
				this.getItem()
				this.categoryName = ''
				this.num = ''
			}
		},
	
		// 点击单个图片项上传
		addItem(i){
			uni.chooseImage({
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				count: 1,
				success: res => {
					uni.showLoading({
						title:'图片上传中',
					})
					const tempFilePaths = res.tempFilePaths;
					        uni.uploadFile({
					            url: baseUrl + '/uploadFile/file',
					            filePath: tempFilePaths[0],
					            name: 'file',
					            formData: {
					                file: 'test'
					            },
					            success: (uploadFileRes) => {
									this.imgList[i].imgUrl= JSON.parse(uploadFileRes.data).data
									this.imgList[i].imgHide=true
					            },
											complete() {
												uni.hideLoading()
											}
					        });
					
				}
			});
		},
		//上架	 下架
		async setState (states) {
			const { msgType, errMsg } = await shopState({ goods_id: this.data.GOODS_ID, states })
			uni.showToast({
				title: errMsg || '操作成功',
				icon: 'none'
			})
			this._findByShopId(this.data.GOODS_ID)
		},
		
		
		async setIndex () {
			let pushhp = (!(this.PUSHHP * 1)) * 1
			const { msgType, errMsg } = await shopRecommend({ goods_id: this.data.GOODS_ID, pushhp })
			uni.showToast({ title: errMsg || '操作成功', icon: 'none' });
			this._findByShopId(this.data.GOODS_ID)
		},
		// 改变分类名
		changeItem(item) {
			this.text = item.CATEGORY_NAME
			this.params.category_id = item.SHOPCATEGORY_ID
		},
		// 关闭抽屉
		close(){
			this.showDrawer = false
			this.getItem()
		},
		// 点击添加
		addChify(){
			this.hideInput = !this.hideInput;
			this.itemShow=false;
		},
		// 点击修改
		amend(chify,index){
			this.hideInput = !this.hideInput;
			this.itemShow=true;
			this.categoryName=chify.CATEGORY_NAME;
			this.num=chify.NUM;
			this.categoryId=chify.SHOPCATEGORY_ID
			this.index=index
		},
		
	}
};
</script>

<style lang="less" scoped>
	.placeholder-class{
		textAlign:right;fontSize:28rpx;
		color: #c6c6c6;
	}
	.text-area.placeholder-class{
		fontSize:24rpx;color:#999;
	}
.addGoods {
	min-height: 100%;
	background: #f7f7f7;
	color: #333;
	position: relative;
	padding-top: 130rpx;
	/* #ifdef APP-PLUS */
	padding-top: 170rpx;
	/* #endif */
	/* #ifdef MP-WEIXIN */
	padding-top: 170rpx;
	/* #endif */
	.addGoods-content {
		background: #fff;
		width: 95%;
		margin: 0 auto 0;
		border-radius: 20rpx;
		overflow: hidden;
		.addGoods-content-content {
			border-bottom: 1px solid #e0e0e0;
			padding-left: 30rpx;
		}
		.addGoods-content-item {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #e0e0e0;
			font-size: 30rpx;
			padding: 30rpx;
			padding-left: 0;
			> view {
				width: 150rpx;
			}
			.iconfont {
				color: #999;
				font-size: 35rpx;
				font-weight: bold;
			}
			input {
				flex: 1;
				text-align: right;
			}
		}
		.addGoods-content-describe {
			.title {
				font-size: 30rpx;
				padding: 30rpx;
				padding-left: 0;
			}
			.text {
				margin: 20rpx 0;
				padding-right: 30rpx;
				position: relative;
				textarea {
					padding: 20rpx;
					height: 220rpx;
					font-size: 26rpx;
					width: 95%;
					border-radius: 20rpx;
					overflow: hidden;
					background: #fdfafe;
					text-indent: 2em;
				}
				text {
					position: absolute;
					font-size: 24rpx;
					color: #999;
					bottom: 20rpx;
					right: 50rpx;
				}
			}
		}

		.addGoods-content-addimg {
			font-size: 30rpx;
			padding-bottom: 50rpx;
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				text {
					margin-right: 30rpx;
					color: #000;
					font-size: 40rpx;
				}
			}
			.content {
				width: 95%;
				height: 400rpx;
				background: #fdfafe;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				align-items: center;
				.content-item {
					width: 180rpx;
					height: 153rpx;
					background: #f7f7f7;
					border-radius: 20rpx;
					font-size: 24rpx;
					color: #999;
					.item-text {
						overflow: hidden;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding-top: 20rpx;
						.iconfont {
							font-size: 60rpx;
						}
						view {
							margin-top: 10rpx;
						}
					}
					.item-img {
						width: 100%;
						height: 100%;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.imgHide {
						display: none;
					}
				}
			}
			.btn {
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;
				text {
					font-size: 24rpx;
					color: #ff5904;
					border: 1px solid #ff5904;
					padding: 8rpx 44rpx;
					border-radius: 44rpx;
					margin-right: 30rpx;
				}
			}
		}
	}
	.submit-btn {
		width: 98%;
		background: linear-gradient(243deg, rgba(255, 153, 96, 1) 0%, rgba(255, 90, 44, 1) 100%);
		height: 88rpx;
		border-radius: 10rpx;
		color: #fff;
		font-size: 40rpx;
		margin: 50rpx auto 30rpx;
		text-align: center;
		line-height: 88rpx;
		box-shadow: 0 10rpx 20rpx #ff9960;
		letter-spacing: 5rpx;
	}
	.hideMask {
		display: none !important;
	}
	.addGoods-mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 99999;
		background: rgba(1, 1, 1, 0.7);
		.addGoods-mask-item {
			width: 80%;
			height: 400rpx;
			background: #fff;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			border-radius: 20rpx;
			overflow: hidden;
			font-size: 30rpx;
			.title {
				color: #000;
				width: 80%;
				height: 88rpx;
				margin: 70rpx auto 80rpx;
			}
			.btn {
				display: flex;
				justify-content: space-around;
				text {
					padding: 19rpx 85rpx;
				}
				text:first-child {
					background: #f7f7f7;
					border-radius: 10rpx;
				}
				text:last-child {
					background: #ff5a2c;
					border-radius: 10rpx;
					color: #fff;
				}
			}
		}
	}
	/deep/ .uni-drawer__content {
		width: 80%;
		padding: 30rpx;
		padding-top: 130rpx;
		.uni-drawer-title {
			margin-bottom: 30rpx;
			display: flex;
            justify-content: space-between;
			.chify{
				font-size: 40rpx;
				font-weight: bold;
			}
			.close{
				border: 1rpx solid #999;
				font-size: 30rpx;
				padding: 2px 5px;
				letter-spacing: 1rpx;
			}
		}
		.uni-drawer-content {
			display: flex;
			flex-wrap: wrap;
			font-size: 30rpx;
			// justify-content: space-between;
			.item {
				// width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: #f3f3f3;
				color: #999;
				letter-spacing: 5rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
			}
			.item1 {
				position: relative;
				margin-left:10px;
				text {
					position: absolute;
					top: -30rpx;
					right: -22rpx;
					font-size: 20rpx;
					color: #ff5904;
				}
			    span{
					display: inline-block;
					padding: 0 5px;
				}
			}
			.addItem {
				color: #ff5904;
				background: #fff;
				border: 1px solid #ff5904;
				margin-left:10px;
			}
		}
		.hideInput {
			display: none;
			
		}
		.uni-drawer-input {
			> view {
				width: 80%;
				margin: 100rpx auto 0;
				// display: flex;
				font-size: 30rpx;
				input {
					height: 80rpx;
					border-radius: 40rpx;
					border: 1px solid #e0e0e0;
					text-indent: 2em;
					margin-bottom: 30rpx;
				}
				view {
					height: 80rpx;
					line-height: 80rpx;
					margin-left: 20rpx;
				}
			}
		}
		.uni-drawer-btn {
			width: 95%;
			color: #ff5904;
			font-size: 40rpx;
			text-align: center;
			height: 88rpx;
			margin: 200rpx auto 0;
			line-height: 88rpx;
			background: #ffdecc;
			border-radius: 40rpx;
		}
	}
}
</style>
