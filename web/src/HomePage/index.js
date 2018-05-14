import React from 'react'
import { Carousel } from 'antd'
import {withRouter} from 'react-router'
import Cookies from 'js-cookie'

import Header from '../constant/HeaderPage'
import Page from './Page'
import SortPage from "./SortPage"
import LiveData from "../constant/LiveData";

const MAP_VIEW = {
  homePage: Page,
  sort: SortPage,
  liveData: LiveData
}

class HomePage extends React.Component {
  state = {
    viewType: '',
    roomId: 0,
    userId: 0
  }

  componentWillMount() {
    const {roomId} = this.props.match.params || 0
    const userId = this.props.location.search.split('=')[1] || 0
    const viewType = this.props.location.pathname.split('/')[1];

    this.setState({
      viewType,
      roomId,
      userId
    })
  }

  changeView(value) {
    this.props.history.push(`/${value.key}`)
  }

  logout() {
    const user = Cookies.getJSON('user')
    Cookies.remove('user');

    if (user.role) {
      this.props.history.push('/admin/login')
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const {viewType, roomId, userId} = this.state

    const user = Cookies.getJSON('user')
    const View = MAP_VIEW[viewType] || HomePage

    return (<div style={{background: '#f6f6f6', paddingBottom: 100}}>
      <Header type={viewType === 'liveData' ? 'sort' : viewType} user={user} username={user ? user.userName : ''} logout={this.logout.bind(this)}/>
      <View roomId={roomId} userId={userId}/>
    </div>)
  }
}

export default withRouter(HomePage)