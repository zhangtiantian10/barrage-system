import React from 'react'
import {Upload, Icon} from 'antd'

class UserAvatar extends React.Component {

	state = {
		imageUrl: '',
	};

	componentDidMount() {
		if (this.props.avatar) {
			this.setState({
				imageUrl: 'http://localhost:8081/image/' + this.props.avatar
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.avatar) {
			this.setState({
				imageUrl: 'http://localhost:8081/image/' + nextProps.avatar
			})
		}
	}

	handleChange = ({file}) => {

		if(file.response)
			this.setState({imageUrl: 'http://localhost:8081/image/' + file.response[1]})
		else
			this.setState({imageUrl: ''})
	}

	render() {
		const {imageUrl} = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">Upload</div>
			</div>
		);

		return (<div style={{width: '100%', height: '100%'}}>
			<Upload
				action={`/api/user/avatar/${this.props.id}`}
				listType="picture-card"
				onChange={this.handleChange}
				showUploadList={false}
			>
				{imageUrl ? <img width="100" height="100" src={imageUrl}/> : uploadButton}
			</Upload>
		</div>)
	}
}

export default UserAvatar