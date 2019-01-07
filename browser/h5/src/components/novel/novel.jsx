import React from 'react'
import styles from './novel.module.scss'

const Novel = props => (
	<div
		className={`${styles.novel} ${
			props.layout === 'column' ? styles.column : styles.row
		}`}
		>
		<img
			src='https://img.80txt.com/14/14448/14448s.jpg'
			alt='novel'
			className={styles.cover}
		/>
		<div className={styles.info}>
			<h6 className={styles.title}>斗破苍穹斗破苍穹</h6>
			{props.layout === 'row' && (
				<>
					<p className={styles.summary}>
						一个拥有神奇战兽的少年，不屈于命运，一步步踏上巅峰，赢得无数美女欢心，与天抗争。
					</p>
					<div className={styles.bottom}>
						<i className='iconfont icon-user' />
						<span className={styles.author}>author</span>
						<span className={`${styles.tag} ${styles.type}`}>玄幻修真</span>
						<span className={`${styles.tag} ${styles.writing}`}>连载</span>
					</div>
				</>
			)}
		</div>
	</div>
)

export default Novel
