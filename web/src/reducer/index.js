import {combineReducers} from 'redux'
import user from '../User/reducers'
import myLive from '../HomePage/MyLive/reducer'

const reducer = (state = [], action) => {
	return state
}

export default combineReducers({
	reducer,
	user,
	myLive
})