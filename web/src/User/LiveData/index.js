import React from 'react'
import {Select} from 'antd'
import Cookies from 'js-cookie'

import BarrageChart from '../../constant/BarrageChart'

class LiveData extends React.Component{

	state = {
		platform: 'douYu'
	}

	onChange(value) {
		this.setState({
			platform: value
		})
	}

	render() {
    const user = Cookies.getJSON('user')

		return (
			<div>
				<div style={{width: 1000, margin: 'auto'}}>
					<label style={{fontWeight: 500}}>选择直播平台 </label>
					<Select style={{ width: 120 }} onChange={this.onChange.bind(this)} defaultValue={this.state.platform}>
						<Select.Option value="douYu">斗鱼</Select.Option>
						<Select.Option value="huYa">虎牙</Select.Option>
					</Select>
				</div>
				<BarrageChart type="barrage" userId={user.id} platform={this.state.platform}/>
				<BarrageChart type="gift" userId={user.Id} platform={this.state.platform}/>
			</div>
		)
	}
}

export default LiveData