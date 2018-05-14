import React from 'react'
import {Icon} from 'antd'

import LiveData from '../../constant/LiveData'

const Live = ({userId, roomId}) => {
  return (<div>
    <div>
      <a href="/admin/users"><Icon type="arrow-left" />返回</a>
    </div>
    <LiveData userId={userId} roomId={roomId}/>
  </div>)
}

export default Live