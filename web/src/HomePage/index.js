import React, { Component } from 'react';
import cssModules from 'react-css-modules'
import { Layout, Breadcrumb, message} from 'antd';
import Cookies from 'js-cookie'
import {withRouter} from 'react-router'

import styles from './index.scss';
import Menus from './Menus'
import UserInfo from "./UserInfo";
import LiveData from './LiveData'
import MyLive from './MyLive'
import CreateLive from './CreateLive'

const { Header, Content, Footer, Sider } = Layout;

const MAP_CONTENT_COMPONENT = {
	user: UserInfo,
	liveData: LiveData,
	createLive: CreateLive,
	myLive: MyLive
}

class HomePage extends Component {
	state = {
		collapsed: false,
		viewType: 'user'
	};

	componentDidMount() {
		if (!Cookies.getJSON("user")) {
			message.error('请先登录')
			setTimeout(() => {
				this.props.history.push('/login')
			}, 10)
		}
	}
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	changeView = (viewType) => {
		this.setState({viewType})
	}
	render() {
		const View = MAP_CONTENT_COMPONENT[this.state.viewType] || HomePage

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
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							<View/>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(cssModules(HomePage, styles));
