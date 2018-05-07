import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {Input, Form, Button} from 'antd'
import cssModules from 'react-css-modules'

import styles from './index.scss'
import * as action from '../Login/action'

const FormItem = Form.Item

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			passwordIsSame: false
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.actions.register(values)
					.then(() => {
						this.props.history.push('/')
					})
			}
		})
	}

	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('两次输入的密码不一致，请重新输入!');
		} else {
			callback();
		}
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

		return (<div styleName="register">
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
						rules: [{
							required: true,
							message: '请输入姓名!',
						}]
					})(
						<Input type="text" placeholder="请填写真实姓名"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码"
				>
					{getFieldDecorator('password', {
						rules: [{
							required: true,
							message: '请输入用户密码!'
						}, {
							min: 6,
							message: '不能少于6个字符！'
						}],
					})(
						<Input type="password" placeholder="不能少于6个字符"/>
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="确认密码"
				>
					{getFieldDecorator('checkPassword', {
						rules: [{
							required: true,
							message: '请再次输入你的密码!'
						}, {
							validator: this.checkPassword
						}]
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

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(cssModules(Login, styles))))