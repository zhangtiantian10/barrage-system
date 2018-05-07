import httpClient from '../../utils/http'
import Cookies from 'js-cookie'

import webSocket from '../../utils/webSocket'

export const addLiveRoom = (platform, roomId) => {
	return dispatch => {
		const userId = Cookies.getJSON('user').id
		return httpClient.post(`/room`, {platform, roomId, userId})
			.then((res) => {
				webSocket(res.data, 'start', dispatch)
			})
	}
}

export const getAllLiveRoom = () => {
	const userId = Cookies.getJSON('user').id
	return dispatch => {
		return httpClient.get(`/room/user/${userId}`)
			.then((res) => {
				dispatch({type: 'GET_ALL_LIVE_ROOM', liveRooms: res.data})
			})
	}
}