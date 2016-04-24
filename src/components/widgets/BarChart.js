import React from 'react';
import { Bar } from 'react-chartjs';
import { getRandomInt } from './util';

class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Bar Chart First dataset',
            fillColor: '#E8575A',
            strokeColor: '#E8575A',
            highlightFill: 'rgba(220,220,220,0.75)',
            highlightStroke: 'rgba(220,220,220,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'My Second dataset',
            fillColor: '#0094D6',
            strokeColor: '#0094D6',
            highlightFill: 'rgba(151,187,205,0.75)',
            highlightStroke: 'rgba(151,187,205,1)',
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      },
    };
  }

  componentDidMount() {
    const refreshIntervalId  = setInterval(() => {
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
      <div>
         <Bar data={this.state.data}  options={{responsive: true, animationSteps: 300 }} height="210" width="800"/>
       </div>
    );
  }
}

export default BarChart;
