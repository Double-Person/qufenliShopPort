import Request from 'luch-request'
// import Request from '/js_sdk/luch-request/luch-request/index.js'
import { COMMON_URL } from './baseUrlConfig.js'


const request = new Request()

request.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = COMMON_URL + '/' 
	config.withCredentials = true
	config.header = { ...config.header,
		"Content-Type": "application/x-www-form-urlencoded",
	}
	return config
})


request.interceptors.request.use((config, cancel) => { /* 请求之前拦截器 */
	let token = null;
	try {
		token = uni.getStorageSync('token')
	} catch (e) {
		//TODO handle the exception
	}
	if (token) config.header['Authorization'] = 'Bearer ' + token;
	return config
})

request.interceptors.response.use((response) => {


	const res = response.data
	if (res.msgType === 0) { // 服务端返回的状态码不等于0，则reject()
		return res
	}

	return res
	return Promise.reject(res)
}, (response) => {
	uni.showToast({
		title: '接口请求失败',
		icon: 'none'
	})
	return response
})

export default request
