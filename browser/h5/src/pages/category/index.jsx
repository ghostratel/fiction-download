import React, { Component } from 'react'

class PageIndex extends Component {
	render(){
		console.log(this.props);
		return (
			<div>
				{this.props.match.params.type}
			</div>
		)
	}
}

export default PageIndex
