import httpClient from '../utils/http/index'
import Stomp from "@stomp/stompjs";
import SockJS from 'sockjs-client-web';

export const adminGetUsers = () => {
  return dispatch => {
    return httpClient.get(`/user`)
      .then((res) => {
        dispatch({type: 'GET_USERS', data: res.data})
      })
  }
}

export const changePassword = (id, password) => {
  return dispatch => {
    return httpClient.put(`/user/${id}/password`, {password})
  }
}

export const getLiveRoom = (id) => {
  return dispatch => {
    return httpClient.get(`/room/${id}`)
  }
}

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