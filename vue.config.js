module.exports = {
  devServer: {
    proxy: {
      "/": {
		// target: "https://yflh.hkzhtech.com/qufl",
        target: "https://qfl.qfl168.cn/qufl",		
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/": "",
        },
      },
    },
  }
};
