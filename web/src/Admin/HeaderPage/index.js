import React from 'react'
import cssModules from 'react-css-modules'

import styles from './index.scss'

class HeaderPage extends React.Component {
	render() {
		return <div styleName="header-page-content">
			<div style={{float: 'right'}}>
				<span styleName="username-style">{this.props.username} </span>
				<span styleName="logout" onClick={this.props.logout}>登出</span>
			</div>
		</div>
	}
}

export default cssModules(HeaderPage, styles)