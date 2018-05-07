import React from 'react'
import {Menu, Icon} from 'antd'

const SubMenu = Menu.SubMenu;

const Menus = ({changeView, viewType}) => {
	return (<Menu theme="dark" defaultSelectedKeys={[`${viewType}`]} mode="inline" onClick={(e) => {changeView(e.key)}}>
		<Menu.Item key="user">
			<Icon type="user" />
			<span>个人中心</span>
		</Menu.Item>
		<Menu.Item key="liveData">
            <Icon type="dot-chart" />
			<span>直播数据</span>
		</Menu.Item>
		<SubMenu
			key="live"
			title={<span><Icon type="laptop" /><span>直播</span></span>}
		>
			<Menu.Item key="myLive">我的直播间</Menu.Item>
			<Menu.Item key="createLive">新建房间</Menu.Item>
		</SubMenu>
	</Menu>)
}

export default Menus
