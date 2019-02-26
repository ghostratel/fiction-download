import React, {Component} from 'react'
import './index.scss'

class PageBooklist extends Component {
	constructor(props){
		super(props)
		this.state = {
			cateID: null
		}
	}
	componentDidMount(){
		this.setState({cateID: this.props.match.params.cateID})
	}
	render(){
		return (
			<div className='booklist'>
				{this.state.cateID}
			</div>
		)
	}
}

export default PageBooklist
