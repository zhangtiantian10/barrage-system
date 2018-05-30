import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Carousel, Table, Tag} from 'antd'
import cssModules from 'react-css-modules'
import {withRouter} from 'react-router'

import styles from './index.scss'
import * as action from "../action";

const MAP_PLATFORM = {
  douYu: '斗鱼'
}

class Page extends React.Component {
  renderNumber(index) {
    let number = index
    if (index === 1) {
      number = "gold-medal.png"
    } else if (index === 2) {
      number = "olympic-medal-silver.png"
    } else if (index === 3) {
      number = "olympic-medal-bronze.png"
    }

    return number > 3 ? <span className={styles["number-style"]}>{number}</span> : <img src={`https://png.icons8.com/ultraviolet/40/e74c3c/${number}`}/>
  }

  componentDidMount() {
    this.props.actions.getBarrageSort(5)
    this.props.actions.getGiftSort(5)
  }
  render() {
    const barrageColumns = [{
      title: 'number',
      width: '10%',
      render: (text, record) => {
        const index = this.props.barrageSort.indexOf(record)

        return this.renderNumber(index + 1)
      }
    }, {
      title: 'avatar',
      dataIndex: 'avatar',
      width: '20%',
      render: (text) => {
        return <div className={styles["header-img"]}>
          <img src={`http://localhost:8081/image/${text}`} alt="" width="80" height="80"/>
        </div>
      }
    }, {
      title: 'userName',
      dataIndex: 'userName',
      width: '45%',
      render: (text, record) => {
        return <div style={{display: 'inline-block'}}>
          <Tag color="green">{MAP_PLATFORM[record.platform]}</Tag>
          <h3 style={{display: 'inline-block'}}>{text}</h3>
        </div>
      }
    }, {
      title: 'total',
      dataIndex: 'total',
      width: '25%',
      render: (text) => {
        return <div style={{float: 'right'}}>
          <span style={{color: '#15bff2', fontSize: 20, fontWeight: 'bold'}}>{text}</span>
        </div>
      }
    }]

    const giftColumns = [{
      title: 'number',
      width: '10%',
      render: (text, record) => {
        const index = this.props.giftSort.indexOf(record)

        return this.renderNumber(index + 1)
      }
    }, {
      title: 'avatar',
      dataIndex: 'avatar',
      width: '20%',
      render: (text) => {
        return <div className={styles["header-img"]}>
          <img src={`http://localhost:8081/image/${text}`} alt="" width="80" height="80"/>
        </div>
      }
    }, {
      title: 'userName',
      dataIndex: 'userName',
      width: '45%',
      render: (text, record) => {
        return <div style={{display: 'inline-block'}}>
          <Tag color="green">{MAP_PLATFORM[record.platform]}</Tag>
          <h3 style={{display: 'inline-block'}}>{text}</h3>
        </div>
      }
    }, {
      title: 'giftTotal',
      dataIndex: 'giftTotal',
      width: '25%',
      render: (text) => {
        return <div style={{float: 'right'}}>
          <span style={{color: '#fe7600', fontSize: 20, fontWeight: 'bold'}}>{text}</span>
        </div>
      }
    }]

    return (<div>
      <div style={{width: 1200, margin: '20px auto'}}>
        <Carousel autoplay>
          <div><img src="http://localhost:8081/image/p_1.jpg" width="1200" height="500"/></div>
          <div><img src="http://localhost:8081/image/p_2.jpg" width="1200" height="500"/></div>
          <div><img src="http://localhost:8081/image/p_3.jpg" width="1200" height="500"/></div>
        </Carousel>
        <div styleName="download">
          <a styleName="platform-logo" href="https://github.com/zhangtiantian10/barrage-system/raw/master/qtDanmu.tar">
            <img src="https://png.icons8.com/ios-glyphs/40/000000/mac-client.png"/>
            <span>MAC弹幕插件下载</span>
          </a>
          <a styleName="platform-logo">
            <img src="https://png.icons8.com/color/40/000000/windows-logo.png"/>
            <span>Windows弹幕插件下载</span>
          </a>
          <a styleName="platform-logo">
            <img src="https://png.icons8.com/color/40/000000/ubuntu.png"/>
            <span>Ubuntu弹幕插件下载</span>
          </a>
        </div>
      </div>
      <div style={{width: 1200, margin: '10px auto', background: '#fff', border: '1px solid #efefef'}}>
        <div style={{width: '45%', display: 'inline-block', marginLeft: '20px'}}>
          <div styleName="sort-title">
            <img src="http://localhost:8081/image/barrage.png" alt=""/><h1 style={{display: 'inline-block', marginBottom: 0}}>弹幕条数榜</h1>
          </div>
          <Table
            className={styles["sort-page"]}
            showHeader={false}
            dataSource={this.props.barrageSort}
            columns={barrageColumns}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.props.history.push(`/liveData/${record.liveRoomId}?userId=${record.userId}`)
                }
              }
            }}
          />
        </div>
        <div style={{width: '45%', display: 'inline-block', marginLeft: '80px'}}>
          <div styleName="sort-title">
            <img src="https://png.icons8.com/color/48/fe7600/gift.png"/><h1 style={{display: 'inline-block', marginBottom: 0}}>礼物价值榜</h1>
          </div>
          <Table
            className={styles["sort-page"]}
            showHeader={false} dataSource={this.props.giftSort}
            columns={giftColumns}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => {
                  this.props.history.push(`/liveData/${record.liveRoomId}?userId=${record.userId}`)
                }
              }
            }}
          />
        </div>
        <a href={`/sort`}>
          <div styleName="view-more">
            <span styleName="text">+ 查看更多主播数据</span>
          </div>
        </a>
      </div>
    </div>)
  }
}

const mapStateToProps = ({sort}) => {
  return {...sort}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(cssModules(Page, styles)))