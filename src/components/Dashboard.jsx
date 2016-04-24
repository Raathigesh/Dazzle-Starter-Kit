import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';

// App components
import Header from './Header';
import EditBar from './EditBar';
import Container from './Container';
import AddWidgetDialog from './AddWidgetDialog';
import CustomFrame from './CustomFrame';
// Widgets of the dashboard.
import BarChart from './widgets/BarChart';
import LineChart from './widgets/LineChart';
import DoughnutChart from './widgets/DoughnutChart';


import 'bootstrap/dist/css/bootstrap.css';
import 'react-dazzle/lib/style/style.css';
import '../styles/custom.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: {
        EngineTelemetricsWidget: {
          type: BarChart,
          title: 'Engine',
        },
        PerformanceWidget: {
          type: DoughnutChart,
          title: 'Reactor Temp',
        },
        ShipVitalTelemetricsWidget: {
          type: LineChart,
          title: 'Reactor Telemetrics',
        },
      },
      layout: {
        rows: [{
          columns: [{
            className: 'col-md-12 col-sm-12 col-xs-12',
            widgets: [{key: 'ShipVitalTelemetricsWidget'}],
          }],
        }, {
          columns: [{
            className: 'col-md-8 col-sm-8 col-xs-8',
            widgets: [{key: 'EngineTelemetricsWidget'}],
          }, {
            className: 'col-md-4 col-sm-4 col-xs-4',
            widgets: [{key: 'PerformanceWidget'}],
          }],
        }],
      },
      editMode: false,
      isModalOpen: false,
      addWidgetOptions: null,
    };
  }

  onRemove = (layout) => {
    this.setState({
      layout: layout,
    });
  }

  onAdd = (layout, rowIndex, columnIndex) => {
    this.setState({
      isModalOpen: true,
      addWidgetOptions: {
        layout,
        rowIndex,
        columnIndex,
      },
    });
  }

  onMove = (layout) => {
    this.setState({
      layout: layout,
    });
  }

  onRequestClose = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  render() {
    return (
    <Container>
      <AddWidgetDialog widgets={this.state.widgets} isModalOpen={this.state.isModalOpen} onRequestClose={this.onRequestClose} onWidgetSelect={this.widgetSelected}/>
      <Header />
      <EditBar onEdit={this.toggleEdit} />
      <Dashboard
        frameComponent={CustomFrame}
        onRemove={this.onRemove}
        layout={this.state.layout}
        widgets={this.state.widgets}
        editable={this.state.editMode}
        onAdd={this.onAdd}
        onMove={this.onMove}
        />

    </Container>
    );
  }

  toggleEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  widgetSelected = (widgetName) => {
    const {layout, rowIndex, columnIndex} = this.state.addWidgetOptions;
    this.setState({
      layout: addWidget(layout, rowIndex, columnIndex, widgetName),
    });
    this.onRequestClose();
  }
}

export default App;
