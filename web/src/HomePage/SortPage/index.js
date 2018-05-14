import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import cssModules from 'react-css-modules'
import {withRouter} from 'react-router'
import {Table, Tag} from 'antd'

import styles from './index.scss'
import * as action from "../action";

const MAP_PLATFORM = {
  douYu: '斗鱼'
}

class SortPage extends React.Component {
  state = {
    isGift: false
  }

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
    this.props.actions.getBarrageSort(100)
  }

  changeSort(isGift) {
    this.setState({isGift})

    isGift ? this.props.actions.getGiftSort(100) : this.props.actions.getBarrageSort(100)
  }

  render() {
    const {isGift} = this.state
    const dataSource = isGift ? this.props.giftSort : this.props.barrageSort

    const barrageColumns = [{
      title: 'number',
      width: '10%',
      render: (text, record) => {
        const index = dataSource.indexOf(record)

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
      dataIndex: isGift ? 'giftTotal' : 'total',
      width: '25%',
      render: (text) => {
        return <div style={{float: 'right'}}>
          <span style={{color: '#15bff2', fontSize: 20, fontWeight: 'bold'}}>{text}</span>
        </div>
      }
    }]

    return <div style={{width: 1000, margin: '10px auto'}}>
      <div styleName={isGift ? 'select-sort' : 'active'} onClick={this.changeSort.bind(this, false)}>
        <span>弹幕榜</span>
      </div>
      <div styleName={isGift ? 'active' : 'select-sort'} onClick={this.changeSort.bind(this, true)}>
        <span>收入榜</span>
      </div>
      <div style={{background: '#fff', border: '1px solid #efefef', padding: '0 20px'}}>
        <Table
          className={styles["sort-page"]}
          showHeader={false}
          dataSource={dataSource}
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
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(cssModules(SortPage, styles)))