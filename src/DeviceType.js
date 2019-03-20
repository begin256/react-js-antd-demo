import React, { Component } from 'react';
import { Input, Col, Button } from 'antd';

const Search = Input.Search;

class DatePicker1 extends React.Component {
  constructor(props) {
    super(props);
  }
    render(){
      return (
        <div>
          <Col span={5}>
          <Search
            placeholder="test"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          </Col>
          <Col span={1}>
          </Col>
          <Col span={5}>
            <Button>test</Button>
          </Col>
          </div>
      )
    }
  }


  export default DatePicker1;