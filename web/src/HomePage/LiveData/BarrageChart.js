import React from 'react'
import Chart from 'chart.js'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cookies from 'js-cookie'
import cssModules from 'react-css-modules'
import {Button, Radio, DatePicker} from 'antd'
import moment from 'moment'

import * as action from './action'
import styles from './index.scss'

const MAP_DATA_TYPE = {
	barrage: "弹幕",
	gift: "礼物"
}

class BarrageChart extends React.Component{
	state = {
		id: Math.random(),
		data: [],
		dates: [],
		isDisplay: false
	}

	renderChart() {
		const {data, dates} = this.state
		if (document.getElementById(`myChart${this.props.type}`)) {
			const ctx = document.getElementById(`myChart${this.props.type}`).getContext('2d');
			const chart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: dates || [],
					datasets: [{
						label: `${MAP_DATA_TYPE[this.props.type]}数据`,
						data: data || [],
						fill: false,
						borderColor: "#7BB5EC"
					}]
				},
				options: {}
			});
		}
	}

	getLiveDataForMonth(monthStr, platform) {
		const user = Cookies.getJSON('user');

		if(this.props.type === "barrage") {
			this.props.actions.getBarrageDataForMonth(user.id, platform, monthStr)
				.then((res) => {
					this.setState({
						data: res.data.data,
						dates: res.data.dates
					}, () => {this.renderChart();})
				})
		} else {
			this.props.actions.getGiftDataForMonth(user.id, platform, monthStr)
				.then((res) => {
					this.setState({
						data: res.data.data,
						dates: res.data.dates
					}, () => {this.renderChart()})
				})
		}
	}

	componentWillReceiveProps(nextProps) {
		this.getLiveDataForMonth('thisMonth', nextProps.platform)
	}

	componentDidMount() {
		this.getLiveDataForMonth('thisMonth', this.props.platform)
	}

	getLiveDataForDay(day, platform) {
		const user = Cookies.getJSON('user');
		this.props.actions.getLiveDataForDay(user.id, platform, day, this.props.type)
			.then((res) => {
			console.log(res.data)
				this.setState({
					data: res.data.data,
					dates: res.data.dates
				}, () => {this.renderChart();})
			})
	}

	onChange(e) {
		if (e.target.value === 'day') {
			this.setState({
				isDisplay: true
			})
			const nowDays = new Date();
			const dayStr = moment(nowDays.toLocaleDateString()).format('YYYY-MM-DD')
			this.getLiveDataForDay(dayStr, this.props.platform)
		} else {
			this.setState({
				isDisplay: false
			})
			this.getLiveDataForMonth(e.target.value, this.props.platform)
		}
	}

	selectDate(date, dateString) {
		this.getLiveDataForDay(dateString, this.props.platform)
	}

	disabledDate(date) {
		const nowDays = new Date();
		let year = nowDays.getFullYear();
		let month = nowDays.getMonth();
		if (month == 0) {
			month = 12;
			year = year - 1;
		}
		if (month < 10) {
			month = "0" + month;
		}
		const lastMonthOneDay =  year + "-" + month + "-" + "01"

		return date.valueOf() > moment().valueOf() || moment(lastMonthOneDay).valueOf() >= date.valueOf()
	}

	render() {
		return (
			<div styleName="barrage-chart-content">
				<div styleName="header-style">
					<h4>直播{MAP_DATA_TYPE[this.props.type]}量</h4>
					<Radio.Group onChange={this.onChange.bind(this)} defaultValue="thisMonth">
						<Radio.Button value="thisMonth">本月</Radio.Button>
						<Radio.Button value="lastMonth">上月</Radio.Button>
						<Radio.Button value="day">天</Radio.Button>
					</Radio.Group>
					<div style={this.state.isDisplay ? {} : {display: 'none'}}>
						<DatePicker
							defaultValue={moment()}
							onChange={this.selectDate.bind(this)}
							disabledDate={this.disabledDate.bind(this)}
						/>
					</div>
				</div>
				<div styleName="canvas-style">
					<canvas id={`myChart${this.props.type}`}></canvas>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(BarrageChart, styles))