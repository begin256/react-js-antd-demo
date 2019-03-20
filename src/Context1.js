import React, { Component } from 'react';
import { Button } from 'antd';
function ThemedButton(props) {
  console.log(`${props.theme}`)
  return <Button theme={props.theme} value={props.theme} />;
}

// 中间组件
function Toolbar(props) {
  // Toolbar 组件必须添加一个额外的 theme 属性
  // 然后传递它给 ThemedButton 组件
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class Context1 extends React.Component {
  render() {
    return <Toolbar theme="green" />;
  }
}

export default Context1