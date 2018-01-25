import Stomp from "@stomp/stompjs";
import SockJS from 'sockjs-client-web';

export default () => {
	var socket = new SockJS('http://localhost:8081/websocket');
	const socketClient = Stomp.over(socket);
	socketClient.connect({}, function (frame) {
		console.log('Connected: ' + frame);
		socketClient.subscribe('/message/barrage', function (greeting) {
			console.log(JSON.parse(greeting.body));
		});
		socketClient.send("/api/barrage", {}, JSON.stringify({'name': "123"}));
	});
}