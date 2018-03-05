import Stomp from "@stomp/stompjs";
import SockJS from 'sockjs-client-web';

export default (liveRoom, type, dispatch) => {
	var socket = new SockJS('http://localhost:8081/websocket');
	const socketClient = Stomp.over(socket);
	socketClient.connect({}, function (frame) {
		console.log('Connected: ' + frame);
		socketClient.subscribe(`/message/barrage/user/${liveRoom.userId}/liveRoom/${liveRoom.id}`, function (greeting) {
			console.log(JSON.parse(greeting.body));
			dispatch({type: 'GET_BARRAGE', barrage: greeting.body})
		});

		if(type === 'stop') {
			socketClient.send("/api/disconnect", {}, JSON.stringify(liveRoom))
		} else {
			console.log('1111')
			socketClient.send("/api/barrage", {}, JSON.stringify(liveRoom));
		}
	});
}