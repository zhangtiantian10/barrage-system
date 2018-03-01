import httpClient from '../../utils/http'
import Cookies from 'js-cookie'

export const addLiveRoom = (platform, roomId) => {
	return dispatch => {
		const userId = Cookies.getJSON('user').id
		return httpClient.post(`/room`, {platform, roomId, userId})
	}
}