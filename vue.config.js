

// 上线的配置
module.exports = {
	devServer: {
		proxy: {
			'/api':{
				target:"http://localhost:8000"
			}
		}
	}
}



// //开发的配置
// module.exports = {
// 	devServer: {
// 		proxy: {
// 			'/api': {
// 				target: 'http://localhost:8000',
// 				ws: true,
// 				changeOrigin: true
// 			}
// 		}
// 	},
// 	configureWebpack: {
// 		devtool: 'source-map'
// 	}
// }

