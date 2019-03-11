import React from 'react'
import Styles from './button.module.scss'
import PropTypes from 'prop-types'

const Button = (props) => {
	return (
		<button className={Styles.button} style={props.styles} onClick={props.onClick}>
			{props.children}
		</button>
	)
}

Button.propTypes = {
	styles: PropTypes.object
}

export default Button
