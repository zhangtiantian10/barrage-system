import React from 'react'
import { Carousel } from 'antd'
import {withRouter} from 'react-router'
import Cookies from 'js-cookie'

import Header from '../constant/HeaderPage'
import Page from './Page'

const MAP_VIEW = {
  homePage: Page,
  sort: Page
}

class HomePage extends React.Component {
  state = {
    viewType: ''
  }

  componentWillMount() {
    this.setState({
      viewType: this.props.location.pathname.split('/')[1]
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
    const user = Cookies.getJSON('user')
    const View = MAP_VIEW[this.state.viewType] || HomePage

    return (<div>
      <Header type={this.state.viewType} user={user} username={user ? user.userName : ''} logout={this.logout.bind(this)}/>
      <View/>
    </div>)
  }
}

export default withRouter(HomePage)