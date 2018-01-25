import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, Form, Button} from 'antd'
import cssModules from 'react-css-modules'

import styles from './index.scss'
import * as action from '../Login/action'

const FormItem = Form.Item

class Login extends Component {

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.actions.register(values)
					.then(() => {
						console.log('chenggong')
					})
			}
		})
	}

	render() {
		const {getFieldDecorator} = this.props.form

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};

		const buttonLayout = {
			wrapperCol: {
				sm: {
					span: 16,
					offset: 6
				}
			}
		}

		return (<div styleName="login">
			<Form styleName="form" onSubmit={this.handleSubmit.bind(this)}>
				<FormItem
					{...formItemLayout}
					label="用户名"
				>
					{getFieldDecorator('userName', {
						rules: [{
							required: true,
							message: '请输入用户名!',
						}, {
							min: 6,
							message: '不能少于6个字符'
						}],
					})(
						<Input type="text" placeholder="不能少于6个字符"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="姓名"
				>
					{getFieldDecorator('name', {
						rules: [],
					})(
						<Input type="text" placeholder="请填写真实姓名"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码"
				>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请输入用户密码!'}],
					})(
						<Input type="password" placeholder="不能少于6个字符"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="确认密码"
				>
					{getFieldDecorator('checkPassword', {
						rules: [{required: true, message: '请再次输入你的密码!'}]
					})(
						<Input placeholder="再次输入密码" type="password"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="电话"
				>
					{getFieldDecorator('telPhone', {
						rules: [{required: true, message: '请输入电话！'}]
					})(
						<Input type="text" placeholder=""/>
					)}
				</FormItem>
				<FormItem
					{...buttonLayout}
				>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</FormItem>
			</Form>
		</div>)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(() => {},mapDispatchToProps)(Form.create()(cssModules(Login, styles)))