import httpClient from "../../utils/http";

export const getUser = (id) => {
  return dispatch => {
    return httpClient.get(`/user/${id}`)
  }
}

export const getLiveDataCount = (id) => {
  return dispatch => {
    return httpClient.get(`/room/barrageCount/${id}`)
  }
}