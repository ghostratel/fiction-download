import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import SearchInput from '../../components/search-input/search-input.jsx'
import Novel from '../../components/novel/novel.jsx'
import { getNovelsByCategory } from '../../API/API.js'
import Loading from '../../components/loading/loading.jsx'
import BScroll from 'better-scroll'
import './index.scss'

class PageBooklist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cateID: null,
			pageEnter: false,
			currentPage: 0,
			novelList: [],
			loadingShow: false
		}
		this.scrollElement = null
		this.scroll = null
		this.back = this.back.bind(this)
	}
	componentDidMount() {
		const { cateID } = this.props.match.params
		this.scroll = new BScroll(this.scrollElement)
		this.setState({ cateID, pageEnter: true, loadingShow: true })
		getNovelsByCategory(cateID, this.state.currentPage).then(data => {
			this.setState({ novelList: data.data, loadingShow: false })
		})
	}
	render() {
		const { pageEnter, novelList, loadingShow } = this.state
		return (
			<CSSTransition classNames='slideDown' in={pageEnter} timeout={400}>
				<div className='booklist'>
					<Loading loading={loadingShow} />
					<div className='top'>
						<i className='iconfont icon-back' onClick={this.back} />
						<SearchInput disabled={true} placeholder='搜索' />
					</div>
					<div className='list' ref={(_element) => {this.scrollElement = _element}}>
						<div className='wrapper'>
						{novelList.map(novel => (
							<Novel type='large' key={novel._id} novel={novel} />
						))}
						</div>
					</div>
				</div>
			</CSSTransition>
		)
	}
	back() {
		this.props.history.go(-1)
	}
}

export default PageBooklist
