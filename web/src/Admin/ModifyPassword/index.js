import React from 'react'
import {Form, Input, Button, message} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router'

import * as action from '../action'

const FormItem = Form.Item;

class ModifyPassword extends React.Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = Cookies.getJSON('user')

        this.props.actions.changePassword(user.id, values.password)
          .then(() => {
            message.success('密码修改成功，请重新登录')
            Cookies.remove('user')
            setTimeout(() => {
              this.props.history.push('/admin/login')
            }, 10)
          })
      }
    });
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
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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

    return (<div>
      <Form onSubmit={this.handleSubmit.bind(this)} >
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
          {...buttonLayout}
        >
          <Button type="primary" htmlType="submit">
            修改密码
          </Button>
        </FormItem>
      </Form>
    </div>)
  }
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(ModifyPassword)))