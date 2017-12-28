import httpClient from '../../utils/http'

export const login = () => {
	return dispatch => {
		return httpClient.get(`/user/1`)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export const register = () => {
	return dispatch => {
		return httpClient.post(`/user/register`, {userName: '张', name: 'zhang', password: '123345',telPhone:'918374938'})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}