let baseUrl_ = ''
// #ifdef H5   
baseUrl_ = 'http://192.168.0.113:8081'
// #endif

// #ifdef APP-PLUS
baseUrl_ = 'https://yflh.hkzhtech.com/qufl/'
// #endif
export const baseUrl = baseUrl_


export const imgBaseUrl = 'https://yflh.hkzhtech.com/qufl/'


export const ajax = (option) => {
	if (!option.url) {
		throw new TypeError('请求地址不能为空')
		return false
	}
	return new Promise((resolve, reject) => {
		let token = null
		// try {
		// 	const value = uni.getStorageSync('CONVENIENCE_TOKEN');

		// 	if (value) {
		// 		token = value
		// 	}
		// } catch (e) {

		// 	console.log(e)
		// }



		uni.request({
			url: baseUrl + option.url,
			data: option.data || {},
			method: option.method || 'GET',
			header: {
				// "Authorization": 'Bearer ' + token,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			success: (res) => {
				console.log('111111111',res)
				if (res.data.msgType != 0) {
					uni.showToast({
						title: '请求失败，请稍后重试',
						icon: 'none'
					})
					reject('系统错误');

				} else {
					resolve(res.data);
				}


			},
			fail: err => {

				uni.showToast({
					title: '请求失败，请稍后重试',
					icon: 'none'
				})
				reject(err);
			},
		});
	})
}

