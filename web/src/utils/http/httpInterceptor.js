import notification from 'antd/lib/notification'
// import {get} from 'lodash'

export default (interceptor) => {
	interceptor.response.use(function (response) {
			// if (response.headers.authorization) {
			//   cookie.set('TOKEN', response.headers.authorization)
			// }
			return response
		},
		function (error) {
			const {response} = error
			switch (response.status) {
				case 401:
					// const code = get(error, 'data.code')
					notification.open({
						message: '错误',
						description: '请重新登录'
					})
					window.localStorage.clear()
					setTimeout(() => {
						window.location.href = '/login'
					}, 200)
					break
				case 403:
					// const errorCode = get(error, 'data.code')
					notification.open({
						message: '无权限',
						description: '当前用户无此权限'
					})
					setTimeout(() => {
						window.location.href = '/login'
					}, 200)
					break
				default:
					break
			}
			if (!response.message) {
				error.message = '业务系统异常'
			}

			return Promise.reject(response)
		}
	)

	// interceptor.request.use(function (config) {
	//   const token = cookie.get('TOKEN')
	//   if ((token != null || token != undefined) && needSetAuthHeader(config)) {
	//     config.headers.authorization = token
	//   }
	//   return config
	// }, function (err) {
	//   return Promise.reject(err)
	// })
}
//
// function needSetAuthHeader(config) {
//   let needSetAuthHeader = true
//   const uri = config.url
//   if (/.*\/webapi\/login.*/.test(uri)) {
//     needSetAuthHeader = false
//   }
//   if ((config.url.indexOf('enterprise-admin') != -1 ) && config.method === 'post') {
//     needSetAuthHeader = false
//   }
//   return needSetAuthHeader
// }
