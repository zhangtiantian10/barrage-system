import {combineReducers} from 'redux'
import user from '../User/reducers'
import myLive from '../HomePage/MyLive/reducer'
import barrage from '../Barrage/reducer'

export default combineReducers({
	user,
	myLive,
	barrage
})