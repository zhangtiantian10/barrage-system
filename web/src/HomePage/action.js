import httpClient from "../utils/http/index";

export const getBarrageSort = (limit) => {
  return dispatch => {
    return httpClient.get(`/user/barrage/sort/${limit}`)
      .then((res) => {
        dispatch({type: 'GET_BARRAGE_SORT', data: res.data})
      })
  }
}

export const getGiftSort = (limit) => {
  return dispatch => {
    return httpClient.get(`/user/gift/sort/${limit}`)
      .then((res) => {
        dispatch({type: 'GET_GIFT_SORT', data: res.data})
      })
  }
}