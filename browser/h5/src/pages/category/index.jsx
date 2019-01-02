import React, { Component } from 'react'

class PageIndex extends Component {
	render(){
		return (
			<div>
				{this.props.match.params.type}
			</div>
		)
	}
}

export default PageIndex
