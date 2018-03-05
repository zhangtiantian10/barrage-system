import httpClient from '../utils/http'
import Stomp from "@stomp/stompjs";
import SockJS from 'sockjs-client-web';

let subscription;


export const getBarrages = (liveRoomId) => {
	return dispatch => {
		return httpClient.get(`/user/liveRoom/${liveRoomId}`)
			.then((res) => {
				var socket = new SockJS('http://localhost:8081/websocket');
				const socketClient = Stomp.over(socket);
				socketClient.connect({}, function (frame) {
					subscription = socketClient.subscribe(`/message/barrage/user/${res.data.id}/liveRoom/${liveRoomId}`, function (greeting) {
						dispatch({type: 'GET_BARRAGE', barrage: JSON.parse(greeting.body)})
					});
				});
			})
	}
}

export const cancelSubscribe = () => {
	return dispatch => {
		subscription.unsubscribe();
	}
}