import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

// // #ifdef H5
// // 如果10分钟未操作，重新输入密码
// var timer;
// function startTimer() {
// 	clearTimeout(timer);
// 	timer = setTimeout(()=> {
// 		uni.setStorage({
// 			key:'isPwd',
// 			data:false
// 		})
// 	}, 10*60*1000);
// }
// document.ontouchstart = document.ontouchmove = startTimer
// // #endif
// // #ifdef APP-PLUS
// // 首次输入密码30分钟后重新输入
// setInterval(()=>{
// 	uni.setStorage({
// 		key:'isPwd',
// 		data:false
// 	})
// },30*60*1000)
// // #endif

app.$mount()
