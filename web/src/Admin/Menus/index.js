import React from 'react'
import {Menu, Icon} from 'antd'

const SubMenu = Menu.SubMenu;

const Menus = ({changeView, viewType}) => {
	return (<Menu theme="dark" defaultSelectedKeys={[`${viewType}`]} mode="inline" onClick={(e) => {changeView(e.key)}}>
		<Menu.Item key="users">
			<Icon type="user" />
			<span>主播信息</span>
		</Menu.Item>

		<Menu.Item key="password">
      <Icon type="laptop" />
			<span>修改密码</span>
		</Menu.Item>
	</Menu>)
}

export default Menus
