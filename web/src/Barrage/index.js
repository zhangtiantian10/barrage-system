import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input} from 'antd'
import cssModules from 'react-css-modules'

import * as action from './action'
import styles from './index.scss'

class Barrage extends React.Component {

	state = {
		liveRoomId: -1,
		textarea: '\n\n\n\n\n\n\n'
	}

	componentWillReceiveProps(nextProps) {
		const {sender, content} = nextProps.barrage
		this.state.textarea += `<font color="aqua">${sender}: </font>${content}<br/>`
		document.all.textarea.scrollTop = document.all.textarea.scrollHeight

		document.getElementById('textarea').innerHTML = this.state.textarea
	}

	getLiveRoomId(e) {
		const regex = new RegExp(/^[1-9][0-9]*$/)
		if(!regex.test(e.target.value)) {
			console.log(e.target.value)
			document.getElementById('error').innerText = '请输入数字'
			return
		}

		this.setState({
			liveRoomId: e.target.value
		}, () => {
			this.props.actions.getBarrages(this.state.liveRoomId)
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
		barrage: state.barrage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Barrage, styles))