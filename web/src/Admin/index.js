import React, { Component } from 'react';
import cssModules from 'react-css-modules'
import { Layout, Breadcrumb, message} from 'antd';
import Cookies from 'js-cookie'
import {withRouter} from 'react-router'

import styles from './index.scss';
import Menus from './Menus'
import HeaderPage from '../constant/HeaderPage'
import UsersInfo from "./UsersInfo";
import ModifyPassword from './ModifyPassword'
import LiveData from "./UsersInfo/LiveData";

const { Header, Content, Footer, Sider } = Layout;

const MAP_CONTENT_COMPONENT = {
	users: UsersInfo,
	password: ModifyPassword,
	liveRoom: LiveData
}

class HomePage extends Component {
	state = {
    collapsed: false,
    viewType: 'users',
    roomId: 0,
    userId: 0
	};

	componentWillMount () {
    let path = this.props.location.pathname.split('/')[2]
    const {roomId} = this.props.match.params || 0
    const userId = this.props.location.search.split('=')[1] || 0
		if (userId && roomId) {
    	path = 'users'
		}
		this.setState({roomId, userId, viewType: path})
	}

	componentDidMount() {
    const user = Cookies.getJSON('user')

    if (!Cookies.getJSON("user")) {
			message.error('请先登录')
			setTimeout(() => {
				this.props.history.push('/admin/login')
			}, 10)
		} else if(!user.role) {
      message.error('您无权限访问此页')
      setTimeout(() => {
        this.props.history.push('/user')
      }, 10)
		}
	}
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	changeView = (viewType) => {
    this.props.history.push(`/admin/${viewType}`)
	}

	logout() {
		Cookies.remove('user')
		this.props.history.push('/admin/login')
	}

	render() {
    const {userId, roomId} = this.state

    const user = Cookies.getJSON('user')
    let View = MAP_CONTENT_COMPONENT[this.state.viewType] || LiveData
    if (userId && roomId) {
      View = LiveData
    }
    if(!user) {
      return ''
    }

		return (
			<Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, height: 46 }} >
          <HeaderPage username={user ? user.userName : ''} user={user} type="user" logout={this.logout.bind(this)}/>
        </Header>
				<Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menus changeView={this.changeView} viewType={this.state.viewType}/>
          </Sider>
					<Content style={{ margin: '0' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<View changeView={this.changeView.bind(this)} userId={userId} roomId={roomId}/>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(cssModules(HomePage, styles));
