import React from 'react'
import styles from './toast.module.scss'
import {CSSTransition} from 'react-transition-group'

const Toast = (props) => (
	<CSSTransition in={props.toastShow} timeout={300} classNames='ToastZoom'>
		<div className={styles.toast}>
			<span className={styles.text}>{props.text || '默认文本'}</span>
		</div>
	</CSSTransition>
)

export default Toast
