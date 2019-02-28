import React from 'react'
import styles from './search-input.module.scss'

const SearchInput = props => (
	<div className={styles.search}>
		<i className={'iconfont icon-search ' + styles.icon}></i>
		<input type="text" className={styles.input} placeholder={props.placeholder} disabled={props.disabled}
		onClick={props.onClick} onChange={props.onChange} onBlur={props.onBlur} onFocus={props.onFocus}/>
	</div>
)

export default SearchInput
