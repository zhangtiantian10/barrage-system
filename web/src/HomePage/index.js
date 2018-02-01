import React, { Component } from 'react';
import cssModules from 'react-css-modules'
import { Layout, Breadcrumb, } from 'antd';

import styles from './index.scss';
import Menus from './Menus'

const { Header, Content, Footer, Sider } = Layout;

class HomePage extends Component {
	state = {
		collapsed: false,
		viewType: 'user'
	};
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	changeView = (viewType) => {
		this.setState({viewType})
	}
	render() {
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
							{this.state.viewType}
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default cssModules(HomePage, styles);
