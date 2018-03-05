export default (state = {}, action) => {
	switch (action.type) {
		case 'GET_BARRAGE':
			return Object.assign({}, state, action.barrage)
		default:
			return state
	}
}