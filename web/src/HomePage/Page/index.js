import React from 'react'
import {Carousel} from 'antd'

class Page extends React.Component {
  render() {
    return (<div>
      <div  style={{width: 1000, height: 500, margin: '10px auto'}}>
        <Carousel autoplay>
          <div><img src="http://localhost:8081/image/p_1.jpg" width="1000" height="500"/></div>
          <div><img src="http://localhost:8081/image/p_2.jpg" width="1000" height="500"/></div>
          <div><img src="http://localhost:8081/image/p_3.jpg" width="1000" height="500"/></div>
        </Carousel>
      </div>
    </div>)
  }
}

export default Page