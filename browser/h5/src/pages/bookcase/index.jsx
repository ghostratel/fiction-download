import React, { Component } from 'react'
import {CSSTransition} from 'react-transition-group'
import './index.scss'

class PageSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
			show: false
		}
		this.toggleShow = this.toggleShow.bind(this)
	}
	render(){
		const {show} = this.state
		return (
			<div className='bookcase'>
				<button onClick={this.toggleShow}>
					click!
				</button>
				<CSSTransition in={show} timeout={300} classNames='message'>
					<div>
						66666666666666666
					</div>
				</CSSTransition>
			</div>
		)
	}
	toggleShow(){
		this.setState({show: !this.state.show})
		console.log(this.state.show);
	}
}

export default PageSearch
