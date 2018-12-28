import React, { Component } from 'react'
import Carousel from '../../components/carousel/carousel'

class PageIndex extends Component {
	render(){
		return (
			<div>
				<Carousel list={[{img: 'xxxx'}, {img: 'foo'}, {img: 'bar'}]}/>
			</div>
		)
	}
}

export default PageIndex
