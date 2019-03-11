import React from 'react'
import styles from './loading.module.scss'
import loadingSVG from './loading.svg'
import {CSSTransition} from 'react-transition-group'

const Loading = (props) => (
	<CSSTransition in={props.loading} timeout={300} classNames='fade'>
		<div className={styles.loading}>
			<img src={loadingSVG} alt="" className={styles.loadingSVG}/>
			<span className={styles.loadingText}>加载中</span>
		</div>
	</CSSTransition>
)

export default Loading
