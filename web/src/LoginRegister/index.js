import React, {Component} from 'react'
import {Row, Col, Menu} from 'antd'
import cssModules from 'react-css-modules'

import Login from './Login/index'
import styles from './index.scss'
import Register from './Register/index'

const MAP_CURRENT_PAGES = {
	login: Login,
	register: Register
}

class LoginRegister extends Component {

	state = {
		current: '',
		isAdmin: true
	}

	componentDidMount() {
		const paths = this.props.match.path.split('/')
    let current = paths[1];
    let isAdmin = false;
    if (paths.includes('admin')) {
    	isAdmin = true
			current = paths[2]
    }

		this.setState({
			current,
			isAdmin
		});
	}

	handleClick = (e) => {

		const current = e.key.split('.$')[1]
		this.props.history.push(current)
	}

	render() {

		const CurrentPage = MAP_CURRENT_PAGES[this.state.current] || Login
		return (<div styleName="login-register">
				<div styleName="background">
				</div>
				<Row>
					<Col span={8} offset={8} styleName="login-register-content">
						<Menu
							onClick={this.handleClick}
							selectedKeys={[`.$${this.state.current}`]}
							mode="horizontal">
							<Menu.Item key="login" id="login" styleName={this.state.isAdmin ? "display-menu" : "menu-item"}>
								登陆
							</Menu.Item>
							<Menu.Item key="register" styleName={this.state.isAdmin ? "hidden-menu" : "menu-item"}>
								注册
							</Menu.Item>
						</Menu>
						<CurrentPage/>
					</Col>
				</Row>
			</div>
		)
	}
}

export default cssModules(LoginRegister, styles)