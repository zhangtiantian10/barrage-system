import React, { Component } from 'react';
import cssModules from 'react-css-modules'
import { Layout, Breadcrumb, message} from 'antd';
import Cookies from 'js-cookie'
import {withRouter} from 'react-router'

import styles from './index.scss';
import Menus from './Menus'
import HeaderPage from './HeaderPage'
import UsersInfo from "./UsersInfo";
import LiveRooms from "./LiveRooms";

const { Header, Content, Footer, Sider } = Layout;

const MAP_CONTENT_COMPONENT = {
	users: UsersInfo,
	liveRooms: LiveRooms
}

class HomePage extends Component {
	state = {
		collapsed: false,
		viewType: 'users'
	};

	componentWillMount () {
    const path = this.props.location.pathname.split('/')[2]
    this.setState({viewType: path})
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
		const View = MAP_CONTENT_COMPONENT[this.state.viewType] || Header

		const user = Cookies.getJSON('user')
		if(!user) {
			return ''
		}
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.onCollapse}
				>
					<Menus changeView={this.changeView} viewType={this.state.viewType}/>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} >
						<HeaderPage username={user ? user.userName : ''} logout={this.logout.bind(this)}/>
					</Header>
					<Content style={{ margin: '0' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<View changeView={this.changeView.bind(this)}/>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(cssModules(HomePage, styles));
