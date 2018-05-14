import React from 'react'
import {Table, Avatar, Button} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import cssModules from 'react-css-modules'

import * as action from '../action'
import styles from './index.scss'

const MAP_PLATFORM = {
  douYu: '斗鱼'
}

class UsersInfo extends React.Component {
  componentWillMount() {
    this.props.actions.adminGetUsers()
  }

  expandedRowRender(record) {
    const columns = [{
      title: '房间ID',
      dataIndex: 'roomId'
    }, {
      title: '直播平台',
      dataIndex: 'platform',
      render: (text) => {
        return MAP_PLATFORM[text]
      }
    }, {
      title: '直播间状态',
      dataIndex: 'status',
      render: (text) => {
        return text ? "正在直播" : "未直播"
      }
    }, {
      title: '操作',
      render: (text, record) => {
        return <a href={`/liveRoom/${record.id}?userId=${record.userId}`}>查看</a>
      }
    }]

    return <Table
      columns={columns}
      dataSource={record.liveRooms}
      pagination={false}
    />
  }

  render() {
    const columns = [{
      title: '用户名',
      dataIndex: 'userName',
      render: (text, record) => {
        return (<div className={styles['username-avatar']}>
          <Avatar src={`http://localhost:8081/image/${record.avatar}`} />
          <span>{text}</span>
        </div>)
      }
    }, {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '电话',
      dataIndex: 'telPhone',
    }];
    const {usersInfo} = this.props

    return (<div styleName="users-info">
      <Table
        columns={columns}
        dataSource={usersInfo.content}
        expandedRowRender={this.expandedRowRender.bind(this)}
      />
    </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(UsersInfo, styles))