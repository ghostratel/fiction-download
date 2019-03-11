import React from 'react'
import styles from './category-item.module.scss'

const CategoryItem = props => {
	let {category, onClick, count} = props
	return (
		<div className={styles.item} onClick={onClick}>
			<span className={styles.name}>{category.cateName}</span>
			<span className={styles.count}>{count}本</span>
			<img src={category.cover} alt='' className={styles.cover} />
		</div>
	)
}

export default CategoryItem
