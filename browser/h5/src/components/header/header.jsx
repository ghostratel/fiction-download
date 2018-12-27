import React, { PureComponent, Fragment } from 'react'
import styles from './header.module.scss'

class APPHeader extends PureComponent {
	render() {
		return (
			<Fragment>
				<p className={styles.header}>
					header
				</p>
			</Fragment>
		)
	}
}

export default APPHeader
