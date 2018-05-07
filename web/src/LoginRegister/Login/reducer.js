import Cookies from 'js-cookie'

const initState = {
	isSuccess: '',
	info: Cookies.getJSON('user')
}

export default (state = initState, action) => {
	switch (action.type) {
		case 'SAVE_USER_IN_REDUCER':
			const user = Cookies.getJSON('user')
			return Object.assign({}, state, {info: user})
		default:
			return state
	}
}