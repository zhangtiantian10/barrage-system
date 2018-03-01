import React from 'react'
import {Modal, Select, Input, Row, Col, message} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as action from './action'
import webSocket from '../../utils/webSocket'

const Option = Select.Option;

class CreateLive extends React.Component{

	state = {
		visible: true,
		roomId: '',
		platform: ''
	}

	onClose() {
		this.setState({
			visible: false
		})
	}

	onOk() {
		const {platform, roomId} = this.state

		if(!platform || !roomId) {
			message.error('直播平台和房间号不能为空')
		}
		else {
			// var de = document.documentElement;
			// if (de.requestFullscreen) {
			// 	de.requestFullscreen();
			// } else if (de.mozRequestFullScreen) {
			// 	de.mozRequestFullScreen();
			// } else if (de.webkitRequestFullScreen) {
			// 	de.webkitRequestFullScreen();
			// }
			this.props.actions.addLiveRoom(platform, roomId)
				.then((res) => {
					message.success('创建成功')
					webSocket(res.data)
				})
			this.setState({
				visible: false
			})
		}
	}

	handleChange(value) {
		this.setState({
			platform: value
		})
	}

	writeRoomId(e) {
		const { value } = e.target;

		const reg = /^-?(0|[1-9][0-9]*)$/;
		if ((!isNaN(value) && reg.test(value)) || value === '') {
			this.setState({
				roomId: e.target.value
			})
		}
	}

	render() {
		const {visible, roomId} = this.state
		return (<Modal
			visible={visible}
			onCancel={this.onClose.bind(this)}
			onOk={this.onOk.bind(this)}
			title="房间信息"
		>
			<Row style={{marginLeft: 50}}>
				<Col span={4}>
					<label>直播平台 </label>
				</Col>
				<Col span={6}>
					<Select style={{width: '100%'}} onChange={this.handleChange.bind(this)}>
						<Option value="douYu">斗鱼</Option>
					</Select>
				</Col>
			</Row>
			<Row style={{paddingTop: 20, marginLeft: 50}}>
				<Col span={4} style={{paddingTop: 4}}>
					<label>房间号</label>
				</Col>
				<Col span={6}>
					<Input
						value={roomId}
						onChange={this.writeRoomId.bind(this)}
						placeholder="填写数字"
					/>
				</Col>
			</Row>
		</Modal>);
	}
};

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLive)