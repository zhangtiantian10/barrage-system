import React, {Component} from 'react'
import {Input, Form, Icon, Button} from 'antd'
import cssModules from 'react-css-modules'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as action from './action'
import styles from './index.scss'

const FormItem = Form.Item

class Login extends Component {

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values)
			}
		})

		this.props.actions.register()
	}

	render() {
		const {getFieldDecorator} = this.props.form

		return (<div styleName="login">
			<Form styleName="form" onSubmit={this.handleSubmit}>
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [{required: true, message: '请填写用户名或手机号！'}],
					})(
						<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名/手机号"/>
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请填写用户密码！'}],
					})(
						<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="密码"/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登陆
					</Button>
				</FormItem>
			</Form>
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.user.login.isSuccess
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(cssModules(Login, styles)))