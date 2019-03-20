import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker1 from './DatePicker';
import DeviceType from './DeviceType'
import CRUDTable from './CRUDTable'
import EditTable from './EditTable'

import CanvasTest1 from './CanvasTest1'
import Context1 from './Context1'
import Context2 from './Context2'
import App2 from './DynamicContext/App'
import Appb from './FatherSon/Appb'
import { Row, Col } from 'antd';
import MouseTracker from './MouseTracker';
import ScrollTable from './ScrollTable';




import 'antd/dist/antd.css'; 
var ws;

const createWs = url => {
  ws = new WebSocket(url);
  ws.onopen = function(evt) { 
    console.log("Connection open ..."); 
    ws.send("Hello WebSockets!");
  };
  ws.onmessage = function(evt) {
        console.log( "Received Message: " + evt.data);
        // ws.close();
      };
  ws.onclose = function(evt) {
    console.log("Connection closed.");
  };   
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',value2: '',value3: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleChange2(event) {
    this.setState({value2: event.target.value2});
    console.log(this.state.value2)
  }

  handleConnect(event) {
    console.log('=======')
    createWs("ws://localhost:8181")  //use websocket in idas to listen 8181, can connect successfully
    // createWs("wss://echo.websocket.org")    
    event.preventDefault();
  }

  handleChange3(event) {
    this.setState({value3: event.target.value3});
  }

  handleClose(event) {
    console.log('&&&&&&&&&&'+ this.state.value3)
    ws.close();
    event.preventDefault();
  }

  

  componentWillMount () {
    // add event listeners (Flux Store, WebSocket, document, etc.)
    console.log('-------')
  }

  // componentDidMount () {
     
  // }

  componentWillUnmount () {
    // remove event listeners (Flux Store, WebSocket, document, etc.)
    console.log('*******')
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />

        </form>
        <form onSubmit={this.handleConnect}>
        <input type="submit" value="connect" onChange={this.handleChange2} />
        </form>

        <form onSubmit={this.handleClose}>
        <input type="submit" value="close" onChange={this.handleChange3} />
        </form>
          <h2>test</h2>
          <DatePicker1 />
          <DeviceType />
          <br />
          <Row gutter={24}>
            <Col span={6}>
              <CRUDTable />
            </Col>
            <Col span={6}>
              <ScrollTable />
            </Col>
          </Row>
          <EditTable />
          {/* <CanvasTest1 /> */}
          <Row>
            <Col span={12}><CanvasTest1 /></Col>
          </Row>
          <Context1 />
          <Context2 />
          <App2 />
          <Appb />
          <MouseTracker />
        </div>
    );
  }
}

export default App;
