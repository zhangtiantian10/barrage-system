import React, {Component} from 'react'
import {Input, Form, Icon} from 'antd'

const FormItem = Form.Item

class Login extends Component {

	render() {
		const {getFieldDecorator} = this.props.form

		return (<div>
			<Form>
				<FormItem>
					{getFieldDecorator('username', {
						rules: [{
							require: true,
							message: '请填写用户名或手机号！'
						}]
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/手机号" />
					)}
				</FormItem>
			</Form>
		</div>)
	}
}

export default Form.create()(Login)