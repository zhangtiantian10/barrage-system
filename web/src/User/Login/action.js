import httpClient from '../../utils/http'

export const login = (values) => {
	return dispatch => {
		return httpClient.post(`/user/login`, values)
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