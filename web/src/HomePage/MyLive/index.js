import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Card, Icon, Tooltip, Popconfirm} from 'antd'
import cssModules from 'react-css-modules'

import * as action from './action'

import styles from './index.scss'
import webSocket from '../../utils/webSocket'

const MAP_PLATFORM = {
	douYu: '斗鱼'
}

class MyLive extends React.Component {
	renderIcon(liveRoom) {
		return <div>
			{liveRoom.status ?
				<Tooltip placement="top" title="暂停直播">
					<Icon type="pause-circle-o" onClick={this.changeLiveStatus.bind(this, liveRoom, 'stop')}/>
				</Tooltip>
				: <Tooltip placement="top" title="开始直播">
					<Icon type="play-circle-o" onClick={this.changeLiveStatus.bind(this, liveRoom, 'start')}/>
				</Tooltip>
			}
			<Tooltip placement="top" title="删除">
				<Icon type="delete" style={{marginLeft: 10}} onClick={this.onDelete.bind(this, liveRoom.id)}/>
			</Tooltip>
		</div>;
	}

	changeLiveStatus(liveRoom, type) {
		this.props.actions.changeLiveStatus(liveRoom, type)
	}

	onDelete(id) {
		this.props.actions.deleteLiveRoom(id)
	}

	componentDidMount() {
		this.props.actions.getAllLiveRoom();
	}

	render() {
		console.log(this.props.liveRooms)
		return (<div styleName="my-live">
			{this.props.liveRooms.map((liveRoom, index) => {
				return <Card
					title={MAP_PLATFORM[liveRoom.platform]}
					key={index}
					className="my-live-card"
					extra={this.renderIcon(liveRoom)}
				>
					<div style={{textAlign: 'center'}}>
						{liveRoom.roomId} 房间
					</div>
				</Card>
			})}
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		liveRooms: state.myLive
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(MyLive, styles))