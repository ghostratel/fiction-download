import React from 'react'
import styles from './title.module.scss'

const Title = props => <h1 className={styles.title_l}>{props.children}</h1>

export default Title
