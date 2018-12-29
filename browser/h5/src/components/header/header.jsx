import React, { PureComponent } from 'react'
import {withRouter} from 'react-router-dom'
import styles from './header.module.scss'
import Logo from '../../Logo.svg'

class Header extends PureComponent {
	render() {
		return (
			<header className={styles.header}>
				<img src={Logo} alt='Logo' className={styles.logo} onClick={this.navigateTo.bind(this, '/')}/>
				<span className={styles.text}>小说阅读</span>
				<i className={'iconfont icon-sousuo ' + styles.search} onClick={this.navigateTo.bind(this, '/search')}/>
			</header>
		)
	}
	navigateTo(route){
		this.props.history.push(route)
	}
}

export default withRouter(Header)
