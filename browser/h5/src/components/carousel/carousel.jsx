import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper'
import './carousel.scss'
const options = {
	direction: 'horizontal',
	loop: true,
	pagination: {
		el: '.swiper-pagination'
	}
}

class Carousel extends PureComponent {
	render() {
		const { list } = this.props
		return (
			<div className='swiper-container carousel' ref={ref => (this.carouselRef = ref)}>
				<div className='swiper-wrapper'>
					{list.map(n => {
						return (
							<div className='swiper-slide' key={n.img}>
								Slide {n.img}
							</div>
						)
					})}
				</div>
				<div className='swiper-pagination' />
			</div>
		)
	}

	componentDidMount() {
		this.swiper = new Swiper(this.carouselRef, options)
	}
}

Carousel.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Carousel
