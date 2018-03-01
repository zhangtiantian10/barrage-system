import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cookies from 'js-cookie'
import {Col, Row, Button, Input, Form, message, Modal} from 'antd'
import cssModules from 'react-css-modules'
import {withRouter} from 'react-router'

import * as action from './action'
import styles from './index.scss'

import UserAvatar from './UserAvatar'

const FormItem = Form.Item;

class UserInfo extends React.Component {

	state = {
		user: {},
		visible: false,
		password: ''
	}

	componentDidMount() {
		if(Cookies.getJSON('user')) {

			this.props.actions.getUserInfo(Cookies.getJSON('user').id)
				.then((res) => {
					Cookies.set('user', res.data)
					this.setState({
						user: res.data
					})
				});
		}
	}

	updateUser(e) {
		e.preventDefault();
		console.log(this.state.user)
		this.props.actions.putUser(this.state.user)
			.then(() => {
				message.success('修改成功')
			})
			.catch(() => {
				message.error('修改失败');
			})
	}

	changeUser(type, e) {
		const user = this.state.user
		user[type] = e.target.roomId
		this.setState({
			user
		})
	}

	onResetPassword() {
		this.setState({
			visible: true
		})
	}

	handleCancel() {
		this.setState({
			visible: false
		})
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.roomId
		})
	}

	changePassword() {
		const {user, password} = this.state
		this.props.actions.changePassword(user.id, password)
			.then(() => {
				message.success('密码修改成功，请重新登录')
				Cookies.remove('user')
				setTimeout(() => {
					this.props.history.push('/login')
				}, 10)
			})
	}

	render() {
		const {user} = this.state

		const formItemLayout = {
			labelCol: {
				xs: { span: 12},
				sm: { span: 8},
			},
			wrapperCol: {
				xs: { span: 12 },
				sm: { span: 12 },
			},
		};

		return (
			<div styleName="user-info">
				<Row>
					<Col span={3} offset={1}>
						<UserAvatar avatar={user.avatar} id={user.id}/>
					</Col>
					<Col styleName="user-col">
						<span styleName="username-style">{user.userName}</span>
					</Col>
				</Row>
				<Form style={{marginTop: 20}} onSubmit={this.updateUser.bind(this)}>
					<Row>
						<Col span={6} offset={1}>
							<FormItem
								{...formItemLayout}
								label="姓名"
							>
								<Input value={user.name} onChange={this.changeUser.bind(this, 'name')}/>
							</FormItem>
						</Col>
						<Col span={6} offset={1}>
							<FormItem
								{...formItemLayout}
								label="电话"
							>
								<Input value={user.telPhone} onChange={this.changeUser.bind(this, 'telPhone')}/>
							</FormItem>
							<FormItem
								style={{marginTop: 200, marginLeft: 50}}
							>
								<Button type="primary" htmlType="submit">保存</Button>
								<Button type="primary" style={{marginLeft: 20}} onClick={this.onResetPassword.bind(this)}>修改密码</Button>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<Modal
					title="修改密码"
					visible={this.state.visible}
					onOk={this.changePassword.bind(this)}
					onCancel={this.handleCancel.bind(this)}
					okText="确定"
					cancelText="取消"
				>
					<Input type="password" value={this.state.password} onChange={this.onChangePassword.bind(this)} placeholder="请输入新密码"/>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(cssModules(UserInfo, styles))))