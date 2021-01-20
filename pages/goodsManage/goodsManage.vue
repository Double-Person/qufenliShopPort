<template>
	<view class="goodsManage">
		<commonHeader headerTitl="我的店铺" xingHide=true lingHide=true></commonHeader>
		<!-- 验证密码蒙层 -->
		<!-- 		<view class="shopManage-testPwd" :class="hideBox?'hideBox':''">
			<view class="shopManage-testPwd-title">
				请输入登录密码
			</view>
			<testCode @isPwdStata="inputPwdStata" :focusStata='focusStata'></testCode>
		</view> -->
		<!-- 内容开始 -->
		<view class="goodsManage-content">
			<view class="goodsManage-content-left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view v-for="(item,index) in list" :key="index" :class="{'leftActive':index==leftIndex}" :data-index="index" @tap="leftTap">
						{{item.CATEGORY_NAME}}
					</view>
				</scroll-view>
			</view>
			<view class="goodsManage-content-right">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
				 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
					<view v-for="(item,index) in list" :key="index" id="rightArr">
						<view class="item-title" :id="'item-'+index">
							<view>{{ item.NAME }}</view>
						</view>
						<block v-if="item.list && item.list.length">
							<view class="item" v-for="(item1,index1) in item.list" :key="index1">
								<view class="item-goods">
									<!-- item1.IMG -->
									<image :src="baseImgUrl + item1.IMG" mode=""></image>
									<view class="item-goods-text">
										<text>{{item1.GOODNAME}}</text>
										<view>
											规格：{{item1.NORMS}}
										</view>
										<view>
											价格：￥{{item1.PRICE}}
										</view>
										<view>
											库存：{{item1.STOCK}}
										</view>
									</view>
								</view>
								<view class="item-evaluate" v-if="item1.DETAILS">
									{{item1.DETAILS}}
								</view>
								<view class="item-btn" :style="{'margin-top': item1.DETAILS? '0': '20rpx'}">
									<text @tap="changeData(index,index1)">修改</text>
									<text @click="delGoods(item1)">删除</text>
								</view>
							</view>
						</block>
						<block v-else>
							<view style="padding: 40px; font-size: 14px; text-align: center;">暂无数据</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 内容结束 -->

		<!-- 底部 -->
		<navigator url="../addGoods/addGoods?type=add" class="goodsManage-footer">
			添加商品
		</navigator>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	import commonHeader from "@/components/common-header/common-header";
	// import testCode from '@/components/testCode/testCode';
	import {
		getShopMsg,
		goodDelete,
		baseImgUrl
	} from "@/common/apis.js"
	export default {
		name: 'GoodsManager',
		components: {
			commonHeader,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				baseImgUrl: baseImgUrl,
				deleteGoodsId: '',
				scrollHeight: '73%',

				list: [],
				leftIndex: 0,
				scrollInto: '',
				topArr: [],
				isMainScroll: false,
				rightTopArr: [],
				// 显示隐藏密码框
				hideBox: false,
				focusStata: false,
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
					this.scrollHeight = `${res.windowHeight-60}px`;
				}
			});
			this.getGoods()
		},
		mounted() {
			this.getTopArr();
		},
		
		methods: {
			close() {
				this.$refs.popup.close()
			},
			confirm() {
				goodDelete({
					goods_id: this.deleteGoodsId
				}).then(res => {
					if (res.msgType == 0) {
						uni.showToast({ title: '删除成功', icon: 'none' })
						this.close()
						this.getGoods()
					} else {
						uni.showToast({ title: '删除失败', icon: 'none' })
					}
				})
			},
			// 删除商品
			delGoods(goods) {
				this.deleteGoodsId = goods.GOODS_ID
				this.$refs.popup.open()
			},
			// 点击切换左侧状态
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${index}`;
			},
			/* 主区域滚动监听 */
			mainScroll(e) {
				if (!this.isMainScroll) {
					return;
				}
				let top = e.detail.scrollTop;
				let index = -1;

				if (top >= this.topArr[this.topArr.length - 1]) {
					index = this.topArr.length - 1;
				} else {
					index = this.topArr.findIndex((item, index) => {
						return this.topArr[index + 1] >= top;
					});
				}
				this.leftIndex = (index < 0 ? 0 : index);
				// 右连左
				for (var i = 0; i < this.rightTopArr.length; i++) {
					// #ifdef H5
					if (top > this.rightTopArr[i] - 30 && top < this.rightTopArr[i + 1]) {
						this.leftIndex = i;
					}
					// #endif
					if (top > this.rightTopArr[i] - 50 && top < this.rightTopArr[i + 1]) {
						this.leftIndex = i;
					}
				}
			},
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
			//获取距离顶部的高度
			getScrollTop(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query.select(selector + '').boundingClientRect(data => {
						resolve(data.top)
					}).exec();
				})
			},
			// 获取右侧高度数组
			async getTopArr() {
				/* Promise 对象数组 */
				let p_arr = [];

				/* 遍历数据，创建相应的 Promise 数组数据 */
				for (let i = 0; i < this.list.length; i++) {
					const resu = await this.getScrollTop(`#item-${i}`)
					p_arr.push(resu)
				}

				this.rightTopArr = p_arr;

				/* 主区域滚动容器的顶部距离 */
				this.getScrollTop("#scroll-el").then((res) => {

					let top = res;
					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data) => {
						this.tipsTop = `${data}px`;
						this.topArr = data;
					});
				})
			},
			// 修改数据
			changeData(index, index1) {
				uni.navigateTo({
					url: '../addGoods/addGoods?type=edit&item=' + encodeURIComponent(JSON.stringify(this.list[index].list[index1]))
				})
			},
			// 密码输入状态
			inputPwdStata(e) {
				if (e) {
					this.hideBox = true
				}
			},
			// 获取商品列表
			async getGoods() {
				const {
					returnMsg,
					msgType
				} = await getShopMsg({
					shop_id: uni.getStorageSync('shopId')
				})
				console.log(returnMsg, msgType)
				if (msgType === 0) {
					this.list = returnMsg.title.map(item => {
						item.list = returnMsg.list.filter(ktem => ktem.CATEGORY_ID === item.SHOPCATEGORY_ID)
						return item
					})
				}
			},

		},
		
	}
</script>

<style lang="less">
	.goodsManage {
		.goodsManage-content {
			display: flex;
			padding-top: 90rpx;
			padding-bottom: 100rpx;
			color: #333;
			/* #ifdef APP-PLUS */
			padding-top: 130rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			padding-top: 130rpx;
			/* #endif */

			.goodsManage-content-left {
				display: flex;
				flex-direction: column;
				width: 160rpx;

				view {
					font-size: 28rpx;
					height: 100rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #f8f6f9;

					text {
						font-size: 34rpx;
						margin-right: 10rpx;
					}
				}

				.leftActive {
					background: #fff;
				}
			}

			.goodsManage-content-right {
				flex: 1;

				.item-title {
					font-size: 32rpx;
					padding-left: 30rpx;
					color: #FF5A2C;
					padding-top: 30rpx;
				}

				.title {
					padding-left: 30rpx;
					font-size: 38rpx;
					height: 50rpx;
					glyph-orientation-horizontal: 50rpx;
				}

				.item {
					padding: 20rpx;

					.item-goods {
						display: flex;

						image {
							width: 180rpx;
							height: 152rpx;
							border-radius: 20rpx;
						}

						.item-goods-text {
							margin-left: 20rpx;
							font-size: 28rpx;

							text {
								font-size: 30rpx;
							}

							view {
								margin-top: 10rpx;
							}
						}
					}

					.item-evaluate {
						margin: 20rpx 0;
						width: 514rpx;
						height: 69rpx;
						background: #f7f7f7;
						font-size: 24rpx;
						border: 20rpx solid #f7f7f7;
						line-height: 1.5em;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.item-btn {
						padding: 20rpx 0;
						font-size: 24rpx;
						color: #FF5904;

						text {
							padding: 8rpx 44rpx;
							border: 1rpx solid #FF5904;
							border-radius: 40rpx;
							margin-right: 20rpx;
						}
					}
				}
			}
		}

		.goodsManage-footer {
			height: 100rpx;
			width: 100%;
			background: linear-gradient(312deg, rgba(255, 127, 60, 1) 0%, rgba(255, 94, 50, 1) 100%);
			box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 40rpx;
			letter-spacing: 5rpx;
			position: fixed;
			bottom: 0;
		}

		// 蒙层
		.hideBox {
			display: none;
		}

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
	}
</style>
