import React from 'react';
import { Table } from 'antd';
import DatePicker1 from './DatePicker';

const pieArrs = [
  {place_id: 3},
  {place_id: 3},
  {place_id: 3},
  {place_id: 3},
  {place_id: 3},
  {place_id: 3},
  {place_id: 3},
  {place_id: 3},
  {place_id: 3}]

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
  }];

const data = [];

{pieArrs.map((pieArr,index)=> 
  data.push({
    key: index,
    address: <DatePicker1 />,
  })
)}

class ScrollTable extends React.Component {
  render() {
    return (
      <div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />,
    </div>
    )
  }
  }

export default ScrollTable