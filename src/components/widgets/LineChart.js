import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import { getRandomInt } from './util';

class LineChart extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        labels: ['10', '20', '30', '40', '50', '60', '70'],
        datasets: [
          {
            label: 'Singal',
            fillColor: '#F1E7E5',
            strokeColor: '#E8575A',
            pointColor: '#E8575A',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#ff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [10, 55, 69, 45, 87, 68, 74],
          },
          {
            label: 'Disturbance',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [10, 55, 69, 45, 87, 68, 74],
          },
        ],
      },
    };
  }

  componentDidMount() {
    const refreshIntervalId = setInterval(() => {
      this.state.data.datasets[0].data.shift();
      this.state.data.datasets[0].data.push(getRandomInt(0, 90));

      this.state.data.datasets[1].data.shift();
      this.state.data.datasets[1].data.push(getRandomInt(0, 90));
      this.setState({
        data: this.state.data,
        refreshIntervalId,
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId);
  }

  render() {
    return (
      <div >
         <Line data={this.state.data} options={{responsive: true, animationSteps: 300 }} height="210" width="800"/>
       </div>
    );
  }
}

export default LineChart;
