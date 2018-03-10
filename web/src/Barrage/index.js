import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input} from 'antd'
import cssModules from 'react-css-modules'

import * as action from './action'
import styles from './index.scss'

const MAP_GIFT_STYLE = ['超级火箭', '火箭', '飞机']

class Barrage extends React.Component {

	state = {
		liveRoomId: -1,
		textarea: '\n\n\n\n\n\n\n'
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.data.type === "barrage") {
			const {sender, content} = nextProps.data.barrage
			this.state.textarea += `<font color="aqua">${sender}: </font>${content}<br/>`
		} else {
			const {gift} = nextProps.data

			this.state.textarea += `<span style="font-size: 16px; color: aqua;">${gift.sender}</span><span style="font-size: 16px;">送出${MAP_GIFT_STYLE[gift.giftStyle - 1]}  </span><span style="color: yellowgreen; font-size: 16px;">${gift.hits}连击</span> <br/>`
		}
		document.all.textarea.scrollTop = document.all.textarea.scrollHeight

		document.getElementById('textarea').innerHTML = this.state.textarea
	}

	getLiveRoomId(e) {
		const regex = new RegExp(/^[1-9][0-9]*$/)
		document.getElementById('error').innerText = ''
		if(!regex.test(e.target.value)) {
			document.getElementById('error').innerText = '请输入数字'
			return
		}
		this.setState({
			liveRoomId: e.target.value
		})
		this.props.actions.getBarrages(e.target.value)
			.catch((err) => {
				this.setState({
					liveRoomId: -1
				})
				document.getElementById('error').innerText = '该房间不存在，请重新输入'
			})
	}

	componentWillUnmount() {
		this.props.actions.cancelSubscribe()
	}

	render() {
		return (<div styleName="barrage-body">
			{this.state.liveRoomId !== -1 ?
				<div id="textarea" className="barrage-style"></div>
				: <div>
					<label>输入房间标识</label>
					<Input onPressEnter={this.getLiveRoomId.bind(this)}/>
			</div>
			}
			<div id="error" style={{color: 'red'}}></div>
		</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.barrage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Barrage, styles))