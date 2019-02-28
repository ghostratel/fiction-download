import React from 'react'
import styles from './novel.module.scss'

const Novel = props => {
	let {novelCover, author, title, summary, cateName} = props.novel
	switch (props.type) {
		case 'large': {
			return (
				<div className={styles.large}>
					<img
						src={novelCover}
						alt=''
						className={styles.cover}
					/>
					<div className={styles.info}>
						<span className={styles.title}>{title}</span>
						<span className={styles.author}>{author}</span>
						<p className={styles.desc}>
							{summary.substr(
								0,
								41
							) + '...'}
						</p>
					</div>
				</div>
			)
		}
		case 'medium': {
			return (
				<div className={styles.medium}>
					<img
						src={novelCover}
						alt=''
						className={styles.cover}
					/>
					<div className={styles.info}>
						<span className={styles.title}>
							{summary.substr(0, 9) + '...'}
						</span>
						<span className={styles.author}>{author}</span>
						{cateName.map(cate => (
							<p className={styles.category} key={cate}>{cate}</p>
						))}
					</div>
				</div>
			)
		}
		case 'small': {
			return (
				<div className={styles.small}>
					<img
						src={novelCover}
						alt=''
						className={styles.cover}
					/>
					<span className={styles.title}>{summary.substr(0, 9) + '...'}</span>
					<span className={styles.author}>{author}</span>
				</div>
			)
		}
		default: {
			return <></>
		}
	}
}

export default Novel
