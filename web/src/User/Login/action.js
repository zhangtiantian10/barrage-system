import httpClient from '../../utils/http'

export const login = () => {
	return dispatch => {
		return httpClient.get(`/try`)
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}