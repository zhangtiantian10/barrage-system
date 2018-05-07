import httpClient from '../../utils/http'
import Cookies from 'js-cookie'

export const saveUserInfo = () => {
	return {
		type: 'SAVE_USER_IN_REDUCER',
	}
}

export const getUserInfo = (id) => {
	return dispatch => {
		return httpClient.get(`/user/${id}`)
	}
}

export const putUser = (user) => {
	return dispatch => {
		return httpClient.put(`/user`, user)
	}
}

export const changePassword = (id, password) => {
	console.log(password, '=========')
	return dispatch => {
		return httpClient.put(`/user/${id}/password`, {password})
	}
}