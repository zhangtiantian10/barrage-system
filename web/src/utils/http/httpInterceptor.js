import {notification} from 'antd'
import {get} from 'lodash'
import {AUTHENTICATION_ERROR_MAP, FORBIDDEN_ERROR_MAP, REGISTER_ERROR_MAP} from './constant'

export default (interceptor) => {
	interceptor.response.use(function (response) {
			// if (response.headers.authorization) {
			//   cookie.set('TOKEN', response.headers.authorization)
			// }
			return response
		},
		function (error) {
		debugger
		let errorCode = '';
		console.log(error.response)
			const {response} = error
			switch (response.status) {
				case 401:
					errorCode = get(response, 'data.code')
					const authError = AUTHENTICATION_ERROR_MAP[errorCode]
					if(authError) {
						notification.open({
							message: '错误',
							description: authError + ',请重新登录'
						})
						// cookie.remove('TOKEN')
						// window.localStorage.clear()
						// const store = getStoreInstance()
						// store.dispatch({type: LOGOUT_USER})
						setTimeout(() => {
							window.location.href = '/login'
						}, 2000)
					}
					break
				case 403:
					errorCode = get(response, 'data.code')
					const forbiddenError = FORBIDDEN_ERROR_MAP[errorCode]
					if (forbiddenError) {
						notification.open({
							message: '无权限',
							description: forbiddenError
						})
						setTimeout(() => {
							window.location.href = '/login'
						}, 200)
					}
					break
				case 409:
					errorCode = get(response, 'data.code')
					if (errorCode === 30032) {
						break
					}
					const confictError = REGISTER_ERROR_MAP[errorCode]
					if (confictError) {
						notification.open({
							message: '错误',
							description: confictError + ',请重新填写'
						})
					}
					setTimeout(() => {
						window.location.href = '/register'
					}, 2000)
					break
				default:
					break
			}
			if (!response.message) {
				response.message = '业务系统异常'
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
