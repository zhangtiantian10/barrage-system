import React from 'react'
import BarrageChart from '../../constant/BarrageChart'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Card, Icon, Avatar, Col, Button} from 'antd'
import cssModules from 'react-css-modules'

import * as action from "../action";
import styles from './index.scss'

const MAP_PLATFORM = {
  douYu: '斗鱼'
}

class LiveData extends React.Component {
  state = {
    liveRoom: null,
    user: null
  }

  componentDidMount() {
    console.log(this.props)
    const {roomId, userId} = this.props
    this.props.actions.getUser(userId)
      .then((res) => {
        const liveRoom = res.data.liveRooms.find(room => room.id === parseInt(roomId))
        this.setState({
          user: res.data,
          liveRoom
        })
      })
  }

  render() {
    const {liveRoom, user} = this.state
    return (user ? <div className={styles['live-data']}>
      <div>
        <a href="/admin/users"><Icon type="arrow-left" />返回</a>
      </div>
      <div className={styles['user-info']}>
        <div className={styles['left-image']}>
          <div className={styles['header']}>
            <img src={`http://localhost:8081/image/${user.avatar}`} width="100"/>
          </div>
          <div className={styles['content']}>
            <h1>{user.userName}</h1>
            <span>{`${MAP_PLATFORM[liveRoom.platform]} | ID:${liveRoom.roomId}`}</span>
          </div>
          <div className={styles['footer']}>
            <Button href={`http://www.douyu.com/${liveRoom.roomId}`}>进入直播间</Button>
          </div>
        </div>
        <div className={styles['right-content']}>
          <h3>主播总成绩</h3>
          <div style={{marginTop:30}}>
            <table width="500">
              <tr>
                <td>
                  <div className={styles['img-text']}>
                    <img src="http://localhost:8081/image/c_1.png" width="50"/>
                    <div style={{display: 'inline-block', marginLeft: 10}}>
                      <div>弹幕数量</div>
                      <span>--条</span>
                    </div>
                  </div>
                </td>
                <td width="5%"></td>
                <td>
                  <div className={styles['img-text']}>
                    <img src="http://localhost:8081/image/d_1.png" width="50"/>
                    <div style={{display: 'inline-block', marginLeft: 10}}>
                      <div>礼物数量</div>
                      <span>--条</span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <BarrageChart type="barrage" userId={liveRoom.userId} platform={liveRoom.platform}/>
      <BarrageChart type="gift" userId={liveRoom.userId} platform={liveRoom.platform}/>
    </div> : '')
  }
}

const mapStateToProps = ({admin}) => {
  return {
    usersInfo: admin.usersInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(LiveData, styles))