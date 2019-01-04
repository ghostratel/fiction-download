import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {select_nav} from '../../store/actions'
import { Link, withRouter } from 'react-router-dom'
import styles from './nav.module.scss'

class Nav extends PureComponent {
	render() {
		console.log(this.props);
		const { activeNav, selectNav } = this.props
		return (
			<nav className={styles.nav}>
				<Link
					to='/'
					className={activeNav === '/' ? styles.active : ''}
					onClick={() => {selectNav('/')}}>
					首页
				</Link>
				<Link
					to='/category/all'
					className={activeNav === 'category' ? styles.active : ''}
					onClick={() => {selectNav('category')}}>
					分类
				</Link>
				<Link
					to='/rank'
					className={activeNav === 'rank' ? styles.active : ''}
					onClick={() => {selectNav('rank')}}>
					排行
				</Link>
				<Link
					to='/bookcase'
					className={activeNav === 'bookcase' ? styles.active : ''}
					onClick={() => {selectNav('bookcase')}}>
					书架
				</Link>
			</nav>
		)
	}
	handleNavClick(route) {
		this.setState({ currentActive: route })
	}
}

const mapStateToProps = state => ({
	activeNav: state.activeNav
})

const mapDispatchToProps = dispatch => {
	return {
		selectNav: route => {
			dispatch(select_nav(route))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Nav))
