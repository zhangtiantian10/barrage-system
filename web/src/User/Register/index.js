import React, {Component} from 'react'
import {Input, Form, Icon, Button} from 'antd'
import cssModules from 'react-css-modules'

import styles from './index.scss'

const FormItem = Form.Item

class Login extends Component {

	render() {
		const {getFieldDecorator} = this.props.form

		return (<div styleName="login">
			<Form styleName="form">
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
						注册
					</Button>
				</FormItem>
			</Form>
		</div>)
	}
}

export default Form.create()(cssModules(Login, styles))