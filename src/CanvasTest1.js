import React from "react"
import {findDOMNode} from 'react-dom'
import { Button, Row, Col} from 'antd'

class CanvasTest1 extends React.Component { 
  componentDidMount() {
    const divDom = findDOMNode(this)
    const ctxCanvas1 = divDom.querySelector('.canvas1') 
    const ctx1 = ctxCanvas1.getContext('2d')
    ctx1.font = "bold 12px serif";
    ctx1.fillStyle = "Black";
    ctx1.fillText("easy cancas shape： ", 0, 14);
   
    
    //绘制颜色标志
    const mpointColor = ["#FF0C00", "#EF8B00", "#64FF00"];
    for(var i=0; i<mpointColor.length;i++){
      drawCircle(100 * i + 180, 8, 6, mpointColor[i]);
    }
    
    //绘制形状标志
    drawStrokeRect(412, 2, 12, 12, "#000000")
    drawStrokeCircle(512, 8, 6, "#000000")
    drawStrokeTriUp(612, 2, 12, 12, "#000000")
    
    // 绘制矩形函数
    function drawStrokeRect(x,y,w,h,color) {
      const ctxCanvas1 = divDom.querySelector('.canvas1')
      if (ctxCanvas1.getContext) {
          const ctx1 = ctxCanvas1.getContext('2d');
          ctx1.beginPath();
          ctx1.strokeStyle=color;
          ctx1.strokeRect(x,y,w,h);
          ctx1.stroke();
      }
    }

    //绘制圆形函数  
    function drawStrokeCircle(x,y,r,color) {
      const ctxCanvas1 = divDom.querySelector('.canvas1')    
      if (ctxCanvas1.getContext){
          const ctx1 = ctxCanvas1.getContext('2d');
          // tempCtx.scale(2,2); 
          ctx1.beginPath();
          ctx1.strokeStyle=color;
          ctx1.arc(x, y, r, 0, Math.PI*2, true);
          ctx1.stroke();
      }
    }
    
    //绘制朝上三角形函数
    function drawStrokeTriUp(x,y,w,h,color) {
      const ctxCanvas1 = divDom.querySelector('.canvas1')    
      if (ctxCanvas1.getContext){
          const ctx1 = ctxCanvas1.getContext('2d');
          ctx1.beginPath()
          ctx1.strokeStyle=color
          ctx1.moveTo(x, y + h)
          ctx1.lineTo(x + w, y + h)
          ctx1.lineTo(x + w/2, y)
          ctx1.lineTo(x, y + h)
          ctx1.stroke()
      }
    }

    //绘制颜色函数  
    function drawCircle(x,y,r,color) {
      const ctxCanvas1 = divDom.querySelector('.canvas1')    
      if (ctxCanvas1.getContext){
          const ctx1 = ctxCanvas1.getContext('2d');
          ctx1.beginPath();
          ctx1.fillStyle=color;
          ctx1.arc(x, y, r, 0, Math.PI*2, true);
          ctx1.fill();
      }
    }

    
  }

  render() {
    const style1 = {
      position: 'absolute',
      width: 1308,
      height: 30,
      index: 0,
      border: '1px solid black',     
    }
    
    return (
      <div className="gutter-example button-demo">
        <Row>
          <Col>
            <div className="gutter-box">
              <div style={{width: 1308, height: 30}}>
                <canvas className="canvas1" width="1308" height="30" style={style1} />             
              </div>
            </div>
          </Col>
        </Row>        
      </div>
    )    
  }
}

export default CanvasTest1

