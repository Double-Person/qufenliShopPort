// 引入封装的request
// import request from './request.js';
import request from './ajax.js';
import { COMMON_URL } from './baseUrlConfig.js'
// const COMMON_URL = 'https://yflh.hkzhtech.com/qufl';
// const COMMON_URL = 'http://192.168.0.107:8081';
export const baseUrl = COMMON_URL;

export const baseImgUrl = COMMON_URL + '/'



// 1.商家登录 ok
export const login = params => request.get('/api/merchant/merchantLogin', {params});
// 2.店铺编辑接口
export const shopEdit = params => request.get('/api/merchant/newEditShopInfo', {params});
// 3.修改登录密码  ok
export const changeLoginPwd = params => request.get('/api/merchant/editLoginpass', {params});
// 4.修改交易密码  ok
export const changeDealPwd = params => request.get('/api/merchant/editPaypass', {params});
// 5.绑定银行卡
export const bandCart = params => request.post('/api/merchant/addShopBank', params);
// 6.订单统计查询  ok
export const orderTotal = params => request.get('/api/merchant/orderList', {params});
// 7.收益统计  ok
export const profitTotal = params => request.get('/api/merchant/shopIncomeList', {params});
// 8.忘记交易密码
export const forgetPwd = params => request.get('/api/merchant/findPass', {params});
// 9.商家入驻
export const shopIn = params => request.post('/api/merchant/shopAuth', params);
// 10.商品图片保存
export const saveImg = params => request.post('/api/merchantgoods/addShopGoodImgs', params);
// 11.商品上下架
export const shopState = params => request.post('/api/merchantgoods/editShopState', params);
// 12.商品推荐首页
export const shopRecommend = params => request.post('/api/merchantgoods/editShopPushhp', params);
// 13.分类获取商品信息 ok
export const getShopMsg = params => request.get('/api/merchantgoods/shopBygoodList', {params});
// 14.获取商评论 ok
export const getShopEvaluateList = params => request.get('/api/merchantgoods/shopEvaluateList', {params});
// 15.商户回复评论
export const getShopComment = params => request.post('/api/merchantgoods/addShopEvaluate', params);
// 16.发送验证码
export const sendCode = params => request.post('/api/ordersummary/mobile', params);
// 17.获取首页商家数据 ok
export const homeInfo = params => request.get('/api/merchant/homeInfo', {params});
// 18.添加商品
export const addGoodsInfo = params => request.get('/api/merchantgoods/addGoodsInfo', {params});
// 修改商品
export const editGoodsInfo = params => request.post('/api/merchantgoods/editGoodsInfo', params);


// 商品详情
export const orderDetail = params => request.get('/api/merchant/ordersummarydetail', {params})
// 19.删除商品 ok
export const goodDelete = params => request.get('/api/merchantgoods/goodDelete', {params});
// 20. 获取店铺信息 ok
export const getShopData = params => request.get('/api/merchant/shopById', {params});
// 21. 添加分类接口 ok
export const addGoodsItem = params => request.post('/api/merchantgoods/categoryAdd', params);
// 修改分类
export const categoryUpdate = params => request.post('/api/merchantgoods/categoryUpdate', params);



// 22. 删除分类接口 ok
export const delGoodsItem = params => request.get('/api/merchantgoods/categoryDelete', {params});
// 23. 分类列表 ok
export const itemListArr = params => request.get('/api/merchantgoods/categoryList', {params});
// 24. 商家端订单不同状态展示列表
export const orderList = params => request.get('/api/merchant/ordersunmarytypeList', {params})
// 25. 商家获取单个评论
export const getShopEvaluateDetail = params => request.get('/api/merchantgoods/shopEvaluate', {params})
// 26. 商家删除单个评论
export const delShopEvaluate = params => request.get('/api/merchantgoods/evaluateDelete', {params})
// 27. 图片上传
export const uploadImgFile = params => request.post('/uploadFile/file', params)
// 28. 申请退款
export const getRefund = params => request.post('/api/merchant/orderAuth', params)


// 29.二维码收款设置金额 ok
export const merchantQrCode = params => request.get('/api/merchant/qrCode', {params});
// 30 不同意退款
export const orderRepeal = params => request.get('/api/ordersummary/order/repeal', {params});


// 31 确认退款
export const orderAffirm = params => request.get('/api/ordersummary/order/affirm', {params});

//  32 绑定银行
export const addShopBank = params => request.get('/api/merchant/addShopBank', {params});

// 33 绑定收款微信账号
// export const wxAccount = params => request.post('/api/ordersummary/wx/account', params)
export const wxAccount = params => request.post('/api/merchant/wx/account', params)
// 34 绑定收款支付宝账号
// export const aliAccount = params => request.post('/api/ordersummary/ali/account', params)
export const aliAccount = params => request.post('/api/merchant/ali/account', params)

// 35 判断是否绑定银行卡
export const shopBank = params => request.get('/api/merchant/shopBank', {params});
// 36 解绑银行卡
export const updeteShopBank = params => request.get('/api/merchant/updeteShopBank', {params});




//   商家确认退款就接口   shop_id   商家id   order_id  订单号id     POST请求
// 37 商家确认退款就接口
export const shopOut = params => request.post('/api/merchant/shopOut', params)

//  确认发货   ORDERSUMMARY_ID
export const take = params => request.post('/api/ordersummary/order/take1', params)

// 查询商品详情
export const findByShopId = params => request.get('/api/merchantgoods/findByShopId', {params});
// 判断商家是否有交易密码  shop_id
export const shoppwdInfo = params => request.get('/api/ordersummary/shoppwdInfo', {params});


export const offlinetradingList = params => request.get('/api/merchant/offlinetrading/list', {params});

// 微信提现
/**
 * money 金额  types  0用户、1商家   id 用户或商家的id   openid  
 */
export const wxtx = params => request.post('/api/tx/wxtx', params);
/** 支付宝提现
 * money 提现金额  types 提现类型 0用户、1商家 id  用户或商家的id  zfb 
 */
export const alitx = params => request.post('/api/tx/ali/pay', params);

// 提现记录接口   参数 userinfo_id ==========
export const withdrawalInfo = params => request.get('/api/merchant/withdrawalInfo', {
	params
})

// // shop_id  判断是否有交易密码  JSESSIONID
// export const shoppwdInfo = params => request.get('/api/ordersummary/shoppwdInfo', {params});




// export const uploadsFile = params => request.post('/api/uploads', params);
// https://yflh.hkzhtech.com/qufl   /qfl
export const uploadsFile = params => request.post('/api/uploads', params);

