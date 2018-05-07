import httpClient from '../../utils/http/index'

export const getBarrageDataForMonth = (userId, platform, monthStr) => {
	return dispatch => {
		return httpClient.get(`/user/${userId}/${platform}/barrageData/${monthStr}`)
	}
}

export const getGiftDataForMonth = (userId, platform, monthStr) => {
	return dispatch => {
		return httpClient.get(`/user/${userId}/${platform}/giftData/${monthStr}`)
	}
}

export const getLiveDataForDay = (userId, platform, day, type) => {
	return dispatch => {
		return httpClient.get(`/user/${userId}/${platform}/${type}/${day}`)
	}
}