import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import './index.scss'

class PageBooklist extends Component {
	constructor(props){
		super(props)
		this.state = {
			cateID: null,
			pageEnter: false
		}
		this.back = this.back.bind(this)
	}
	componentDidMount(){
		this.setState({cateID: this.props.match.params.cateID, pageEnter: true})
	}
	render(){
		const {pageEnter} = this.state
		return (
			<CSSTransition classNames='fade' in={pageEnter} timeout={400}>
				<div className='booklist' onClick={this.back}>
					{this.state.cateID}
				</div>
			</CSSTransition>
		)
	}
	back(){
		this.props.history.go(-1)
	}
}

export default PageBooklist
