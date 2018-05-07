import {combineReducers} from 'redux'
import user from '../LoginRegister/reducers'
import myLive from '../User/MyLive/reducer'
import barrage from '../Barrage/reducer'
import admin from '../Admin/reducer'

export default combineReducers({
  user,
  myLive,
  barrage,
  admin
})