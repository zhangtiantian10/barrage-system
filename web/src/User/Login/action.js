import httpClient from '../../utils/http'

export const login = (values) => {
	return dispatch => {
		return httpClient.post(`/user/login`, values)
	}
}

export const register = () => {
	return dispatch => {
		return httpClient.post(`/user/register`, {userName: '张5', name: 'zhang', password: '123456',telPhone:'918374938'})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}