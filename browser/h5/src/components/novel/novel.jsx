import React from 'react'
import styles from './novel.module.scss'

const Novel = (props) => {
	switch(props.type) {
		case 'large':
			{
				return (
					<div className={styles.large}>
						<img src="https://img.80txt.com/13/13001/13001s.jpg" alt="" className={styles.cover}/>
						<div className={styles.info}>
							<span className={styles.title}>英雄联盟</span>
							<span className={styles.author}>苦苦挣扎</span>
							<p className={styles.desc}>
描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
							</p>
						</div>
					</div>
				)
			}
		default:
			{
				return (
					<div>
						zzzzzzzzzzzzzz
					</div>
				)
			}
	}
}

export default Novel
