import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { select_nav } from '../../store/actions'
import './index.scss'
import Carousel from '../../components/carousel/carousel'
import Button from '../../components/button/button'
import Title from '../../components/title/title'
import Split from '../../components/split/split'

class PageIndex extends Component {
	render() {
		return (
			<div className='index'>
				<Carousel list={[{ img: 'xxxx' }, { img: 'foo' }, { img: 'bar' }]} />
				<div className='chanel-link'>
					<Button
						styles={{ backgroundColor: '#7297c1', width: '4.6622rem' }}
						onClick={this.handleButtonClick.bind(this, 'boy')}>
						<i className='iconfont icon-nan' />
						男生频道
					</Button>
					<Button
						styles={{ backgroundColor: '#c39cc9', width: '4.6622rem' }}
						onClick={this.handleButtonClick.bind(this, 'girl')}>
						<i className='iconfont icon-nv' />
						女生频道
					</Button>
				</div>
				<div className='list column'>
					<Title>编辑推荐</Title>

				</div>
				<div className='list grey'>
					<Title>编辑推荐</Title>
					<div style={{display: 'flex',flexWrap: 'wrap', justifyContent: 'space-between'}}>

					</div>
				</div>
				<Split />
				<div className='list'>
					<Title>男生必读</Title>
					<div style={{display: 'flex',flexWrap: 'wrap'}}>
					</div>
				</div>
				<Split />
			</div>
		)
	}
	handleButtonClick(parameter) {
		this.props.history.push('/category/' + parameter)
		this.props.selectNav('category')
	}
}

const mapDispatchToProps = dispatch => ({
	selectNav: route => {
		dispatch(select_nav(route))
	}
})

export default connect(
	null,
	mapDispatchToProps
)(withRouter(PageIndex))
