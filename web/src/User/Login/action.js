import httpClient from '../../utils/http'
import Cookies from 'js-cookie'

const saveUser = () => {
	return {
		type: 'SAVE_USER_IN_REDUCER',
	}
}

export const login = (values) => {
	return dispatch => {
		return httpClient.post(`/user/login`, values)
			.then((res) => {
				Cookies.set('user', res.data)
		})
	}
}

export const register = (data) => {
	return dispatch => {
		return httpClient.post(`/user/register`, data)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}