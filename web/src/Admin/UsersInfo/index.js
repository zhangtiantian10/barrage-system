import React from 'react'
import {Table, Avatar, Button} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import cssModules from 'react-css-modules'

import * as action from './action'
import styles from './index.scss'

class UsersInfo extends React.Component {
  componentWillMount() {
    this.props.actions.adminGetUsers()
  }

  render() {
    const columns = [ {
      title: '用户名',
      dataIndex: 'userName',
      render: (text, record) => {
        return (<div className={styles['username-avatar']}>
          <Avatar src={`http://localhost:8081/image/${record.avatar}`} />
          <span><a href="">{text}</a></span>
        </div>)
      }
    }, {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '电话',
      dataIndex: 'telPhone',
    }, {
      title: '操作',
      render: (text, record) => {
        return <a href={`/user/${record.id}`}>查看</a>
      }
    }];
    const {usersInfo} = this.props

    return (<div styleName="users-info">
      <Table columns={columns} dataSource={usersInfo.content} />
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