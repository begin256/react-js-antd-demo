import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {
  Table, Input, InputNumber, Popconfirm, Form, DatePicker
} from 'antd';
import moment from 'moment';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    index: i,
    key: i.toString(),
    id: `${i}`,
    time: timestampToTime(1546678456),
  });
}

//timestamp To Time
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+ date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}

// const getDataSource = (contents) => {
//   const dataSource = []

//   if (Array.isArray(contents)) {
//     contents.forEach((content, index) => {
//       if (content && content.id) { 
//         dataSource.push({
//           key: index,
//           id: content.id,
//           time: timestampToTime(content.time),
//         })
//       }
//     })
//   }
//   console.log(dataSource)
//   return dataSource
// }

console.log(data)
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'time') {
      return <DatePicker 
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: dataIndex === 'time' ? moment(record[dataIndex]) : record[dataIndex], 
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    console.log(this.state.data)
    this.columns = [
      {
        title: 'time',
        dataIndex: 'time',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      console.log(row,key)
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        console.log(item)
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData)
        this.setState({ data: newData, editingKey: '' });
        console.log(this.state.data)
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
        console.log(this.state.data)
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'time' ? 'time' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    // const dataSources = this.state.data
    // console.log(dataSources)
    // Array.isArray(dataSources) && dataSources.map((dataSource, index) => {
    //   dataSource.time_value = timestampToTime(dataSource.time) //ad_data unit
    // })

    return (
      <Table
        components={components}
        bordered
        rowKey="id"
        dataSource={this.state.data}
        // dataSource={getDataSource(this.state.data)}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}

export default EditableTable