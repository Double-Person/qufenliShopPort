/*
	request封装
	2020-03-09   by   张登
*/
import uniRequest from 'uni-request';

// export const uploadFileUrl = 'https://yflh.hkzhtech.com/qufl/uploadFile/file';
export const uploadFileUrl = 'https://yflh.hkzhtech.com/qufl/uploads';
                       

// 判断请求环境
// uniRequest.defaults.baseURL = 'https://yflh.hkzhtech.com/qufl'
if(process.env.NODE_ENV === 'development'){
    // 开发环境
   // #ifdef H5
   uniRequest.defaults.baseURL = '/qfl'
   // #endif
   // #ifdef APP-PLUS
   uniRequest.defaults.baseURL = 'https://yflh.hkzhtech.com/qufl'
   // #endif
}else{
    // 生产环境
	// #ifdef H5
	uniRequest.defaults.baseURL = 'yflh.hkzhtech.com/qufl/'
	// #endif
	// #ifdef APP-PLUS
	uniRequest.defaults.baseURL = 'yflh.hkzhtech.com/qufl/'
	// #endif
}
// 跨域请求设置
uniRequest.defaults.withCredentials = true;

// 请求拦截	
uniRequest.interceptors.request.use(
    request => {
		// 所有请求在请求发送之前获取本地token,带上token
		let token =	'';
		uni.getStorage({
			key:'token',
			success:(res)=>{
				token = res.data;
			}
		})
		request.headers.Authorization = 'Bearer ' + token;
		// request.headers.content-type = 
        //配置基本信息    
        return request;
    },
    err => {
        console.log('请求失败');
        return Promise.reject(err);
    });

// 响应拦截
uniRequest.interceptors.response.use(response=> {
    return Promise.resolve(response);
}, error=> {
    return Promise.reject(error);
});



// 导出两个方法
export default{
	get(url, params = {}) {
		return new Promise((resolve, reject) => {
			uniRequest.get(url, {
					params
				})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	post(url, params = {}) {
		return new Promise((resolve, reject) => {
			uniRequest.post(url, params)
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}