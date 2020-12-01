// 引入封装的request
// import request from './request.js';
import {ajax as request} from './requestTest.js';

export const baseUrl = 'https://yflh.hkzhtech.com/qufl'


// 1.商家登录 ok
export const login = data => request({url: '/api/merchant/merchantLogin', data, method: 'GET'});
// 2.店铺编辑接口
export const shopEdit = data => request({url: '/api/merchant/newEditShopInfo', data, method: 'GET'});
// 3.修改登录密码  ok
export const changeLoginPwd = data => request({url: '/api/merchant/editLoginpass', data, method: 'GET'});
// 4.修改交易密码  ok
export const changeDealPwd = data => request({url: '/api/merchant/editPaypass', data, method: 'GET'});
// 5.绑定银行卡
export const bandCart = data => request.post({url:'/api/merchant/addShopBank', data, method: 'POST'});
// 6.订单统计查询  ok
export const orderTotal = data => request({url: '/api/merchant/orderList', data, method: 'GET'});
// 7.收益统计  ok
export const profitTotal = data => request({url: '/api/merchant/shopIncomeList', data, method: 'GET'});
// 8.忘记交易密码
export const forgetPwd = data => request({url:'/api/merchant/findPass',  data, method: 'GET'});


// 9.商家入驻
export const shopIn = data => request({url:'/api/merchant/shopAuth', data, method: 'POST'});
// 10.商品图片保存
export const saveImg = data => request({url:'/api/merchantgoods/addShopGoodImgs', data, method: 'POST'});
// 11.商品上下架
export const shopState = data => request({url:'/api/merchantgoods/editShopState', data, method: 'POST'});
// 12.商品推荐首页
export const shopRecommend = data => request({url:'/api/merchantgoods/editShopPushhp', data, method: 'POST'});


// 13.分类获取商品信息 ok
export const getShopMsg = data => request({url:'/api/merchantgoods/shopBygoodList', data, method: 'GET'});
// 14.获取商评论 ok
export const getShopEvaluateList = data => request({url:'/api/merchantgoods/shopEvaluateList', data, method: 'GET'});


// 15.商户回复评论
export const getShopComment = data => request({url:'/api/merchantgoods/addShopEvaluate', data, method: 'POST'});
// 16.发送验证码
export const sendCode = data => request({url:'/api/ordersummary/mobile', data, method: 'POST'});
// 17.获取首页商家数据 ok
export const homeInfo = data => request({url:'/api/merchant/homeInfo', data, method: 'GET'});
// 18.添加商品
export const addGoodsInfo = data => request({url:'/api/merchantgoods/addGoodsInfo', data, method: 'GET'});
// 修改商品
export const editGoodsInfo = data => request({url:'/api/merchantgoods/editGoodsInfo', data, method: 'POST'});


// 商品详情
export const orderDetail = data => request({url:'/api/merchant/ordersummarydetail', data, method: 'GET'})
// 19.删除商品 ok
export const goodDelete = data => request({url:'/api/merchantgoods/goodDelete', data, method: 'GET'});
// 20. 获取店铺信息 ok
export const getShopData = data => request({url:'/api/merchant/shopById', data, method: 'GET'});



// 21. 添加分类接口 ok
export const addGoodsItem = data => request({url:'/api/merchantgoods/categoryAdd', data, method: 'POST'});
// 修改分类
export const categoryUpdate = data => request({url:'/api/merchantgoods/categoryUpdate', data, method: 'POST'});



// 22. 删除分类接口 ok
export const delGoodsItem = data => request({url:'/api/merchantgoods/categoryDelete', data, method: 'GET'});
// 23. 分类列表 ok
export const itemListArr = data => request({url:'/api/merchantgoods/categoryList', data, method: 'GET'});
// 24. 商家端订单不同状态展示列表
export const orderList = data => request({url:'/api/merchant/ordersunmarytypeList', data, method: 'GET'})
// 25. 商家获取单个评论
export const getShopEvaluateDetail = data => request({url:'/api/merchantgoods/shopEvaluate', data, method: 'GET'})
// 26. 商家删除单个评论
export const delShopEvaluate = data => request({url:'/api/merchantgoods/evaluateDelete', data, method: 'GET'})


// 27. 图片上传
export const uploadImgFile = data => request({url:'/uploadFile/file', data, method: 'POST'})
// 28. 申请退款
export const getRefund = data => request({url:'/api/merchant/orderAuth', data, method: 'POST'})


// 29.二维码收款设置金额 ok
export const merchantQrCode = data => request({url:'/api/merchant/qrCode', data, method: 'GET'});
// 30 不同意退款
export const orderRepeal = data => request({url:'/api/ordersummary/order/repeal', data, method: 'GET'});
// 31 确认退款
export const orderAffirm = data => request({url:'/api/ordersummary/order/affirm', data, method: 'GET'});

//  32 绑定银行
export const addShopBank = data => request({url:'/api/merchant/addShopBank', data, method: 'GET'});




// 33 绑定收款微信账号
export const wxAccount = data => request({url:'/api/ordersummary/wx/account',  data, method: 'POST'})
// 34 绑定收款支付宝账号
export const aliAccount = data => request({url:'/api/ordersummary/ali/account',  data, method: 'POST'})


// 35 判断是否绑定银行卡
export const shopBank = data => request({url:'/api/merchant/shopBank', data, method: 'GET'});
// 36 解绑银行卡
export const updeteShopBank = data => request({url:'/api/merchant/updeteShopBank', data, method: 'GET'});




//   商家确认退款就接口   shop_id   商家id   order_id  订单号id     POST请求
// 37 商家确认退款就接口
export const shopOut = data => request({url:'/api/merchant/shopOut',  data, method: 'POST'})

//  确认发货   ORDERSUMMARY_ID
export const take = data => request({url:'/api/ordersummary/order/take1',  data, method: 'POST'})

// 查询商品详情
export const findByShopId = data => request({url:'/api/merchantgoods/findByShopId', data, method: 'GET'});
// 判断商家是否有交易密码  shop_id
export const shoppwdInfo = data => request({url:'/api/ordersummary/shoppwdInfo', data, method: 'GET'});

// // shop_id  判断是否有交易密码  JSESSIONID
// export const shoppwdInfo = params => request.get('/api/ordersummary/shoppwdInfo', {params});





// export const uploadsFile = params => request.post('/api/uploads', params);
// https://yflh.hkzhtech.com/qufl   /qfl
export const uploadsFile = data => request({url:'/api/uploads', data, method: 'POST'});


