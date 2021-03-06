import React from 'react'
import Chart from '../../../node_modules/chart.js/src/chart'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import cssModules from 'react-css-modules'
import {Radio, DatePicker} from 'antd'
import moment from 'moment'

import * as action from './action'
import styles from './index.scss'

const MAP_DATA_TYPE = {
	barrage: "弹幕",
	gift: "礼物",
  superRocket: "超级火箭",
	rocket: "火箭",
	plane: "飞机"
}

const MAP_GIFT_STYLE = ['#7BB5EC', 'yellow', 'red']

const MAP_GIFT_MONEY = {
  barrage: 1,
  superRocket: 2000,
  rocket: 500,
  plane: 100
}

class Index extends React.Component{
	state = {
		id: Math.random(),
		data: [],
		dates: [],
		isDisplay: false,
		chart: null
	}

	renderChart() {
		const {data, dates} = this.state
		if (document.getElementById(`myChart${this.props.type}`)) {
			if (this.state.chart) {
				this.state.chart.destroy()
			}
			const ctx = document.getElementById(`myChart${this.props.type}`).getContext('2d');

			const datasets = data.map((d, i) => {
				return {
          label: `${MAP_DATA_TYPE[d.type]}数据`,
          data: d.data || [],
          fill: false,
          borderColor: MAP_GIFT_STYLE[i]
        }
			})

			this.state.chart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: dates || [],
					datasets: datasets
				},
				options: {}
			});
		}
	}

	getLiveDataForMonth(monthStr, platform) {
		const userId = this.props.userId;

		if(this.props.type === "barrage") {
			this.props.actions.getBarrageDataForMonth(userId, platform, monthStr)
				.then((res) => {
					this.setState({
						data: res.data.barrages || [],
						dates: res.data.dates
					}, () => {this.renderChart();})
				})
		} else {
			this.props.actions.getGiftDataForMonth(userId, platform, monthStr)
				.then((res) => {
					this.setState({
						data: res.data.barrages || [],
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
    const userId = this.props.userId;
		this.props.actions.getLiveDataForDay(userId, platform, day, this.props.type)
			.then((res) => {
				this.setState({
					data: res.data.barrages || [],
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

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Index, styles))