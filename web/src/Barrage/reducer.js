export default (state = {}, action) => {
	switch (action.type) {
		case 'GET_BARRAGE':
			return Object.assign({}, state, action.data)
		default:
			return state
	}
}