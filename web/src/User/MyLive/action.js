import httpClient from '../../utils/http'
import Cookies from 'js-cookie'

import webSocket from '../../utils/webSocket'

export const getAllLiveRoom = () => {
	const userId = Cookies.getJSON('user').id
	return dispatch => {
		return httpClient.get(`/room/user/${userId}`)
			.then((res) => {
				dispatch({type: 'GET_ALL_LIVE_ROOM', liveRooms: res.data})
			})
	}
}

export const deleteLiveRoom = (id) => {
	return dispatch => {
		return httpClient.delete(`/room/${id}`)
			.then((res) => {
				dispatch({type: 'GET_ALL_LIVE_ROOM', liveRooms: res.data})
			})
	}
}

export const changeLiveStatus = (liveRoom, type) => {
	return dispatch => {
		return httpClient.put(`/room/${liveRoom.id}/status`)
			.then((res) => {
				dispatch({type: 'GET_ALL_LIVE_ROOM', liveRooms: res.data})
				webSocket(liveRoom, type, dispatch)
			})
	}
}