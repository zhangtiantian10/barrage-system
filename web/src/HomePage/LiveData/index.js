import React from 'react'

import Chart from 'chart.js'

class LiveData extends React.Component{

	renderChart() {
		if (document.getElementById('myChart')) {
			const ctx = document.getElementById('myChart').getContext('2d');
			const chart = new Chart(ctx, {
				// "type":"line","data":{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"My First Dataset","data":[65,59,80,81,56,55,40],"fill":false,"borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},"options":{}
				type: 'line',
				data: {
					labels: ['0', '1............', '2...............', '3.............', '4..................', '5.................', '6...............', '7...............', '8..............', '9..............', '10..............', '11.............', '12..............'],
					datasets: [{
						label: '123',
						data: [1, 111, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
						fill: false
					}]
				},
				options: {
				}
			});
		}
	}

	componentDidMount() {
		this.renderChart()
	}

	render() {
		return (
			<div>
				<canvas id="myChart"></canvas>
			</div>
		)
	}
}

export default LiveData