import httpClient from '../../utils/http'
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