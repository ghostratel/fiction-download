import React, { Component } from 'react'
import './index.scss'
import SearchInput from '../../components/search-input/search-input.jsx'
import Button from '../../components/button/button.jsx'
import { withRouter } from 'react-router-dom'

class PageIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {
			novel: props.location.state
		}
		this.back = this.back.bind(this)
	}
	render() {
		const { novel } = this.state
		console.log(novel)
		return (
			<div className='detail'>
				<div className='top'>
					<i className='iconfont icon-back' onClick={this.back} />
					<span className='novel-title'>{novel.title}</span>
					<SearchInput disabled={true} placeholder='搜索' />
				</div>
				<div className='novel-wrapper'>
					<div className='novel-head'>
						<img src={novel.novelCover} alt='' className='blur' />
						<div className='row'>
							<img src={novel.novelCover} alt='' className='cover' />
							<div className='column'>
								<span className='title'>{novel.title}</span>
								<span className='author'>{novel.author}</span>
								<span className='score'>{novel.score || 0}</span>
								<span className='type'>{novel.cateName.join('/')}</span>
								<span className='status'>
									{novel.size} | {novel.status}
								</span>
							</div>
						</div>
						<div className='btn-group'>
							<Button styles={{ backgroundColor: '#ed424b', width: '48%' }}>
								免费阅读
							</Button>
							<Button styles={{ backgroundColor: '#333', width: '48%' }}>
								加入书架
							</Button>
						</div>
					</div>
					<div className='novel-content'>
						<div className='novel-desc'>{novel.summary}</div>
					</div>
				</div>
			</div>
		)
	}
	back() {
		this.props.history.go(-1)
	}
}

export default withRouter(PageIndex)
