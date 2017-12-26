import React, {Component} from 'react'
import {Row, Col, Menu} from 'antd'
import cssModules from 'react-css-modules'

import Login from '../Login'
import styles from './index.scss'
import Register from '../Register'

const MAP_CURRENT_PAGES = {
	login: Login,
	register: Register
}

class LoginRegister extends Component {

	state = {
		current: ''
	}

	componentDidMount() {
		const current = this.props.match.path.split('/')[1]
		this.setState({
			current
		})
	}

	handleClick = (e) => {

		const current = e.key.split('.$')[1]
		this.props.history.push(current)
	}

	render() {

		const CurrentPage = MAP_CURRENT_PAGES[this.state.current] || Login
		return (<div styleName="login-register">
				<Row>
					<Col span={8} offset={8} styleName="login-register-content">
						<Menu
							onClick={this.handleClick}
							selectedKeys={[`.$${this.state.current}`]}
							mode="horizontal">
							<Menu.Item key="login" id="login" styleName="menu-item">
								登陆
							</Menu.Item>
							<Menu.Item key="register" styleName="menu-item">
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