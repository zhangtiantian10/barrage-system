export default (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_LIVE_ROOM':
			return [...action.liveRooms]
		default:
			return state
	}
}