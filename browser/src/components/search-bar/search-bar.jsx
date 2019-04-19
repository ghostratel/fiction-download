import React from 'react'
import SearchInput from '../search-input/search-input.jsx'
import styles from './search-bar.module.scss'

const SearchBar = props => (
	<div>
		<div className={styles.bar}>
			<i className={'iconfont icon-back ' + styles.icon} onClick={props.onGoBack} style={{paddingRight: !props.title && '0.3784rem'}}/>
			{
				props.title && <span className={styles.title}>{props.title}</span>
			}
			<SearchInput disabled={true} placeholder='搜索' />
		</div>
	</div>
)


export default SearchBar
