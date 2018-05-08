import React from 'react'
import cssModules from 'react-css-modules'
import {withRouter} from 'react-router'
import { Menu, Icon } from 'antd'

import styles from './index.scss'

class HeaderPage extends React.Component {

  handleClick(value) {
		const key = value.key.split('.$')[1]
		const role = this.props.user ? this.props.user.role : 0

    if ( role && key === 'user') {
      this.props.history.push(`/admin/${key}s`);
    } else {
      this.props.history.push(`/${key}`);
    }
	}

	render() {
		return <div styleName="header-page-content">
      <Menu
        onClick={this.handleClick.bind(this)}
        selectedKeys={[`.$${this.props.type}`]}
        mode="horizontal"
        theme="dark"
        style={{paddingLeft: '100px'}}
      >
        <Menu.Item disabled>
          <h3 style={{color: '#fff', marginBottom: 0}}>弹幕统计系统</h3>
        </Menu.Item>
        <Menu.Item key="homePage" style={{marginLeft: 100}}>
          <Icon type="home" />首页
        </Menu.Item>
        <Menu.Item key="sort">
          <Icon type="file-text" />排行榜
        </Menu.Item>
        <Menu.Item key="user" active>
          <Icon type="user" />个人中心
        </Menu.Item>
				<Menu.Item style={{marginLeft: 500}}>
          {this.props.username === '' ? <div>
              <a href="http://localhost:3000/login">登陆</a>  |
              <a href="http://localhost:3000/register">注册</a>
            </div> :
            <div>
              <span styleName="username-style">{this.props.username} </span>
              <span styleName="logout" onClick={this.props.logout}>登出</span>
            </div>
          }
        </Menu.Item>
      </Menu>
		</div>
	}
}

export default withRouter(cssModules(HeaderPage, styles))