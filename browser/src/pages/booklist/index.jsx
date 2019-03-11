import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import SearchInput from '../../components/search-input/search-input.jsx'
import Novel from '../../components/novel/novel.jsx'
import { getNovelsByCategory } from '../../API/API.js'
import Loading from '../../components/loading/loading.jsx'
import Toast from '../../components/toast/toast.jsx'
import BScroll from 'better-scroll'
import './index.scss'

class PageBooklist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pageEnter: false,
			novelList: [],
			loadingShow: false,
			toastShow: false,
			toastText: '没有更多小说了'
		}
		this.cateID = null
		this.scrollElement = null
		this.currentPage = 0
		this.scroll = null
		this.hasMore = true
		this.back = this.back.bind(this)
	}
	componentDidMount() {
		this.__initScroll()
		this.cateID = this.props.match.params.cateID
		this.setState({ pageEnter: true, loadingShow: true })
		this.loadNovel().then(() => {
			this.setState({ loadingShow: false })
		})
	}
	render() {
		const { pageEnter, novelList, loadingShow, toastShow, toastText } = this.state
		return (
			<CSSTransition classNames='slideDown' in={pageEnter} timeout={400}>
				<div className='booklist'>
					<Loading loading={loadingShow} />
					<Toast toastShow={toastShow} text={toastText}/>
					<div className='top'>
						<i className='iconfont icon-back' onClick={this.back} />
						<SearchInput disabled={true} placeholder='搜索' />
					</div>
					<div
						className='list'
						ref={_element => {
							this.scrollElement = _element
						}}>
						<div className='wrapper'>
							{novelList.map(novel => (
								<Novel type='large' key={novel._id} novel={novel} onClick={this.navigateToDetail.bind(this, novel)}/>
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
	navigateToDetail(novel){
		console.log(novel);
		this.props.history.push('/book/' + novel.novelID, novel)
	}
	__initScroll() {
		this.scroll = new BScroll(this.scrollElement, {
			pullUpLoad: {
				threshold: -80
			},
			click:true
		})
		this.scroll.on('pullingUp', () => {
			this.loadNovel().then(() => {
				this.scroll.refresh()
			}).catch(e => {
				this.setState({toastShow: true, toastText: e})
				setTimeout(() => {
					this.setState({toastShow: false})
				}, 1500);
			})
			this.scroll.finishPullUp()
		})
	}
	loadNovel() {
		return new Promise((resolve, reject) => {
			if (this.hasMore) {
				this.currentPage++
				this.setState({loadingShow: true})
				getNovelsByCategory(this.cateID, this.currentPage)
					.then(data => {
						if (data.data.length) {
							this.setState(prevState => ({
								novelList: [...prevState.novelList, ...data.data],
								loadingShow: false
							}))
							this.setState({loadingShow: false})
							resolve()
						} else {
							this.hasMore = false
							this.setState({loadingShow: false})
							reject('没有更多了')
						}
					})
					.catch(() => {
						reject('网络出错')
						this.setState({loadingShow: false})
					})
			}
		})
	}
}

export default PageBooklist
