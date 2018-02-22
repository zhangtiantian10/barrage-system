import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cookies from 'js-cookie'

import * as action from './action'

import UserAvatar from './UserAvatar'
class UserInfo extends React.Component {

	state = {
		user: {}
	}

	componentWillMount() {
		this.props.actions.getUserInfo(Cookies.getJSON('user').id)
			.then((res) => {
				Cookies.set('user', res.data)
				this.setState({
					user: res.data
				})
			});
	}

	render() {
		const {user} = this.state
		return (
			<UserAvatar avatar={user.avatar} id={user.id}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)